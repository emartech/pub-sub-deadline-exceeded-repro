# Pub/Sub DEADLINE_EXCEEDED Error Reproduction

## Overview

This repository contains a reproduction of the `DEADLINE_EXCEEDED` error that
occurs when using the `@google-cloud/pubsub` library in Node.js to consume
messages from a Pub/Sub subscription using the `v1.Subscriber` API.

Note that the `DEADLINE_EXCEEDED` **error does not occur** when using the
latest Subscriber from this library. This repository contains both a v1 and
latest version of the Subscriber to demonstrate this difference.

## Run

### Configure

```sh
# Install Node.js and dependencies
nvm install
npm install

# Configure environment
cp .env.example .env
vim .env
set -a; source .env; set +a

# Create Pub/Sub topic and subscription
gcloud pubsub topics create $PUB_SUB_TOPIC_ID --project $GOOGLE_CLOUD_PROJECT
gcloud pubsub subscriptions create $PUB_SUB_SUBSCRIPTION_ID --topic $PUB_SUB_TOPIC_ID
```

### v1 Publisher and Subscriber

Start the publisher and subscriber in separate terminals, and **wait 15 minutes**
for the `DEADLINE_EXCEEDED` error to occur in the subscriber.

```sh
npm run v1-publisher
npm run v1-subscriber
```

### Latest Publisher and Subscriber

Start the publisher and subscriber in separate terminals, and wait 15 minutes.
The `DEADLINE_EXCEEDED` **error does not occur** in the subscriber.

```sh
npm run publisher
npm run subscriber
```

## Cleanup

```sh
gcloud pubsub subscriptions delete $PUB_SUB_SUBSCRIPTION_ID --project $GOOGLE_CLOUD_PROJECT
gcloud pubsub topics delete $PUB_SUB_TOPIC_ID --project $GOOGLE_CLOUD_PROJECT
```

## GitHub Issue

There was a [GitHub issue](https://github.com/googleapis/nodejs-pubsub/issues/1135) opened for
this problem in the official repository of the Pub/Sub Node.js library, but it was closed without
resolving the problem.
