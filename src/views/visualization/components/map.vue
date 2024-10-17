<script setup>
import * as echarts from 'echarts';
import chinaData from '@/assets/china.json';
import { onMounted } from 'vue';

const option = {
  title: {
    top: 30,
    text: '中国',
    subtext: '',
    x: 'center',
    textStyle: {
      fontSize: 20,
      color: '#ccc'
    }
  },
  geo: {
    map: '中国',
    show: true,
    roam: true,
    zoom: 1.2,
    scaleLimit: {
      min: 1,
      max: 3.5
    },
    label: {
      align: 'top',
      show: true,
      color: '#adbc1c',
      fontSize: 12
    },
    itemStyle: {
      borderColor: 'rgba(147,235,248,1)',
      borderWidth: 1,
      areaColor: {
        type: 'radial',
        x: 0.5,
        y: 0.5,
        z: 0.5,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
          }
        ],
        globalCoord: false // 缺省为 false
      },
      shadowColor: 'rgba(128, 217, 248, 1)',
      // shadowColor: 'rgba(255, 255, 255, 1)',
      shadowOffsetX: -2,
      shadowOffsetY: 2,
      shadowBlur: 10
    },
    emphasis: {
      itemStyle: {
        areaColor: '#ffd181', //悬浮区背景 1
        borderWidth: 0,
        color: 'green'
      },
      label: {
        show: true
      }
    }
  }
};

const init = () => {
  let mapChart = echarts.init(document.getElementById('map'));

  echarts.registerMap('中国', chinaData, {});

  mapChart.setOption(option);

  window.onresize = function () {
    mapChart.resize();
  };
};

onMounted(() => {
  init();
});
</script>

<template>
  <div class="map-box">
    <div id="map" class="map-container"></div>
  </div>
</template>

<style scoped>
.map-box {
  width: 100%;
  height: 100%;
}

.map-container {
  width: 100%;
  height: 100%;
}
</style>