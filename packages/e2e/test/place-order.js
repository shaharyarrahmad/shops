const { add } = require('husky');
require('dotenv').config();
let orderId;
const demoSite = 'https://pinelab-demo.netlify.app';
const address = {
  firstName: 'Martijn',
  lastName: 'Pinelab',
  phone: '06 123456788',
  email: 'martijn@pinelab.studio',
  postalCode: '1013 MM',
  houseNr: '159',
  street: 'IJdok',
  city: 'Amsterdam',
  country: 'Nederland'
};
const prices = {
  itemFE: '67,50',
  shippingOutsideEU: '14,-',
  totalOutsideEU: '81,50',
  shippingFE: '5,-',
  totalFE: '72,50',
  itemBE: '67.50',
  itemWithoutTaxBE: '61.93',
  shippingWithoutTaxBE: '4.59',
  totalBE: '72.50',
  totalWithoutTaxBE: '66.52',
  tax: '9%',
}

module.exports = {
  'Customer checkout': function(browser) {
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
      submit: 'button[type="submit"]'
    };
    const ideal = 'button[value="ideal"]';
    const ing = 'button[value="ideal_INGBNL2A"]';
    const paid = 'input[value="paid"]';
    const continueBtn = 'button[class="button form__button"]';
    const success = 'table[class="table is-fullwidth"]';
    browser
      .url(demoSite)
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
      .setValue(customerForm.firstname, address.firstName)
      .setValue(customerForm.lastname, address.lastName)
      .setValue(customerForm.phone, address.phone)
      .setValue(customerForm.email, address.email)
      .setValue(customerForm.postalCode, address.postalCode)
      .setValue(customerForm.houseNr, address.houseNr)
      .assert.value(customerForm.city, address.city)
      .assert.value(customerForm.street, address.street)
      .click('select[name="country"] option[value="AT"]')
      .click(customerForm.submit)
      // Shipping
      .pause(500)
      .assert.containsText('body', 'Betaling')
      .useXpath().click("//*[contains(text(), 'Verzenden (€14,-)')]")
      .useCss()
      .assert.containsText('body', prices.totalOutsideEU)
      // Back to customer details
      .click('div > div > div > div:nth-child(1) > a')
      .waitForElementVisible(customerForm.firstname)
      .pause(500)
      .click('select[name="country"] option[value="nl"]')
      .click(customerForm.submit)
      .pause(1000)
      // Shipping
      .useXpath().click("//*[contains(text(), 'Verzenden (€5,-)')]")
      .useCss()
      .assert.containsText('body', prices.totalFE)
      // Payment
      .click('button[type="button"]')
      .waitForElementVisible(ideal)
      .click(ideal)
      .waitForElementVisible(ing)
      .click(ing)
      .waitForElementVisible(paid)
      .click(paid)
      .click(continueBtn)
      .waitForElementVisible(success)
      .url(({ value }) => {
        orderId = value.replace(`${demoSite}/order/`, '');
      })
      .assert.containsText('body', prices.itemFE)
      .assert.containsText('body', prices.shippingFE)
      .assert.containsText('body', prices.totalFE)
      .end();
  },
  'Admin order': function(browser) {
    const username = 'input[id="login_username"]';
    const password = 'input[id="login_password"]';
    const orderTab = 'a[data-item-id="sales"]';
    const submit = 'button[type="submit"]';
    browser
      .url('https://test-api.pinelab.studio/admin/')
      .waitForElementVisible(username)
      .setValue(username, process.env.VENDURE_USERNAME)
      .setValue(password, process.env.VENDURE_PASSWORD)
      .click(submit)
      .waitForElementVisible(orderTab)
      .click(orderTab)
      .assert.containsText('body', orderId)
      .useXpath()
      .click('//a[text()=\' Open \']')
      .useCss()
      .assert.containsText('body', address.firstName)
      .assert.containsText('body', address.lastName)
      .assert.containsText('body', address.city)
      .assert.containsText('body', address.postalCode)
      .assert.containsText('body', address.street)
      .assert.containsText('body', address.houseNr)
      .assert.containsText('body', address.country)
      .assert.containsText('body', address.phone)
      .assert.containsText('body', prices.itemBE)
      .assert.not.containsText('body', '21%')
      .assert.containsText('body', prices.itemWithoutTaxBE)
      .assert.containsText('body', prices.shippingWithoutTaxBE)
      .assert.containsText('body', prices.totalBE)
      .assert.containsText('body', prices.totalWithoutTaxBE)
      .useXpath()
      .click('//button[text()=\' Fulfill order \']')
      .useCss()
      .click('button[type="submit"]')
      .assert.containsText('body', 'Created fulfillment')
      .end();
  }
};
