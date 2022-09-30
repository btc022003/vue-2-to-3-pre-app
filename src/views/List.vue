<template>
  <div class="list">
    <sidebar v-model="active">
      <sidebar-item
        v-for="item in categories"
        :title="item.name"
        :key="item.id"
        :to="{ name: 'List', query: { tid: item.id } }"
      />
    </sidebar>
    <div class="products">
      <card
        v-for="item in products"
        :num="item.amount"
        :price="item.price.toFixed(2)"
        :title="item.name"
        :thumb="dalImg(item.coverImage)"
      />
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { Sidebar, SidebarItem, Card } from 'vant';
import { dalImg } from '../utils/tools';
import { useCategories } from '../hooks/use-categories';
import { loadProductsAPI } from '../services/products';

const route = useRoute();
const { categories } = useCategories();

// 当前的分类id
const currentCategoryId = ref(route.query.tid);
// 当前选的是哪一个
const active = computed({
  set(v) {
    return v;
  },
  get() {
    return categories.value.findIndex(
      (item) => item.id == currentCategoryId.value
    );
  },
});

const products = ref([]);

// 发起网络请求获取初始化数据
// fetch(xxx)
// console.log('list init data');

// onBeforeRouteUpdate 路由改变，但是组件被复用的时候执行
onBeforeRouteUpdate((to, from) => {
  // console.log(to.query);
  currentCategoryId.value = to.query.tid;
  loadDataFromServer();
});

// 商品列表
const loadDataFromServer = () => {
  loadProductsAPI(1, currentCategoryId.value).then((res) => {
    // console.log(res);
    products.value = res.data;
  });
};
loadDataFromServer();
</script>
<style scoped>
.list {
  display: flex;
}
.products {
  overflow: auto;
  flex: 1;
}
.list .van-sidebar {
  width: 100px;
}
</style>
