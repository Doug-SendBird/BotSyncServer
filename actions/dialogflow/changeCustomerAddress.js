const { desk } = require('../../utils/axios');

const changeCustomerAddress = (customer, address) => {
  return new Promise((resolve, reject) => {
    try {
      const data = {
        customFields: `{\"accountnum\":\"${address}\"}`, //this updates a custom field names "accountnum"; this must match a field in your Desk app.
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
