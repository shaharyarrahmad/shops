<template>
  <Layout>
    <template #content>

      <h1>{{ $context.terms.title }}</h1>

      <div v-html="$context.terms.text"></div>

<!--

        <h3 class="title is-4">Shipping and costs</h3>

      <p>
        The purchased item will be shipped as soon as possible, after we received a verification of the payment.
        If ordering more than one item, it is possible that they will arrive in separate packages.
      </p>
      <br/>
      <p>
        The shipping costs vary per product and destination address and will be displayed during checkout.
      </p>

      <br/>
      <br/>
      <p>All items will be shipped with insurance and track &amp; trace.</p>

      <h3 class="title is-4">Clothing</h3>>
</span>When you want to purchase a piece of clothing make sure to use the size guide located above the sizes menu. Since
          we print on demand we do not accept returns or exchanges.</p>
        <div class="panel">
          <p><span style="color: inherit; font-size: 1em; font-weight: 600;">Returns<br />
</span><span style="font-size: inherit;">The order of any item is unconditional and irrevocable and can not be returned/exchanged.</span>
          </p>
        </div>
        <div class="panel">
          <p><span style="color: inherit; font-size: 1em; font-weight: 600;">Edition<br />
</span><span style="font-size: inherit;">Prints will be sold randomly. It is not possible to choose a number of the edition. Print sales will be limited to a maximum quantity of 1 piece per order.<br />
All works are unique and/or are made in a limited edition. </span><span style="font-size: inherit;">Once they are sold out, they cannot be re-ordered. </span>
          </p>
        </div>
        <div class="panel">
          <p><span style="color: inherit; font-size: 1em; font-weight: 600;">Oversale<br />
</span><span style="font-size: inherit;">In some cases, it might happen that your order is accepted, while the item offered is already sold out.<br />
</span><span style="font-size: inherit;">This so-called &#8220;Oversale&#8221; can sometimes occur during busy sales, due to a delay in the payment information provided </span><span
            style="font-size: inherit;">by Paypal or Mollie<br />
or due to unforeseen technical errors in the website. </span><span style="font-size: inherit;">When this happens the concerned item is not purchased and we will refund the paid amount<br />
as soon as possible. Y</span><span style="font-size: inherit;">ou will be notified via the email address provided at checkout.</span>
          </p>
        </div>
        <div class="panel">
          <p><span style="color: inherit; font-size: 1em; font-weight: 600;">Certificate<br />
</span><span style="font-size: inherit;">The invoice will function as a certificate of authenticity and will be included with each print sold.</span>
          </p>
        </div>
        <div class="panel">
          <p><span style="color: inherit; font-size: 1em; font-weight: 600;">Questions<br />
</span><span style="font-size: inherit;">If you have any other questions or need any other information, please contact us via webshop@super-a.nl.</span>
          </p>

          <p>For any inquiries please send an email to :</p>
          <a :href="`mailto:${$context.global.email_adressen[0]}`">{{ $context.global.email_adressen[0] }}</a>
          <br />
          <br />
          <p>For any question regarding the webshop, please send an email to :</p>
          <a :href="`mailto:${$context.global.email_adressen[1]}`">{{ $context.global.email_adressen[1] }}</a>
          <br />
-->
    </template>
  </Layout>
</template>