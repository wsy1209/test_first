/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * defaultImg: 默认商品图片
 */

let baseUrl = 'https://www.zhongjiubianli.cn/blend-framework'; 
let routerMode = 'hash';
let imgBaseUrl = 'image.xinlanjian.com';
let defaultImg = imgBaseUrl+'/sys/default/goodsDefault.png';
let defaultCarouselImg = imgBaseUrl+'/sys/default/carouselDefault.png';
let baseMode ='/blend-framework/wechat/sellers/';


if (process.env.NODE_ENV == 'development') {
	baseMode ='/blend-framework/wechat/sellers/';
//	baseUrl = 'https://www.zhongjiubianli.cn/blend-framework'; 
    baseUrl = 'http://localhost:8080//SupplierSystem'; 
    imgBaseUrl='http://192.168.2.223';
}else if(process.env.NODE_ENV == 'production'){
	baseMode ='/wechat/sellers/';
	baseUrl = 'http://192.168.2.223:8080/blend-framework'; 
    imgBaseUrl='image.xinlanjian.com';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
	defaultImg,
}