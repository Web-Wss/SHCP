<template>
  <view>
  <view v-for="(item, i) in GoodsList" :key="i">
    <uni-list-chat :title="item.goods_name" :avatar="item.goods_img" :note="item.goods_describe" time="2020-02-02 20:20" badge-positon="left" >
    			<view class="chat-custom-right">
    				<uni-icons @click="dele(item.love_id)" type="trash" color="#990000" size="38"></uni-icons>
    			</view>
    		</uni-list-chat>
  </view>
    </view>
</template>
goods_img
<script>
  export default {
    data() {
      return {
        GoodsList:[
          // {
          //   goods_id:1,
          //   goods_name:'我是商品名称',
          //   goods_describe:'我是商品描述',
          //   goods_img:'http://massz.shop/Interfaces_web-1.0-SNAPSHOT/statics/imgs/0668b8f8-8631-41ea-b0fd-80f0a89c8045.jpg',
          //   love_id:0,
          // }
        ]
      }
    },
    onLoad(val) {
      if(val == '') {
      }else {
        uni.setStorageSync('user_id',val.user_id)
      }
      
      let user_id = uni.getStorageSync('user_id');
      this.getGoodsList(user_id)
    },
    methods: {
      // 删除此商品的收藏
      async dele(love_id) {
        // DeleteLoveGoodsServlet?love_id=10
        console.log(love_id)
        // 删除
        uni.showModal({
        	title: '提示',
        	content: '确定删除此商品么?',
        	success: function (res) {
        		if (res.confirm) {
              const {data:res1} =  uni.$http.get(`/DeleteLoveGoodsServlet?love_id=${love_id}`)
                // 删除成功后重新获取列表
                
                uni.showToast({
                	title: '此商品已删除!',
                	duration: 2000
                });
                uni.redirectTo({
                  url:'/subpkg/my_love_goods/my_love_goods?user_id='+uni.getStorageSync('user_id')
                })
                // let user_id = uni.getStorageSync('user_id')
                // const {data:res2} =  uni.$http.get(`/LoveGoodsServlet?user_id=${user_id}`)
                // console.log(res2)
                // this.GoodsList = res2
            
        		} else if (res.cancel) {
        			console.log('已取消');
        		}
        	}
        });
      },
      // 获取买家收藏的商品
      async getGoodsList(user_id) {
        console.log("user_id=====",user_id)
        const {data:res} = await uni.$http.get(`/LoveGoodsServlet?user_id=${user_id}`)
        console.log(res)
        this.GoodsList = res
      }
    }
  }
</script>

<style lang="scss">
</style>
