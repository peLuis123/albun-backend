const SubscriptionType = require('../models/subscription.types.model')

const subscriptionTypes = [
  {
    name: 'trial',
    price: 0,
    duration: 7, 
  },
  {
    name: 'monthly',
    price: 9.99,
    duration: 30,  
  },
  {
    name: 'annual',
    price: 99.99,
    duration: 365,  
  },
]

const seedSubscriptionTypes = async () => {
  try {
    await SubscriptionType.deleteMany()  
    const createdTypes = await SubscriptionType.insertMany(subscriptionTypes) 
    console.log('Planes de suscripción insertados:', createdTypes)
  } catch (error) {
    console.error('Error al insertar los planes:', error)
  }
}

module.exports = seedSubscriptionTypes
