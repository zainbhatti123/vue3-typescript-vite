<template>
  <div v-if="show" class="side-cart position-fixed bg-white shadow text-center">
    <div v-if="items.length > 0">
      <h2 class="pt-5 pb-2 text-uppercase d-inline-block">Cart</h2>
      <small class="text-capitalize fw-bold text-danger"
        >(total item : {{ items.length }})</small
      >

      <div
        v-for="(item, index) in items"
        :key="index"
        class="mb-3 border-bottom py-4 px-3"
      >
        <div class="row align-items-center">
          <div class="col-2">
            <img :src="item.img" alt="" class="img-fluid" />
          </div>
          <div class="col-3 ps-3 d-flex align-items-center">
            <div class="small fw-bold text-dark">
              {{ item.title }}
            </div>
          </div>
          <div class="col-3">
            <div class="d-flex w-100">
              <button
                @click="
                  item.init_quantity > 1
                    ? item.init_quantity--
                    : removeItem(item)
                "
                class="btn btn-sm btn-secondary px-2 rounded-0 rounded"
              >
                -
              </button>
              <div class="bg-secondary text-white text-center w-100 mx-1 px-2 d-flex align-items-center justify-content-center">
                {{ item.init_quantity }}
              </div>
              <button
                :disable="item.quantity == item.init_quantity"
                @click="item.init_quantity++"
                class="btn btn-sm btn-secondary py-0 rounded-0 px-2"
                :disabled="item.init_quantity == item.quantity"
              >
                +
              </button>
            </div>
          </div>
          <div class="col-4 text-right text-dark d-flex justify-content-between">
            {{
              formatted_price(item.init_quantity * item.fixed_price)
            }}
            {{ item.currency }}
            <button
              class="btn ms-3 rounded-circle btn-danger btn-sm fw-bold"
              @click="removeFromCart(item)"
              data-bs-tooltip="tooltip"
              title="Remove"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                />
                <path
                  fill-rule="evenodd"
                  d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="text-end fw-bold fs-5 pb-5 px-4">
          Total :{{formatted_price(total_price)}} {{items[0].currency}}
          <router-link to="/checkout" class="btn w-100 rounded-pill btn-secondary py-3 mt-5 fw-bold" @click="emit('hideCart')">Checkout</router-link>
      </div>
    </div>
    <div v-else>
      <h1 class="text-danger d-flex align-items-center justify-content-center" style="height: calc(100vh - 8px);">Cart is empty</h1>
    </div>
  </div>
  <div class="overlay" v-if="show" @click="emit('hideCart')"></div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { Product } from "../types/Product";

const store = useStore();
const props = defineProps<{ show: boolean }>();
const emit = defineEmits(['hideCart']);

const items = ref<Product[]>([]);
onMounted(() => {
  items.value = store.getters.getItems;
});

const formatted_price = (price : number) => {
  return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

const removeItem = (item: Product) => {
  store.commit("removeItemInCart", item);
  item.init_quantity--;
};

const removeFromCart = (item: Product) => {
  item.init_quantity = 0;
  store.commit("removeItemInCart", item);
};

const total_price = computed(() => {
  return items.value
    .reduce((total, item) => {
      let price = total + (item.fixed_price * item.init_quantity);
      return price;
    }, 0)
});
</script>

<style scoped>
.side-cart {
  right: 0;
  top: 0;
  bottom: 0;
  width: 600px;
  z-index: 1031;
  height: 100vh;
  overflow: auto;
}
.overlay{
  inset: 0;
  z-index: 1030;
  position: fixed;
  background-color: rgba(0, 0, 0, .4)
}
</style>