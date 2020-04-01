<template>
  <div class="index">
    <!-- 头部搜索 -->
    <div class="search">
      <div @click="toMappage" >{{cityName}}</div>
      <div>
        <input type="text" placeholder="搜索商品">
        <span class="icon"></span>
      </div>
    </div>
    <div class="swiper">
    <!-- swiper 中 indicator-dots是否显示面板指示点  autoplay是否自动轮播 interval轮播时间间隔 circular 循环不停的播放  duration 滑动时长-->
      <swiper class="swiper-container" indicator-dots="true" autoplay="ture" interval="3000" circular="ture" duration="500">
        <block v-for="(item,index) in banner" :key="index">
          <swiper-item class="swiper-item">
          <image class="slide-image" :src="item.image_url" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="channel">
      <div v-for="(item,index) in channel" :key="index">
        <img :src="item.icon_url" alt="" @click="categoryList(item.id)">
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="brand">
      <div class="head">
        品牌制造商直供
      </div>
    </div>
    <div class="content">
      <div v-for="(item,index) in brandList" :key="index">
        <div>
          <p>{{item.name}}</p>
          <p>{{item.floor_price}}元起</p>
        </div>
        <img :src="item.new_pic_url" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import amapFile from '../../utils/amap-wx.js'
import {mapState,mapMutations} from 'vuex'
import {get} from '../../utils/index'
export default {
  data() {
    return{
      banner:[],
      channel:[],
      brandList:[]
    }
  },
  computed:{
    ...mapState(['cityName'])
  },
  //微信小程序不是单页应用，如果接口请求到的数据放在created中，在请求首页数据时也会请求其它页面数据，导致加载缓慢
  mounted() {
    this.getData(),
    this.getCityName()
  },
  methods:{
    ...mapMutations(['update']),
    toMappage() {
      console.log(this.cityName)
        let _this = this;
      //通过wx.getSetting 先查询一下用户是否授权“scoped.record”
      wx.getSetting({
        success: (res)=>{
          // console.log(res)
          //如果没有同意授权
          if(!res.authSetting['scope.userLocation']) {
            //打开授权
            wx.openSetting({
              success:res => {
                //获取授权位置信息
                // _this.getCityName()
              }
            })
          } else {
            wx.navigateTo({
              url: '/pages/mappage/main',
            });
            _this.getCityName()
          }
        },
        fail: (err) => {
          console.log(err)
          
        },
        complete: () => {}
      });
    },
    getCityName() {
      let _this = this
      var myAmapFun = new amapFile.AMapWX({key:'6617199db2db53d287c5b4ae174fe97c'});
      myAmapFun.getRegeo({
        success: function (data) {
          //成功回调
          console.log(data,'------------')
        },
        fail: function (info) {
          //失败回调
          console.log(info,'111111')
          _this.update({cityName:'北京'})
        }
      })
    },
    async getData() {
      const data = await get('/index/index')
      console.log(data)
      this.banner = data.banner
      this.channel = data.channel
      this.brandList = data.brandList
    },
    categoryList(id) {
      wx.navigateTo({
        url:'/page/categoryList/main?id=' + id
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>