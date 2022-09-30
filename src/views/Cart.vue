<template>
  <div class="cart">
    <label><input type="checkbox" v-model="chkAll" />全选</label>
    <hr />
    <ul>
      <li v-for="item in carts">
        <label
          ><input type="checkbox" v-model="item.chk" />{{
            item.product.name
          }}</label
        >
        <p>价格:{{ item.product.price }}</p>
        <p>
          数量:<button @click="item.amount > 1 ? item.amount-- : null">-</button
          >{{ item.amount }}<button @click="item.amount++">+</button>
        </p>
      </li>
    </ul>
    <h5>总价：{{ sumPrice }}</h5>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
const carts = ref([
  {
    id: 1,
    amount: 2,
    chk: false,
    product: {
      id: 111,
      name: 'AirPods Pro',
      price: 1299,
    },
  },
  {
    id: 2,
    amount: 3,
    chk: true,
    product: {
      id: 112,
      name: 'AirPods Pro 2',
      price: 1899,
    },
  },
  {
    id: 3,
    amount: 1,
    chk: true,
    product: {
      id: 113,
      name: 'IPhone 14 pro',
      price: 7899,
    },
  },
]);
const chkAll = computed({
  // 主动设置值
  set(v) {
    carts.value.forEach((item) => (item.chk = v));
  },
  // 被动改变
  get() {
    return carts.value.every((item) => item.chk);
  },
});
const sumPrice = computed(
  () =>
    carts.value
      .filter((item) => item.chk) // 获取选中的
      .reduce((pre, cur) => pre + cur.amount * cur.product.price, 0) // 求和
);
</script>
<style scoped>
li {
  list-style: none;
  border-bottom: 1px solid saddlebrown;
  padding: 8px;
}
</style>
