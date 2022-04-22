<template>
  <DefaultLayout>
    <template #content>
      <section :id="$context.collection.slug" class="content">
        <h1>{{ $context.collection.name }}</h1>
        <div
          v-if="$context.collection.description"
          v-html="$context.collection.description"
          class="collapsed"
        ></div>

        <template v-if="$context.collections">
          <!------------------- Subcollection page ------------------->
        </template>
        <template v-else>
          <!------------------ Product listing ----------------------->
          Product listing
          {{ $context.products }}
        </template>
      </section>
    </template>
  </DefaultLayout>
</template>
<script>
export default {};
</script>
<style>
.collapsed {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
