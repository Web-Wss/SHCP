<template>
  <view >
    <view class="result" v-for="(item,i) in GoodsList" :key="i">
      <uni-list-chat clickable @click="gotoDetail(item.goods_id)"  :avatar-circle="true" :title="item.goods_name" :avatar="item.goods_img" :note="item.goods_describe" ></uni-list-chat>
    </view>
  </view>

</template>

<script>
  export default {
    data() {
      return {
        // 用户id
        user_id:0,
        // 商品列表
         GoodsList:[
           // {
           //   goods_id:1,
           //   goods_name:'123',
           //   goods_goods_describe:'',
           //   goods_img:'123'
           // }
         ],
      }
    },
    onLoad(val) {
      // 获取Ta的在售商品
      this.getTaGoodsList(val.user_id);
    },
    methods: {
      // 获取Ta的在售商品
      async getTaGoodsList(user_id) {
        console.log("user_id=====",user_id)
        const {data:res} = await uni.$http.get(`/GetTaGoodsServlet?user_id=${user_id}`)
        console.log(res)
        this.GoodsList = res
      },
      gotoDetail(goods_id) {
        uni.navigateTo({
          url:'../goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
    }
  }
</script>

<style>

</style>
