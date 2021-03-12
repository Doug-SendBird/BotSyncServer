# Configuration

Configuring the BotSyncServer is pretty straight forward. There are a few key pieces of information that are required for operation. In this document, we'll assume you're utiling Google's DialogFlow.

Once you've cloned the repository, you'll need to create a `.env` file in the root of the project directory. Inside, we'll fill it in with the following information:

```bash
# Express
PORT=5500

# DialogFlow
GCLOUD_PROJECT_ID=
GCLOUD_CLIENT_EMAIL=
GCLOUD_PRIVATE_KEY=

# Sendbird Chat
SB_CHAT_APP_ID=
SB_CHAT_API_TOKEN=

# Sendbird Desk
SB_DESK_APP_ID=
SB_DESK_API_TOKEN=

```

_Note: If deploying to a cloud service such as AWS, you'll need to properly set variables within the enviornment. The `.env` file is only utilized when `NODE_ENV` is set to something other than production._

## Express

For express, we only have one variable to set, the port on which express will listen. We've left ours at 5500 for testing but you can change to align to your needs.

## Google DialogFlow

For DialogFlow, we need three pieces of information. The `project_id`, the `client_email` and the `private_key`. These items can all be obtained IAM within the [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts).

If you do not already have a service account, you'll need to [create](https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating) one.

_Note: You must wrap the `GCLOUD_PRIVATE_KEY` value in double quotes `""`._

## Sendbird Chat
