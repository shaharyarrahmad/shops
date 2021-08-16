module.exports = {
  beforeEach: function (browser, done) {
    browser.resizeWindow(414, 1200, done);
  },

  'Pinelab shop - order': function (browser) {
    const theJaunt = 'img[alt="The Jaunt"]';
    const edition = 'button[aria-label="Edition Laura Berger"]';
    const buyButton = 'button[aria-label="In winkelmand"]';
    const checkoutSnackbar =
      'body > div.notices.is-top > div > div.action.is-light > button';
    const orderNowButton =
      '#app > div.container.is-widescreen.section > div > div > div:nth-child(6) > a';
    const customerForm = {
      firstname: 'input[placeholder="Voornaam*"]',
      lastname: 'input[placeholder="Achternaam*"]',
      phone: 'input[placeholder="Telefoonnr."]',
      email: 'input[placeholder="Email*"]',
      postalCode: 'input[placeholder="Postcode*"]',
      houseNr: 'input[placeholder="Huisnr.*"]',
      street: 'input[placeholder="Straatnaam*"]',
      city: 'input[placeholder="Plaats*"]',
      submit: 'button[type="submit"]',
    };
    const ideal = 'button[value="ideal"]';
    const ing = 'button[value="ideal_INGBNL2A"]';
    const paid = 'input[value="paid"]';
    const continueBtn = 'button[class="button form__button"]';
    const success = 'table[class="table is-fullwidth"]';
    browser
      .url('https://pinelab-customlayout.netlify.app/')
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
      .pause(1000)
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
      .end();
  },
};
