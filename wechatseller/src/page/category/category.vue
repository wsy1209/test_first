<template>
    <div>
        <head-top></head-top>
        <div class="fl_box">
            <div class="fl_left left">
                <ul>
                    <li class="cur">
                        <div class="nav_box1" @click="findSecondCategory()">
                           &nbsp;奶制品
                        </div>
                        <div>
                            <div @click="" class="nav_box2 active">
                                <div>
                                    <span>纯奶</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div @click="" class="nav_box2">
                                <div>
                                    <span>酸奶</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="nav_box1" @click="findSecondCategory()">
                           &nbsp;豆制品
                        </div>
                        <div class="nav_box1" @click="findSecondCategory()">
                           &nbsp;酒类
                        </div>
                    </li>
                </ul> 
            </div>
            <div class="fl_right right">
                <div class="right_top">
                    <div @click="findGoodsByCategory()">
                        综合排序
                    </div>
                      
                    <div @click="findGoodsByCategory()">
                            按价格
                        <img src="../../images/orderDefault.png">
                    </div>
                    <div class="active" @click="findGoodsByCategory()">
                            按销量
                    </div>                    
                </div>
                <scroll ref="categorylistscroll" class="wrapper category_wrapper" >
                    <div ref="categorywrapper" class="contain">
                        <div class="demo">
                        	<div @click="toGoodDetail()">
	                            <div class="demo-left left">
	                                <img src="../../images/goods01.png">
<!--                                     <div v-if="item.isShelves == 0" class="goods_check">商品下架</div>
                                    <div v-else-if="item.stock == 0" class="goods_check">库存不足</div> -->
	                            </div>
	                            <div class="demo-right">
	                                <div class="goods_name ellipsis">康师傅冰红茶</div>
	                                <div class="goods_sku_sale">
	                                    <!-- <span class="goods_sku">{{item.unit}}</span> -->
	                                    <span class="goods_sale">已采购10件</span>
	                                </div>
	                                <div class="goods_price_cart">
	                                    <div class="goods_price left">￥10.00</div>
	                                    <div class="goods_cart right">
	                                        <img v-if="foodNum(item) > 0" src="../../images/minus.png" @click.stop.prevent="minusCartGoods(item, $event)">
	                                        <div v-if="foodNum(item) > 0" class="cart_num" :id="'goods'+item.goodsId">2</div>
	                                        <img src="../../images/add.png" @click.stop.prevent="addCartGoods(item, $event)">
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
                        </div>
                    </div>
                    <div class="loading-wrapper"></div>
                </scroll>
<!--                 <div v-if="Object.keys(data).length == 0" class="no_data">
                    <img src="../../images/no_data.png" alt="">
                </div>  -->
                <div class="clear"></div>
                <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
                <!-- 多规格弹出框 -->
                <multi-spec-model v-show="showMultiSpec" @hideMultiSpec="hideMultiSpec" :item="item" @addCart="addCart" @minusCart="minusCart"></multi-spec-model>
            </div>
        </div>

<!--         <transition name="loading">
            <loading></loading>
        </transition> -->

        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import footGuide from 'src/components/footer/footGuide'
    import scroll from 'src/components/common/scroll'
    import alertTip from 'src/components/common/alertTip'
    import multiSpecModel from 'src/components/common/multiSpecModel'
    import {mapState,mapMutations} from 'vuex'
    import {imgBaseUrl,defaultImg} from 'src/config/env'
    import {fmoney,imgToSamll} from 'src/config/mUtils'
    import {findFirstCategory,findSecondCategory,findGoodsByCategory} from 'src/service/getData'
    import loading from 'src/components/common/loading'

    export default {
        data(){
            return{
                firstList:[],//一级目录内容
                secondList:[],//二级目录内容
                imgBaseUrl,//图片地址
                order:'desc',
                categoryId:0,
                sort:'',
                pLevel:1,//初始化查询一级目录
                parentId:1,
                data: [],
                pulldown: true,
                pullup: true,
                loadFinish: false,
                counter : 1, //默认已经显示出10条数据 count等于一是让从11条开始加载
                num : 10,  // 一次显示多少条
                pageStart : 1, // 开始页数
                pageEnd : 10, // 结束页数
                alertText: '',
                showAlert: false,
                showMultiSpec: false,
                item: {},
                spec: {},
                fmoney,
                imgToSamll,
                orderBy: 'default',
                showLoading: true, //显示加载动画
                flag:false,//协助排序
            }
        },
        created() {
            this.initData();
        },
        mounted(){
            
        },
        computed:{
            ...mapState([
                'userInfo',,'cartList',
            ]),
            /**
             * 监听cartList变化，更新当前用户的购物车信息userCart，同时返回一个新的对象
             */
            userCart: function (){
                return Object.assign({},this.cartList[this.userInfo.id]);
            },
        },
        components: {
            headTop,
            footGuide,
            scroll,
            alertTip,
            multiSpecModel,
            loading,
        },
        methods: {
            ...mapMutations([
                'ADD_CART','REDUCE_CART','INIT_BUYCART'
            ]),
            async initData(){
                this.token = this.userInfo.token;
               // let data = await findFirstCategory(this.token);
            }, 
            async findSecondCategory(categoryId,parentId){
                this.showLoading = true;
                this.categoryId = categoryId;
              //  let data = await findSecondCategory(this.token,this.categoryId);
                this.secondList = data.data;
                this.showLoading = false;
            },
            async loadRefreshData() {

            },
            async loadData() {
                   // let response = await findGoodsByCategory(this.token,this.categoryId,this.pLevel,this.sort,this.order,this.pageStart,this.pageEnd);   
                   // this.data = this.data.concat(response.data)
            },
            async findGoodsByCategory(categoryId,sort,parentId){
 
            },
            //cart变化的时候重新计算当前商品的数量
            foodNum: function (item){
                let buyNum = 0;
                return buyNum;
            },
            specGoodNum(spec){
                let buyNum = 0;
                return 0;
            },
            minusCartGoods(item, event)
            {  
                this.item = item;
                if(item.specifications.length > 1){ //多规格
                    this.showMultiSpec = true;
                }else{//单规格
                    this.minusCart()
                }
            },
            addCartGoods(item, event)
            {  
                this.item = item;
                if(item.specifications.length > 1){ //多规格
                    this.showMultiSpec = true;
                }else{//单规格
                    this.addCart()
                }
            },
            minusCart(spec)
            {  
                if(!spec){
                    spec = this.item.specifications[0];
                }
                if (this.specGoodNum(spec) > 0) {
                    this.REDUCE_CART({
                        userId: this.userInfo.id, 
                        warehouseCode: this.item.warehouseCode, 
                        specificationId: spec.id,
                        priceRange: spec.priceRange
                    });
                }  
            },
            //加入购物车
            addCart(spec)
            { 
  
            },
            hideMultiSpec(){
                
            },
            toGoodDetail(item){
                this.$router.push({path: '/goodsDetail', query: {}});               
            }
        },
        watch:{
            userInfo:function(value){
                //this.initData()
            },
           // 'categoryId':'loadRefreshData',
           // 'order':'loadRefreshData'
        }
    }
</script>

<style lang="scss" scoped>
   span{font-style:normal;}
   em{font-style:normal;}
  .fl_box{position:absolute;background:#fff; top:1.08rem;left:0;right:0;bottom:1rem;}
  .fl_left{position:absolute;top:0;left:0;width:1.9rem;bottom:0;overflow-y:auto; background: #f4f4f4;}
  .fl_left ul li{line-height:.96rem;text-align: center; font-size:.28rem;color:#333;border-bottom:.02rem solid #d6d6d6; background: #f4f4f4;}
  .fl_left ul li img{width:.32rem;height:.32rem;vertical-align:-.06rem;}
  .fl_left ul li.cur .nav_box1{color:#ffa101;}
  .nav_box2{line-height:.73rem;display:block; font-size:.24rem;background:#fcfcfc;color:#666;padding:.01rem 0; border-top: .01rem dashed #d6d6d6;}
  .nav_box2 div{ margin: .06rem 0;}
  .nav_box2.active{background: #fff;}
  .nav_box2.active div{ border-left: .08rem solid #ffa101;}
  .nav_box2.active div span{color: #ffa101;}
  .fl_left ul li:hover .nav_box2{display:block;}
  .fl_right{position:absolute;top:0;left:2.13rem;right:0;bottom:0;}
  .fl_right .right_top{line-height:.9rem;text-align: left;font-size:.3rem; display: flex; height: .9rem; border-bottom: .01rem solid #d6d6d6;}
  .fl_right .right_top div{flex: 1; text-align: center;}
  .fl_right .right_top div.active{color: #ffa101;}
  .right_top .right_top_xl{position:absolute;top:.9rem;left:0;width:100%;background:#fff;}
  .right_top .right_top_xl>div:active{background:#efefef;}
  .fl_right .right_top img{width: .16rem; height: .18rem;margin-left: .08rem; display: inline-block; margin-top: .36rem; display: inline-block;}
  .fl_right .contain ul{position: absolute;top:.9rem;left:0;right:0;bottom:0;overflow-y:auto;}
  .fl_right .contain ul li{padding:.3rem .2rem .3rem 0; border-bottom:.02rem solid #efefef;}
  .fl_right .contain ul li>.left{width:1.7rem;height:1.7rem;}
  .fl_right .contain ul li>.left img{width:100%;}
  .fl_right .contain ul li>.right{width:calc(100% - 1.86rem);-webkit-width:calc(100% - 1.86rem);-moz-width:calc(100% - 1.86rem);-o-width:calc(100% - 1.86rem);}
  .fl_right .contain ul li .right h2{font-size:.28rem;color:#333;}
  .fl_right .contain ul li .right .gg{margin-top:.24rem;}
  .fl_right .contain ul li .right .gg span{font-size:.22rem;color:#666!important;}
  .fl_right .contain ul li .right .gg .right{text-align:right;}
  .price{margin-top:.24rem;}
  .price .left{color:#ffa101!important;font-size:.36rem;}
  .price .left span{font-size:.28rem;color:#ffa101!important;}
  .jj_btn{text-align: center;}
  .jj_btn span{display:block;float:left; width:.5rem;border:1px solid #d8d8d8; line-height:.5rem;font-size:.28rem!important;}
  .jj_btn span:active{background:#efefef;}
  .jj_btn span:first-child{border-radius:3px 0 0 3px;}
  .jj_btn span:last-child{border-radius:0 3px 3px 0;}
  .jj_btn em{display:block;float:left;width:.6rem;border-top:1px solid #d8d8d8;border-bottom:1px solid #d8d8d8;}
  .jj_btn em input{display:block;width:100%;font-size:.28rem; line-height:.5rem;text-align: center;}
  
    @import 'src/style/mixin';
    .category_wrapper{
        position: absolute;
        top: 0.9rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }
    .demo{
        @include wh(100%, 2.1rem);
        background: #fff;
        clear: both;
        border-bottom: .01rem solid #d6d6d6;
        .demo-left{
            margin: .2rem;
            position: relative;
            @include wh(1.5rem, 1.5rem);
            img{
                @include wh(100%, 100%);
            }
            .goods_check{
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: .4rem;
                background: rgba(0,0,0,.6);
                @include sc(.24rem, #fff);
                line-height: .4rem;
                text-align: center;
            }
        }
        .demo-right{
            padding-top: .3rem;
            padding-left: 1.8rem;
            margin-right: .2rem;
            .goods_name{
                @include sc(.3rem, #333);
                line-height: .3rem;
                height: .3rem;
            }
            .goods_sku_sale{
                margin-top: .2rem;
                height: .24rem;
                line-height: .24rem;
                @include sc(.24rem, #999);
                .goods_sku{
                    margin-right: .28rem;
                    @include sc(.24rem, #999);
                }
                .goods_sale{
                    @include sc(.24rem, #999);
                }
            }
            .goods_price_cart{
                height: .54rem;
                margin-top: .35rem;
                line-height: .54rem;
                .goods_price{
                    display: inline-block;
                    @include sc(.3rem, #ffa101);
                }
                .goods_cart{
                    display: flex;
                    img{
                        flex: 1;
                        @include wh(.54rem, .54rem);
                    }
                    .cart_num{
                        flex: 1;
                        line-height: .54rem;
                        @include wh(.54rem, .54rem);
                        text-align: center;
                    }
                }
            }
        }
    }
    .no_data{
        position: absolute; 
        top: .9rem; 
        left: 0; 
        right: 0; 
        bottom: 0; 
        text-align: center; 
        padding-top: 2.5rem; 
        background: #fff; 
        z-index: 10;
        img{
            width: 1.5rem;
            height: 2.07rem;
        }
    }
</style>