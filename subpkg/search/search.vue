<template>
  <view>
    <view class="my-search-container" :style="{'background-color':bgcolor}">
      <view class="my-search-box" :style="{'border-radius':raduis + 'px'}">
        <uni-icons type="search" size="17"></uni-icons>
        <input v-model="input" @input="search()" placeholder="请输入要搜索的商品"/>
      </view>
    </view>
    <!-- 搜索结果 -->
    <view class="result" v-for="(item,i) in GoodsList" :key="i">
      <uni-list-chat clickable @click="gotoDetail(item.goods_id)"  :avatar-circle="true" :title="item.goods_name" :avatar="item.goods_img" :note="item.goods_describe" ></uni-list-chat>
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
        input:'',
        // 搜索到的商品列表
        GoodsList:[],
      };
    },
    methods: {
      // 跳转到商品详情页
      gotoDetail(goods_id) {
        uni.navigateTo({
          url:'../goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      // 获取用户查询的结果
async search() {
  console.log(this.input)
  const {data:res} = await uni.$http.post(`/QueryServlet?searchvalue=${this.input}`)
  console.log("搜素到的商品列表",res)
  this.GoodsList = res
  
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
  position: absolute;
  top: 0;
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
