const { desk } = require('../../utils/axios');

const changeCustomerAddress = (customer, address) => {
  return new Promise((resolve, reject) => {
    try {
      const data = {
        customFields: `{\"accountnum\":\"${address}\"}`,
      };
      desk
        .patch(`/customers/${customer}/custom_fields`, data)
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

module.exports = changeCustomerAddress;
