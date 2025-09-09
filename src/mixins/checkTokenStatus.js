export default {
  methods: {
    checkTokenStatus () {
      const token = this.$store.state.user.userInfo.token
      if (!token) {
        // console.log('no token, logging in...')
        this.$dialog.confirm({
          title: '温馨提示',
          message: '需要先登录才能继续哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // replace 方法能够销毁当下页面，相比push方法，避免了用户返回逻辑不合理的情况
            this.$router.replace({
              path: '/login',
              // 传入一个backUrl参数，实现在登录后返回当前页面（需要在login页面修改相关逻辑）
              // fullPath可以提供当前的路径，包含参数
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            this.$dialog.close()
          })
        return true
      }
      return false
    }
  }

}
