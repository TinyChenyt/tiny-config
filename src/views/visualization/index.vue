<script setup>
import { loadFull } from 'tsparticles';
import { particles } from './particles.js';
import Map from './components/map.vue';


// 粒子效果
const particlesInit = async (engine) => {
  await loadFull(engine);
};

</script>

<template>
  <div class="visualization-box">
    <vue-particles id="tsparticles" :particlesInit="particlesInit" :options="particles.options" />
    <div class="visualization-box__header">
      <div class="visualization-box__header__title">
        <div class="visualization-box__header__title__text">可视化</div>
      </div>
    </div>
    <div class="visualization-box__content">

      <div class="visualization-box__content__left">
        <div class="visualization-box__content__left__top border-bg h-32"></div>
        <div class="visualization-box__content__left__middle border-bg h-32"></div>
        <div class="visualization-box__content__left__bottom border-bg h-32"></div>
      </div>

      <div class="visualization-box__content__map border-bg">
        <Map />
      </div>

      <div class="visualization-box__content__right">
        <div class="visualization-box__content__right__top border-bg h-32"></div>
        <div class="visualization-box__content__right__middle border-bg h-32"></div>
        <div class="visualization-box__content__right__bottom border-bg h-32"></div>
      </div>

    </div>
    <div class="visualization-box__footer"></div>
  </div>
</template>

<style scoped>
.border-bg {
  background-origin: content-box;
  background-color: rgba(14, 41, 76, 0.8);
  background-image:
    linear-gradient(#4cc7f3 2px, transparent 2px, transparent calc(100% - 2px), #4cc7f3 calc(100% - 2px), #4cc7f3 100%),
    linear-gradient(90deg, #4cc7f3 2px, transparent 2px, transparent calc(100% - 2px), #4cc7f3 calc(100% - 2px), #4cc7f3 100%),
    linear-gradient(#4cc7f3 2px, transparent 2px, transparent calc(100% - 2px), #4cc7f3 calc(100% - 2px), #4cc7f3 100%),
    linear-gradient(90deg, #4cc7f3 2px, transparent 2px, transparent calc(100% - 2px), #4cc7f3 calc(100% - 2px), #4cc7f3 100%);
  background-repeat: no-repeat;
  background-position: top left, top left, bottom right, bottom right;
  background-size: 10px 100%, 100% 10px;
}

.h-32 {
  height: 32%;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.visualization-box {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/bg-1.png') no-repeat center right;
  background-size: cover;
  overflow-y: auto;
}

.visualization-box__header {
  display: flex;
  justify-content: center;
  background: url('@/assets/images/titleBg.png') no-repeat center right;
  background-size: cover;
  overflow-y: auto;
  position: relative;
  z-index: 1;
}

.visualization-box__header__title {
  width: 200px;
  color: #ffffff;
  text-align: center;
}


.visualization-box__header__title__text {
  width: 100%;
  height: 100%;
  color: aliceblue;
  text-align: center;
  font-size: 32px;
  font-family: Georgia, 'Times New Roman', Times, serif;

}

.visualization-box__content {
  height: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 10px;
}

.visualization-box__content__left {
  width: 30%;
}

.visualization-box__content__map {
  z-index: 1;
  width: 35%;
}

.visualization-box__content__right {
  width: 30%;
}
</style>