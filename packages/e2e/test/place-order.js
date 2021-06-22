module.exports = {
  beforeEach: function (browser, done) {
    browser.resizeWindow(414, 736, done);
  },

  "Pinelab shop - order": function (browser) {
    const buyButton =
      "#featured-products > div > div:nth-child(2) > div > button";
    const checkoutSnackbar =
      "body > div.notices.is-top > div > div.action.is-light > button";
    const orderNowButton =
      "#app > div.container.is-widescreen.section > div > div > div:nth-child(6) > a";
    const customerForm = {
      firstname: 'input[placeholder="Firstname*"]',
      lastname: 'input[placeholder="Lastname*"]',
      phone: 'input[placeholder="Phonenumber"]',
      email: 'input[placeholder="Emailaddress*"]',
      postalCode: 'input[placeholder="Postalcode*"]',
      houseNr: 'input[placeholder="HouseNr*"]',
      street: 'input[placeholder="Street*"]',
      city: 'input[placeholder="City*"]',
      selectNl: 'select[name="country"] option[value=nl]',
      selectDe: 'select[name="country"] option[value=de]',
      submit: 'button[type="submit"]',
    };
    browser
      .url("https://pinelab-customlayout.netlify.app/")
      .waitForElementVisible(buyButton)
      .click(buyButton)
      .waitForElementVisible(checkoutSnackbar)
      .click(checkoutSnackbar)
      .waitForElementVisible(orderNowButton)
      .click(orderNowButton)
      .waitForElementVisible(customerForm.firstname)
      .pause(500)
      .setValue(customerForm.firstname, "Martinho")
      .setValue(customerForm.lastname, "Bruggio")
      .setValue(customerForm.phone, "06 123456788")
      .setValue(customerForm.email, "martijn@pinelab.studio")
      .setValue(customerForm.postalCode, "1013 MM")
      .setValue(customerForm.houseNr, "159")
      .pause(3000)
      .assert.value(customerForm.city, "Amsterdam")
      .assert.value(customerForm.street, "IJdok")
      .click(customerForm.selectDe)
      .pause(1000)
      .click(customerForm.selectNl)
      .pause(1000)
      .click(customerForm.submit)
      .pause(5000)
      .end();
  },
};
