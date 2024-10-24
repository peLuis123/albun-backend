const app = require('./src/app');

const PORT = process.env.HERMES_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
