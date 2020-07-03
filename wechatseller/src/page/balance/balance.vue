<template>
    <div class="myqb_page">
       <div class="top clear">
          <div class="text">
            <h2>账户余额</h2>
            <p id="useramount">￥100</p>
          </div>
           <div class="top_box">
              <ul class="clear">
                 <li><h2>久币数量</h2><p>10</p></li>
                 <li><h2>奖励金</h2><p>￥20</p></li>
                 <li><h2>冻结金额</h2><p>￥30</p></li>
              </ul>
           </div>
       </div>
       <div class="btn_o">
            <router-link to="/balance/recharge">
                <div class="cur">充值</div>
            </router-link>
       </div>
       <div class="btn_o">
            <!-- <router-link to="/balance/withdrawCash"> -->
                <div @click="withdrawCash">提现</div>
            <!-- </router-link> -->
       </div>
       <div class="btn_o">
            <router-link to="/balance/detail">
                <div>查看明细</div>
            </router-link>
       </div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
import alertTip from 'src/components/common/alertTip'
import {mapState} from 'vuex'
import {fmoney} from 'src/config/mUtils'
import {getSellerInfo} from 'src/service/getData'

export default {
    data(){
        return{
            token:'',
            amount:0,
            rewardAmount:0,
            frozenAmount:0,
            creditAmount:0,
            jiuBi:0,
            showAlert: false, //显示提示组件
            alertText: '', //提示的内容
        }
    },
    mounted(){
        
    },
    computed:{
        ...mapState([
            'userInfo',
        ]),
    },
    components:{
        headTop,
        alertTip
    },
    methods:{
        async initData(){


        },
        withdrawCash(){
            this.showAlert = true;
            this.alertText = "请联系客服进行提现！";
        }
    },
    watch:{
        userInfo:function(value){
            
        }
    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .myqb_page .top img{width:100%;}
    .myqb_page .top{background:url(../../images/blue_bg.png);background-size:cover;text-align: center;padding-top:.72rem;}
    .myqb_page .top .text h2{font-size:.34rem;color:#fff;}
    .myqb_page .top .text p{font-size:.6rem;color:#fff;margin-top:.12rem;}
    .myqb_page .top .text p:last-child{font-size: .34rem;}
    .myqb_page .top .top_box{width:100%;margin-top:.56rem;}
    .myqb_page .top .top_box ul{padding:.2rem 0;}
    .myqb_page .top .top_box ul li{width:33.3%;float:left; border-left:1px solid rgba(255,255,255,0.3);}
    .myqb_page .top .top_box ul li:first-child{border-left:0;}
    .myqb_page .top .top_box ul li h2{color:#fff!important;font-size:.28rem!important;}
    .myqb_page .top .top_box ul li p{color:#fff!important;font-size:.28rem!important;}
    .menu_list{line-height:1.14rem;padding-left:.3rem;background:#fff;margin-top:.2rem;}
    .menu_list li{font-size:.3rem;color:#333;padding-right:.3rem;}
    .menu_list li:after{content: '';display: block;clear: both;}
    .menu_list li .left img{margin-right:.3rem;width:.36rem;}
    .menu_list li .right{text-align:right;}
    .menu_list li .right img{width:.13rem;}
    .bb{border-bottom:.02rem solid #f2f2f2;}
    .btn_o{padding:.3rem .4rem; background: #fff;}
    .btn_o div{line-height:.9rem;border:1px solid #d2d2d2;color:#333; border-radius:.1rem;font-size:.34rem;text-align: center;}
    .btn_o div:active{background:#f4f4f4;}
    .btn_o div.cur{border:1px solid #ffa101;color:#ffa101;}
</style>
