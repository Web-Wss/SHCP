<template>
  <view>
    <view v-for="(item, i) in GoodsList" :key="i">
      <uni-list-chat :title="item.goods_name" :avatar="item.goods_img" :note="item.goods_describe" time="2020-02-02 20:20" badge-positon="left" >
      			<view class="chat-custom-right">
      				<uni-icons @click="dele(item.goods_id)" type="trash" color="#990000" size="38"></uni-icons>
      			</view>
      		</uni-list-chat>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        GoodsList:[

        ]
      }
    },
    onLoad(val) {
      // if(val == '') {
      // }else {
      //   uni.setStorageSync('user_id',val.user_id)
      // }
      let user_id = uni.getStorageSync('user_id');
      this.getGoodsList(user_id)
    },
    methods: {
      // 删除此商品--发布
      async dele(goods_id) {
        // DeleteLoveGoodsServlet?love_id=10
        console.log(goods_id)
        // 删除
        uni.showModal({
        	title: '提示',
        	content: '确定删除此商品么?',
        	success: function (res) {
        		if (res.confirm) {
              const {data:res1} =  uni.$http.get(`/DeletePersonGoodsServlet?goods_id=${goods_id}`)
                // 删除成功后重新获取列表
                uni.showToast({
                	title: '此商品已删除!',
                	duration: 2000
                });
                uni.redirectTo({
                  url:'/subpkg/my_publish/my_publish'
                })
        		} else if (res.cancel) {
        			console.log('已取消');
        		}
        	}
        });
      },
      // 获取买家已发布的商品
      async getGoodsList(user_id) {
        console.log("user_id=====",user_id)
        const {data:res} = await uni.$http.get(`/PersonGoodsServlet?user_id=${user_id}`)
        console.log(res)
        this.GoodsList = res
      }
    }
  }
</script>

<style>

</style>
