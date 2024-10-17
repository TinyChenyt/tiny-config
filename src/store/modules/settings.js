import { defineStore } from 'pinia';
import defaultSettings from '@/settings';
import { useStorage } from '@vueuse/core';
import { ref } from 'vue';

export const useSettingsStore = defineStore('setting', () => {
  const title = defaultSettings.title;
  const version = defaultSettings.version;

  const tagsView = useStorage('tagsView', defaultSettings.tagsView);

  const showSettings = ref(defaultSettings.showSettings);
  const sidebarLogo = ref(defaultSettings.sidebarLogo);

  const layout = useStorage('layout', defaultSettings.layout);

  const settingsMap = {
    showSettings,
    sidebarLogo,
    layout,
    tagsView
  };

  function changeSetting({ key, value }) {
    const setting = settingsMap[key];

    if (setting !== undefined) {
      setting.value = value;
    }
  }

  return {
    title,
    version,
    tagsView,
    showSettings,
    sidebarLogo,
    layout,
    settingsMap,
    changeSetting
  };
});