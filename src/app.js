const express = require('express');
const cors = require('cors');
const cookieMiddleware = require('./middlewares/cookie.middleware'); 
const swaggerConfig = require('./config/swagger.config');
const connectDB = require('./config/database.config.js');
const { requestTime } = require('./middlewares/request.middleware');
const { errorConverter, errorHandler } = require('./middlewares/error.middleware');
const appRouter = require('./routes/index.routes.js'); 
require('dotenv').config();
const app = express();

swaggerConfig(app);
app.use(cookieMiddleware);
app.use(express.json());
const corsOptions = {
    origin: [`${process.env.HOST_PRODUCCION}`],
    credentials: true,
    optionsSuccessStatus: 200
}; 

connectDB();
app.use(cors(corsOptions));
app.use('/api/v1', appRouter); 
app.use(requestTime);

app.use(errorConverter);
app.use(errorHandler);
module.exports = app;
