import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

var url = '/wechat/sellers/';
/**
*登录校验
*/
export const getLogin = (tel,password) =>fetch('/seller/login',{
	tel,
	password
},'POST');
/**
*常购清单列表
*/
export const getOfenSalesList = (token, startRow, endRow) => fetch('/wechat/sellers/getOfenSalesList', {
	token,
	startRow,
	endRow
}, 'POST');

/**
*创建订单校验
*/
export const WXcreateInOrderCheck = (token, buyInfo, lng, lat, warehouseCode) => fetch('/wechat/sellers/WXcreateInOrderCheck', {
	token,
	buyInfo,
	lng,
	lat,
	warehouseCode
}, 'POST');

/**
*创建订单
*/
export const WXcreateInOrder = (token, buyInfo, addressId, remark, payChannel, freeSign, ladingBill, warehouseCode, voucherCode, voucherRecordIds, empoyeeId) => fetch('/wechat/sellers/WXcreateInOrder', {	
	token,
	buyInfo,
	addressId,
	remark,
	payChannel,
	freeSign,
	ladingBill,
	warehouseCode,
	voucherCode,
	voucherRecordIds,
	empoyeeId
}, 'POST');

/**
*重新计算物流费
*/
export const calculateLogistics = (token, lng, lat, warehouseCode, buyMoney) => fetch('/wechat/sellers/calculateLogistics', {
	token,
	lng,
	lat,
	warehouseCode,
	buyMoney
}, 'POST');

/**
*支付时二次校验
*/
export const payInOrderCheck = (token, buyInfo, orderId, voucherCode, warehouseCode) => fetch('/wechat/sellers/payInOrderCheck', {
	token,
	buyInfo,
	orderId,
	voucherCode,
	warehouseCode
}, 'POST');

/**
*资金池校验
*/
export const WXcheckbalance = (token, orderId, flag) => fetch('/wechat/sellers/WXcheckbalance', {
	token,
	orderId,
	flag
}, 'POST');

/**
*支付密码校验
*/
export const validatePayPwd = (token, password) => fetch('/wechat/sellers/validatePayPwd', {
	token,
	password
}, 'POST');

/**
 * 重置支付密码
 */

export const resetPayPwd = (token, phone,password) => fetch('/wechat/sellers/resetPayPwd', {
	token: token,
	tel: phone,
	password:password
}, 'POST');

/**
*全余额支付
*/
export const WXbalanceFullPay = (token, orderId) => fetch('/wechat/sellers/WXbalanceFullPay', {
	token,
	orderId
}, 'POST');

/**
*货到付款——支付订金为0
*/
export const payOrderUseNoneMoney = (token, orderId) => fetch('/wechat/sellers/payOrderUseNoneMoney', {
	token,
	orderId
}, 'POST');

/**
*翼分期
*/
export const WXcreditPay = (token, orderId) => fetch('/wechat/sellers/WXcreditPay', {
	token,
	orderId
}, 'POST');

/**
*去付款：清空订单中已支付的余额缓存（用于混合支付时重置订单余额）
*/
export const WXcheckThirdPartyPay = (token, orderId) => fetch('/wechat/sellers/checkThirdPartyPay', {
	token,
	orderId
}, 'POST');

/**
 * 获取供应商列表
 */
export const getSupplierList = (startRow, endRow,token) => fetch('/wechat/sellers/getMyMechisamList', {
	startRow: startRow,
	endRow: endRow,
	token: token
},'POST');

/**
 * 找回密码获取短信验证码
 */

export const mobileCode = phone => fetch('/wechat/sellers/sendCodeByTel', {
	tel: phone
}, 'POST');

/**
 * 注册获取短信验证码
 */

export const checkRegCode = phone => fetch('/wechat/sellers/sendRegCode', {
	tel: phone
}, 'POST');

/**
 * 验证短信验证码
 */

export const checkCode = (phone,checkCode) => fetch('/wechat/sellers/checkCode', {
	tel: phone,
	code:checkCode
}, 'POST');

/**
 * 重置密码
 */

export const resetPwd = (phone,password) => fetch('/wechat/sellers/resetPwd', {
	tel: phone,
	password:password
}, 'POST');

/**
 * 添加地址
 */

export const postAddAddress = (token, contacter, tel, address, lng, lat, mainAddress, isDefault, id) => fetch('/wechat/sellers/editAddress', {
	token,
	contacter,
	tel,
	address,
	lng,
	lat,
	mainAddress,
	isDefault,
	id,	
}, 'POST');

/**
 * 修改默认地址
 */
export const changeDefault = (addressId,token) => fetch('/wechat/sellers/setDefaultAddress', {
	addressId: addressId,
	token: token,
	
}, 'POST');

/**
 * 删除地址
 */
export const delAddress = (addressId,token) => fetch('/wechat/sellers/delAddress', {
	addressId: addressId,
	token: token,
	
}, 'POST');
/**
 * 通过地址id获取选中地址
 */
export const getSellerTarAddress = (addressId,token) => fetch('/wechat/sellers/getSellerTarAddress', {
	addressId: addressId,
	token: token,
	
}, 'POST');

/**
 * 获取商家默认收货地址
 */

export const getDefaultAddress = (token) => fetch(url+ 'getDefaultSellerAddress', {
	token
}, 'POST');

/**
 * 获取全部订单列表
 */

export const getOrderList = (token, startRow,endRow) => fetch(url+ 'getAllInOrderList', {
	token,
	startRow,
	endRow
}, 'POST');

/**
 * 获取待支付订单列表
 */

export const getNoPayList = (token, startRow,endRow) => fetch(url+ 'getNoAndPayInOrderList', {
	token,
	startRow,
	endRow
}, 'POST');

/**
 * 获取待发货订单列表
 */

export const getNoInspectionList = (token, startRow,endRow) => fetch(url+ 'getNoInspectionInOrderList', {
	token,
	startRow,
	endRow
}, 'POST');

/**
 * 获取待收货订单列表
 */

export const getNoSureList = (token, startRow,endRow) => fetch(url+ 'getNoSureInOrderList', {
	token,
	startRow,
	endRow
}, 'POST');

/**
 * 获取已完成订单列表
 */

export const getCompletedList = (token, startRow,endRow) => fetch(url+ 'getCompletedInOrderList', {
	token,
	startRow,
	endRow
}, 'POST');

/**
 * 获取订单详情
 */

export const getOrderDetail = (token, orderId) => fetch(url+'getInOrderInfo',{
	token,
	orderId
}, 'POST');



/**
*个人中心里编辑地址获取所有地址列表
*/

export const getAddressList = (token) => fetch('/wechat/sellers/getSellerAddress',{
	token: token
},'POST');

/**
 * 账号密码登录
 */
export const accountLogin = (userName, password) => fetch(url+'login', {userName, password}, 'POST');

/**
 * 修改登录密码
 */

export const changePassword = (oldPassword, newPassword,token) => fetch(url+'/modifyPwd', {oldPassword, newPassword,token}, 'POST');

/**
 * 修改支付密码
 */
export const changePayPassword = (oldPassword, newPassword,token) => fetch(url+'/modifyPayPwd', {oldPassword, newPassword,token}, 'POST');


/**
 * 注册
 */
export const apiSellerAdd = (tel, recommenderPhone, trueName, businessName, detailedAddress) => fetch(url+'apiSellerAdd', {tel, recommenderPhone, trueName, businessName, detailedAddress}, 'POST');

/**
 * 修改店铺头像
 */
export const editSellerHeadImg = (imgUrl,token) => fetch(url+'editSellerHeadImg', {imgUrl,token}, 'POST');

/**
 * 消息中心-------获取某商户下的新供应商请求数量
 */
export const getNewMechanismsNum =(token,mechanismNum) => fetch(url+'getMyNewMechisamNum',{
	token,
	mechanismNum
},'POST');

/**
 * 消息中心--收到的提货券数量
 */
export const getReceiveVouchersNum =(token,newMechisamNum,newReceiveVoucherNum) => fetch(url+'getReceiveVoucherNum',{
	token,
	newMechisamNum,
	newReceiveVoucherNum
},'POST');

/**
 * 消息中心-------获取某商户下的供应商请求列表
 */
export const getMechanismList =(token,startRow,endRow) => fetch(url+'getMyMechisamRequest',{
		token,
		startRow,
		endRow
},'POST');

/**
 * 消息中心--收到的提货券列表(未激活）
 */
export const getVoucherList =(token,startRow,endRow) => fetch(url+'getReceiveVoucherList',{
		token,
		startRow,
		endRow
},'POST');
/**
 * 积分商城--提货券列表
 */
export const shop_getVoucherList =(token,startRow,endRow) => fetch(url+'getVoucherList',{
		token,
		startRow,
		endRow
},'POST');


/**
 * 门票（兑换券）详情
 */
export const voucherDetail =(token,voucherCode) => fetch(url+'voucherDetail',{
		token,
		voucherCode
},'POST');

/**
 * 获得某一条兑换记录（通过exchangeVoucherId）
 */
export const memberTicket =(token,exchangeVoucherId) => fetch(url+'memberTicket',{
		token,
		exchangeVoucherId
},'POST');


/**
 * 久币购买礼券或者门票
 * String memberId,String jiubiNum,String voucherCode
 */
export const WXexchangeVoucher =(token,memberId,jiubiNum,voucherCode) => fetch(url+'WXexchangeVoucher',{
		token,
		memberId,
		jiubiNum,
		voucherCode
	
},'POST');

/**
 * 查看兑换凭证
 */
export const ExchangeValidate =(token,voucherCode) => fetch(url+'WXgetExchangeValidateCode',{
		token,
		voucherCode
},'POST');

/**
 * 兑换券激活绑定
 */
export const bindVoucher =(token,memberId,voucherCode,exchangeCode) => fetch(url+'WXbindVoucher',{
		token,
		memberId,
		voucherCode,
		exchangeCode
},'POST');

/**
 * 获取商家首页内容
 */
export const getSellerIndex =(token) => fetch(url+'getSellerIndex',{token},'POST');

/**
 * 查询商品列表
 */
export const searchGoodsByKey =(token,key,brandId,sort,order,warehouseCode,startRow,endRow) => fetch(url+'searchGoodsByKey',{
	token,
	key,
	brandId,
	sort,
	order,
	warehouseCode,
	startRow,
	endRow
},'POST');

/**
 * 领取兑换门票
 */
export const voucherSellers =(token,startRow,endRow,voucherCode,address) => fetch(url+'WXgetReceiveVoucherSellers',{
	token,
	startRow,
	endRow,
	voucherCode,
	address
},'POST');

/**
 * 领取兑换门票给指定商家
 */
export const setExchangeTickets =(token,sellerId,voucherCode) => fetch(url+'WXsetExchangeTickets',{
	token,
	sellerId,
	voucherCode
},'POST');

/**
 * 查询商品详情
 */
export const getGoodsDetails =(token,goodsId,promotionId) => fetch(url+'getGoodsDetils',{
	token,
	goodsId,
	promotionId
},'POST');

/**
 * 查询我的可用提货券数量
 */
export const getMyEnableVoucherNum =(token) => fetch(url+'getMyEnableVoucherNum',{
	token

},'POST');

/**
 * 查询我的可用提货券
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
export const getMyEnableVoucher =(token,pageSize,pageNo) => fetch(url+'myEnableVoucherList',{
	token,
	pageSize,
	pageNo
},'POST');
/**
 * 查询我的不可用提货券
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
export const getMyDisEnableVoucherList =(token,pageSize,pageNo) => fetch(url+'myDisEnableVoucherList',{
	
	token,
	pageSize,
	pageNo
},'POST');
/**
 * 我的钱包--金额、久币信息
 * 获取商户当前级别到下一级别需要的消费金额
 */
export const getNextReputationIndex =(token) => fetch(url+'getNextReputationIndex',{	
	token	
},'POST');
/**
 * 查询我的提货券
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
export const getMyVoucherList =(token,pageSize,pageNo) => fetch(url+'myEnableVoucherList',{
	token,
	pageSize,
	pageNo
},'POST');
/**
 * 查询我的门票
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
export const getMyTicketList =(token,pageSize,pageNo) => fetch(url+'myEnableVoucherList',{
	token,
	pageSize,
	pageNo
},'POST');


/**
 * 查询品牌列表
 */
export const getAllBrand =(token) => fetch(url+'getAllBrand',{
	token
},'POST');

/**
 * 读取用户openId
 */

export const getOpenId = (token) => fetch(url+'getOpenId',{
	token
},'POST');
/**
 * 资产明细
 */
export const getSellerAccountList =(token,startRow,endRow) => fetch(url+'getSellerAccountList',{
	token,
	startRow,
	endRow
},'POST');


/**
 * 商家--兑换券记录
 */
export const getMemberVouvherRecord =(token,memberId,start,end) => fetch(url+'WXgetMemberVouvherRecord',{
	token,
	memberId,
	start,
	end
},'POST');
/**
 * 兑换管理--我的门票兑换
 */
export const getExchangeValidateList =(token) => fetch(url+'getExchangeValidateList',{
	token

},'POST');



/**
 * 创建充值订单
 */
export const createSellerRechargeOrder =(token,price) => fetch(url+'createSellerRechargeOrder',{
	token,
	price
},'POST');

/**
 * 微信充值
 */
export const getRechargePayDate =(token,openId,rechargeId) => fetch('/pay/getRechargePayDate',{
	token,
	openId,
	rechargeId
},'POST');

/**
 * 充值成功后，业务操作。
 */ 
export const getRechargeOrderState =(token,orderId) => fetch('/pay/getRechargeOrderState',{
	token,
	orderId
},'POST');


/**
*微信支付
*/
export const getPayDate = (token, openId, orderId) => fetch('/pay/getPayDate', {
	token,
	openId,
	orderId
}, 'POST');

/**
 * 第一次支付，切换支付方式
 */
export const WXupdatePayChannel =(token,orderId,payChannel,payType) => fetch(url+'/WXupdatePayChannel',{
	token,
	orderId,
	payChannel,
	payType
},'POST');


/**
 * 微信支付成功回调，业务逻辑操作
 */
export const getInOrderState =(token,orderId) => fetch('/pay/getInOrderState',{
	token,
	orderId
},'POST');

/**
 * 取消订单，微信退款
 */
export const cancelMyInOrder =(token,orderId) => fetch(url+'cancelMyInOrder',{
	token,
	orderId
},'POST');

/**
 * 门票列表
 */
export const getTicketList =(token,startRow,endRow) => fetch(url+'WXgetTicketList',{
	token,
	startRow,
	endRow
},'POST');

/**
 * 我的已领门票
 */
export const myEnableTicketVoucherList =(token) => fetch(url+'WXmyEnableTicketVoucherList',{
	token
},'POST');

/**
 * 我的未领门票
 */
export const myDisableTicketVoucherList =(token) => fetch(url+'WXmyDisableTicketVoucherList',{
	token
},'POST');

/**
 * 商品分类，一级目录查询
 */
export const findFirstCategory =(token) => fetch(url+'findFirstCategory',{
	token
},'POST');

/**
 * 商品分类，根据一级目录id，查询二级目录
 */
export const findSecondCategory =(token,categoryId) => fetch(url+'findSecondCategory',{
	token,
	categoryId
},'POST');

/**
 * 根据目录id，查找目录下所有商品库商品	
 */
export const findGoodsByCategory =(token,categoryId,plevel,sort,order,startRow,endRow) => fetch(url+'findGoodsByCategory',{
	token,
	categoryId,
	plevel,
	sort,
	order,
	startRow,
	endRow
},'POST');

/**
 * 根据目录id，查找目录下所有商品库商品	
 */
export const getJsConfig =(token,url) => fetch('/wechat/sellers/getJsConfig',{
	token,
	url
},'POST');

/**
 * 分享
 */
export const shareUrl =(url1, url2) => fetch('/wechat/sellers/shareUrl',{ url1, url2 });


/**
 * 查询商户基本信息
 */
export const getSellerInfo =(token) => fetch('/wechat/sellers/getNextReputationIndex',{
	token
},'POST');

/**
 * 上传商户头像
 */
export const uploadheadImage =(file,type,sellerId) => fetch('/api/common/upload',{
	file,type,sellerId
},'POST');
/**
 *  加载时调用 一级菜单
 */
export const getShopOne =() => fetch('/supplier/getShopOneA',{
	
},'POST');

/**
 *  点击一级菜单时调用 加载二级菜单
 */
export const getShopTwo=(sid)=> fetch('/supplier/getShopTwoA',{
	sid
},'POST');

/**
 * 加载时调用 显示所有商品信息
 * 智能排序
 */
export const getShopMessage=(sid)=>fetch('supplier/getShopMessageA',{
	sid
},'POST');

/**
 * 
 * 价格降序
 */
export const getShopPaixu1=(sid)=>fetch('supplier/getShopPaixu1A',{
	sid
},'POST');

/**
 * 
 * 价格升序
 */
export const getShopPaixu2=(sid)=>fetch('supplier/getShopPaixu2A',{
	sid
},'POST');

/**
 * 
 * 销量排序
 */
export const getShopPaixu3=(sid)=>fetch('supplier/getShopPaixu3A',{
	sid
},'POST');