const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.resolve(__dirname, './swagger.yaml'));
const configureSwaggerServers = () => {
    const env = process.env.NODE_ENV || 'development';
    const servers = [];

    if (env === 'development') {
        servers.push({
            url: `http://localhost:${process.env.PORT || 3000}/api/v1/`,
            description: 'Servidor de desarrollo'
        });
    }
    else if (env === 'production') {
        servers.push({
            url: process.env.HOST_BACKEND,
            description: 'Servidor de producción'
        });
    }

    swaggerDocument.servers = servers;
};

configureSwaggerServers();
module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
