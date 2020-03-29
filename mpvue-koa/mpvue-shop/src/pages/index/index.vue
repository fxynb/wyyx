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
  </div>
</template>

<script>
import amapFile from '../../utils/amap-wx.js'
import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return{

    }
  },
  computed:{
    ...mapState(['cityName'])
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
          // console.log(data,'------------')
        },
        fail: function (info) {
          //失败回调
          console.log(info,'111111')
          _this.update({cityName:'北京'})
        }
      })
    },

  }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>