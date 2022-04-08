<template>
  <view>
    <uni-section title="物品基本信息" type="line" padding>
    			<view class="example">
    							<!-- 基础用法，不包含校验规则 -->
    							<uni-forms ref="baseForm" :modelValue="baseFormData">
    								<uni-forms-item label="商品名称" required>
    									<uni-easyinput v-model="baseFormData.name" placeholder="请输入商品名称" />
    								</uni-forms-item>
    								<uni-forms-item label="商品价格" required>
    									<uni-easyinput v-model="baseFormData.price" placeholder="请输入商品价格" />
    								</uni-forms-item>
    								<uni-forms-item label="商品描述">
    									<uni-easyinput type="textarea" v-model="baseFormData.introduction" placeholder="请输入商品描述" />
    								</uni-forms-item>
                    <view class="example-body">
                    	<uni-file-picker limit="5" title="最多选择5张图片"></uni-file-picker>
                    </view>
    							</uni-forms>
                  <button type="primary" @click="submit('valiForm')">一键发布</button>
    						</view>
    </uni-section>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 基础表单数据
        				baseFormData: {
        					name: '',
                  price:'',
        					introduction: '',
        				},
      };
    }
  }
</script>

<style lang="scss">

</style>
