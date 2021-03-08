const dialogflow = require('@google-cloud/dialogflow');
const { v4: uuidv4 } = require('uuid');

const sendToDialogFlow = (message, username, contexts) => {
  return new Promise((resolve, reject) => {
    try {
      const sessionId = uuidv4();
      const sessionClient = new dialogflow.SessionsClient({
        projectId: process.env.GCLOUD_PROJECT_ID,
        credentials: {
          client_email: process.env.GCLOUD_CLIENT_EMAIL,
          private_key: process.env.GCLOUD_PRIVATE_KEY,
        },
      });
      const sessionPath = sessionClient.projectAgentSessionPath(
        process.env.GCLOUD_PROJECT_ID,
        sessionId
      );

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode: 'en-US',
          },
        },
        queryParams: {
          payload: {
            fields: {
              username: {
                stringValue: username,
                kind: 'stringValue',
              },
            },
          },
        },
      };

      if (contexts && contexts.length > 0) {
        request.queryParams.contexts = contexts;
      }
      sessionClient.detectIntent(request).then((response) => {
        resolve(response);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = sendToDialogFlow;
