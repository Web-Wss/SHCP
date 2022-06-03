<template>
  <view class="login-box">
<uni-forms-item label="用户名" required>
						<uni-easyinput v-model="baseFormData.username"  placeholder="请输入用户名" />
					</uni-forms-item>
					<uni-forms-item label="密码" required>
            <uni-easyinput type="password" v-model="baseFormData.password" placeholder="请输入密码"></uni-easyinput>
					</uni-forms-item>
          
          <view class="btn">
            <button  type="primary" @click="login()">登录</button>
          </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

        baseFormData:{
          username:'',
          password:''
        }
      }
    },
    methods: {
       login() {
        uni.$http.post(`/LoginServlet?username=${this.baseFormData.username}&password=${this.baseFormData.password}`).then(res=>{
          console.log(res)
          uni.setStorageSync('token',res.data.token)
          uni.setStorageSync('username',res.data.result.user_username)
          uni.setStorageSync('user_id',res.data.result.user_id)
          uni.setStorageSync('user_img',res.data.result.user_img)
          uni.setStorageSync('user_nickname',res.data.result.user_nickname)
          // 登录成功跳转到首页
          uni.switchTab({
            url:'../../pages/home/home'
          })
        }).catch(err=>{
          console.log(err)
        })
      },
    }
  }
</script>

<style lang="scss">
  .login-box{
    width: 100%;
    height: 100vh;
    uni-forms-item {
      margin: 100rpx;
    }
 .btn {
   margin: 0 auto;
   width: 80%;
 }
  }
</style>
