# Sendbird BotSyncServer

BotSyncServer is a middleman server that helps connect chat bot services, such as Google DialogFlow, with Sendbird chat.
It can be setup for either core Sendbird Chat or Sendbird Desk

## Note - this version has not been tested for standard Chat

## Installation

Clone the repository to your local machine and install dependancies

```bash
npm install
```

## Configuration

In order to utilize this repository, you'll need to create a `.env` file in the root directory, and fill it with the following:

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

If you are unsure where to obtain this information, please refer to the [configuration docs](docs/CONFIGURATION.md).

Once your `.env` file has been configured, you can run the server by using with:

```bash
npm run dev
```

This will start the server with nodemon and the `NODE_ENV=development`.

## Usage

By default, this server accepts two primary routes:

```bash
http://{domain}/chat/callback
http://{domain}/desk/callback
```

There is an optional route for specific functionality created for direct fulfilment requests from Dialogflow
```bash
http://{domain}/dialogflow/fulfillment
```

## Customization

#### Desk
Desk has two specific use cases that need to be configured for when a conversation is complete. It needs to either close the ticket, or route to an agent. This is done by configuring the specific behavior by Dialogflow Intent DisplayName. (This could also be done by Intend Id, but this is a little clearer and more self documenting for testing and demo use.
For production use the Intent Id might be better, as it will remain static even if the DisplayName is changed. However, it isn't clear if the IntentId is retained if duplicated or exported/imported - that may require reconfiguration of the IntentIds.

Update Intents that trigger closing tickets or route to an agent
Edit the /routes/desk/desk.js file to include case statements for each of the Intents, specifying the DisplayName.

Write code for any custom fulfilment triggers. The example included updates a customer field in Desk with a new address.

#### Core Chat
To Do - Not yet tested

## License

[MIT](https://choosealicense.com/licenses/mit/)
