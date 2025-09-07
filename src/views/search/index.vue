<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search v-model="searchValue" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="goSearch(searchValue)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length">
      <div class="title">
        <span>最近搜索</span>
        <van-icon
          name="delete-o" size="16"
          @click="deleteHistory"/>
      </div>
      <div class="list" >
        <div class="list-item"
          v-for="(item, index) in history" :key="index"
          @click="goSearch(item)" >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistory, setHistory } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      history: getHistory(),
      searchValue: ''
    }
  },
  methods: {
    goSearch (searchItem) {
      // 数组 indexOf 方法：返回数组中指定元素的下标，若无则返回-1
      const index = this.history.indexOf(searchItem)
      if (index !== -1) {
        this.history.splice(index, 1)
      }
      this.history.unshift(searchItem)
      setHistory(this.history)

      // path 路径跳转与传参
      this.$router.push(`./search-list?search=${searchItem}`)
    },
    deleteHistory () {
      this.history = []
      setHistory([])
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
