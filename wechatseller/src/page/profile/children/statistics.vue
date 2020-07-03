<template>
    <div class="second_level_page statistics_page">
    <v-scroll class="receive_voucher_scroll" :on-refresh="onRefresh"style="margin-top:-2.5rem;">
        <div class="statistics_top">
            <p>本月总收款（元）</p>
            <p class="price">{{fmoney(data.currentMonthAmount,2)}}</p>
            <div class="today_statistics">
                <div class="demo">
                    <p class="words">今日收款（元）</p>
                    <div>{{fmoney(data.currentDayAmount,2)}}</div>
                </div>
                <div class="demo">
                    <p class="words" >今日订单（笔）</p>
                    <div>{{data.currentDayNum}}</div>
                </div>
            </div>
        </div>
        <div class="my_inorder">
            <div class="top">
                <div class="left">我的订单</div>
                <div class="right" @click="toOrders(0)">

                    <p>查看全部</p>
                    
                    <svg>
                        <use :xlink:href="'#moreArrowBlack'"></use>
                    </svg>
                </div>
            </div>
            <div class="inorder_state">
                <div class="guide_item" @click="toOrders(1)">
                    <div class="cart_num">{{data.noTallyNum}}</div>
                    <img src="../../../images/inorderState1.png">                    
                    <p>未理货</p>
                </div>
                <div class="guide_item" @click="toOrders(2)">
                    <div class="cart_num">{{data.noDeliverNum}}</div>
                    <img src="../../../images/inorderState2.png">
                    <p>未发货</p>
                </div>
                <div class="guide_item" @click="toOrders(3)">
                    <div class="cart_num">{{data.dispatchingNum}}</div>
                    <img src="../../../images/inorderState3.png">
                    <p>配送中</p>
                </div>
                <div class="guide_item"  @click="toOrders(4)">
                    <img src="../../../images/inorderState4.png">
                    <p>退货/退款</p>
                </div>
            </div>
        </div>
        
        <section class="statistics_bean sale_statistics_bean">
            <div class="top">
                <div class="left">
                    销售统计
                    <span>本月销售订单总金额：{{this.data.allSaleMoney==null?'0.00':fmoney(this.data.allSaleMoney)}}(元)</span>
                </div>
                <div @click="toSaleStatistics(1)" class="right">
                    <p>查看全部</p>
                    
                    <svg>
                        <use :xlink:href="'#moreArrowBlack'"></use>
                    </svg>
                </div>
            </div>
            <div class="statistics_main" >
                <div  @click="toSaleStatistics(1)" class="statistics_demo">
                    <div>{{this.data.allSaleMoney==null?'0.00':fmoney(this.data.allSaleMoney)}}(元)</div>
                    <div>业务统计</div>
                </div>
                <div  @click="toSaleStatistics(2)" class="statistics_demo">
                     <div>{{this.data.allWarehouseMoney==null?'0.00':fmoney(this.data.allWarehouseMoney)}}(元)</div>
                    <div>仓管统计</div>
                </div>
                <div  @click="toSaleStatistics(3)" class="statistics_demo">
                     <div>{{this.data.allLoadingMoney==null?'0.00':fmoney(this.data.allLoadingMoney)}}(元)</div>
                    <div>物流统计</div>
                </div>
            </div>
        </section>
        <section class="statistics_bean">
            <div class="top">
                <div class="left">

                    仓库统计
                    <span>TIPS:当月</span>
                </div>
                <div class="right">
                    <div @click="toWarehouseStatistics()" class="right">
                        <p>查看全部</p>
                    
                        <svg>
                            <use :xlink:href="'#moreArrowBlack'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="statistics_main">
                <div class="statistics_demo">
                    <p>{{this.data.inNum}}</p>
                    <div>进货</div>
                </div>
                <div class="statistics_demo">
                    <p>{{this.data.outNum}}</p>
                    <div>出货</div>
                </div>
            </div>
        </section>
        <section class="statistics_bean">
            <div class="top">
                <div class="left">
                    客户统计
                    <span>TIPS:当月</span>
                </div>
                <div @click="toCustomerStatistics" class="right">
                    <p>查看全部</p>
                    
                    <svg>
                        <use :xlink:href="'#moreArrowBlack'"></use>
                    </svg>
                </div>
            </div>
            <div class="statistics_main">
                <div class="statistics_demo">
                    <p>{{data.customerNewNum}}</p>
                    <div>新增</div>
                </div>
                <div class="statistics_demo">
                    <p>{{data.customerLiveNum}}</p>
                    <div>月活</div>
                </div>
                <div class="statistics_demo">
                    <p>{{data.customerLossNum}}</p>
                    <div>流失</div>
                </div>
            </div>
        </section>
        <section class="statistics_bean goods_statistics_bean">
            <div class="top">
                <div class="left">
                    商品统计
                    <span>TIPS:当月</span>
                </div>
                <div class="right">
                     <div @click="toGoodsStatistics(1)"class="right">
                    <p>查看全部</p>
                        
                        <svg>
                            <use :xlink:href="'#moreArrowBlack'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="statistics_main">
                <div  @click="toGoodsStatistics(1)"class="statistics_demo">
                    <div>销量</div>
                </div>
                <div  @click="toGoodsStatistics(2)"class="statistics_demo">
                    <div>销售额</div>
                </div>
                <div  @click="toGoodsStatistics(3)"class="statistics_demo">
                    <div>退货</div>
                </div>
            </div>
        </section>
        <div class="marginBottom"></div>
        </v-scroll>
        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>

    </div> 
</template>

<script>  
    import loading from 'src/components/common/loading'         
    import Scroll from 'src/components/common/pulldown'
    import {staticsAchievement} from 'src/service/getData'
    import {baseUrl} from 'src/config/env'
    import {mapState} from 'vuex'
    import {fmoney} from 'src/config/mUtils'
  
   
    export default {
        data(){
            return{
                data:[],
                warehouseData:null,
                token:'',
                showLoading: true, //显示加载动画
                fmoney,
            }
        },
        mounted(){
         
            if(location.href.split('?')[1]!=null)
            {
                this.token=location.href.split('?')[1].split('=')[1];
            }          
           
            {
                this.token=this.userInfo.token;
            }
            this.$el.querySelector('.load-more').style.display = 'none';
            
            this.staticsAchievement();


        },
        computed:{
            ...mapState([
                'userInfo',
            ]),
        },
        components: {
            'v-scroll':Scroll,
            loading,
        },         
        methods: {
            toWarehouseStatistics(){
                this.$router.push({path:'/profile/statistics/warehouseStatistics',query:{token:this.token}});
            },
            toGoodsStatistics(flag){
                this.$router.push({path:'/profile/statistics/goodsStatistics',query:{token:this.token,flag:flag}});
            },
            toSaleStatistics(flag){
                this.$router.push({path:'/profile/statistics/saleStatistics',query:{token:this.token,checkedEmp:flag}});
            },
            toCustomerStatistics(){
            	this.$router.push({path:'/profile/statistics/customerStatistics',query:{token:this.token}});
            },
            async staticsAchievement(){
                let data = await staticsAchievement(this.token);
                this.data = data.data; 
                this.showLoading = false;
            },
             //下拉刷新，count=2，从第二页开始加载数据
            onRefresh(done) {
            this.showLoading = true;
            this.$el.querySelector('.load-more').style.display = 'none';
            this.staticsAchievement();
            done()
            },
            toOrders(flag){
                //flag: 0:查看全部，1：未理货（出库），2：未发货（装货），3：配送中（交货），4：退货/退款（入库）
                window.open("flag="+flag);
                // window.location='flag='+flag;
            },
        },
         watch: {  
           "$route"(to,from){

                console.log(to);  
                 var from = from.path.split("/").length
                 var to = to.path.split("/").length
                  
                 if(to!=4&&to!=5&&from!=3&&from!=3){

                 var gearDate = document.body.getElementsByClassName('gearDate')
                 
               
                  gearDate[0].style.opacity="0"
                 
               
   }
              






            }  

        }  
    }
</script>

<style lang="scss" scoped="">
    @import 'src/style/mixin';    

    .statistics_top{
        @include wh(100%, 3.8rem);
        background: #73B0C6;
        text-align: center;
        padding-top: .68rem;
        p{
            @include sc(.3rem, #fff);
            height: .3rem;
            line-height: .3rem;
        }
        .price{
            @include sc(.52rem, #fff);
            height: .52rem;
            line-height: .52rem;
            margin-top: .3rem;
        }
        .today_statistics{
            display: flex;
            margin-top: .78rem;
            .demo{
                flex: 1;
                div{
                    @include sc(.32rem, #fff);
                    line-height: .45rem;
                   
                        margin-top:.2rem
                   
                   
                }
                 p{
                     @include sc(.34rem, #fff)
                    }
            }
        }
    }
    .my_inorder{

        @include wh(100%, 2.52rem);
        margin-top: .2rem;
        background: #fff;
        padding: .36rem .24rem 0;
        .top{
             display:flex;
            justify-content:space-between;
            @include wh(100%, .3rem);
            @include sc(.3rem, #333);
            line-height: .3rem;
            .right{
                display:flex;
                justify-content:space-between;
                line-height: .3rem;
                @include sc(.26rem, #999);
                svg{
                   
                    @include wh(.15rem, .27rem);
                    margin-left: .12rem;
                }
            }
        }
        .inorder_state{
            width:100%;
            display: flex;
            div{
                flex: 1;
                
                text-align: center;
                
                img{
                    @include wh(.52rem, .52rem);
                }
                p{
                    @include sc(.28rem, #666);
                    height: .28rem;
                    line-height: .28rem;
                    margin-top: .18rem;
                }
            }
        }
    }
    .statistics_bean{
        @include wh(100%, 2.34rem);
        margin-top: .2rem;

        background: #fff;
        padding: .36rem .24rem 0;
        .top{
            @include wh(100%, .28rem);
            @include sc(.28rem, #333);
            line-height: .28rem;
            display:flex;
            justify-content:space-between;
            .left{
                span{
                    @include sc(.26rem, #e66161);
                    line-height: .28rem;
                    margin-left: .14rem;
                }
            }
            .right{
                
                display:flex;
              
                line-height: .28rem;
                @include sc(.26rem, #999);
                svg{
                  
                    @include wh(.15rem, .27rem);
                    margin-left: .12rem;
                }
            }
        }
        .statistics_main{
            width:100%;
            display: flex;
            .statistics_demo{
                flex: 1;
                font-size: 0;
                text-align: center;
                padding-top: .6rem;
                p{
                    @include sc(.28rem, #333);
                    line-height: .28rem;
                    margin-bottom: .24rem;
                }
                div{
                    @include sc(.26rem, #666);
                    height: .26rem;
                    line-height: .26rem;
                }
            }
        }
    }
    .sale_statistics_bean{
        height: 2.52rem;
        .statistics_demo{
            flex: 1;
            font-size: 0;
            text-align: center;
            padding-top: .53rem;
            p{
                @include sc(.28rem, #333);
                line-height: .34rem;
                span{
                    @include sc(.24rem, #333);
                }
            }
            div{
                @include sc(.24rem, #666);
                height: .24rem;
                line-height: .24rem;
                margin-top: .17rem;
            }
        }
    }
    .goods_statistics_bean{
        height: 1.9rem;
    }
    .marginBottom{
        @include wh(100%, .2rem);
    }
    .guide_item{
        display: block;
        float: left;
        width: 25%;
        text-align: center;
        position: relative;
        .cart_num{
            display: block;
            position: absolute;
            top: .05rem;
            left: 50%;
            margin-left: .2rem;
            margin-top: .2rem;
            min-width: .3rem;
            height: .3rem;
            padding-left: .05rem;
            padding-right: .05rem;
            line-height: .3rem;
            font-size: .24rem;
            color: #fff;
            background: #ff4400;
            border: none;
            border-radius: .15rem;
        }
        .icon_style{
            display: inline-block;
            @include wh(.6rem, .6rem);
        }
        span{
            display: block;
            @include sc(.24rem, #666);
        }
      
    }

</style>
