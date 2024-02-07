import { v1 } from '@google-cloud/pubsub'
import { get } from 'lodash-es'
import { setTimeout } from 'timers/promises'
import { v4 as uuid } from 'uuid'
import { config } from '../config.js'

const publisher = new v1.PublisherClient()
const topic = publisher.projectTopicPath(config.projectId, config.topicId)

while (true) {
  // Publish a message
  const [response] = await publisher.publish({
    topic,
    messages: [{ data: Buffer.from(uuid()) }],
  })

  const messageIds = get(response, 'messageIds', [])
  console.log('publisher::messageIds', messageIds)

  // Sleep for 10 seconds
  await setTimeout(10000)
}
