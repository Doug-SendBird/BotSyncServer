const express = require('express');
const router = express.Router();
const changeCustomerAddress = require('../../actions/dialogflow/changeCustomerAddress');

/**
 * @route       POST desk/callback
 * @description Callback webhook for Sendbird Desk
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
        console.log('ADDRESS', address);
        console.log('CUSTOMER', customer);
        res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
