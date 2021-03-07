const express = require('express');
const router = express.Router();
const changeCustomerAddress = require('../../actions/dialogflow/changeCustomerAddress');

/**
 * @route       POST dialogflow/fullfilment
 * @description Processes fullfilment webhooks from Google Dialogflow
 */
router.post('/fullfilment', async (req, res) => {
  try {
    const intentName = req.body.queryResult.intent.name.replace(
      `projects/${process.env.GCLOUD_PROJECT_ID}/agent/intents/`,
      ''
    );

    switch (intentName) {
      case '5dca1ef6-64f0-44bc-9545-ae4df756be93':
        const address = req.body.queryResult.parameters.address;
        const customer = req.body.originalDetectIntentRequest.payload.username;
        changeCustomerAddress(customer, address).then((response) => {
          if (response.status === 200) {
            res.sendStatus(200);
          } else {
            res.sendStatus(500);
          }
        });

      default:
        res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
