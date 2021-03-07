const express = require('express');
const router = express.Router();
const { desk } = require('../../utils/axios');
const sendToDialogFlow = require('../../utils/sendToDialogFlow');

// Define user contexts object. Allows us to track conversations in DialogFlow
let userContexts = {};

const postToSendbird = (botWebhookEventId, botId, message) => {
  return new Promise((resolve, reject) => {
    try {
      const data = {
        message,
        botWebhookEventId,
      };
      desk
        .post(`/bots/${botId}/send_message`, data)
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
 * @route       POST desk/callback
 * @description Callback webhook for Sendbird Desk
 */
router.post('/callback', async (req, res) => {
  try {
    const { botWebhookEvent, ticket } = req.body;
    if (botWebhookEvent && ticket) {
      // Send Sendbird user message to DialogFlow
      sendToDialogFlow(
        botWebhookEvent.chatMessage.message,
        ticket.customer.id,
        userContexts[ticket.customer.id]
      )
        .then((response) => {
          if (response[0].queryResult.outputContexts) {
            userContexts[ticket.customer.id] = response[0].queryResult.outputContexts;
          }

          // Send DialogFlow response to Sendbird
          postToSendbird(
            botWebhookEvent.id,
            botWebhookEvent.bot,
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
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
