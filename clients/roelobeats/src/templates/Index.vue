<template>
  <div>
   <AppHeader />
   <Highlighted />
   <AppFooter />

  </div>
 </template>


<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import Highlighted from '@/components/Highlighted.vue';


export default {
  components: {
    AppHeader,
    AppFooter,
    Highlighted,
  },
};
</script>
