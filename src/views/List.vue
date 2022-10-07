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
    <!--
      loading   属性，表示是否正在加载
      finished  属性，表示是否加载完成
      load      事件，触底之后触发。当loading为false并且finished为false的时候才执行
    -->
    <List
      class="products"
      :loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <card
        v-for="item in products"
        :num="item.amount"
        :price="item.price.toFixed(2)"
        :title="item.name"
        :thumb="dalImg(item.coverImage)"
      />
    </List>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { Sidebar, SidebarItem, Card, List } from 'vant';
import { dalImg } from '../utils/tools';
import { useCategories } from '../hooks/use-categories';
import { loadProductsAPI } from '../services/products';

const route = useRoute();
const { categories } = useCategories();

const page = ref(1); // 当前页码
const loading = ref(false); // 是否加载中
const finished = ref(false); // 是否加载完成
// const onLoad = () => {};

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

  // 需要重置数据
  finished.value = false;
  page.value = 1;
  products.value = [];
  onLoad();
});

// 商品列表
const onLoad = () => {
  loading.value = true;
  loadProductsAPI(page.value, currentCategoryId.value).then((res) => {
    // console.log(res);
    finished.value = res.pages < page.value;
    loading.value = false;
    products.value.push(...res.data);
    page.value++; // 加载数据成功之后也码+1
  });
};
// loadDataFromServer();
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
