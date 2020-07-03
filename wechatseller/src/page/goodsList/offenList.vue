<template>
    <div>
        <scroll ref="offenlistscroll" class="wrapper">
            <div ref="offenwrapper" class="content">
                <div class="demo">
                    <div @click="toGoodDetail()">
                        <div class="demo-left left">
                            <img src="../../images/goods01.png">
                            <!-- <div v-if="item.isShelves == 0" class="goods_check">商品下架</div> -->
                            <!-- <div v-else-if="item.stock == 0" class="goods_check">库存不足</div> -->
                        </div>
                        <div class="demo-right">
                            <div class="goods_name ellipsis">康师傅冰红茶</div>
                            <div class="goods_sku_sale">
                                <span class="goods_sale">已采购10件</span>
                            </div>
                            <div class="goods_price_cart">
                                <div class="goods_price left">￥2</div>
                                <div class="goods_cart right">
                                    <img v-if="foodNum() > 0" src="../../images/minus.png" @click.stop="minusCartGoods(item, $event)">
                                    <div v-if="foodNum() > 0" class="cart_num" :id="'goods'+item.goodsId">{{ foodNum(item) }}</div>
                                    <img src="../../images/add.png" @click.stop="addCartGoods(item, $event)">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo">
                    <div @click="toGoodDetail()">
                        <div class="demo-left left">
                            <img src="../../images/goods01.png">
                            <!-- <div v-if="item.isShelves == 0" class="goods_check">商品下架</div> -->
                            <!-- <div v-else-if="item.stock == 0" class="goods_check">库存不足</div> -->
                        </div>
                        <div class="demo-right">
                            <div class="goods_name ellipsis">康师傅冰红茶</div>
                            <div class="goods_sku_sale">
                                <span class="goods_sale">已采购10件</span>
                            </div>
                            <div class="goods_price_cart">
                                <div class="goods_price left">￥2</div>
                                <div class="goods_cart right">
                                    <img v-if="foodNum() > 0" src="../../images/minus.png" @click.stop="minusCartGoods(item, $event)">
                                    <div v-if="foodNum() > 0" class="cart_num" :id="'goods'+item.goodsId">{{ foodNum() }}</div>
                                    <img src="../../images/add.png" @click.stop="addCartGoods(item, $event)">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loading-wrapper"></div>
        </scroll>
        <div class="clear"></div>
        <hover-cart></hover-cart>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import scroll from 'src/components/common/scroll'
    import { getOfenSalesList } from 'src/service/getData'
    import {mapState,mapMutations} from 'vuex'
    import {imgToSamll} from 'src/config/mUtils'
    import alertTip from 'src/components/common/alertTip'
    import hoverCart from 'src/components/common/hoverCart'
    import loading from 'src/components/common/loading'

    export default {
        data() {
            return {
                data: [],
                pulldown: true,
                pullup: true,
                loadingDownStatus: {
                    isShow: true,
                    status: '正在加载...'
                },
                loadingUpStatus: {
                    isShow: true,
                    status: '正在加载...'
                },
                loadFinish: false,
                counter : 1, //默认已经显示出10条数据 count等于一是让从11条开始加载
                num : 21,  // 一次显示多少条
                pageStart : 1, // 开始页数
                pageEnd : 21, // 结束页数
                alertText: '',
                showAlert: false,
                imgToSamll,
                showLoading: true, //显示加载动画
            }
        },
        created() {
        },
        mounted(){
            this.loadRefreshData()
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
        components: {
            scroll,
            alertTip,
            hoverCart,
            loading,
        },
        methods: {
            ...mapMutations([
                'ADD_CART','REDUCE_CART','INIT_BUYCART'
            ]),
            async loadRefreshData() {
               
                this.showLoading = false;
            },
            async loadData() {

              //let response = await getOfenSalesList(this.userInfo.token, this.pageStart, this.pageEnd );   
   
            },
            //cart变化的时候重新计算当前商品的数量
            foodNum: function (){
                    return 0;
            },
            minusCart() {  
         
            },
            //加入购物车
            addCart() { 
                //let nowBuy = this.foodNum(warehouseCode, specificationId);
            },
            toGoodDetail(){
                if(item.isShelves==1){
                    this.$router.push({path: '/goodsDetail', query: {goodsId:item.goodsId,promotionId:item.promotionId}});
                }else{
                    this.alertText = '商品已下架';
                    this.showAlert = true;
                }
                
            }
        }
    }
</script>

<style lang="scss">
  
    @import 'src/style/mixin';
    .wrapper{
        position: absolute;
        top: 0;
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
            @include wh(1.7rem, 1.7rem);
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
            padding-left: 2.1rem;
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
                    @include sc(.36rem, #ffa101);
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
        top: 0; 
        left: 0; 
        right: 0; 
        bottom: 0; 
        text-align: center; 
        padding-top: 3.5rem; 
        background: #f4f4f4; 
        z-index: 1;
        img{
            width: 1.88rem;
            height: 2.6rem;
        }
    }
</style>