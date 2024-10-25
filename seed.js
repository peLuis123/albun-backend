const mongoose = require('mongoose')
require('dotenv').config()
const seedSubscriptionTypes = require('./src/seeders/Subscription.Sedeers')
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a la base de datos')
    runSeeders()
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error)
})
const runSeeders = async () => {
    try {
        await seedSubscriptionTypes()
        console.log('Seeders ejecutados correctamente')
        process.exit()
    } catch (error) {
        console.error('Error al ejecutar los seeders:', error)
        process.exit(1)
    }
}
