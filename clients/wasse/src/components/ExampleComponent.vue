<template>
  <div>
    <h2>{{ title }}</h2>

    <slot />
  </div>
</template>
<script>
export default {
  props: ['title'],
};
</script>
