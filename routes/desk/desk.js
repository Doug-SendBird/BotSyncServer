const express = require('express');
const router = express.Router();
const { desk } = require('../../utils/axios');
const sendToDialogFlow = require('../../utils/sendToDialogFlow');
const closeTicket = require('./closeTicket');
const transferToAgent = require('./transferToAgent');

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
 * @route       POST desk/callback
 * @description Callback webhook for Sendbird Desk
 */
router.post('/callback', async (req, res) => {
  try {
    const { botWebhookEvent, ticket } = req.body;
    const ticketId = botWebhookEvent.chatMessage.ticket;
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

          const messageText = response[0].queryResult.fulfillmentText;
          // Send DialogFlow response to Sendbird
          postToSendbird(
            botWebhookEvent.id,
            botWebhookEvent.bot,
            messageText
          )
            .then(() => {
              //const IntentName = response[0].queryResult.intent.name.replace(
              //  `projects/${process.env.GCLOUD_PROJECT_ID}/agent/intents/`,
              //  ''
              //);
              //console.log(IntentName);
              const IntentName = response[0].queryResult.intent.displayName;
              console.log(IntentName);
              switch (IntentName) {
                case 'Close ticket': //'7aeeafe4-1d17-494c-bc61-1bf639b38ab0': //Close ticket
                    closeTicket(ticketId).then((response) => {
                      if (response.status === 200) {
                        res.sendStatus(200);
                      } else {
                        res.sendStatus(500);
                      }
                    });
                    break;
                case 'Previous Service (Pass to agent)': //'a1c9d93c-b1f5-4f8c-91ce-d8cbeabc2a23': //Previous Service (Pass to agent)
                case 'Request for Live Agent': //'877f00a3-e990-42a3-a102-72f8e26cce4f': //Request for Live Agent
                    transferToAgent(ticketId).then((response) => {
                      if (response.status === 200) {
                        res.sendStatus(200);
                      } else {
                        res.sendStatus(500);
                      }
                    });
                    break;
                default:
                  // Not an ending intent
                  res.sendStatus(200);
              }
            })
            .catch((err) => {
              console.log("Error posting to Sendbird");
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
