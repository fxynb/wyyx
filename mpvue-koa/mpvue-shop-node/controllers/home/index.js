const { mysql } = require ('../../mysql')

module.exports = async (ctx) => {
  // 轮播图
  const banner = await mysql('nideshop_ad').where({
    ad_position_id:1
  }).select()

  //tab 类型
  const channel = await mysql('nideshop_channel').select()

  const brandList = await mysql('nideshop_brand').select()

  ctx.body = {
    'banner':banner,
    'channel':channel,
    'brandList':brandList
  }
}