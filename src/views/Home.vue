<template>
  <div class="home">
    <!-- <Button type="danger" size="large">按钮</Button> -->
    <swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <swipe-item v-for="item in banners" :key="item.id">
        <img :src="dalImg(item.coverImage)" :alt="item.name" />
      </swipe-item>
    </swipe>
    <grid :column-num="3">
      <grid-item
        v-for="item in categories"
        :key="item.id"
        :icon="dalImg(item.coverImage)"
        :text="item.name"
        :to="{ name: 'List', query: { tid: item.id } }"
      />
    </grid>
    <card
      v-for="item in products"
      :num="item.amount"
      :price="item.price.toFixed(2)"
      :title="item.name"
      :thumb="dalImg(item.coverImage)"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { Button, Card, Swipe, SwipeItem, Grid, GridItem } from 'vant';
// import { loadProductsAPI } from '../services/products';
import { loadBannersAPI } from '../services/banners';
// import { loadCategoriesAPI } from '../services/categories';
import { dalImg } from '../utils/tools';

import { useCategories } from '../hooks/use-categories';
import { useProducts } from '../hooks/use-products';

// // 商品
// const products = ref([]);
// loadProductsAPI().then((res) => {
//   // console.log(res);
//   products.value = res.data;
// });

const { products, onLoad } = useProducts();
onLoad(); // 调用方法获取数据

// 轮播图
const banners = ref([]);
loadBannersAPI().then((res) => (banners.value = res.data));

// // 商品分类
const { categories } = useCategories();
// const categories = ref([]);
// loadCategoriesAPI().then((res) => (categories.value = res.data));
</script>
<style>
/* .my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
} */
</style>
