 <template>
    <!-- 多规格弹出框 -->
    <div class="multi_spec_model">
        <div class="multi_spec_cancel" @click="hideMultiSpec"></div>
        <div class="multi_spec_container">
            <div class="goods_container">
                <div class="goods_img">
                    <img :src="item.goodsImg">
                </div>
                <div class="goods_detail">
                    <div class="goods_price">
                        <span>￥</span>{{item.price}}
                    </div>
                    <div class="goods_sku">
                        <span class="goods_unit">请选择规格</span>
                        <span class="goods_sale">已采购{{item.allSaled}}件</span>
                    </div>
                </div>
                <div class="cancel_btn" @click="hideMultiSpec">
                    <svg width="100%" height="100%" viewBox="0 0 42 42">
                        <circle cx="21" cy="21" r="19" stroke="rgb(202,202,202)" stroke-width="2" fill="white"/>
                        <line x1="15" y1="15" x2="27" y2="27"
                        style="stroke:rgb(197,197,197);stroke-width:2"/>
                        <line x1="15" y1="27" x2="27" y2="15"
                        style="stroke:rgb(197,197,197);stroke-width:2"/>
                    </svg> 
                </div>
            </div>
            <multi-spec class="spec_model_container" :item="item" @addCart="addCart" @minusCart="minusCart"></multi-spec>
        </div>
    </div>
</template>

<script>
    import cartStyle from 'src/components/common/cartStyle'
    import multiSpec from 'src/components/common/multiSpec'

    export default {
    	data(){
            return{
            }
        },
        mounted(){
      
        },
        props: ['item','buyNum'],
        components: {
            cartStyle,
            multiSpec
        },
        methods: {
            addCart(spec){
                this.$emit('addCart', spec)
            },
            minusCart(spec){
                this.$emit('minusCart', spec)
            },
            hideMultiSpec(){
                this.$emit('hideMultiSpec')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .multi_spec_model{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.7);
        z-index: 201;
        .multi_spec_cancel{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom:54%;
        }
        .multi_spec_container{
            position: absolute;
            top: 46%;
            left: 0;
            right: 0;
            bottom: 0;
            background: #fff;
            .goods_container{
                height: 1.56rem;
                margin: 0 .2rem;
                border-bottom: .01rem solid #e3e3e3;
                position: relative;
                display: flex;
                .goods_img{
                    @include wh(2.1rem, 100%);
                    img{
                        @include wh(1.9rem, 1.9rem);
                        margin-top: -.54rem;
                        border-radius: .04rem;
                        box-shadow: .01rem .01rem .03rem rgba(0,0,0,.1);
                    }
                }
                .goods_detail{
                    .goods_price{
                        margin-top: .42rem;
                        height: .4rem;
                        line-height: .4rem;
                        @include sc(.4rem, $orange);
                        span{
                            @include sc(.28rem, $orange);
                        }
                    }
                    .goods_sku{
                        @include sc(.24rem, #666);
                        margin-top: .2rem;
                        height: .24rem;
                        line-height: .24rem;
                        .goods_unit{
                            margin-right: .6rem;
                        }
                    }
                }
                .cancel_btn{
                    position: absolute;
                    top: .2rem;
                    right: .1rem;
                    @include wh(.38rem, .38rem);
                    svg{
                        float: left;
                    }
                }
            }
            .spec_container{
                position: absolute;
                top: 1.56rem;
                left: 0;
                right: 0;
                bottom: 0;
                overflow: auto;
                .spec_demo{
                    .spec_detail{
                        margin: 0 .2rem;
                        margin-top: .3rem;
                        height: .56rem;
                        .spec_name{
                            @include sc(.28rem, #333);
                            margin-top: .28rem;
                            line-height: .28rem;
                            margin-right: .3rem;
                        }
                        .spec_min_buy_num{
                            @include sc(.24rem, #666);
                            margin-top: .28rem;
                            line-height: .28rem;
                        }
                    }
                    .spec_price_range{
                        margin-top: .2rem;
                        border-bottom: .01rem solid #e3e3e3;
                        height: .5rem;
                        padding: 0 .2rem;
                        background: #fff9ef;
                        .price_range_tip{
                            margin-right: .12rem;
                            span{
                                float: left;
                                margin-top: .08rem;
                                padding: .05rem;
                                line-height: .22rem;
                                display: inline-block;
                                border: .01rem solid #ff4400;
                                border-radius: .04rem;
                                @include sc(.22rem, #ff4400);
                            }
                        }
                        .price_range_text{
                            @include sc(.26rem, #666);
                            line-height: .5rem;
                        }
                    }
                    .spec_model_container{
                        position: absolute;
                        top: 1.56rem;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        overflow: auto;
                    }
                }
            }
        }
    }
</style>
