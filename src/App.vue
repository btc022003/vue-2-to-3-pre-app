<script setup>
import { ref, watch } from 'vue';
import { Tabbar, TabbarItem } from 'vant';
import { useRoute } from 'vue-router';
const route = useRoute();
const isShowTabBar = ref(true);

// 监听路由的变化
watch(route, (v) => {
  if (v.meta.needHideTabBar) {
    isShowTabBar.value = false;
  } else {
    isShowTabBar.value = true;
  }
});

// 组件初始化的时候执行
// import { ref } from 'vue';
// const count = ref(0);
// const txt = ref('');
// const clickHandle = () => {
//   console.log(111);
// };
</script>

<template>
  <!-- 在模版中还是可以继续使用2的指令和语法 -->
  <!-- <h1>Vue3</h1>
  <button @click="count++">{{ count }}</button>
  <p>{{ txt }}</p>
  <input type="text" placeholder="请输入内容" v-model="txt" />
  <button @click="clickHandle">点一下</button> -->
  <!-- <router-link :to="{ name: 'Home' }">【首页】</router-link>
  <router-link :to="{ name: 'List' }">【列表】</router-link>
  <router-link :to="{ name: 'User' }">【我的】</router-link> -->
  <!-- <hr /> -->
  <router-view class="main"></router-view>
  <tabbar v-show="isShowTabBar" route :fixed="false" active-color="deeppink">
    <tabbar-item icon="home-o" :to="{ name: 'Home' }">首页</tabbar-item>
    <tabbar-item icon="search" :to="{ name: 'List' }">热卖</tabbar-item>
    <tabbar-item icon="shopping-cart-o" :to="{ name: 'Cart' }"
      >购物车</tabbar-item
    >
    <tabbar-item icon="friends-o" :to="{ name: 'User' }">我的</tabbar-item>
  </tabbar>
</template>

<style>
.main {
  flex: 1;
  overflow: auto;
}
</style>
