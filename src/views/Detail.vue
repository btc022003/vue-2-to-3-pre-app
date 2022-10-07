<template>
  <div class="detail">
    <nav-bar
      :title="product.name"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <h1>{{ product.name }}</h1>
    <div class="content" v-html="product.content"></div>
    <action-bar>
      <action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <action-bar-icon icon="shop-o" text="店铺" @click="onToHome" />
      <action-bar-button type="danger" text="立即购买" @click="onClickButton" />
    </action-bar>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ActionBar, ActionBarIcon, ActionBarButton, NavBar } from 'vant';
import { loadProductByIdAPI } from '../services/products';
const route = useRoute(); // 获取route对象
const { push, go } = useRouter();
const product = ref({});
loadProductByIdAPI(route.query.id).then((res) => {
  product.value = res.data;
});

const onClickIcon = () => {};
const onClickButton = () => {};

const onToHome = () => {
  push({
    name: 'Home',
  });
};

const onClickLeft = () => {
  go(-1);
};
</script>
