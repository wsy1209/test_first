<template>
    <div class="first_level_page mine_page">
        <router-link to="/profile/info">
            <div class="top clear">
                <div class="top_img left">
                    <img src="../../images/mine_header.png" alt="">
                </div>
                <div class="top_text left">
                    <h2>13567992122</h2>
                </div>
                <!-- <div class="top_btn">立即充值<img src="../../images/more2.png" alt=""></div> -->
            </div>
        </router-link>
        <div class="jiubi_money_container">
            <router-link to="/balance" class="jiubi_main">
                <div class="jm_text">积分</div>
                <div class="jm_value">10</div> 
            </router-link>
            <router-link to="/balance" class="jiubi_main">
                <div class="jm_text">余额</div>
                <div class="jm_value">￥200</div> 
            </router-link>
            <router-link to="" class="jiubi_main money_main">
                <div class="jm_text">可用优惠券</div>
                <div class="jm_value">10</div> 
            </router-link>
        </div>
        <ul class="menu_list">
            <router-link to='/order'>
                <li class="bb">
                    <span class="left"><img src="../../images/mine_01.png" alt="">我的订单</span>
                    <em class="right"><img src="../../images/more.png" alt=""></em>
                </li>
            </router-link>
            <router-link to="/balance">
                <li class="bb">
                    <span class="left"><img src="../../images/mine_02.png" alt="">我的钱包</span><em class="right"><img src="../../images/more.png" alt=""></em>
                </li>
            </router-link>
       </ul>
       <ul class="menu_list">
            <router-link to='/myMessages'>
                <li class="bb">
                    <span class="left"><img src="../../images/mine_05.png" alt="">消息中心</span><em class="right"><img src="../../images/more.png" alt=""></em>
                </li>
            </router-link>
            <a  href="tel:037155525080">
                <li>
                    <span class="left"><img src="../../images/mine_06.png" alt="">联系客服</span><em class="right"><img src="../../images/more.png" alt=""></em>
                </li>
            </a>
       </ul>
        <div class="heightBottom"></div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import {mapState, mapMutations} from 'vuex'
import {imgBaseUrl} from 'src/config/env'
import {getImgPath} from 'src/components/common/mixin'
import {getMyEnableVoucherNum,getSellerInfo} from 'src/service/getData'
import {fmoney} from 'src/config/mUtils'
import alertTip from 'src/components/common/alertTip'

export default {
    data(){
        return{
            profiletitle: '我的',
            username: '登录/注册',           //用户名
            resetname: '',
            mobile: '暂无绑定手机号',             //电话号码
            balance: 0,            //我的余额
            count : 0,             //优惠券个数
            pointNumber : 0,       //积分数
            avatar: '',             //头像地址
            imgBaseUrl:'',             //图片地址
            jiubi:0,                //久币余额
            voucherNum:0,          //可用提货券数量
            showAlert: false,
            alertText: '',
        }
    },
    activated(){

    },
    mixins: [getImgPath],
    components:{
        headTop,
        footGuide,
        alertTip,
    },

    computed:{
        ...mapState([
            'userInfo',
        ]),
        //后台会返回两种头像地址格式，分别处理
        imgpath:function () {
            let path;
            if(this.avatar.indexOf('/') !==-1){
                path = this.avatar;
            }else{
                path = this.getImgPath(this.avatar)
            }
            this.SAVE_AVANDER(path);
            return path;
        }
    },

    methods:{
        ...mapMutations([
            'SAVE_AVANDER'
        ]),
        async initData(){
s
        },
        async  getEnableVoucherNum(){
  
        }
    },
    watch: {
        userInfo: function (value){
            
        }
    }
}

</script>

<style lang="scss" scoped>
    .mine_page .top{background:url(../../images/infoBg.png) no-repeat;background-size: 100% 100%; padding:.6rem .3rem;position:relative;}
    .mine_page .top .top_img img{width:1.5rem;height:1.5rem;border-radius:10rem;}
    .mine_page .top .top_text{font-size:.32rem;color:#fff;margin-left:.3rem;}
    .mine_page .top .top_text h2{font-size:.32rem;color:#fff;margin-top: .4rem;}
    .mine_page .top .top_text p{font-size:.28rem;margin-top:.16rem;color:#fff;}
    .mine_page .top_btn{position:absolute;bottom:.85rem;right:.3rem;font-size:.28rem;color:#fff;}
    .mine_page .top_btn img{width:.13rem;margin-left:.12rem;}
    .menu_list{line-height:1.14rem;padding-left:.3rem;background:#fff;margin-top:.2rem;}
    .menu_list li{font-size:.3rem;color:#333;padding-right:.3rem;}
    .menu_list li:after{content: '';display: block;clear: both;}
    .menu_list li .left img{margin-right:.3rem;width:.36rem;}
    .menu_list li .right{text-align:right;}
    .menu_list li .right img{width:.13rem;}
    .bb{border-bottom:.02rem solid #f2f2f2;}
    .jiubi_money_container{
        background: #fff;
        height: 1.5rem;
        width: 100%;
        clear: both;
        padding: .2rem 0;
        text-align:center;
        .jiubi_main{
            float: left;
            width: 33%;
            line-height: 0;
            border-right: .02rem solid #dedede;
        }
        .money_main{
            border-right: 0;
        }
        .jm_text{
            font-size: .3rem;
            color: #333;
            line-height:.6rem;
        }
        .jm_value{
            font-size: .34rem;
            color: #ffa101;
            height: .49rem;
            line-height: .34rem;
            padding-bottom: .15rem;
        }
    }
</style>