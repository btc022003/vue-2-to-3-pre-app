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
        @click-thumb="toDetail(item.id)"
      />
    </List>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { Sidebar, SidebarItem, Card, List } from 'vant';
import { dalImg } from '../utils/tools';
import { useCategories } from '../hooks/use-categories';
// import { loadProductsAPI } from '../services/products';
import { useProducts } from '../hooks/use-products';

const route = useRoute();
const { push } = useRouter();

const { categories } = useCategories();
const { loading, finished, onLoad, products, currentCategoryId } = useProducts(
  route.query.tid
);

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

// onBeforeRouteUpdate 路由改变，但是组件被复用的时候执行
onBeforeRouteUpdate((to, from) => {
  // 需要重置数据
  onLoad(true, to.query.tid);
});

/**
 * 跳转到详情
 * @param {*} id
 */
const toDetail = (id) => {
  push({
    name: 'Detail',
    query: {
      id,
    },
  });
};
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
