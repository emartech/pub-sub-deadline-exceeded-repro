import dotenv from 'dotenv'
import { cleanEnv, str } from 'envalid'

dotenv.config()

export const env = cleanEnv(process.env, {
  GOOGLE_CLOUD_PROJECT: str({
    desc: 'Google Cloud Project ID',
  }),
  PUB_SUB_TOPIC_ID: str({
    desc: 'Pub/Sub Topic ID',
  }),
  PUB_SUB_SUBSCRIPTION_ID: str({
    desc: 'Pub/Sub Subscription ID',
  }),
})
