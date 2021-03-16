# Configuration

Configuring the BotSyncServer is pretty straight forward. There are a few key pieces of information that are required for operation. In this document, we'll assume you're utiling Google's DialogFlow.

Once you've cloned the repository, you'll need to create a `.env` file in the root of the project directory. Inside, we'll fill it in with the following information:

```bash
# Express
PORT=5500

# DialogFlow
GCLOUD_PROJECT_ID=
GCLOUD_CLIENT_EMAIL=
GCLOUD_PRIVATE_KEY=""

# Sendbird Chat
SB_CHAT_APP_ID=
SB_CHAT_API_TOKEN=

# Sendbird Desk
SB_DESK_APP_ID=
SB_DESK_API_TOKEN=

```

_Note: If deploying to a cloud service such as AWS, you'll need to properly set variables within the enviornment. The `.env` file is only utilized when `NODE_ENV` is set to something other than production._

## Express

`PORT` refers to the port on which the server will listen for incoming requests. This example uses `5500`

## Google DialogFlow

DialogFlow requires a Google Cloud Service Account. The service account can be found in the [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts)

If you do not already have a Service Account, you'll need to [create](https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating) one. Ensure you obtain the Service Account key in `JSON` format.

`GLCOUD_PROJECT_ID` is the unique identifier of your Google Cloud project. Refered to as `project_id` in the key file.

`GCLOUD_CLIENT_EMAIL` is the unique email address associated with the service account created. Referred to as `client_email` in the key file.

`GCLOUD_PRIVATE_KEY` is the private key associated with the service account created. Referred to as `private_key` in the key file.

_Note: You must wrap the `GCLOUD_PRIVATE_KEY` value in double quotes `""`._

## Sendbird Chat

In order to communicate with Sendbird Chat, an application id and an api token are required. These can be found on your [Sendbird Dashboard](https://dashboard.sendbird.com/) under Application -> Settings -> General.

_Note: You can utilize either the Master API Token or a secondary API Token._

## Sendbird Desk

Similarly to Sendbird Chat, you need an application id and an api token to communicate with Sendbird Desk. These can be found on your [Sendbird Dashboard](https://dashboard.sendbird.com/). The application id can be found under Application -> Settings -> General, and the api token can be found under Application -> Settings -> Credentials.
