<template>
    <div class="second_level_page receiveVoucher_page">
        <section class="receive_voucher_box record_box" >
            <v-scroll class="receive_voucher_scroll" :on-refresh="onRefresh" :on-infinite="onInfinite" :loading-text="loadingText" style="margin-top:-2.5rem;">
                <ul v-for=" value in listdata">
                    <li @click="toVoucherDetail(value)">
                        <div class="dw clear" v-if="value.voucherType==2">
                            <div class="left">
                                <h2><em>￥</em>{{value.deductAmount}}</h2>
                                <p>旅游门票</p>
                            </div>
                            <div class="right">
                                <h2>{{value.voucherName}}</h2>
                            </div>

                            <div v-if="value.receiveSellerId!=0">
                                <div v-if="value.exchangeFlag==0">
                                    <div class="btn color_b" @click.stop="ExchangeValidate(value)">
                                        查看凭证
                                    </div>
                                </div>
                                <div class="text color_e" v-else>
                                    已领取
                                </div>
                            </div>
                            <div v-else>
                                <div class="btn color_c" @click.stop="getReceiveVoucherSellers(value)">
                                    领取兑换
                                </div>
                            </div>
                        </div>
                        <div class="dw clear" v-else>
                            <div class="left">
                                <h2><em>￥</em>{{value.deductAmount}}</h2>
                                <p v-if="value.voucherClass.split(',')[0]==1">全场通用</p>
                                <p v-else>限定仓库</p>
                            </div>
                            <div class="right">
                                <h2>{{value.voucherName}}</h2>
                            </div>

                            <div v-if="value.exchangeFlag==0">
                                <div class="btn color_a" @click.stop="bindVoucher(value)">
                                    激活绑定
                                </div>
                            </div>
                            <div class="text color_d" v-else>
                                已激活
                            </div>
                        </div>
                    </li>
                </ul>
            </v-scroll>
            <div v-if="Object.keys(listdata).length == 0" class="no_data">
                <img src="../../../../images/no_data.png" alt="">
            </div> 
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import Scroll from 'src/components/common/pulldown';
import {mapState} from 'vuex'
import {bindVoucher,getVoucherList} from 'src/service/getData'

export default {
    data(){
        return{
            receiveVouchertitle: '收到的礼券',
            token:'',
            list:'',
            pageStart:1,
            pageEnd:10,
            voucherCode:'',
            loadingText:'加载中...',
            counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
            num : 10,  // 一次显示多少条
            listdata: [], // 下拉更新数据存放数组
            downdata: []  // 上拉更多的数据存放数组
        }
    },
    mounted(){
        this.initData();
    },
    computed:{
        ...mapState([
            'userInfo',
        ]),
    },
    components:{
        'v-scroll':Scroll
    },
    methods:{
        //初始化数据
        async initData(){
            this.counter = 1;
            this.pageStart = 1;
            this.pageEnd = 10;
            this.token = this.userInfo.token;
            this.memberId = this.userInfo.id;
            let voucherData = await getVoucherList(this.token,this.pageStart,this.pageEnd);
            this.listdata = voucherData.data;
            //启动上拉加载功能
            if(this.num > this.listdata.length){
                //禁用上拉加载功能
                this.loadingText='加载完毕……';
                this.$el.querySelector('.load-more').style.display = 'none';
            }else{
                this.$el.querySelector('.load-more').style.display = 'block';
            }  
        },
        //下拉刷新，count=2，从第二页开始加载数据
        onRefresh(done) {
            this.loadingText='加载中……';
            this.initData();
            done() // call done
        },
        //上拉加载，
        async onInfinite(done){
            this.counter++;
            this.pageEnd = this.num * this.counter;
            this.pageStart = this.pageEnd - this.num+1;
            let voucherDatas = await getVoucherList(this.token,this.pageStart,this.pageEnd);           
            this.downdata = voucherDatas.data;
            this.listdata = this.listdata.concat(this.downdata);
            if(this.num > this.downdata.length){
                //禁用上拉加载功能
                this.loadingText='加载完毕……';
                this.$el.querySelector('.load-more').style.display = 'none';
            }
            done() // call done
        },
        async toVoucherDetail(value){
            if(value.receiveSellerId!=0&&value.exchangeFlag==0){
                this.$router.push({path:'/showValidate', query:{voucherCode:value.voucherCode}});
            }else{
                this.$router.push({path:'/voucherDetail', query:{voucherCode:value.voucherCode,receiveSellerId:value.receiveSellerId}});
            }
        },
        async bindVoucher(value){
            if(confirm("确定现在要激活绑定吗？")){
                let data = await bindVoucher(this.token,value.memberId,value.voucherCode,value.exchangeCode);
                if(data.resultCode==200){
                    alert(data.resultMessage);
                    // this.$router.replace('/myMessages/receiveVoucher');
                    this.$router.replace({path:'/voucherDetail', query:{voucherCode:value.voucherCode}});
                }else{
                    alert(data.resultMessage);
                }
            }else{
                this.$router.replace('/myMessages/receiveVoucher');
            }
            
        },
        async getReceiveVoucherSellers(value){
            this.$router.push({path:'/voucherSellers',query:{voucherCode:value.voucherCode}});
        },
        async ExchangeValidate(value){
            this.$router.push({path:'/showValidate', query:{voucherCode:value.voucherCode}});
        }
    },
    watch:{
        userInfo:function(value){
            this.initData();
        }
    }
}

</script>

<style type="text/css">
    .receive_voucher_scroll .inner{
        padding-bottom: .22rem;
    }
</style>
<style lang="scss" scoped>
.wrapper{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
}
.receive_voucher_scroll{margin-top: -2.5rem!important; left: .14rem; right: .14rem;}
span , em , i{font-style:normal;}
.record_box ul{margin-top: .22rem;}
.record_box ul li{border-radius:.05rem;position:relative; background: url(../../../../images/record_bg.png) no-repeat; background-size: 100% 100%; width: 100%; height: 2.34rem; }
.record_box img{width:100%;}
.record_box ul li .dw{position:absolute;width:100%;height:100%;top:0;left:0;font-size:.24rem;}
.record_box ul li .dw .left{width:2rem;text-align: center;margin-top:.5rem;}
.record_box ul li .dw .left h2{font-size:.6rem;color:#ffa101;}
.record_box ul li .dw .left h2 em{font-size:.4rem;}
.record_box ul li .dw .left p{margin-top:.24rem;color:#ffa101;}
.record_box ul li .dw .right{
    -webkit-width:calc(100% - 2.8rem);
    -moz-width:calc(100% - 2.8rem);
    -o-width:calc(100% - 2.8rem);
    width:calc(100% - 2.8rem);
    position:absolute;
    right:.2rem;
    top:.48rem;
    height:50%;
}
.record_box ul li .dw .right h2{font-size:.28rem;color:#333;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
.record_box ul li .dw .btn{position:absolute;bottom:.4rem;right:.2rem;border-radius:.05rem; line-height:.54rem;width:1.7rem;text-align: center;color:#fff ;index:99;}
.record_box ul li .dw .text{position:absolute;bottom:.4rem;right:.3rem;line-height:.54rem;index:99;}
.color_a{background:#fd7e61;}
.color_b{background:#8fcd7a;}
.color_c{background:#ffa101;}
.color_d{color:#fd7e61;}
.color_e{color:#ffa101;}
.no_data{
    position: absolute; 
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    text-align: center; 
    padding-top: 3.5rem; 
    background: #f4f4f4; 
    z-index: 10;
    img{
        width: 1.88rem;
        height: 2.6rem;
    }
}
</style>
