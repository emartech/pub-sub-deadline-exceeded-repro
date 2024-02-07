import { PubSub } from '@google-cloud/pubsub'
import { setTimeout } from 'timers/promises'
import { v4 as uuid } from 'uuid'
import { config } from './config.js'

const pubSub = new PubSub({ projectId: config.projectId })
const topic = pubSub.topic(config.topicId)

while (true) {
  // Publish a message
  const messageId = await topic.publishMessage({ data: Buffer.from(uuid()) })

  console.log('publisher::messageId', messageId)

  // Sleep for 10 seconds
  await setTimeout(10000)
}
