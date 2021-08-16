const express = require('express');
const router = express.Router();
const changeCustomerAddress = require('../../actions/dialogflow/changeCustomerAddress');

/**
 * @route       POST dialogflow/fullfilment
 * @description Processes fullfilment webhooks from Google Dialogflow
 */
router.post('/fulfillment', async (req, res) => {
  try {
    //const intentName = req.body.queryResult.intent.name.replace(
    //  `projects/${process.env.GCLOUD_PROJECT_ID}/agent/intents/`,
    //  ''
    //);
    const intentName = req.body.queryResult.intent.displayName;
    switch (intentName) {
      case 'Address change': //'065d2e70-f191-49e0-a20d-ddef08d03571':
        const address = req.body.queryResult.parameters.address;
        const customer = req.body.originalDetectIntentRequest.payload.username;
        changeCustomerAddress(customer, address).then((response) => {
          if (response.status === 200) {
            res.sendStatus(200);
          } else {
            res.sendStatus(500);
          }
        });
        break;

      default:
        res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
