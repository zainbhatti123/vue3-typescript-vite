<template>
    <table class="table table-stripped mt-4 mx-auto text-start bg-white">
      <thead>
        <th scope="" class="p-3">Title</th>
        <th scope="" class="p-3">Actual Price/qty</th>
        <th scope="" class="p-3">Unit Price/qty</th>
        <th scope="" class="p-3">Quantity</th>
        <th scope="" class="p-3">Unit Price</th>
        <th scope="" class="p-3">Discount</th>
        <th scope="" class="p-3">Total Price</th>
      </thead>
      <tbody v-if="products.length > 0">
          <tr v-for="item in products" :key="item.id">
            <td class="p-3">{{item.title}}</td>
            <td class="p-3">{{formated_price(item.less_price)}}</td>
            <td class="p-3">{{formated_price(item.fixed_price)}}</td>
            <td class="p-3">{{item.init_quantity}}</td>
            <td class="p-3">{{formated_price(item.init_quantity * item.less_price)}}</td>
            <td class="p-3">{{item.discount}}</td>
            <td class="p-3">{{formated_price(item.fixed_price * item.init_quantity)}}</td>
          </tr>
          <tr>
              <td colspan="7" class="text-end py-4 fs-5 pe-5">
                  Payable Price : <span class="fw-bold">{{formated_price(total_price)}} ({{products[0].currency}})</span>
              </td>
          </tr>
      </tbody>
      <tbody v-else>
          <tr>
              <td colspan="7" class="text-center p-5 text-danger text-uppercase fs-4 fw-bold">
                  items not found
              </td>
          </tr>
      </tbody>
    </table>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "@vue/runtime-core";
import { Product } from "../types/Product";
import { useStore } from "vuex";

const store = useStore();
const products = ref<Product[]>([]);

onMounted(() => {
    products.value = store.state.carted_items;
})

const formated_price = (price : number) => {
    return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

const total_price = computed(() => {
    return products.value.reduce((total , item) => {
        return total + item.init_quantity * item.fixed_price;
    }, 0)
})
</script>