<template>
  <div>
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="orders">
      <table
        class="order-item"
        v-for="(record, index) in recordList"
        :key="index"
      >
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle"
                >{{ record.createTime }}　订单编号：{{ record.outTradeNo }}
                <span class="pull-right delete"
                  ><img src="../images/delete.png" /></span
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(orderDetail, index) in record.orderDetailList"
            :key="orderDetail.id"
          >
            <td width="60%">
              <div class="typographic">
                <img
                  :src="orderDetail.imgUrl"
                  style="height: 100px; width: 100px"
                />
                <a class="block-text">{{ orderDetail.skuName }}</a>
                <span>x{{ orderDetail.skuNum }}</span>
                <a class="service">售后申请</a>
              </div>
            </td>
            <td
              v-if="index == 0"
              :rowspan="record.orderDetailList.length"
              width="8%"
              class="center"
            >
              {{ record.consignee }}
            </td>
            <td
              v-if="index == 0"
              :rowspan="record.orderDetailList.length"
              width="13%"
              class="center"
            >
              <ul class="unstyled">
                <li>总金额¥138.00</li>
                <li>在线支付</li>
              </ul>
            </td>
            <td
              v-if="index == 0"
              :rowspan="record.orderDetailList.length"
              width="8%"
              class="center"
            >
              <a class="btn">{{ record.orderStatusName }}</a>
            </td>
            <td
              v-if="index == 0"
              :rowspan="record.orderDetailList.length"
              width="13%"
              class="center"
            >
              <ul class="unstyled">
                <li>
                  <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MyOrder",
  computed: {
    ...mapGetters(["recordList"]),
  },
};
</script>

<style>
</style>