import { env } from './env.js'

export const config = {
  projectId: env.GOOGLE_CLOUD_PROJECT,
  topicId: env.PUB_SUB_TOPIC_ID,
  subscriptionId: env.PUB_SUB_SUBSCRIPTION_ID,
}
