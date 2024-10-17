import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTagsViewStore = defineStore('tagsView', () => {
  const visitedViews = ref([]);
  const cachedViews = ref([]);

  // 添加已访问视图到视图列表
  function addVisitedView(view) {
    // 存在则不添加
    if (visitedViews.value.some((v) => v.fullPath === view.fullPath)) {
      return;
    }

    // 不存在添加至末尾
    visitedViews.value.push(view);
  }

  // 添加缓存视图到缓存视图列表
  function addCachedView(view) {
    const viewName = view.name;

    if (cachedViews.value.includes(viewName)) {
      return;
    }

    // 视图需要缓存，则将路由名称添加至缓存视图列表
    if (view.keepAlive) {
      cachedViews.value.push(viewName);
    }
  }

  // 从已访问的视图列表中删除指定的视图
  function delVisitedView(view) {
    return new Promise((resolve) => {
      for (const [i, v] of visitedViews.value.entries()) {
        if (v.path === view.path) {
          visitedViews.value.splice(i, 1);
          break;
        }
      }
      resolve([...visitedViews.value]);
    });
  }

  // 删除指定缓存视图
  function delCachedView(view) {
    const viewName = view.name;

    return new Promise((resolve) => {
      const index = cachedViews.value.indexOf(viewName);
      index > -1 && cachedViews.value.splice(index, 1);
      resolve([...cachedViews.value]);
    });
  }

  // 删除其他访问视图
  function delOtherVisitedViews(view) {
    return new Promise((resolve) => {
      visitedViews.value = visitedViews.value.filter((v) => {
        return v.path === view.fullPath;
      });
      resolve([...visitedViews.value]);
    });
  }

  // 删除其他缓存视图
  function delOtherCachedView(view) {
    const viewName = view.name;

    return new Promise((resolve) => {
      const index = cachedViews.value.indexOf(viewName);

      if (index > -1) {
        cachedViews.value = cachedViews.value(index, index + 1);
      } else {
        cachedViews.value = [];
      }

      resolve([...cachedViews.value]);
    });
  }

  // 修改访问视图
  function updateVisitedView(view) {
    for (let v of visitedViews.value) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  }

  // 新增视图
  function addView(view) {
    addVisitedView(view);
    addCachedView(view);
  }

  // 删除视图
  function delView(view) {
    return new Promise((resolve) => {
      delVisitedView(view);
      delCachedView(view);
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      });
    });
  }

  // 删除其他视图
  function delOtherView(view) {
    return new Promise((resolve) => {
      delOtherVisitedViews(view);
      delOtherCachedView(view);
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      });
    });
  }

  // 删除全部视图
  function delAllViews() {
    return new Promise((resolve) => {
      visitedViews.value = [];
      cachedViews.value = [];
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      });
    });
  }

  // 删除全部访问视图
  function delAllVisitedViews() {
    return new Promise((resolve) => {
      visitedViews.value = [];
      resolve([...visitedViews.value]);
    });
  }

  // 删除全部缓存视图
  function delAllCachedViews() {
    return new Promise((resolve) => {
      cachedViews.value = [];
      resolve([...cachedViews.value]);
    });
  }

  return {
    visitedViews,
    cachedViews,
    addVisitedView,
    addCachedView,
    delVisitedView,
    delCachedView,
    delOtherVisitedViews,
    delOtherCachedView,
    updateVisitedView,
    addView,
    delView,
    delOtherView,
    delAllViews,
    delAllVisitedViews,
    delAllCachedViews
  };

});