<template>
  <view class="view-box">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in goods_img" :key="i">
        <navigator class="swiper-item" >
          <image :src="item"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <view class="goods_name_price">
      <view class="name">
        {{goods_name}}
      </view>
      <view class="price">
        ￥{{goods_price}}
      </view>
    </view>
    <!-- 卖家信息 -->
    <view class="maijiainfo">
      <view class="left">
        <image src="https://cn.vuejs.org/images/logo.svg" mode=""></image>
        <view class="name">
          {{user_nickname}}
        </view>
      </view>
      <view class="right">
        | 在售宝贝{{options[0].info}}
      </view>
    </view>
  
    <!-- 商品详情 -->
    <view class="goodsInfo">
      <uni-section title="商品详情" type="line">
      			<uni-card :is-shadow="false">
      				<text class="uni-body">{{goods_describe}}</text>
      			</uni-card>
      		</uni-section>
    </view>
    <!-- 最底部 -->
    <!--没有收藏 -->
   <uni-goods-nav v-if="isLove == false" class="goods-nav" :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick"
    				@buttonClick="buttonClick" style="margin-top: 20px;" />
    <uni-goods-nav v-else class="goods-nav" :fill="true" :options="options" :button-group="customButtonGroup1" @click="onClick"
    				@buttonClick="buttonClick" style="margin-top: 20px;" />

  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 用户是否收藏当前商品,收藏true，没有收藏false
        isLove:false,
        // 卖家id
        user_id0:0,
        // 买家id
        user_id1:0,
        // 商品id
        goods_id:0,
        // 商品图片
        goods_img:[],
        // 商品图片--用于收藏
        goods_img1:'',
        // 商品名称
        goods_name:'',
        // 商品价格
        goods_price:0,
        // 商品描述
        goods_describe:'',
        // 卖家昵称
      user_nickname:'',
      // 卖家手机
      user_phone:13731992152,
        // 卖家在售个数
        options: [ {
        					icon: 'shop',
        					text: 'TA的在售',
        					info: 5,
        					infoBackgroundColor: '#007aff',
        					infoColor: "#f5f5f5"
        				}, {
        					icon: 'cart',
        					text: '我的收藏',
        					info: 2
        				}],
      customButtonGroup: [{
                	text: '加入收藏',
                	backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
                	color: '#fff'
                },
                {
                	text: '联系卖家',
                	backgroundColor: 'linear-gradient(90deg, #ff7779, #eb3134)',
                	color: '#fff'
                }
              ],
              customButtonGroup1: [{
                        	text: '已收藏',
                        	backgroundColor: 'linear-gradient(90deg, #7f7f7f, #7f7f7f)',
                        	color: '#fff'
                        },
                        {
                        	text: '联系卖家',
                        	backgroundColor: 'linear-gradient(90deg, #ff7779, #eb3134)',
                        	color: '#fff'
                        }
                      ],
        swiperList: [{
            id: 1,
            imageUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/39bb34167f6c178d6bb768d8872c97f8.jpg?w=2452&h=920',
            goods_id: 1
          },
          {
            id: 2,
            imageUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/222d6c61df75f30e6782ec476d5c8273.jpg?thumb=1&w=1226&h=460&f=webp&q=90',
            goods_id: 2
          },
          {
            id: 3,
            imageUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/dd741adcce9417d72ea4c1a6dfcc96e2.jpg?thumb=1&w=1226&h=460&f=webp&q=90',
            goods_id: 3
          },
          {
            id: 4,
            imageUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=1226&h=460&f=webp&q=90',
            goods_id: 4
          },
        ],
      };
    },
    onLoad(val) {
      this.isLogin();
      // console.log(val.goods_id)
      this.getGoodsInfo(val.goods_id);
      this.goods_id = val.goods_id
      // 将买家的ID赋值
      this.getMySelf();
    },
    
    methods:{


      // 将买家的id赋值
       async getMySelf() {
        this.user_id1 =  uni.getStorageSync('user_id');
        console.log("买家ID",this.user_id1)
        // 查询卖家商品数
        const {data:res1} = await uni.$http.post(`/LoveGoodsServlet?user_id=1`)
        console.log("买家商品",res1)
        this.options[1].info = res1.length
        // 查询当前商品是否已经被收藏
        console.log("卖家IDuser_id0===",this.user_id0)
        console.log("买家IDuser_id1===",this.user_id1)
        console.log("商品ID===",this.goods_id)
        const {data:res2} = await uni.$http.post(`/QueryLoveGoodsServlet?goods_id=${this.goods_id}&user_id=${this.user_id1}`)
        console.log("当前商品是否已经收藏",res2)
        this.isLove = res2
        
        // 
        
      },
      // 判断用户是否登录
      isLogin() {
        let token = uni.getStorageSync('token');
        if(token.length == 0) {
          uni.redirectTo({
            url:'../../subpkg/login/login'
          })
        }
      },

      // 查询当前商品信息
      async getGoodsInfo (goods_id) {
        console.log(goods_id)
        const {data:res} = await uni.$http.post(`/GoodsDetailsServlet?goods_id=${goods_id}`)
        console.log("当前商品信息",res)
        this.goods_name = res[0].goods_name
        this.goods_price = res[0].goods_price
        this.goods_describe = res[0].goods_describe
        this.user_nickname = res[0].user_nickname
        this.user_phone = res[0].user_phone
        this.user_id0 = res[0].user_id
        this.goods_img1 = res[0].goods_img
        console.log("卖家ID赋值",123)
        for(let i = 0; i < res.length; i ++) {
          this.goods_img.push(res[i].goods_img)
        
        }
        // 查询卖家商品数
        const {data:res1} = await uni.$http.post(`/GetTaGoodsServlet?user_id=${this.user_id0}`)
        // 赋值卖家商品个数
        this.options[0].info = res1.length
      },

      onClick(e) {
        // e.index=0 ==>TA的在售
        if(e.index == 0) {
          console.log('去TA的在售页面')
          uni.navigateTo({
            url:'../user_goods/user_goods?user_id=' + this.user_id0
          })
        }
        if(e.index == 1) {
          console.log('去我的收藏页面')
          uni.navigateTo({
            url:'../my_love_goods/my_love_goods?user_id=' + this.user_id1
          })
        }
        
        // e.index=1 ==>我的收藏
      },
      buttonClick(e) {
        // e.index=0 ==>TA的在售
        if(e.index == 0) {
          if(this.isLove) {
            uni.showToast({
            	title: '已经收藏啦!',
            	duration: 2000
            });
          }else {
            console.log('加入收藏')
            let user_id = uni.getStorageSync('user_id')
            // AddLoveGoodsServlet
            const {data:res1} =  uni.$http.post(`/AddLoveGoodsServlet?goods_id=${this.goods_id}&goods_name=${this.goods_name}&goods_img=${this.goods_img1}&goods_price=${this.goods_price}&user_id=${user_id}`)
            this.isLove = true
            this.options[1].info += 1
          }
        }
        if(e.index == 1) {
          console.log('联系卖家')
          uni.makePhoneCall({
            phoneNumber:this.user_phone
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .view-box {
    margin-bottom: 120rpx;
    background-color: #f6f6f6;
    swiper {
      height: 560rpx;
      margin-bottom: 8rpx;

      .swiper-item,
      image {
        width: 100%;
        height: 100%;
      }
    }
    
    .goods_name_price{
      margin-top: 8rpx;
      width: 100%;
      height: 140rpx;
      background-color: #ffffff;
      .name {
        width: 65%;
        height: 120rpx;
        line-height: 120rpx;
        font-size: 31rpx;
        text-align: center;
        background-color: #ffffff;
        float: left;
      }
      .price {
        width: 35%;
        height: 120rpx;
        font-size: 50rpx;
        color: red;
        text-align: center;
        line-height: 120rpx;
        background-color: #ffffff;
        float: right;
      }
    }
    
    // 卖家信息
    .maijiainfo {
      margin-top: 8rpx;
      width: 100%;
      height: 100rpx;
      background-color: ffffff;
      .left {
        float: left;
        width: 400rpx;
        height: 100rpx;
        background-color: white;
        image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50px;
          float: left;
        }
        .name {
          background-color: white;
          float: left;
          line-height: 100rpx;
          font-size: 30rpx;
          width: 300rpx;
          height: 100rpx;
        }
      }
      .right {
        color: red;
        float: right;
        width: calc(100% - 410rpx);
        height: 100rpx;
        line-height: 100rpx;
        text-align: right;
        padding-right: 10rpx;
        background-color: white;
      }
    }
    
    // 底部
    .goods-nav {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
    }
    
    }
</style>
