<script setup>
import {onMounted, ref, toRaw} from "vue";
import {UppercaseLetters} from "../assets/js/base-data.js";
import {getRandomString} from "../assets/js/random.js";

const props = defineProps({
  title: {
    type: String,
    default: 'RANDOM STRING GENERATOR'
  },
  timeout: {
    type: Number,
    default: 100
  },
  delay: {
    type: Number,
    default: 3000
  },
})

// Constants
const enabledUppercaseLetters = UppercaseLetters.split('')

// Variables
let randomShowInterval = null
const titleElement = ref(null)
const randomTitleText = ref(props.title)

// Functions
const randomShow = () => {
  // 每隔一段时间生成一个随机字符，第 i 次生成 [i, n-1] 部分的随机字符串，最后生成整个字符串和rawTitle相同
  let i = 0
  randomShowInterval = setInterval(() => {
    if (i <= props.title.length) {
      const randomString = getRandomString(
          [],
          [],
          enabledUppercaseLetters,
          [],
          props.title.length - i
      )
      randomTitleText.value = props.title.substring(0, i) + randomString
      i++
    } else {
      if (randomShowInterval) clearInterval(randomShowInterval)
    }
  }, props.timeout)
}

// Lifecycle
onMounted(() => {
  setInterval(randomShow, props.timeout * (props.title.length + 1) + props.delay)
})
</script>

<template>
  <div class="title-box">
    <span ref="titleElement">{{ randomTitleText }}</span>
  </div>
</template>

<style scoped lang="less">
.title-box {
  overflow: hidden;
  text-align: center;

  span {
    font-size: 50px;
    font-weight: bold;
    color: rgba(240, 240, 240, 0.8);
    word-break: break-all;
  }
}
</style>