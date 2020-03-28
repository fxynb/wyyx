<template>
  <div class="index">
    <!-- 头部搜索 -->
    <div class="search">
      <div @click="toMappage">{{cityName}}</div>
      <div>
        <input type="text" placeholder="搜索商品">
        <span class="icon"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      cityName:'南昌'
    }
  },
  methods:{
 
    toMappage() {
        let _this = this;
      //通过wx.getSetting 先查询一下用户是否授权“scoped.record”
      wx.getSetting({
        success: (res)=>{

          console.log(res)
          //如果没有同意授权
          if(!res.authSetting['scoped.userLocation']) {
            //打开授权
            wx.openSetting({
              success:res => {
                //获取授权位置信息
                _this.getCityName()
              }
            })
          } else {
            wx.navigateTo({
              url:'/pages/mappage/main',
              success:(res) =>{

              },
              fail:() => {},
              complete: ()=> {}
            });
          }
        },
        fail: (err)=>{
          console.log(err)
        },
        complete: ()=>{}
      });
  },
    getCityName() {
      let _this = this
      
    }
  }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>