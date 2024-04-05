<script setup>
import {ref, reactive, onMounted, watch, computed, watchEffect, onBeforeMount} from "vue";
import {
  createDiscreteApi, darkTheme,
  NButton, NConfigProvider,
} from "naive-ui";

const configProviderPropsRef = computed(() => ({
  theme: darkTheme
}));
const {message} = createDiscreteApi(
    ["message", "dialog", "notification", "loadingBar", "modal"],
    {
      configProviderProps: configProviderPropsRef
    }
);
import StringDisplay from "./components/string-display.vue";
import {defaultConfig} from "./assets/js/default-data.js";
import {generateByConfig} from "./assets/js/utils.js";
import RandomTitle from "./components/random-title.vue";
import ConfigPanel from "./components/config-panel.vue";
import {StorageKeys} from "./assets/js/base-data.js";

// Variables
const str = ref("");
const loadConfig = () => {
  const savedConfig = localStorage.getItem(StorageKeys.Config);
  try {
    return savedConfig ? JSON.parse(savedConfig) : JSON.parse(JSON.stringify(defaultConfig));
  } catch (e) {
    return JSON.parse(JSON.stringify(defaultConfig));
  }
}
const config = ref(loadConfig());

// Functions
const onGenerate = () => {
  onGenerateByConfig(config.value)
}
const onGenerateByConfig = (_config) => {
  str.value = generateByConfig(_config);
}
const onCopy = () => {
  navigator.clipboard.writeText(str.value);
  message.success("拷贝成功！")
}


// Lifecycle
onMounted(() => {
  onGenerate();
})

// Monitor
watchEffect(() => {
  localStorage.setItem(StorageKeys.Config, JSON.stringify(config.value));
  onGenerateByConfig(config.value)
});
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <div class="outer">
      <random-title class="random-title-box"
                    title="RANDOM-STRING-GENERATOR" :timeout="50" :delay="2000"/>
      <config-panel class="config-panel-box" v-model:config="config"/>
      <div class="button-group">
        <n-button strong secondary type="primary" block
                  class="button-item" @click="onGenerate">生成
        </n-button>
        <n-button strong secondary type="primary" block
                  class="button-item" @click="onCopy">拷贝
        </n-button>
      </div>
      <div style="height: 20px"></div>
      <string-display class="string-display-box" :str="str" :config="config"/>
    </div>
    <!--    <pre style="background-color: #2b2b2b; color: burlywood">{{ JSON.stringify(config, null, 2) }}</pre>-->
  </n-config-provider>
</template>

<style scoped lang="less">
.outer {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh;
  max-width: 850px;
  margin: 200px auto 0;

  .random-title-box {
    margin-bottom: 40px;
  }

  .button-group {
    display: flex;
    gap: 16px;
    width: 80%;

    .button-item {
      flex: 1;
    }
  }

  .string-display-box {
    width: 600px;
    margin: 0 auto;
  }

  .config-panel-box {
    margin: 0 auto;
    max-width: 850px;
  }
}
</style>
