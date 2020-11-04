/* eslint-disable import/prefer-default-export */
/* For production
const { RedisPubSub } = require('graphql-redis-subscriptions')
const pubsub = new RedisPubSub()
*/

// For development
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

module.exports = { pubsub }
