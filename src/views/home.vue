<script setup>
import Menu from './components/Menu.vue';
import MainHead from './components/MainHead.vue';
</script>

<template>
  <div class="home">
    <div class="home__aside">
      <div class="home__aside__head">tiny的学习系统</div>
      <Menu />
    </div>
    <div class="home__main">
      <MainHead />
      <div class="home__main__body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f1f2f3;
}

.home__aside {
  width: 260px;
  margin-right: 10px;
  background-color: #fff;
}

.home__aside__head {
  text-align: center;
}

.home__main {
  flex: 1;
  background-color: #fff;
}

.home__main__body {
  padding: 10px;
}
</style>