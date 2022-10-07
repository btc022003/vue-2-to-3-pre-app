import { ref } from 'vue';
import { loadProductsAPI } from '../services/products';

/**
 *
 * @param {*} categoryId 当前的商品分类
 * @returns
 */
export const useProducts = (categoryId = '') => {
  /**
   * 页码
   */
  const page = ref(1); // 当前页码

  /**
   * 是否加载中
   */
  const loading = ref(false); // 是否加载中

  /**
   * 是否加载完成
   */
  const finished = ref(false); // 是否加载完成

  /**
   * 当前分类id
   */
  const currentCategoryId = ref(categoryId); // 当前需要加载的数据的分类id

  /**
   * 商品列表
   */
  const products = ref([]); // 商品数据

  /**
   *  加载数据
   * @param {*} needReset 是否需要重置
   * @param {*} categoryId 分类id
   */
  const onLoad = (needReset = false, categoryId = '') => {
    if (needReset) {
      finished.value = false;
      page.value = 1;
      products.value = [];
    }
    if (categoryId) {
      currentCategoryId.value = categoryId;
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
    products,
    currentCategoryId,
    onLoad,
  };
};
