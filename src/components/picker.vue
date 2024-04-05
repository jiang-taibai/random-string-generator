<script setup>
import {defineProps, computed} from "vue";

const props = defineProps({candidate: Array})
const defaultCandidate = [
  {key: 'a', label: 'A', checked: false},
  {key: 'b', label: 'B', checked: false},
  {key: 'c', label: 'C', checked: false},
  {key: 'd', label: 'D', checked: false},
]

// Computed
const allChecked = computed(() => {
  return props.candidate.every(item => item.checked);
})

// Functions
const onCheckAll = () => {
  // let existChecked = props.candidate.some(item => !item.checked);
  // let allChecked = props.candidate.every(item => item.checked);
  // 全未选中 => 全选   => !existChecked
  // 部分选中 => 全选   => existChecked && !allChecked
  // 全部选中 => 全不选 => allChecked
  // 逻辑：全选 => !existChecked || (existChecked && !allChecked) => !allChecked
  // 逻辑：全不选 => existChecked && allChecked => allChecked
  const newChecked = !allChecked.value;
  for (let item of props.candidate) {
    item.checked = newChecked;
  }
}
const onCheckOne = (idx) => {
  props.candidate[idx].checked = !props.candidate[idx].checked;
}
</script>

<template>
  <div class="picker-box">
    <div @click="onCheckAll" :class="{'button':true, 'active': allChecked}">全选</div>
    <div v-for="(item, idx) in candidate" :key="item.key" @click="onCheckOne(idx)"
         :class="{'button': true, 'active': item.checked}">
      {{ item.label }}
    </div>
  </div>
</template>

<style scoped lang="less">
.picker-box {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;


  .button {
    cursor: pointer;
    padding: 0 4px;
    border-radius: 4px;
    color: #63e2b7;
    border: 0.8px solid rgba(255, 255, 255, 0.24);
    transition: ease-in-out 0.2s;
  }

  .button:hover {
    border-color: #63e2b7;
  }

  .active {
    background-color: #63e2b7;
    color: #000000;
  }
}
</style>