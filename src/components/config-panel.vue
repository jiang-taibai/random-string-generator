<script setup>
import {defineProps, ref} from 'vue'
import {
  NSlider,
  NInputNumber,
  NRadioGroup,
  NRadioButton,
  NConfigProvider
} from "naive-ui";
import Picker from "./picker.vue";
import {LengthTypeKeys} from "../assets/js/base-data.js";

const props = defineProps({config: Object})

const lengthTypes = {
  fixed: {
    key: LengthTypeKeys.Fixed,
    label: '固定'
  },
  range: {
    key: LengthTypeKeys.Range,
    label: '范围'
  },
}

// Functions
const validateMinLength = (val) => {
  return Number.isInteger(val) && val >= 1 && val <= props.config.maxLength;
}
const validateMaxLength = (val) => {
  return Number.isInteger(val) && val >= 1 && props.config.minLength <= val;
}
</script>

<template>
  <n-config-provider>
    <div class="items">
      <div class="item">
        <div class="title">长度</div>
        <div class="content">
          <n-radio-group v-model:value="props.config.lengthType" name="lengthType">
            <n-radio-button :key="lengthTypes.fixed.key"
                            :value="lengthTypes.fixed.key" :label="lengthTypes.fixed.label"/>
            <n-radio-button :key="lengthTypes.range.key"
                            :value="lengthTypes.range.key" :label="lengthTypes.range.label"/>
          </n-radio-group>
          <div
              style="flex: 1; display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 8px;">
            <n-input-number v-model:value="props.config.minLength" :min="1" :show-button="false"
                            :validator="validateMinLength" style="width: 150px; text-align: right">
              <template #suffix>≤</template>
            </n-input-number>
            <n-slider v-if="props.config.lengthType === lengthTypes.range.key" :range="true" :step="1"
                      :max="props.config.maxLength === null ? 1 : props.config.maxLength"
                      :min="props.config.minLength === null ? 1 : props.config.minLength"
                      v-model:value="props.config.rangeLength"/>
            <n-slider v-else :range="false" :step="1"
                      show-tooltip
                      :max="props.config.maxLength === null ? 1 : props.config.maxLength"
                      :min="props.config.minLength === null ? 1 : props.config.minLength"
                      v-model:value="props.config.fixedLength"/>
            <n-input-number v-model:value="props.config.maxLength" :min="1" :show-button="false"
                            :validator="validateMaxLength" style="width: 150px;">
              <template #prefix>≤</template>
            </n-input-number>
          </div>
        </div>
      </div>

      <div class="item">
        <div class="title">数字</div>
        <div class="content">
          <picker v-model:candidate="props.config.enabledNumbers"/>
        </div>
      </div>

      <div class="item">
        <div class="title">小写字母</div>
        <div class="content">
          <picker v-model:candidate="props.config.enabledLowercaseLetters"/>
        </div>
      </div>

      <div class="item">
        <div class="title">大写字母</div>
        <div class="content">
          <picker v-model:candidate="props.config.enabledUppercaseLetters"/>
        </div>

      </div>

      <div class="item">
        <div class="title">特殊字符</div>
        <div class="content">
          <picker v-model:candidate="props.config.enabledSpecialCharacters"/>
        </div>
      </div>

    </div>
  </n-config-provider>
</template>

<style scoped lang="less">
.items {
  padding: 16px;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .item {
    display: flex;
    gap: 8px;
    align-items: center;

    .title {
      width: 80px;
      text-align: right;
    }

    .content {
      flex: 1;
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }
  }
}
</style>