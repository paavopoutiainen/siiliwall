/* eslint-disable import/prefer-default-export */
const { RedisPubSub } = require('graphql-redis-subscriptions')

const pubsub = new RedisPubSub()

module.exports = { pubsub }
