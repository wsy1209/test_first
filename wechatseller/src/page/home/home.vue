<template>
    <div class="first_level_page">
        <head-top></head-top>
        <carousel class="marginTop adCarousel" :responsive="44" :indicators="true" :auto="20000">
            <div>
                    <div  class="to_forget">
                        <img src="../../images/slider1.jpg">
                    </div>
                    <div class="to_forget">
                        <img src="../../images/slider2.jpg">
                    </div>
            </div>
        </carousel> 
        <nav class="home_nav">
            <router-link to="/brandList" class="nav_div">
                <img src="../../images/navBrand.png">
                <div class="nav_text">品牌专区</div>
            </router-link>
            <router-link to="/order" class="nav_div">
                <img src="../../images/navOrder.png">
                <div class="nav_text">我的订单</div>
            </router-link>
            <router-link to="/offenList" class="nav_div">
                <img src="../../images/navOffen.png">
                <div class="nav_text">常购清单</div>
            </router-link>
            <div @click="comingSoon" class="nav_div">
                <img src="../../images/navStatistics.png">
                <div class="nav_text">订单统计</div>
            </div>
        </nav>
        <!-- 活动专区 -->
        <section class="home_section promotion_section">
            <div class="section_top">
                <div class="title">活动专区</div>
            </div>
            <carousel :responsive="37.3333" :indicators="true" :auto="30000">
                <div>
                    <a target="_blank"  class="to_forget">
                        <img src="../../images/slider3.jpg">
                    </a>
                </div>
            </carousel> 
        </section>
        <!-- 热销商品 -->
        <section class="home_section promotion_section">
            <div class="section_top">
                <div class="title">热销商品</div>
                <router-link :to="{path: '/goodsList', query: {flag:1,key:''}}" class="more">
                    <span>更多</span>
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 20">
                        <polyline points="0,0 14,10 0,20" style="fill:none;stroke:rgb(153,153,153);stroke-width:4"/>
                    </svg> 
                </router-link>
            </div>
            <div class="section_main">
                <dl class="goods_dl left">
                    <div @click="toGoodsDetail()">
                        <dt class="goods_dt">
                            <img src="../../images/goods01.png">
                        </dt>
                        <dd class="goods_dd">
                            <div class="goods_name">
                                康师傅绿茶
                            </div>
                            <div class="goods_price">￥50</div>
                        </dd>
                    </div>
                </dl>
                <dl class="goods_dl left">
                    <div @click="toGoodsDetail()">
                        <dt class="goods_dt">
                            <img src="../../images/goods01.png">
                        </dt>
                        <dd class="goods_dd">
                            <div class="goods_name">
                                康师傅绿茶
                            </div>
                            <div class="goods_price">￥50</div>
                        </dd>
                    </div>
                </dl>
                <dl class="goods_dl left">
                    <div @click="toGoodsDetail()">
                        <dt class="goods_dt">
                            <img src="../../images/goods02.png">
                        </dt>
                        <dd class="goods_dd">
                            <div class="goods_name">
                                趣多多
                            </div>
                            <div class="goods_price">￥50</div>
                        </dd>
                    </div>
                </dl>
                <div class="clear"></div>
            </div> 
        </section>
        <!-- 新品推荐 -->
        <section class="home_section promotion_section">
            <div class="section_top">
                <div class="title">新品推荐</div>
                <router-link :to="{path: '/goodsList', query: {flag:2,key:''}}" class="more">
                    <span>更多</span>
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 20">
                        <polyline points="0,0 14,10 0,20" style="fill:none;stroke:rgb(153,153,153);stroke-width:4"/>
                    </svg> 
                </router-link>
            </div>
            <div class="section_main">
                <dl class="goods_dl left">
                    <div @click="toGoodsDetail()">
                        <dt class="goods_dt">
                            <img src="../../images/goods03.png">
                        </dt>
                        <dd class="goods_dd">
                            <div class="goods_name">
                                 冰红茶
                            </div>
                            <div class="goods_price">￥10</div>
                        </dd>
                    </div>
                </dl>
                <dl  class="goods_dl left">
                    <div @click="toGoodsDetail()">
                        <dt class="goods_dt">
                            <img src="../../images/goods03.png">
                        </dt>
                        <dd class="goods_dd">
                            <div class="goods_name">
                                 冰红茶
                            </div>
                            <div class="goods_price">￥10</div>
                        </dd>
                    </div>
                </dl>
                <dl class="goods_dl left">
                    <div @click="toGoodsDetail()">
                        <dt class="goods_dt">
                            <img src="../../images/goods03.png">
                        </dt>
                        <dd class="goods_dd">
                            <div class="goods_name">
                                 冰红茶
                            </div>
                            <div class="goods_price">￥10</div>
                        </dd>
                    </div>
                </dl>
                <div class="clear"></div>
            </div> 
        </section>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <div class="heightBottom"></div>

        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>

        <foot-guide></foot-guide>      
    </div>    
</template>

<script>
import {mapState} from 'vuex'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import Carousel from 'vue-m-carousel'
import alertTip from 'src/components/common/alertTip'
import {defaultImg, defaultCarouselImg} from 'src/config/env'
import {getSellerIndex,goodsList} from '../../service/getData'
import {imgToSamll} from 'src/config/mUtils'
import loading from 'src/components/common/loading'


export default {
    data(){
        return {
            adlist: 1, //轮播图列表
            goodsList: null, //推荐商品列表
            hotgoodsList: null, //热销商品列表
            flag:1,//跳转页面标记 1.热销商品页面  2.新品推荐页面
            goodsId:0, // 商品id
            showAlert: false,
            alertText: '',
            showLoading: true, //显示加载动画
        }
    },
    created(){
    },
    mounted(){
        document.body.scrollTop = 0;
        this.getMySellerIndex();
    },
    components: {
        headTop,
        footGuide,
        Carousel,
        alertTip,
        loading,
    },
    computed: {
        ...mapState([
            'userInfo',
        ]),
    },
    methods: {
        //获取商家首页内容
        async getMySellerIndex(){
            this.showLoading = false;
        },  
        toGoodsDetail(){
                this.$router.push({path: '/goodsDetail', query: {}});         
        },
        comingSoon(){//敬请期待
            this.showAlert = true;
            this.alertText = '敬请期待';
        },
        async search(item){
            this.$router.push({path: '/goodsDetail', query: {}}); 
        },
    },
    watch: {
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
            height: 100%;
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
    @import 'src/style/mixin';
    .home_nav{
        clear: both;
        background: #fff;
        @include wh(100%, 2rem);
        .nav_div{
            float: left;
            width: 25%; 
            text-align: center;
            img{
                display: block;
                margin: 0 auto;
                margin-top: .32rem;
                margin-bottom: .2rem;
                @include wh(.9rem, .9rem);
            }
            .nav_text{
                @include sc(.24rem, #333);
                line-height: .24rem;
            }
        }
    }
    .home_section{
        margin-top: .2rem; 
        .section_top{
            clear: both;
            background: #fff;
            @include wh(100%, .8rem);
            .title{
                float: left;
                text-align: left;
                @include sc(.3rem, #333);
                font-weight: bold;
                line-height: .8rem;
                padding-left: .2rem;
            }
            .more{
                float: right;
                text-align: right;
                line-height: .8rem;
                @include sc(.26rem, #999);
                svg{
                    @include wh(.14rem, .2rem);
                    margin-left: .1rem;
                    margin-right: .2rem;
                }
            }
        }
        .section_main{
            width: 100%;
            margin-top: .01rem;
            .goods_dl{
                background: #fff;
                width: 33.33%;
                border: .01rem solid $bgColor;
                border-left: none;
                border-bottom: none;
                .goods_dt{
                    height: 2.98rem;
                    width: 100%;
                    text-align: center;
                    img{
                        width: 91.6%;
                        margin-top: .345rem;
                    }
                }
                .goods_dd{
                    padding: 0 .2rem;
                    .goods_name{
                        @include sc(.26rem, #333);
                        line-height: .315rem;
                        height: .6rem;
                        overflow: hidden;
                    }
                    .goods_price{
                        @include sc(.32rem, #ffa101);
                        line-height: .92rem;
                    }
                }
            }
            .goods_dl:nth-child(3n){
                border-right: none;
            }
        }
    }
</style>
