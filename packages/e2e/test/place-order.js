module.exports = {
  beforeEach: function (browser, done) {
    browser.resizeWindow(414, 1200, done);
  },

  'Pinelab shop - order': function (browser) {
    const menu = 'a[aria-label="menu"]';
    const shop = 'a[href="/shop/"]';
    const theJaunt = 'img[alt="The Jaunt"]';
    const edition = 'select option[value="16"]';
    const buyButton = 'button[type="button"]';
    const checkoutSnackbar =
      'body > div.notices.is-top > div > div.action.is-light > button';
    const orderNowButton =
      '#app > div.container.is-widescreen.section > div > div > div:nth-child(6) > a';
    const customerForm = {
      firstname: 'input[placeholder="Firstname*"]',
      lastname: 'input[placeholder="Lastname*"]',
      phone: 'input[placeholder="Phonenumber"]',
      email: 'input[placeholder="Emailaddress*"]',
      postalCode: 'input[placeholder="Postalcode*"]',
      houseNr: 'input[placeholder="HouseNr*"]',
      street: 'input[placeholder="Street*"]',
      city: 'input[placeholder="City*"]',
      submit: 'button[type="submit"]',
    };
    const ideal = 'button[value="ideal"]';
    const ing = 'button[value="ideal_INGBNL2A"]';
    const paid = 'input[value="paid"]';
    const continueBtn = 'button[class="button form__button"]';
    const success = 'table[class="table is-fullwidth"]';
    browser
      .url('https://pinelab-customlayout.netlify.app/')
      .waitForElementVisible(menu)
      .click(menu)
      .waitForElementVisible(shop)
      .click(shop)
      .waitForElementVisible(theJaunt)
      .click(theJaunt)
      .waitForElementVisible(edition)
      .click(edition)
      .click(buyButton)
      .waitForElementVisible(checkoutSnackbar)
      .click(checkoutSnackbar)
      .waitForElementVisible(orderNowButton)
      .click(orderNowButton)
      .waitForElementVisible(customerForm.firstname)
      .pause(500)
      .setValue(customerForm.firstname, 'Martinho')
      .setValue(customerForm.lastname, 'Bruggio')
      .setValue(customerForm.phone, '06 123456788')
      .setValue(customerForm.email, 'martijn@pinelab.studio')
      .setValue(customerForm.postalCode, '1013 MM')
      .setValue(customerForm.houseNr, '159')
      .pause(2000)
      .assert.value(customerForm.city, 'Amsterdam')
      .assert.value(customerForm.street, 'IJdok')
      .click(customerForm.submit)
      .pause(1000)
      .click('button[type="button"]')
      .waitForElementVisible(ideal)
      .click(ideal)
      .waitForElementVisible(ing)
      .click(ing)
      .waitForElementVisible(paid)
      .click(paid)
      .click(continueBtn)
      .waitForElementVisible(success)
      .pause(5000)
      .end();
  },
};
