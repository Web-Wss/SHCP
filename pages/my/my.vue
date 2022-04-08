<template>
  <view>
    <!-- logo+name -->
    <view class="image-name">
      <view class="image">
        <image src="https://img2.baidu.com/it/u=1489746086,405631587&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360"></image>
      </view>
      <view class="name">
        <text>前端菜鸟</text>
      </view>
    </view>
    
    <!-- 我的发布--我的收藏 -->
    <view class="publish-collection">
      <view class="two">
        <view class="image-icon">
          <uni-icons type="list" size="35" color="green"></uni-icons>
        </view>
        <view class="text">
          我的发布
        </view>
      </view>
      <view class="two">
        <view class="image-icon">
          <uni-icons type="heart" size="35" color="green"></uni-icons>
        </view>
        <view class="text">
          我的收藏
        </view>
      </view>
    </view>
    
    <!-- 列表 -->
    <view class="my-lists">
      <uni-section title="工具" type="line">
      			<uni-list>
      				<uni-list-item title="收货地址"  showArrow
      					thumb="/static/my-icons/dizhi.png"
      					thumb-size="sm" />
              <uni-list-item title="意见反馈"  showArrow
              	thumb="/static/my-icons/yijianfankui.png"
              	thumb-size="sm" />
              <uni-list-item title="协议说明"  showArrow
              	thumb="/static/my-icons/shuoming.png"
              	thumb-size="sm" />
              <uni-list-item title="分享"  showArrow
              	thumb="/static/my-icons/fenxiang.png"
              	thumb-size="sm" />
              <uni-list-item title="设置"  showArrow
              	thumb="/static/my-icons/shezhi.png"
              	thumb-size="sm" />
              <uni-list-item title="退出登录"  showArrow
              	thumb="/static/my-icons/tuichu.png"
              	thumb-size="sm" />
                

      			</uni-list>
      		</uni-section>
      
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.image-name {
  padding: 20rpx;
  display: flex;
  width: 100%;
  height: 100rpx;
  background-color: white;
  
  .image {
    border-radius: 25px;
    width: 100rpx;
    height: 100rpx;
    image {
      border-radius: 25px;
      width: 100rpx;
      height: 100rpx;
    }
  }
  .name {
    margin-left: 20rpx;
    line-height: 100rpx;
  }
}

.publish-collection {
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  
  margin-top: 15rpx;
  width: 100%;
  height: 180rpx;
  // background-color: red;
  
  .two {
    border-radius: 15px;
    margin: 0rpx 9rpx;
    width: 48%;
    height: 180rpx;
    background-color: white;
    .image-icon {
      margin-top: 20rpx;
      text-align: center;
    }
    .text {
      text-align: center;
      font-size: 40rpx;
      // line-height: 180rpx;
    }
    
  }
  

  
  
}

</style>
