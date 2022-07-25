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
      .url('https://cantastic.netlify.app/product/loop-colors-400ml/')
      .useXpath()
      .click("//span[contains(text(), 'Nee')]")
      .click(
        '/html/body/div[1]/div/div/div/div[3]/div[1]/div[6]/div/div[2]/div/p[2]/button/span/i'
      )
      .pause(500)
      .click('//*[@id="icons"]/div/span[1]/a/i')
      .pause(500)
      .end();
  },
};
