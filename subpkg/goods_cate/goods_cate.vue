
<template>
	<view>
    <my-search></my-search>
    
    <scroll-view class="uni-slidingMenu" scroll-x >
    	<view  :class="['slidingMenuList',activeIndex==index?'active':'']" v-for="(item, index) in list" :key="index" @click="getActive(index)" v-cloak>{{ item }}</view>
    </scroll-view>
    
    
<!--   <view class="top-bar">
      <scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" show-scrollbar="true">
      	<view id="demo1" class="scroll-view-item_H active">男士服装</view>
      	<view id="demo2" class="scroll-view-item_H ">女士服装</view>
      	<view id="demo3" class="scroll-view-item_H ">美妆护肤</view>
        <view id="demo4" class="scroll-view-item_H ">手机数码</view>
        <view id="demo5" class="scroll-view-item_H ">茶酒美食</view>
        <view id="demo6" class="scroll-view-item_H ">珠宝饰品</view>
        <view id="demo7" class="scroll-view-item_H ">图书文具</view>
        <view id="demo8" class="scroll-view-item_H ">体育用品</view>
      </scroll-view>
    </view>
    -->
    
    
 <view class="goods-items">
      <navigator class="goods-item" v-for="(item,i) in goodGoodsList" :key="i" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
        <image :src="item.goods_img"></image>
        <view class="goods-title">
          <text>{{item.goods_name}} </text>
        </view>
        <view class="goods-price">
          <text>${{item.goods_price}}</text>
        </view>
      </navigator>
    </view>

	</view>
</template>
 
<script>
	export default {
		data () {
			return {
        sort_id:1,
        list: ['女士服装', '男士服装', '美妆护肤', '手机数码', '茶酒美食', '珠宝饰品', '图书文具', '体育用品'],
        activeIndex:"0",
        goodGoodsList:[]
      }
		},
    onLoad(val) {
      // 获取轮播图数据的方法
      console.log(val.goods_id)
      this.sort_id = val.goods_id
      this.getgoodGoodsList()
      this.getActive(val.goods_id - 1)
    },
		methods:{
      getActive(index){
        console.log(index)
        this.sort_id = index + 1;
      	this.activeIndex=index;
      	this.$emit("changes",this.activeIndex);
        this.getgoodGoodsList()
      },
      async getgoodGoodsList() {
        const {data:res} = await uni.$http.post(`/MarketGoodsListServlet?sort_id=${this.sort_id}`)
        console.log(res)
        this.goodGoodsList = res
      }
    }
		}
	
</script>
 
<style lang="scss" scoped>
  .scroll-view_H {
    display: flex;
		flex: 1;
    white-space: nowrap;
    border-bottom: 1px solid #aaaaaa;
    
    .scroll-view-item_H {
      margin: 5px;
      width: 160rpx;
      height: 50rpx;
      display: inline-block;
    }
    .active {
      color: red;
    }
  }
  
  
  
  .goods-items {
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
  
  
  
  page{
  		background-color: #fafafa;
  	}
  /* 滑动菜单栏的总内容区域 */
  .uni-slidingMenu {
  	width: 100%;
  	white-space: nowrap;
  	height: 80rpx;
  	background-color: #FFFFFF;
  }
  /* 循环显示的菜单栏 */
  .slidingMenuList {
  	height: 80rpx;
  	line-height: 80rpx;
  	display: inline-block;
  	font-size: 24rpx;
  	margin-left: 60rpx;
  }
  .slidingMenuList:last-child{
  	margin-right: 60rpx;
  }
  /* 点击选中菜单栏时的样式 */
  .active {
  	color: pink;
  	font-size: 28rpx;
  	margin-left: 80rpx;
  	border-bottom: 2rpx solid pink;
  	box-sizing: border-box;
  }
  
</style>

