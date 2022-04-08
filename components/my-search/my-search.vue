<template>
  <view>
    <view class="my-search-container" :style="{'background-color':bgcolor}">
      <view class="my-search-box" :style="{'border-radius':raduis + 'px'}" @click="searchBoxHandler">
        <uni-icons type="search" size="17"></uni-icons>
        <text class="placeholder">搜索</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props:{
      // 背景颜色
      bgcolor:{
        type:String,
        default:'#f6f6f6'
      },
    // 圆角尺寸
      raduis:{
        type:Number,
        default:18
      }
    },
    name:"my-search",
    data() {
      return {
        
      };
    },
    methods: {
      searchBoxHandler() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container {
  // background-color: #c00000;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.my-search-box {
  height: 36px;
  background-color: #ffffff;
  // border-radius: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .placeholder {
    font-size: 15px;
    margin-left: 5px;
  }
}
</style>
