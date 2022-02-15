<template>
  <Navbar />
  <div class="mt-5 pt-5">
      <router-view />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, provide, ref } from '@vue/runtime-core'
import { items } from './products.json';
import { Product } from './components/types/Product';
import Navbar from './components/layouts/Navbar.vue';

const components = defineComponent({
  components:{
    Navbar
  }
});

const products = ref<Product[]>(items.map((item) => ({...item, init_quantity : 0})));

provide('products', products);

</script>

