import { v1 } from '@google-cloud/pubsub'
import { get, map } from 'lodash-es'
import moment from 'moment'
import { v4 as uuid } from 'uuid'
import { config } from '../config.js'

const subscriber = new v1.SubscriberClient()
const subscription = subscriber.subscriptionPath(config.projectId, config.subscriptionId)
const stream = subscriber.streamingPull()

const start = moment()

// Handle incoming messages
stream.on('data', (response) => {
  const messages = get(response, 'receivedMessages', [])

  const messageIds = map(messages, 'message.messageId')
  console.log('subscriber::messageIds', messageIds)

  const ackIds = map(messages, 'ackId')
  stream.write({ ackIds })

  console.log('subscriber::elapsed', start.fromNow())
})

// Handle errors
stream.on('error', (error) => {
  console.log('subscriber::elapsed', start.fromNow())
  console.error('subscriber::error', error)
})

// Start the stream
stream.write({
  clientId: uuid(),
  subscription,
  streamAckDeadlineSeconds: 60,
})
