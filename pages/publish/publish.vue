<template>
  <view>
    <uni-section title="物品基本信息" type="line" padding>
    			<view class="example">
    							<!-- 基础用法，不包含校验规则 -->
    							<uni-forms ref="baseForm" :modelValue="baseFormData">
    								<uni-forms-item label="商品名称" required>
    									<uni-easyinput v-model="baseFormData.name" placeholder="请输入商品名称" />
    								</uni-forms-item>
                    <uni-forms-item label="商品分类" required>
                      				<uni-combox :candidates="baseFormData.candidates" placeholder="请选择所商品所属分类" v-model="baseFormData.city"></uni-combox>
                  
                    </uni-forms-item>
    								<uni-forms-item label="商品价格" required>
    									<uni-easyinput v-model="baseFormData.price" placeholder="请输入商品价格" />
    								</uni-forms-item>
    								<uni-forms-item label="商品描述" required>
    									<uni-easyinput type="textarea" v-model="baseFormData.introduction" placeholder="请输入商品描述" />
    								</uni-forms-item>
                   <!-- <view class="example-body">
                    	<uni-file-picker v-model="imageValue" 	@fail="fail"  limit="5" title="最多选择5张图片"></uni-file-picker>
                    </view> -->
<!--                    <image class="img_icon" v-if="imgSrc" :src="imgSrc" @tap="onGetImgClick"></image>
                    <view class="box" v-else  @tap="onGetImgClick"></view> -->

                    
                
    							</uni-forms>
                  <button type="primary" @click="submit()">一键发布(上传单张图片)</button>
    						</view>
    </uni-section>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        imgSrc: 'https://s1.ax1x.com/2022/03/16/qpRzGT.jpg',//图片地址
        // 用户id
          user_id:'',
        // 基础表单数据
          imageValue:[],
        				baseFormData: {
        					name: '',//名称
                  price:'',//价格
                  candidates: ['女生服饰', '男生服饰', '美妆护肤', '手机数码', '食品饮料', '珠宝饰品','图书文具', '体育用具'],
                   // ['女生服饰', '男生服饰', '美妆护肤', '手机数码', '食品饮料', '珠宝饰品','图书文具', '体育用具'],
                  city: '',//分类
        					introduction: '',//描述
        				},
      };
    },
    onLoad() {
      // 判断用户是否登录
      let token = uni.getStorageSync('token');
      if(token.length == 0) {
        uni.redirectTo({
          url:'../../subpkg/login/login'
        })
      }
      // 将username赋值username
      this.user_id = uni.getStorageSync('user_id')
    },
    methods:{
      submit() {
      if(this.baseFormData.city == '女生服饰') {
        this.baseFormData.city = 1
      }else if(this.baseFormData.city == '男生服饰') {
        this.baseFormData.city = 2
      }else if(this.baseFormData.city == '美妆护肤') {
        this.baseFormData.city = 3
      }else if(this.baseFormData.city == '手机数码') {
        this.baseFormData.city = 4
      }else if(this.baseFormData.city == '食品饮料') {
        this.baseFormData.city = 5
      }else if(this.baseFormData.city == '珠宝饰品') {
        this.baseFormData.city = 6
      }else if(this.baseFormData.city == '图书文具') {
        this.baseFormData.city = 7
      }else if(this.baseFormData.city == '体育用具') {
        this.baseFormData.city = 8
      }else {
        this.baseFormData.city = ''
      }
      if(this.user_id == '' || this.baseFormData.city == '' || this.baseFormData.name == '' || this.baseFormData.price == '' || this.baseFormData.introduction == '') {
        uni.showToast({
        	title: '请将表单信息填写完整',
        	duration: 2000
        });
      }else {
        uni.chooseImage({
            success: (res) => {
                let tempFilePaths = res.tempFilePaths;
                tempFilePaths.forEach((item) => {
                    uni.uploadFile({
                        url: `http://massz.shop/Interfaces_web-1.0-SNAPSHOT/UploadImgServlet?user_id=${this.user_id}&value=${this.baseFormData.city}&goods_name=${this.baseFormData.name}&goods_price=${this.baseFormData.price}&goods_describe=${this.baseFormData.introduction}`, //服务器地址
                        fileType: "image", //ZFB必填,不然报错
                        filePath: item, //这个就是咱们下面拍照返回或者先中照片返回的数组
                        name: 'file',
                        success: (uploadFileRes) => {
                            uni.showToast({
                            	title: '发布成功!',
                            	duration: 2000
                            });
                            this.baseFormData.name = '',
                            this.baseFormData.price = '',
                            this.baseFormData.introduction = '',
                            this.baseFormData.city = ''
                           
                        }
                    });
                })
            }
        });
      }

      }

    }
  }
</script>

<style lang="scss">

</style>
