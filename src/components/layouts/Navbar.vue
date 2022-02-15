<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light py-3 fixed-top">
    <div class="container">
      <router-link :to="{name : 'products'}" class="navbar-brand">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="32"
          class="d-block my-1"
          viewBox="0 0 118 94"
          role="img"
          style="user-select: auto"
        >
          <title style="user-select: auto">Bootstrap</title>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
            fill="currentColor"
            style="user-select: auto"
          ></path>
        </svg>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{name : 'products'}" class="nav-link active" aria-current="page">Home</router-link>
          </li>
        </ul>
      </div>

      <div class="ms-auto">
        <button class="btn rounded-circle shadow btn-light btn-lg position-relative" @click="cartShow = !cartShow" v-if="route.name != 'checkout'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-bag align-baseline"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
            />
          </svg>
          <span
            class="
              position-absolute
              top-0
              start-100
              translate-middle
              badge
              rounded-pill
              bg-secondary
            "
          >
            {{ store.state.carted_items.length }}
          </span>
        </button>
      </div>
    </div>
  </nav>

  <side-cart :show="cartShow" @hideCart="cartShow = false" />
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { defineComponent } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import SideCart from '../custom-components/SideCart.vue';

const components = defineComponent({
  SideCart,
})

const store = useStore();
const route = useRoute();

const cartShow = ref(false);


</script>