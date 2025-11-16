<template>
  <div class="login">
    <van-nav-bar
      title="会员登录"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="telephone" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="validCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="validCodeImg" :src="validCodeImg" @click="getCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getSMSCode">
            {{ remainingTime === waitTime ? '获取验证码' : (remainingTime + 1) + '秒后重新获取验证码' }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>

// 按需导入
import { getSMSCode, getValidCode, userLogin } from '@/api/login'
// import { Toast } from 'vant'

export default {
  name: 'LoginPage',
  data () {
    return {
      // 图片验证码相关
      validCode: '',
      validCodeKey: '',
      validCodeImg: '',

      // 手机验证码相关
      timer: null,
      waitTime: 60,
      remainingTime: 60,
      telephone: '',
      smsCode: ''

    }
  },
  async created () {
    await this.getCode()
  },
  methods: {
    // 发请求，获取图片验证码
    async getCode () {
      const res = await getValidCode()
      const { data: { base64, key } } = res.data
      this.validCodeKey = key // 唯一图片标识
      this.validCodeImg = base64 // 图片地址
      // Toast('按需导入，四处可用')
      // this.$toast('挂载到了Vue的原型链上')
    },

    // 对手机号和图片验证码进行校验
    validationFn () {
      if (!/^1[3-9]\d{9}$/.test(this.telephone)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.validCode)) {
        this.$toast('人机验证码有误')
        return false
      }
      return true
    },

    // 获取短信验证码
    async getSMSCode () {
      if (!this.validationFn()) return

      // 确保没有其他定时器干扰（防止连点）以及处于“可获取验证码状态”（两个标记时间相等）
      if (!this.timer && this.remainingTime === this.waitTime) {
        // 此 getSMSCode 方法来自 @/api/login，注意区分
        await getSMSCode(this.validCode, this.validCodeKey, this.telephone)
        this.$toast.success('短信验证码发送成功')
        this.timer = setInterval(() => {
          this.remainingTime--
          if (this.remainingTime < 0) {
            clearInterval(this.timer)
            this.remainingTime = this.waitTime
          }
        }, 1000)
      }
    },

    // 登录
    async login () {
      if (!this.validationFn()) return
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('验证码有误')
      }

      const res = await userLogin(this.telephone, this.smsCode)
      this.$toast('登录成功')

      // res.data.data 为一个对象，包含userId和token，传递该对象作为payload
      this.$store.commit('user/setUserInfo', res.data.data)

      // await this.$router.push({ path: '/home' })
      // 更新 → 若用户从其他页面因需要登录跳转而来，在成功登录后应返回对应页面
      const destination = this.$route.query.backUrl || '/home'
      this.$router.replace({
        path: destination
      })
    }
  },
  // 清除页面中的定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
