const { desk } = require('../../utils/axios');

const closeTicket = (ticketId) => {
  return new Promise((resolve, reject) => {
    try {
      desk
        .patch(`tickets/${ticketId}/close`, {})
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

module.exports = closeTicket;
