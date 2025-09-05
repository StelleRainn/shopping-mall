// 此处存放所有与login界面相关的请求

import request from '@/utils/request'

// 1. 请求图片验证码
export const getValidCode = () => {
  return request.get('captcha/image')
}

// 2. 请求短信验证码
export const getSMSCode = (captchaCode, captchaKey, mobile) => {
  return request.post('captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 3. 登录
export const userLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
