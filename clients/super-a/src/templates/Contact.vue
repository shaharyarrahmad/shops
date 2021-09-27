<template>
  <Layout>
    <template #content>
      <h1 class="title">Contact</h1>

      <p>For any inquiries please send an email to :</p>
      <a :href="`mailto:${$context.global.email_adressen[0]}`">{{ $context.global.email_adressen[0] }}</a>
      <br />
      <br />
      <p>For any question regarding the webshop, please send an email to :</p>
      <a :href="`mailto:${$context.global.email_adressen[1]}`">{{ $context.global.email_adressen[1] }}</a>
      <br />

    </template>
  </Layout>
</template>
<script>
export default {};
</script>
