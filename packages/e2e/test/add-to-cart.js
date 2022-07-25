/**
 * This test verifies if adding items to cart still works.
 * Adds item to cart, adds address, goes to Mollie without actually paying
 * Run specific case with `TESTCASE=cantastic yarn test:add-to-cart`
 */
let orderId;
const address = {
  firstName: 'Martijn',
  lastName: 'Pinelab',
  phone: '06 123456788',
  email: 'martijn@pinelab.studio',
  postalCode: '1013 MM',
  houseNr: '159',
  street: 'IJdok',
  city: 'Amsterdam',
  country: 'Nederland',
};

// Cantastic

module.exports = {
  cantastic: function (browser) {
    browser
      .url('https://cantastic.netlify.app/')
      .useXpath()
      .click("//h4[contains(text(), 'Spray paint & caps')]")
      .end();
  },
};
