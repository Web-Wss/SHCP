<template>
  <view class="home-box">
    <my-search></my-search>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <navigator class="swiper-item" >
          <image :src="item.imageUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 通知区域 -->

    <uni-notice-bar show-icon scrollable text="马师专二手平台目前仅支持发布单张图片商品,如需发布多张,请登录www.massz.shop,给您带来不便,敬请谅解" />

    <!-- 分类 -->
    <view class="cate-box">
      <navigator class="cate-item" :url="'/subpkg/goods_cate/goods_cate?goods_id=' + item.id"
        v-for="(item,i) in cateList" :key="i">
        <view class="cate-item-img">
          <image :src="item.imgUrl" mode=""></image>
        </view>
        <view class="cate-item-title">
          {{item.title}}
        </view>
      </navigator>
    </view>

    <!-- 好物抢先购 -->
    <view class="goodGoods-wz">
      - - - - - 好物抢先购 - - - - -
    </view>
    <view class="goodGoods">
      <navigator class="goods-item" v-for="(item,i) in goodGoodsList" :key="i" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
        <image :src="item.goods_img"></image>
        <view class="goods-title">
          <text>{{item.goods_name}} </text>
        </view>
        <view class="goods-price">
          <text>￥{{item.goods_price}}</text>
        </view>
      </navigator>
    </view>


  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 轮播图数据
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
        // 分类数据
        cateList: [{
            id: 1,
            imgUrl: '/static/cate-img/yifu_1.png',
            title: '女士服装',
          },
          {
            id: 2,
            imgUrl: '/static/cate-img/yifu.png',
            title: '男士服装',
          },
          {
            id: 3,
            imgUrl: '/static/cate-img/meizhuangpian-icon-.png',
            title: '美妆护肤',
          },
          {
            id: 4,
            imgUrl: '/static/cate-img/shouji.png',
            title: '手机数码',
          },
          {
            id: 5,
            imgUrl: '/static/cate-img/jiushui.png',
            title: '茶酒美食',
          },
          {
            id: 6,
            imgUrl: '/static/cate-img/sds_di14leizhubaozhongbiao.png',
            title: '珠宝饰品',
          },
          {
            id: 7,
            imgUrl: '/static/cate-img/tushu.png',
            title: '图书文具',
          },
          {
            id: 8,
            imgUrl: '/static/cate-img/tiyu.png',
            title: '体育用具',
          },
        ],
        goodGoodsList:[
        ]
        
      };
    },
    onLoad() {
      // 获取好物数据的方法
      this.getgoodGoodsList()
    },
    methods: {
      async getgoodGoodsList() {
        const {data:res} = await uni.$http.get('/GoodsGoodsServlet')
        console.log(res)
        this.goodGoodsList = res
      }
    }
  }
</script>

<style lang="scss">
  .home-box {
    background-color: #f6f6f6;

    swiper {
      height: 360rpx;
      margin-bottom: 8rpx;

      .swiper-item,
      image {
        width: 100%;
        height: 100%;
      }
    }
    
    .uni-noticebar {
      margin-bottom: 0;
    }



    .cate-box {
      background-color: white;
      display: flex;
      flex-wrap: wrap;
      margin: 8rpx 0rpx;
      justify-content: center;

      .cate-item {
        // border-radius: 25px;
        // background-color: #e7e7e7;
        // margin: 6rpx;
        width: 25%;
        height: 150rpx;
        text-align: center;

        .cate-item-img {
          // width: 60rpx;
          // height: 80rpx;
          // background-color: blue;
        }

        image {
          margin-top: 25rpx;
          width: 60rpx;
          height: 60rpx;
        }

        .cate-item-title {
          font-size: 24rpx;
        }
      }
    }
    
    .goodGoods-wz {
      background-color: #ffffff;
      text-align: center;
    }
    
    .goodGoods {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      
      .goods-item {
        border-radius: 25px;
        margin: 8rpx;
        background-color: #fff;
        width: 31%;
        height: 320rpx;
        
        image {
          border-radius: 25px;
          width: 100%;
          height: 200rpx;
        }
        
        .goods-title {
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          
          
          text-align: center;
          font-size: 22rpx;
          height: 60rpx;
        }
        
        .goods-price {
          text-align: center;
          font-size: 30rpx;
          color: red;
        }
      }
    }

    
    





  }
</style>
