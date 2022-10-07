import { ref } from 'vue';
import { loadProductsAPI } from '../services/products';

export const useProducts = () => {
  const page = ref(1); // 当前页码
  const loading = ref(false); // 是否加载中
  const finished = ref(false); // 是否加载完成
  const currentCategoryId = ref(''); // 当前需要加载的数据的分类id

  /**
   *  加载数据
   * @param {*} needReset 是否需要重置
   */
  const onLoad = (needReset = false) => {
    if (needReset) {
      finished.value = false;
      page.value = 1;
      products.value = [];
    }
    loading.value = true;
    loadProductsAPI(page.value, currentCategoryId.value).then((res) => {
      // console.log(res);
      finished.value = res.pages < page.value;
      loading.value = false;
      products.value.push(...res.data);
      page.value++; // 加载数据成功之后也码+1
    });
  };

  return {
    page,
    loading,
    finished,
    onLoad,
  };
};
