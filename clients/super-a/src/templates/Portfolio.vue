<template>
  <Layout>
    <template #content>
      <h1 class="title">{{ $context.data.portfolio.title }}</h1>

      <p>Work in progress</p>
      <br/>
      <br/>

      <div v-for="page in $context.data.portfolio.subpages">
        <a :href="page.slug">{{ page.title }}</a>
      </div>
    </template>
  </Layout>
</template>
<script>

export default {
};
</script>
