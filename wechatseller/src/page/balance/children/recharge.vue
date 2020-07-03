<template>
    <div class="second_level_page recharge_page">
        <input v-model="money" ref="moneyref" readonly type="text" placeholder="请输入充值金额">
        <div @click="recharge" class="submit_btn">提交</div>
        <footer>
            <ul class="pay_btn">
            <li @click="btnpassword($event)">1</li>
            <li @click="btnpassword($event)">2</li>
            <li @click="btnpassword($event)">3</li>
            <li @click="btnpassword($event)">4</li>
            <li @click="btnpassword($event)">5</li>
            <li @click="btnpassword($event)">6</li>
            <li @click="btnpassword($event)">7</li>
            <li @click="btnpassword($event)">8</li>
            <li @click="btnpassword($event)">9</li>
            <li @click="btnpassword($event)">.</li>
            <li @click="btnpassword($event)">0</li>
            <li class="b9" @click="btndelete">删除</li>
            </ul>
        </footer>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false;" :alertText="alertText"></alert-tip>
        <div id="rechargeamount" style="display:none">{{rechargeamount}}</div>
        <div id="rechargemoney" style="display:none">{{rechargemoney}}</div>

        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>

        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import alertTip from 'src/components/common/alertTip'
import {createSellerRechargeOrder,getRechargePayDate,getJsConfig,getRechargeOrderState} from 'src/service/getData'
import wx from 'weixin-js-sdk'
import {baseUrl} from 'src/config/env'
import {fmoney} from 'src/config/mUtils'
import loading from 'src/components/common/loading'

export default {
    data(){
        return{
            rechargetitle: '充值',
            token:'',
            money:'',
            message:'',
            oldMoney:0.00,
            payData:{},
            openId:'',
            rechargeId:'',
            wx,
            timeStamp:'',
            nonceStr:'',
            package:'',
            signType:'',
            paySign:'',
            alertText: '',
            showAlert: false,
            jsurl:'',
            errMsg:'',
            rechargeamount:0.00, 
            rechargemoney:0.00,
            showLoading: false, //显示加载动画
        }
    },
    mounted(){
        this.initData();
        //this.$refs.moneyref.focus();
    },
    computed:{
        ...mapState([
            'userInfo',
        ]),
    },
    components:{
        alertTip,
        loading,
    },
    methods:{
        initData(){
            this.token = this.userInfo.token;
            this.openId = localStorage.getItem('openId');
            // this.openId = "on20YuLRSBZdmUWgeIu17v5hq4Dk";
            this.jsurl = location.href.split('#')[0];
        },
        recharge(){
            if(!this.money){
                this.showAlert = true;
                this.alertText = "请输入有效金额！";
                return;
            }
            if(this.money==0){
                this.showAlert = true;
                this.alertText = "请输入有效金额！";
                return;
            }
            //alert("start");
            this.createSellerRechargeOrder();

        },
        regMoney(){//验证输入金额格式
            var reg = /^((?:-?0)|(?:-?[1-9]\d*))(?:\.\d{0,2})?$/;
            if(!this.money){
                this.oldMoney = 0.00;
                return;
            }
            if(this.money.length>=10){
                this.money = this.oldMoney;
                return;
            }
            if(!reg.test(this.money)){
                if(this.money.split('.')[1].length>2){
                    this.showAlert = true;
                    this.alertText = "只能输入两位小数！";
                }else{
                    this.showAlert = true;
                    this.alertText = "请输入正确格式!";
                }
                this.money = this.oldMoney;
            }else{
                this.oldMoney = this.money; 
            }
        },
        btnpassword(e) {
            let obj = e.currentTarget;
            this.money += obj.innerText;
        },
        btndelete() {
            this.money = this.money.substring(0, this.money.length - 1);
        },

        //生成充值订单
        async createSellerRechargeOrder(){ 
            this.showLoading = true;
            let data = await createSellerRechargeOrder(this.token,this.money);
            this.showLoading = false;
            this.payData = data.data;
            // console.log(this.payData);
            this.payData.payChannel = 2;//指定微信支付
            this.rechargeId = this.payData.id;
            this.rechargeamount=Number(document.getElementById('useramount').innerHTML) + Number(this.money);
            document.getElementById('rechargemoney').innerHTML=Number(this.money);
            this.rechargeamount=fmoney(this.rechargeamount,2);
        },
        //微信充值
        async getRechargePayDate(){
            this.showLoading = true;
            let data = await getRechargePayDate(this.token,this.openId,this.rechargeId);          
            this.showLoading = false;
            // console.log(data);
            if(data.resultCode==200){
                this.wx.chooseWXPay({
                    timestamp: data.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: data.data.nonceStr1, // 支付签名随机串，不长于 32 位
                    package: data.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: data.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: data.data.paySign, // 支付签名
                    success: function (res) {// 支付成功后的回调函数                       
                        // 支付成功后的回调函数  
                        if (res.errMsg == "chooseWXPay:ok") {                            
                           // document.getElementById('useramount').innerHTML=document.getElementById('rechargeamount').innerHTML;

                            var  payMoney=document.getElementById('rechargemoney').innerHTML;
                            var  text="您已经充值成功";
                            window.location.href="http://api.zhongjiubianli.com/wechat/sellers/home#/balance/recharge/rechargeSuccess?payMoney="+payMoney;
                           // window.history.go(-1);
                        } else {  
                            alert(res.errMsg);  
                        } 
                    },
                    // cancel: function (res) {
                    //     alert("cancel");
                    // },
                    // fail: function (res) {
                    //     alert("fail");
                    // },
                    // complete: function (res) {
                    //     alert("complete");
                    // }
                    // trigger: function (res) {
                    //     this.getRechargeOrderState();
                    //     alert("trigger");
                    // }
                        
                });
            }
        },
        getRechargeOrderState(){
            //支付成功后的回调函数        
            let reData =  getRechargeOrderState(this.token,this.rechargeId);
            
            let resultCode=reData.resultCode;
            let resultMessage =reData.resultMessage;
            if(resultCode==200){
                //支付成功后，返回资产管理页面
                this.showAlert = true;
                this.alertText = resultMessage;
                this.$router.replace('/balance');
            }else{
                this.showAlert = true;
                this.alertText = resultMessage;
            }
        },
        async getJsConfig(){
            let data = await getJsConfig(this.token,this.jsurl);
            let obj = data.data;
            // console.log(obj);
            this.wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: obj.appId, // 必填，公众号的唯一标识
                timestamp: obj.timestamp, // 必填，生成签名的时间戳
                nonceStr: obj.nonceStr, // 必填，生成签名的随机串
                signature: obj.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','chooseWXPay','scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

        },
    },
    watch:{
        userInfo:function(value){
            this.initData();
        },
        errMsg:function(value){
            alert("223");
        },
        "money":"regMoney",
        "rechargeId":"getRechargePayDate",
        "jsurl":"getJsConfig",
        //"errMsg":'getRechargeOrderState'
    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .recharge_page{
        background: #fff;
        input{
            @include wh(80%, 1.28rem);
            margin: 0 auto;
            display: block;
            text-align: center;
            padding: .39rem 0;
            line-height: .5rem;
            @include sc(.32rem, #333);
            background: #fff;
        }
        .submit_btn{
            margin: .42rem .26rem;
            height: .88rem;
            line-height: .88rem;
            text-align:center;
            background: $orange;
            border-radius: .1rem;
            @include sc(.34rem, #fff);
        }
        footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            font-weight: 600;
            .pay_btn {
                li {
                    width: 33.3333%;
                    float: left;
                    height: 1rem;
                    line-height: 1rem;
                    text-align: center;
                    background: #f4f4f4;
                    font-size: .48rem;
                    border-right: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                }
                li:active {
                    background: #C2C2C2;
                }
                .b9:active {
                    background: #fff !important;
                }
                .b9 {
                    background: #C2C2C2 !important;
                }
            }
        }    
    }    
</style>
