# Sendbird BotSyncServer

BotSyncServer is a middleman server that helps connect chat bot services, such as Google DialogFlow, with Sendbird chat.

## Installation

Clone the repository to your local machine and install dependancies

```bash
npm install
```

## Usage

In order to utilize this repository, you'll need to create a `.env` file in the root directory, and fill it with the following:

```bash
# Express
PORT=5500

# DialogFlow
GCLOUD_PROJECT_ID=
GCLOUD_CLIENT_SECRET=

# Sendbird Chat
SB_CHAT_APP_ID=
SB_CHAT_API_TOKEN=

# Sendbird Desk
SB_DESK_APP_ID=
SB_DESK_API_TOKEN=

```

## License

[MIT](https://choosealicense.com/licenses/mit/)
