<template>
    <div class="col-12 py-3">
        <div class="d-flex justify-content-between align-items-end">
            <div class="d-flex pe-3 w-100">
                <div class="pe-3" style="width: 25%">
                    <label for="brand" class="mb-2">Brand :</label>
                    <select name="brand" id="brand" class="form-control" v-model="brandProduct">
                        <option value="">Select</option>
                        <option v-for="item in brands" :key="item" :value="item">{{ item.split('')[0].toLocaleUpperCase() }}{{item.slice(1)}}</option>
                    </select>
                </div>
                 <div class="pe-3" style="width: 25%">
                    <label for="price" class="mb-2">Price :</label>
                    <select name="price" id="price" class="form-control" v-model="brandPrice">
                        <option value="">Select</option>
                        <option value="1000">1000</option>
                        <option value="2000">2000</option>
                        <option value="3000">3000</option>
                        <option value="4000">4000</option>
                        <option value="5000">5000</option>
                        <option value="6000">6000</option>
                        <option value="7000">7000</option>
                        <option value="8000">8000</option>
                        <option value="9000">9000</option>
                    </select>
                </div>
            </div>
            <div class="d-flex align-items-center w-25">
                <label for="search" class="text-nowrap">Search :</label>
                <input type="search" id="search" class="form-control ms-3" v-model="searchProduct">
            </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { computed, inject, onMounted, watchEffect } from "@vue/runtime-core";
import { myFilters, Product } from "../types/Product";

const searchProduct = ref<string>('');
const brandProduct = ref<string>('');
const brandPrice = ref<number>(0);

const products = ref(inject<Product[]>("products"));

const brands = computed(() => {
    let brandedArray : Array<string> = [];
    products.value?.filter((product) => {
        return brandedArray.push(product.brand);
    })
    return brandedArray.filter((brand , index) => brandedArray.indexOf(brand) === index)
})



const filters = computed(() => {
    let selectedFilters : myFilters = {
        search : searchProduct.value,
        brand : brandProduct.value,
        price: brandPrice.value,
    }
    return selectedFilters;
})

const emit = defineEmits(['filters']);

watchEffect(() => {
    emit('filters' , filters.value);
})

</script>

<style scoped>

</style>