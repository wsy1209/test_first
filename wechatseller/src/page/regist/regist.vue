<template>
    <div class="first_level_page regist_page">
        <svg style="position:absolute;width:0;height:0">
            <defs>
                <symbol id="clearIcon" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="19" stroke="rgb(210,210,210)" stroke-width="2" fill="rgb(210,210,210)"/>
                    <line x1="15" y1="15" x2="27" y2="27"
                    style="stroke:#fff;stroke-width:2"/>
                    <line x1="15" y1="27" x2="27" y2="15"
                    style="stroke:#fff;stroke-width:2"/>
                </symbol> 
            </defs>
        </svg>
        <section class="regist_form">
            <div class="input_div">
                <div class="input_group">
                    <img src="../../images/required.png">
                    <label for="trueName" class="input_label left">姓名</label>
                    <input class="left" type="text" id="trueName" placeholder="请输入姓名" v-model="trueName">
                    <div v-if="trueName" class="clear_input" @click="trueName = ''">
                        <svg>
                            <use :xlink:href="'#clearIcon'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="input_div">
                <div class="input_group">
                    <img src="../../images/required.png">
                    <label for="tel" class="input_label left">手机号</label>
                    <input class="left" maxlength="11" type="text" id="tel" placeholder="请输入手机号" v-model="tel" @input="inputPhone">
                    <div v-if="tel" class="clear_input" @click="tel = ''; rightPhoneNumber = false;">
                        <svg>
                            <use :xlink:href="'#clearIcon'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="input_div">
                <div class="input_group">
                    <label for="verifyCode" class="input_label left">验证码</label>
                    <input class="left" type="text" id="verifyCode" placeholder="请输入验证码" v-model="verifyCode">
                    <div class="btn" :class="{right_phone_number:rightPhoneNumber && !computedTime}" @click.prevent="getVerifyCode">
                        获取验证码<span v-show="computedTime">({{computedTime}}s)</span>
                    </div>
                </div>
            </div>
            <div class="input_div">
                <div class="input_group">
                    <img src="../../images/required.png">
                    <label for="businessName" class="input_label left">店铺名称</label>
                    <input class="left" type="text" id="businessName" placeholder="请输入店铺名称" v-model="businessName">
                    <div v-if="businessName" class="clear_input" @click="businessName = ''">
                        <svg>
                            <use :xlink:href="'#clearIcon'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="input_div">
                <div class="input_group">
                    <img src="../../images/required.png">
                    <label for="detailedAddress" class="input_label left">详细地址</label>
                    <input class="left" type="text" id="detailedAddress" placeholder="请输入店铺详细地址" v-model="detailedAddress">
                    <div v-if="detailedAddress" class="clear_input" @click="detailedAddress = ''">
                        <svg>
                            <use :xlink:href="'#clearIcon'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="input_div">
                <div class="input_group">
                    <label for="recommenderPhone" class="input_label left">邀约人电话</label>
                    <input class="left" type="text" id="recommenderPhone" placeholder="请输入邀约人电话" maxlength="11" v-model="recommenderPhone" @input="inputRecommendPhone">
                    <div v-if="recommenderPhone" class="clear_input" @click="recommenderPhone = ''">
                        <svg>
                            <use :xlink:href="'#clearIcon'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="regist_btn" :class="{active: trueName && rightPhoneNumber && businessName && detailedAddress}" @click="regButton">
                同意协议并注册
            </div>
            <router-link to="/regist/registProtocol" class="regist_protocol_div">
                《注册协议》
            </router-link>
        </section>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import alertTip from 'src/components/common/alertTip'
    import {checkRegCode, checkCode, apiSellerAdd} from 'src/service/getData'

    export default {
        data(){
            return {
                tel: null, //电话号码
                recommenderPhone: null, //邀约人电话号码
                rightPhoneNumber: false, //输入的手机号码是否符合要求
                rightRecommendPhoneNumber: false, //输入的邀约人手机号码是否符合要求
                verifyCode:null,//验证码
                trueName: null, //姓名
                businessName: null, //店铺名称
                detailedAddress: null, //详细地址
                computedTime: 0, //倒数记时
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                validate_token:false, //验证码通过标记
            }
        },
        components: {
            alertTip,
        },
        created(){
        },
        methods: {
            //判断输入的电话号码
            inputPhone(){
                if(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.tel)){
                    this.rightPhoneNumber = true;
                }else{
                    this.rightPhoneNumber = false;
                }
            },
            //判断输入的邀约人电话号码
            inputRecommendPhone(){
                if(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.recommenderPhone)){
                    this.rightRecommendPhoneNumber = true;
                }else{
                    this.rightRecommendPhoneNumber = false;
                }
            },
            //获取验证吗
           /* async getVerifyCode(){
                if (this.rightPhoneNumber && !this.computedTime) {
                    this.computedTime = 60;
                    //倒计时
                    this.timer = setInterval(() => {
                        this.computedTime --;
                        if (this.computedTime == 0) {
                            clearInterval(this.timer)
                        }
                    }, 1000)

                    //获取验证信息
                    let getCode = await checkRegCode(this.tel);
                    if (getCode.resultCode==0) {
                        this.showAlert = true;
                        this.alertText = getCode.resultMessage;
                        this.validate_token = false;
                        return
                    }
                    this.validate_token = true;
                }
            },*/
            //注册
            async regButton(){
                if(this.recommenderPhone!=null && !this.rightRecommendPhoneNumber){
                    this.showAlert = true;
                    this.alertText = '请输入正确格式的邀约人手机号码';
                    return
                }
                else if(!this.trueName){
                    this.showAlert = true;
                    this.alertText = '请输入姓名';
                    return
                }else if (!this.tel) {
                    this.showAlert = true;
                    this.alertText = '请输入手机号码';
                    return
                }else if(!this.businessName){
                    this.showAlert = true;
                    this.alertText = '请输入店铺名称';
                    return
                }else if(!this.detailedAddress){
                    this.showAlert = true;
                    this.alertText = '请输入详细地址';
                    return
                }else if(!this.verifyCode){
                    this.showAlert = true;
                    this.alertText = '请输入验证码';
                    return
                }

                // 验证码是否有效
                let res = await checkCode(this.tel, this.verifyCode);
                if (res.resultCode==0) {
                    this.showAlert = true;
                    this.alertText = res.resultMessage;
                    return
                }else{   
                    let res = await apiSellerAdd(this.tel, this.recommenderPhone,this.trueName,this.businessName,this.detailedAddress);   
                    if(res.resultCode==0)
                    {
                        this.showAlert = true;
                        this.alertText = res.resultMessage;
                        return
                    }
                    else
                    {
                        this.$router.replace('/regist/registSuccess');
                    }            
                    
                } 
            },
            closeTip(){
                this.showAlert = false;
            }   
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .regist_form{
        .input_div{
            background: #fff;
            padding-left: .2rem;
            @include wh(100%, 1.1rem);
            .input_group{
                font-size: 0;
                @include wh(100%, 100%);
                line-height: 1.1rem;
                position: relative;
                border-bottom: .01rem solid #d6d6d6;
                img{
                    position: absolute;
                    top: .48rem;
                    left: 0;
                    @include wh(.14rem, .14rem);
                }
                label{
                    @include sc(.3rem, #333);
                    @include wh(1.78rem, 100%);
                    display: inline-block;
                    margin-left: .22rem;
                }
                input{
                    padding: .3rem 0;
                    @include wh(5.1rem, 99.99%);
                    line-height: .5rem;
                    @include sc(.3rem, #333);
                }
                .btn{
                    position: absolute;
                    top: .17rem;
                    right: 0;
                    display: inline-block;
                    @include sc(.26rem, #fff);
                    @include wh(2rem, .76rem);
                    font-family: Helvetica Neue,Tahoma,Arial;
                    border: 0;
                    border-radius: 0.06rem;
                    margin-right: .1rem;
                    background: #c0c0c0;
                    line-height: .76rem;
                    text-align: center;
                    span{
                        @include sc(.26rem, #fff);
                    }
                }
                .right_phone_number{
                    background-color: $orange;
                }
                .clear_input{
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding: .4rem .2rem;
                    svg{
                        @include wh(.3rem, .3rem);
                        float: left;
                    }
                }
            }
        }
        .input_div:last-child .input_group{
            border-bottom: none;
        }
        .regist_btn{
            height: .88rem;
            margin: .4rem .26rem .2rem;
            background: #c0c0c0;
            border-radius: .1rem;
            text-align: center;
            line-height: .88rem;
            @include sc(.32rem, #fff);
        }
        .regist_btn.active{
            background: $orange;
        }
        .regist_protocol_div{
            @include sc(.28rem, $orange);
            margin-left: .26rem;
            display: block;
        }
    }
</style>