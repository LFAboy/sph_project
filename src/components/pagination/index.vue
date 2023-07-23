<template>
  <div class="pagination">
    <button :disabled="1 === pageNo" @click="$emit('changePage', pageNo - 1)">
      上一页
    </button>
    <button v-if="pageStart > 1" @click="$emit('changePage', 1)">1</button>
    <button v-if="pageStart > 2">···</button>

    <button
      v-for="pageNum in pageList"
      :class="{ active: pageNo === pageNum }"
      @click="$emit('changePage', pageNum)"
    >
      {{ pageNum }}
    </button>

    <button v-if="pageEnd < totalPage - 1">···</button>
    <button v-if="pageEnd < totalPage" @click="$emit('changePage', totalPage)">
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo === totalPage"
      @click="$emit('changePage', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "pageContinue"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    pageList() {
      let pageList = [];
      for (
        let i = this.getStartEnd().pageStart;
        i <= this.getStartEnd().pageEnd;
        i++
      ) {
        pageList.push(i);
      }
      return pageList;
    },
    pageStart() {
      return this.pageList[0];
    },
    pageEnd() {
      return this.getStartEnd().pageEnd;
    },
  },  
  methods: {
    getStartEnd() {
      // 这个方法获取 中间连续页码的 数组
      let pageStart = 0;
      let pageEnd = 0;
      let { pageNo, totalPage, pageContinue } = this;

      if (pageContinue > totalPage) {
        //当总页码数 小于 连续的页码数时，也就是显示异常的时候
        pageStart = 1;
        pageEnd = totalPage;
      } else {
        // 显示正常的时候，也就是中间连续的能全部显示
        pageStart = pageNo - Math.floor(pageContinue / 2);
        pageEnd = pageNo + Math.floor(pageContinue / 2);

        if (pageStart < 1) {
          // 当连续的页码数第一个 小于 1 时
          pageStart = 1;
          pageEnd = pageContinue;
        }
        if (pageEnd > totalPage) {
          // 当连续的页码数最后一个 大于 总页数 时
          pageEnd = totalPage;
          pageStart = totalPage - pageContinue + 1;
        }
      }

      return { pageStart, pageEnd };
    },
  },
};
</script>

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