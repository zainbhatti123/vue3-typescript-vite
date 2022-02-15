<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center pt-5">
        <h1 class="mb-5">Products</h1>
      </div>
    </div>
    <Product />
  </div>
</template>


<script setup lang="ts">
import { defineAsyncComponent } from '@vue/runtime-core';
import LoadingComponent from './loading/ProductLoading.vue';
import ErrorComponent from './error/ProductsError.vue';

const Product = defineAsyncComponent({
  loader : () => import('./Products.vue'),
  loadingComponent : LoadingComponent,
  errorComponent: ErrorComponent,
  timeout: 4000,
})

</script>
