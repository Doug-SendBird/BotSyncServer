const { desk } = require('../../utils/axios');

const transferToAgent = (ticketId) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('really truly about to transfer ticket');
      desk
        .patch(`tickets/${ticketId}/cancel`, {})
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = transferToAgent;
