<template>
	<scroll-view class="uni-slidingMenu" scroll-x :style="{background: color}">
		<view  :class="['slidingMenuList',activeIndex==index?'active':'']" v-for="(item, index) in list" :key="index" @click="getActive(index)" v-cloak>{{ item }}</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'uniSlidingMenu',
	props:{
		// 列表菜单
		list:{
			type: Array,
      default:['男士服装', '女士服装', '美妆护肤', '手机数码', '茶酒美食', '珠宝饰品', '图书文具', '体育用品']
		},
		color:{
			type:String,
			default:'#777777'
		}
		
	},
	data() {
		return {
			list: ['首页1', '首页2', '首页3', '首页4', '首页4', '首页4', '首页4', '首页4'],
			activeIndex:"0"
		};
	},
	methods:{
		getActive(index){
			this.activeIndex=index;
			this.$emit("changes",this.activeIndex);
		}
	}
};
</script>

<style>
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
