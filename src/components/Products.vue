<template>
  <div class="row">
    <product-filters @filters="filters" />
    <div class="col-3 pb-4" v-for="item in filteredProducts" :key="item.id">
      <div class="card shadow">
        <img
          :src="item.img"
          class="card-img-top"
          :alt="item.title"
          style="max-height: 300px"
        />
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">
            {{ item.description }}
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item fw-bold text-danger">
            {{ item.discount }} Discount
          </li>
          <li class="list-group-item fw-bold text-dark">
            Price: {{ item.fixed_price }}
            <small
              class="text-decoration-line-through text-danger fw-bold"
              style="opacity: 0.9"
              >{{ item.less_price }}</small
            >
            ({{ item.currency }})
          </li>
          <li class="list-group-item">
            <span
              class="fw-bold fs-5"
              :class="currentQuan(item) >= 10 ? 'text-success' : 'text-danger'"
              >{{ currentQuan(item) }}</span
            >
            items are remaining
          </li>
        </ul>
        <div class="card-body">
          <button
            class="btn btn-secondary w-100 text-uppercase"
            v-if="item.init_quantity == 0"
            :disabled="item.quantity == 0"
            @click="addItemToCart(item)"
          >
            {{ item.quantity > 0 ? "Add to cart" : "Out of stock" }}
          </button>
          <div class="d-flex" v-else>
            <button
              class="btn btn-secondary btn-sm"
              @click="
                item.init_quantity > 1
                  ? item.init_quantity--
                  : removeItemFromCart(item)
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-dash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                />
              </svg>
            </button>
            <div
              class="
                bg-secondary
                text-white text-center
                flex-fill
                py-2
                mx-1
                rounded
              "
            >
              {{ item.init_quantity }}
            </div>
            <button
              class="btn btn-secondary btn-sm"
              @click="item.init_quantity++"
              :disabled="item.quantity == item.init_quantity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row" v-if="filteredProducts?.length == 0">
    <div class="col-12 text-center py-5">
      <h2 class="text-danger">No Match Found</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, reactive, Ref, ref, watch } from "@vue/runtime-core";
import { myFilters, Product } from "./types/Product";
import { useStore } from "vuex";
import ProductFilters from "./custom-components/ProductFilters.vue";
import { useRouter, useRoute } from "vue-router";

const store = useStore();

const router = useRouter();
const route = useRoute();

const products = ref(inject<Product[]>("products"));

const allFilters = ref<myFilters>({
  search: "",
  brand: "",
  price: 0,
});

const addItemToCart = (item: Product) => {
  store.commit("addItemInCart", item);
  item.init_quantity++;
};

const filters = (data: myFilters) => {
  let gettedFilters = {
    search: data.search,
    brand: data.brand,
    price: data.price,
  };
  allFilters.value = gettedFilters;
};

watch(allFilters, (val) => {
  let queries: myFilters | any = {};
  for (const [key, value] of Object.entries(val)) {
    if (value) {
      queries[key] = value;
    } else {
      if (queries.hasOwnProperty(key)) {
        delete queries[key];
      }
    }
  }
  router.replace({
    query: {
      ...queries,
    },
  });
});

const filteredProducts = computed(() => {
  return products.value?.filter((product) => {
    return (
      product.title
        .toLocaleLowerCase()
        .trim()
        .includes(allFilters.value.search.toLocaleLowerCase().trim()) &&
      (allFilters.value.brand
        ? product.brand === allFilters.value.brand
        : true) &&
      (allFilters.value.price
        ? allFilters.value.price >= product.fixed_price
        : true)
    );
  });
});

const removeItemFromCart = (item: Product) => {
  item.init_quantity--;
  store.commit("removeItemInCart", item);
};

const currentQuan = (item: Product): number => {
  return item.quantity - item.init_quantity;
};
</script>

<style scoped>
*[disabled] {
  cursor: not-allowed;
}
</style>>