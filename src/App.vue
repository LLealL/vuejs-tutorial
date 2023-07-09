<template>
  <Navbar />
  <div class="container mx-auto mt-8">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
</style>