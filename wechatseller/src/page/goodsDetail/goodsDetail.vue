<template>
    <div class="info_page">
    	<carousel :responsive="100" :indicators="true" :auto="3000">
            <div>
                <div>
                    <img src="../../images/goods03.png">   
                </div>
            </div>
        </carousel>
        <div class="contain">
            <div v-if="1">
            	<h2 class="name ellipsis">巧乐兹</h2>
                <div class="info_price clear">批发价￥<span class="money">20</span></div>
	            <div class="info_price info_buy clear" >
                    <div class="left">已采购：<span>10盒</span></div>
	                <div class="right">采购数量：<span>20盒</span></div>
	            </div>
	            <multi-spec :item="good" @addCart="addCart" @minusCart="minusCart"></multi-spec>
            </div>

            <!-- 未建立关系时显示↓  -->
            <div v-else>
            	<h2 class="name ellipsis">商品名称</h2>
	            <div class="info_price clear" >
	                批发价￥***
	            </div>
            	<div class="info_price no_relation">
	                <h2>您尚未与该供应商建立合作关系</h2>
	                <div class="box clear">
	                    <div @click="toTel" class="left"><img src="../../images/info_icon1.png" alt="">联系销售代表</div>
	                    <div class="right" @click="toCategoryGoods"><img src="../../images/info_icon2.png" alt="">查找同类商品</div>
	                </div>
	            </div>
            </div>

        </div>

        <div class="goods_commodity">
            <div class="title"><h2>商品信息</h2><hr></div>
            <div class="contain">
                <p>分类：{{good.categoryName}}</p>
                <p>品牌：{{good.brandName}}</p>
                <p>供应商：{{good.mechanismName}}</p>
                <div v-if="good.splitUnitFlag==0">
                    <p v-if="good.cooperation==1">建议零售价：￥10 / 瓶</p>
                    <p v-else>建议零售价：￥*** / 瓶</p>
                </div>
                <div v-else>
                    <p v-if="good.cooperation==1">建议零售价：￥10 / 瓶</p>
                    <p v-else>建议零售价：￥*** / 瓶</p>
                </div>
                <p>保质期：20 天</p>
            </div>
        </div>
        <div class="goods_commodity">
            <div class="title"><h2>图文详情</h2><hr></div>
            <img src="../../images/goods02.png">   
        </div>
    	<hover-cart></hover-cart>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    import headTop from 'src/components/header/head'
    import {getGoodsDetails} from 'src/service/getData'
    import {imgBaseUrl, defaultImg} from 'src/config/env'
    import Carousel from 'vue-m-carousel'
    import multiSpec from 'src/components/common/multiSpec'
    import hoverCart from 'src/components/common/hoverCart'
    import loading from 'src/components/common/loading'
    import alertTip from 'src/components/common/alertTip'

    export default {
        data(){
            return{
                goodsId:0,//商品id
                promotionId:0, //活动id
                good:[],//商品信息
                specifications:[],//规格信息
                goodsDetails:[1,],//图片详情
         		goodsImgs:[1,],//头部图片
         		imgBaseUrl,
         		price:0,//建议零售价
         		referencePrice:0,//规格参考价格（阶梯价第一个价格）
         		num:0,//已采购数量
         		qualityPeriod:0,//保质期
         		rangePrice:[],//零售价区间
         		rangeMoney:[],//批发价区间
         		currentNum:0,//当前采购数量
                defaultImg,
                showLoading: true, //显示加载动画
                alertText: '',
                showAlert: false,
            }
        },
        mounted(){

        },
        components: {
            headTop,
            Carousel,
            multiSpec,
            hoverCart,
            loading,
            alertTip,
        },
        computed: {
            ...mapState([
                'userInfo','cartList',
            ]),
            /**
             * 监听cartList变化，更新当前用户的购物车信息userCart，同时返回一个新的对象
             */
            userCart: function (){
                return Object.assign({},this.cartList[this.userInfo.id]);
            },
        },
        methods: {
            ...mapMutations([
                'ADD_CART','REDUCE_CART'
            ]),
            async loadData() {
               // let response = await getGoodsDetails(this.userInfo.token, this.goodsId, this.promotionId );

            },
            //cart变化的时候重新计算当前商品的数量
            foodNum(item){
                let buyNum = 0;
                return buyNum;
            },
            specGoodNum(spec){
                let buyNum = 0;
 
            },
            //根据购买数量和价格区间，返回当前购买数量时的价格。
            goodsPrice(priceRange, buyNum){
                
            },
            addCart(spec){

            },
            minusCart(spec){

            },
            toTel(){
            	
            },
            toCategoryGoods(){
                this.$router.push({path: '/goodsList', query: {}});
            }
        }
    }
</script>

<style lang="less">
    .carousel{
        width: 100%;
        background: $bgColor;
        .carousel-indicators {
            position: absolute;
            height: .14rem;
            bottom: .2rem;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 0;
            line-height: 0;
        }
        .carousel-item div{
            width: 100%;
            height: 100%;
        }
        .carousel-item div img{
            width: 100%;
        }
        .carousel-dot{
            width: .14rem;
            height: .14rem;
            margin: 0 .14rem;
            background: rgba(233,233,233,1);
            border-radius: .07rem;
            font-size: 0;
            line-height: 0;
            overflow: hidden;
        }
        .carousel-dot.active{
            background: rgba(233,233,233,.4);
        }
    }
</style>
<style lang="scss" scoped>
   .info_page{background:#f4f4f4;}
   span{font-style:normal;}
   em{font-style:normal;}
   .banner img{width:100%;}
   .info_page .contain{padding:0 .2rem;background:#fff;}
   .info_page .name{font-size:.32rem;}
   .info_price{color:#ffa101;font-size:.3rem;margin-top:.2rem; margin-right: .2rem;}
   .info_price span{color:#ffa101;}
   .info_buy div{color: #999;}
   .info_buy span{color:#666;}
   .info_price span.money{font-size: .38rem;}
   .zz_btn{font-size:.26rem; width:1.6rem;height:.6rem;line-height:.6rem;text-align: center;background:#ffa101;color:#fff;border-radius:.05rem;}
   .info_price_pf{font-size:.26rem;color:#ffa101;margin-top:.3rem;}
   .info_price_sm>div{width:50%;font-size:.26rem;color:#999;margin-top:.16rem;}
   .info_page .gg .title{font-size:.26rem;color:#999;margin-top:.6rem;}
   .info_page .gg ul{font-size:.28rem;color:#333;margin-top:.4rem;}
   .info_page .gg ul li{margin-bottom:.3rem;}
   .info_page .gg ul li:last-child{margin-bottom:0;padding-bottom:.3rem;}
   .info_page .gg ul li .left{font-size:.26rem;color:#999;}
   .jj_btn.right{text-align: center;}
   .jj_btn.right span{display:block;float:left; width:.5rem;border:1px solid #d8d8d8; line-height:.5rem;font-size:.28rem;}
   .jj_btn.right span:active{background:#efefef;}
   .jj_btn.right span:first-child{border-radius:3px 0 0 3px;}
   .jj_btn.right span:last-child{border-radius:0 3px 3px 0;}
   .jj_btn.right em{display:block;float:left;width:.6rem;border-top:1px solid #d8d8d8;border-bottom:1px solid #d8d8d8;}
   .jj_btn.right em input{display:block;width:100%;font-size:.28rem; line-height:.5rem;text-align: center;}
   .goods_commodity{margin-top:.25rem;padding-top:.34rem;background:#fff;}
   .goods_commodity .title{width:2.62rem;margin:0 auto;position:relative;height:.32rem;text-align: center; margin-bottom: .4rem;}
   .goods_commodity .title h2{position:absolute;width:1.46rem;top:0; left:50%;margin-left:-.72rem; height:100%;line-height:.32rem;font-size:.32rem;z-index:2;background:#fff;}
   .goods_commodity .title hr{-webkit-margin-before:0;-webkit-margin-after:0;position:absolute;top:50%;z-index:0; height:.01rem;border-top:.01rem solid #999;width:100%;left:0;}
   .goods_commodity .contain p{font-size:.26rem;color:#999;line-height:.5rem;}
   .goods_commodity img{width: 100%; float: left; font-size: 0; line-height: 0;}
   .no_relation h2{font-size:.26rem;color:#999;}
   .no_relation .box{padding:.5rem 0 .36rem 0;font-size:.26rem;}
   .no_relation .box div{width:50%;text-align: center;line-height:.46rem;color:.26rem;color:#ffa101;}
   .no_relation .box div img{width:.32rem;margin-right:.14rem;vertical-align:-.07rem;}
   .no_relation .box div.right{border-left:.01rem solid #c8c8c8;}
</style>

