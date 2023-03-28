<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{active: pageNo == 1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="page >= startNumAndEndNum.start"
        @click="$emit('getPageNo', page)"
        :class="{active: pageNo == page}">{{page}}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)"
        :class="{active: pageNo == totalPage}">{{totalPage}}
    </button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>
  
<script>

export default {
  name: "PaginationIndex",
  props:['pageNo', 'pageSize', 'total', 'continues'],
  computed:{
    totalPage(){
        return Math.ceil(this.total / this.pageSize)
    },
    startNumAndEndNum(){
        // 解构赋值，后面用到数据的时候就不用写 this 了
        const {pageNo, totalPage, continues} = this
        // 先定义两个变量存储起始数字与结束数字。
        let start = 0, end = 0;

        // 如果连续的页码数5，当总页数小于连续的页码数时
        if(continues > totalPage){
            start = 1;
            end = totalPage;
        }else{
            // 正常现象，总页数大于 连续的页码数  // 但是要考虑起始或结束页为负数
            start = pageNo - parseInt(continues / 2);
            end = pageNo + parseInt(continues / 2);

            // 考虑 起始或结束页为负数
            if(start < 1){
                start = 1;
                // 结束页应该是连续的页码数
                end = continues;
            }
            if(end > totalPage){
                end = totalPage
                // 当end 大于 总页数时，注意起始页
                start = totalPage - continues + 1
            }
        }
        return {start, end};
    }
  }
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
.active {
    background-color: skyblue;
}
</style>