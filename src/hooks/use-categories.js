import { ref } from 'vue';
import { loadCategoriesAPI } from '../services/categories';

export const useCategories = () => {
  const categories = ref([]);
  loadCategoriesAPI().then((res) => (categories.value = res.data));
  return {
    categories,
  };
};
