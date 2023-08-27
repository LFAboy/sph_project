<script setup>
import { toRefs, computed } from 'vue';
const props = defineProps(['pageNo', 'pageSize', 'total', 'pageContinue']);

const { pageNo, pageSize, total, pageContinue } = toRefs(props);

const totalPage = computed(() => Math.ceil(total.value / pageSize.value))

const startEnd = computed(() => {
  let continueStart = 0;
  let continueEnd = 0;
  if (totalPage.value < pageContinue) {
    // 当总页码数小于 连续的页码数的时候
    continueStart = 1;
    continueEnd = totalPage.value;
  }else {
    continueStart = pageNo.value - Math.floor(pageContinue.value / 2);
    continueEnd = pageNo.value +  Math.floor(pageContinue.value / 2);
    if (continueStart < 1) {
      continueStart = 1;
      continueEnd = pageContinue.value;
    }
    if (continueEnd > totalPage.value) {
      continueEnd = totalPage.value;
      continueStart = continueEnd - pageContinue.value + 1;
    }
  }
  return {continueStart, continueEnd};
})

const continueStart = computed(() => startEnd.value.continueStart);
const continueEnd = computed(() => startEnd.value.continueEnd)

const pageList = computed(() => {
  const tmp = [];
  for (let i = continueStart.value; i <= continueEnd.value; i++) {
    tmp.push(i);
  }
  return tmp;
})
</script>

<template>
  <div class="pagination">
    <button :disabled="1 == pageNo" @click="$emit('changePage', pageNo - 1)">上一页</button>
    <button v-show="continueStart > 1" @click="$emit('changePage', 1)">1</button>
    <button v-show="continueStart > 2">...</button>

    <button v-for="pageNum in pageList" :class="{ 'active': pageNum == pageNo }"
      @click="$emit('changePage', pageNum)">{{ pageNum }}</button>

    <button v-show="continueEnd < totalPage - 1">...</button>
    <button v-show="continueEnd < totalPage" @click="$emit('changePage', totalPage)">{{ totalPage }}</button>
    <button :disabled="totalPage == pageNo" @click="$emit('changePage', pageNo + 1)">下一页</button>
    <button>共 {{ total }} 个</button>
  </div>
</template>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>