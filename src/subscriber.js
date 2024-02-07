import { PubSub } from '@google-cloud/pubsub'
import moment from 'moment'
import { config } from './config.js'

const pubSub = new PubSub({ projectId: config.projectId })
const subscription = pubSub.subscription(config.subscriptionId)

const start = moment()

// Handle incoming messages
subscription.on('message', (message) => {
  console.log('subscriber::messageId', message.id)

  message.ack()

  console.log('subscriber::elapsed', start.fromNow())
})

// Handle errors
subscription.on('error', (error) => {
  console.log('subscriber::elapsed', start.fromNow())
  console.error('subscriber::error', error)
})
