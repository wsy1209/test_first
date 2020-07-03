<template>
    <div>
        <scroll class="wrapper" >
            <div class="content" ref="goodswrapper">
                <div class="demo">
                    <div @click="toGoodDetail(item)">
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
                                    <img v-if="foodNum(item) > 0" src="../../images/minus.png" @click.stop="minusCartGoods(item, $event)">
                                    <div v-if="foodNum(item) > 0" class="cart_num" :id="'goods'+item.goodsId">{{ foodNum(item) }}</div>
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
                                    <img v-if="foodNum(item) > 0" src="../../images/minus.png" @click.stop="minusCartGoods(item, $event)">
                                    <div v-if="foodNum(item) > 0" class="cart_num" :id="'goods'+item.goodsId">{{ foodNum(item) }}</div>
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
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <!-- 多规格弹出框 -->
        <multi-spec-model v-show="showMultiSpec" @hideMultiSpec="hideMultiSpec" :item="item" @addCart="addCart" @minusCart="minusCart"></multi-spec-model>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import scroll from 'src/components/common/scroll'
    import {mapState,mapMutations} from 'vuex'
    import alertTip from 'src/components/common/alertTip'
    import multiSpecModel from 'src/components/common/multiSpecModel'
    import {imgToSamll} from 'src/config/mUtils'

    export default { 
        props: {
            /**
             * 列表的数据
             */
            data: {
                type: Array,
                default: null
            },
            /**
             * 数据是否加载完成，用于上拉加载
             */
            loadFinish: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发滚动到底部的事件，用于上拉加载
             */
            pullup: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发顶部下拉的事件，用于下拉刷新
             */
            pulldown: {
                type: Boolean,
                default: false
            },
            /**
             * 如果启用loading交互，传递loading的状态
             * isShow: false
             * showIcon: false,    // 是否显示loading的icon
             * status: ''  // '正在加载...', '加载完成', '刷新失败', ''
             * 下拉刷新loading
             */
            loadingDownStatus: {
                type: Object,
                default: function () {
                    return {
                        isShow: false,
                        isRefreshFinished: false,
                        status: ''
                    };
                }
            },
            /**
             * 如果启用loading交互，传递loading的状态
             * isShow: false
             * status: ''  // '正在加载...', '加载完成', '刷新失败', ''
             * 上拉加载loading
             */
            loadingUpStatus: {
                type: Object,
                default: function () {
                    return {
                        isShow: false,
                        status: ''
                    };
                }
            },
            // 默认已经显示出10条数据 count等于一是让从11条开始加载
            counter: {
                type: Number,
                default: 1
            },
            // 一次显示多少条
            num: {
                type: Number,
                default: 10
            },
            // 开始页数
            pageStart: {
                type: Number,
                default: 1
            },
            // 结束页数
            pageEnd: {
                type: Number,
                default: 10
            },
        },
        data() {
            return {
                alertText: '',
                showAlert: false,
                showMultiSpec: false,
                item: {},
                spec: {},
                imgToSamll,
            }
        },
        mounted() {
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
            multiSpecModel,
        },
        methods: {
            ...mapMutations([
                'ADD_CART','REDUCE_CART'
            ]),
            async loadRefreshData() {
               
            },
            async loadData() {
               
            },
            scrollToTop() {
  
            },
            //cart变化的时候重新计算当前商品的数量
            foodNum: function (item){
                let buyNum = 0;
                return buyNum;
            },
            specGoodNum(spec){
                let buyNum = 0;

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
            addCart(spec){ 
  
            },
            hideMultiSpec(){
                this.showMultiSpec = false;
            },
            toGoodDetail(item){
                this.$router.push({path: '/goodsDetail', query: {}});              
            }
        },
        watch:{
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
</style>