const express = require('express');
const router = express.Router();
const { chat } = require('../../utils/axios');
const sendToDialogFlow = require('../../utils/sendToDialogFlow');

// Define user contexts object. Allows us to track conversations in DialogFlow
let userContexts = {};

const postToSendbird = (channelUrl, botId, message) => {
  return new Promise((resolve, reject) => {
    try {
      const data = {
        message: message,
        channel_url: channelUrl,
      };

      chat
        .post(`/bots/${botId}/send`, data)
        .then((response) => {
          if (response.status === 200) {
            resolve();
          }
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @route       POST chat/callback
 * @description Callback webhook for Sendbird Chat
 */
router.post('/callback', async (req, res) => {
  try {
    const { message, bot, channel, sender } = req.body;
    if (message && bot && channel) {
      // Send Sendbird user message to DialogFlow
      sendToDialogFlow(message.text, sender.user_id, userContexts[sender.user_id])
        .then((response) => {
          if (response[0].queryResult.outputContexts) {
            userContexts[sender.user_id] = response[0].queryResult.outputContexts;
          }

          // Send DialogFlow response to Sendbird
          postToSendbird(
            channel.channel_url,
            bot.bot_userid,
            response[0].queryResult.fulfillmentText
          )
            .then(() => {
              res.sendStatus(200);
            })
            .catch((err) => {
              console.log(err.response.status);
              console.log(err.response.statusText);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
