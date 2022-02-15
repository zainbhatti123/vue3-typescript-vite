<template>
  <div class="container">
    <div class="row">
      <div class="col-9 mx-auto">
        <h3 class="mt-4 text-center">Your Order</h3>
        <cart-table />

        <h3 class="my-3 pt-3">Payment Method</h3>

        <div class="bg-white p-5">
            <div class="row">
                <div class="col-6">
                    <input type="radio" class="form-check-input me-3" name="payment" value="credit" id="pay-by-credit" v-model="payment">
                    <label for="pay-by-credit">Credit Cart</label>
                </div>
                <div class="col-6">
                    <input type="radio" class="form-check-input me-3" name="payment" value="cash" id="pay-by-cash" v-model="payment">
                    <label for="pay-by-cash">Cash on delivery</label>
                </div>
            </div>
            <div class="row mt-5" v-if="payment == 'credit'">
                <div class="col-6">
                    <input type="tel" name="card-number" class="form-control" placeholder="Card Number">
                </div>
                <div class="col-6 d-flex">
                    <input type="date" name="exp-date" class="form-control me-3" placeholder="Exp date">
                    <input type="number" name="cvv" class="form-control ms-3" placeholder="CVV">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 py-5 text-end">
                <button class="btn btn-secondary rounded px-5 py-2" :disabled="products.length == 0">
                    <router-link to="/congratulations" class="text-white text-decoration-none">
                        Complete Order
                    </router-link>
                </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import CartTable from "./custom-components/CartTable.vue";
import { useStore } from "vuex";
import { Product } from "./types/Product";

const payment = ref<string>("credit");

const store = useStore();

const products = ref<Product[]>([]);

onMounted(() => {
    products.value = store.state.carted_items;
})
const components = defineComponent({
  CartTable,
});
</script>

