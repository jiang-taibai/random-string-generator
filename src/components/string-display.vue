<script setup>
import {computed, defineProps, reactive, ref, watchEffect, getCurrentInstance, nextTick, watch} from 'vue'
import {NIcon, NImage} from "naive-ui";
import {characterIs, getRandomString} from "../assets/js/random.js";
import {Icons} from "../assets/js/base-data.js";
import {calculateGenerateByConfigParameter, Debounce, debounce} from "../assets/js/utils.js";

// Constants
const characterType = {
  letter: 'letter',
  number: 'number',
  symbol: 'symbol',
}

// Variables
const props = defineProps({
  str: String,
  config: Object,
})
const enable = reactive({
  colorful: true,
  displayPassword: false,
})
const displayStr = ref(props.str)
let randomShowInterval = null
const randomShowTimeout = 500;


// Computed
const chars = computed(() => {
  let arr = displayStr.value.split('')
  let res = []
  for (let char of arr) {
    if (characterIs.letter(char)) {
      res.push({ch: char, type: characterType.letter})
    } else if (characterIs.number(char)) {
      res.push({ch: char, type: characterType.number})
    } else if (characterIs.specialCharacter(char)) {
      res.push({ch: char, type: characterType.symbol})
    }
  }
  return res;
})

// Functions
const toggleColorful = () => {
  enable.colorful = !enable.colorful
}
const toggleDisplayPassword = () => {
  enable.displayPassword = !enable.displayPassword
}
const calculateTimeout = (length) => {
  const a = 25; // 从30ms开始减少到5ms
  const c = 5;  // 最小超时值为5ms
  const b = 0.01; // 衰减率，这个值可能需要根据效果进行调整
  return a * Math.exp(-b * length) + c;
}
const randomShow = (targetString) => {

  const parameter = calculateGenerateByConfigParameter(props.config);
  const localLength = targetString.length
  const timeout = calculateTimeout(localLength)

  if (randomShowInterval) {
    clearInterval(randomShowInterval);
  }
  let i = 0
  const maxRandomTimes = 10
  randomShowInterval = setInterval(() => {
    if (i < maxRandomTimes) {
      displayStr.value = getRandomString(
          parameter.enabledNumbers,
          parameter.enabledLowercaseLetters,
          parameter.enabledUppercaseLetters,
          parameter.enabledSpecialCharacters,
          targetString.length
      )
      i++
    } else {
      displayStr.value = props.str;
      if (randomShowInterval) clearInterval(randomShowInterval)
    }
  }, timeout)
}

// Monitor
watchEffect(() => {
  randomShow(props.str);
});
</script>

<template>
  <div class="box">
    <div class="operation" @click="toggleColorful">
      <div class="colorful">
        <transition name="fade">
          <n-icon v-if="enable.colorful" class="icon">
            <n-image :src="Icons.EnableColorful" :preview-disabled="true"
                     width="36" height="36" alt="colorful"/>
          </n-icon>
          <n-icon v-else class="icon">
            <n-image :src="Icons.DisableColorful" :preview-disabled="true"
                     width="36" height="36" alt="colorful"/>
          </n-icon>
        </transition>
      </div>
    </div>
    <div class="text-box">
      <div class="text">
        <span v-for="(char, idx) in chars" :key="`${char.ch}-${idx}`"
              :class="['char-'+char.type, enable.colorful?'':'char-colorless', 'item']">
          {{ enable.displayPassword ? '*' : char.ch }}
        </span>
      </div>
    </div>
    <div class="operation" @click="toggleDisplayPassword">
      <div class="display">
        <transition name="fade_fast">
          <n-icon v-if="enable.displayPassword" class="icon">
            <n-image :src="Icons.EnableDisplayPassword" :preview-disabled="true"
                     width="36" height="36" alt="displayPassword"/>
          </n-icon>
          <n-icon v-else class="icon">
            <n-image :src="Icons.DisableDisplayPassword" :preview-disabled="true"
                     width="36" height="36" alt="displayPassword"/>
          </n-icon>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@animation-duration-normal: 0.5s;
@animation-duration-fast: 0.3s;

.box {
  display: flex;
  gap: 8px;

  .text-box {
    padding: 16px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.9);
    flex: 1;

    .text {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 4px;

      .char-letter, .char-number, .char-symbol {
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        font-family: "JetBrainsMono-Regular", "AlibabaPuHuiTi-3-55-Regular", Consolas, serif;
        transition: color @animation-duration-normal ease-in-out;
      }

      .char-letter {
        color: #333333;
      }

      .char-number {
        color: #0572EC;
      }

      .char-symbol {
        color: #E64A4A;
      }

      .char-colorless {
        color: #333333 !important;
      }
    }
  }


  .operation {
    padding: 10px;
    background-color: #0a2d4d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 0.8px solid rgba(255, 255, 255, 0.24);
    cursor: pointer;

    .colorful, .display {
      width: 36px;
      height: 36px;
      position: relative;

      .icon {
        position: absolute;
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity @animation-duration-normal;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade_fast-enter-active, .fade_fast-leave-active {
  transition: opacity @animation-duration-fast;
}
.fade_fast-enter-from, .fade_fast-leave-to {
  opacity: 0;
}
</style>