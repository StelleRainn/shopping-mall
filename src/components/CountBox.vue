<template>
  <div class="count-box">
    <button class="minus" @click="changeConsumeCount(-1)">-</button>
    <input class="inp" type="text" :value="value" @change="handleChange">
    <button class="add" @click="changeConsumeCount(1)">+</button>
  </div>
</template>

<script>
export default {
  name: 'CountBox',
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 点击 + 或 - 号修改
    changeConsumeCount (flag) {
      if (flag === 1) {
        this.$emit('input', this.value + 1)
      } else {
        if (this.value > 1) {
          this.$emit('input', this.value - 1)
        }
      }
    },

    // 从输入框直接修改（监听 change 事件）
    handleChange (e) {
      const num = Number(e.target.value)
      if (Number.isInteger(num) && num >= 1) {
        this.$emit('input', num)
      } else {
        // 输入不合法，回退
        e.target.value = this.value
      }
    }
  }
}

</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  height: 30px;

  .minus, .add {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: gainsboro;
  }

  .inp {
    width: 40px;
    height: 30px;
    margin: 0 5px;
    text-align: center;
    outline: none;
    border: none;
    background-color: gainsboro;
  }
}

</style>
