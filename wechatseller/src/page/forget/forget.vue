<template>
    <div class="first_level_page forget_pwd_page">
        <form class="forgetPwdForm">
            <section class="input_container">
                <input type="text" placeholder="请输入手机号" v-model="phoneNumber" @input="inputPhone">
            </section>
            <section class="input_container">
                <input class="phoneNumberInput" type="text" placeholder="请输入验证码" maxlength="6" v-model="mobileCode" @input="inputCode">
                <div class="btn" @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber && !computedTime}">
                    获取验证码<span v-show="computedTime">({{computedTime}}s)</span>
                </div>
            </section>
        </form>
        <div class="submit_btn" :class="{active:rightPhoneNumber&&rightCode}" @click="nextButton">
            下一步
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import alertTip from 'src/components/common/alertTip'
    import {mobileCode, checkExsis, sendMobile, getcaptchas, checkCode} from 'src/service/getData'

    export default {
        data(){
            return {
                phoneNumber: null, //电话号码
                rightPhoneNumber: false, //输入的手机号码是否符合要求
                mobileCode: null, //短信验证码
                rightCode: false,//验证码是否符合要求
                computedTime: 0, //倒数记时
                validate_token:false, //验证码通过标记
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
            }
        },
        components: {
            alertTip,
        },
        created(){
           // this.getCaptchaCode()
        },
        methods: {
            //判断输入的电话号码
            inputPhone(){
                if(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.phoneNumber)){
                    this.rightPhoneNumber = true;
                }else{
                    this.rightPhoneNumber = false;
                }
            },
            inputCode(){
                if(this.validate_token && this.mobileCode && this.mobileCode.length > 0){
                    this.rightCode = true;
                }else{
                    this.rightCode = false;
                }
            },
            //获取验证吗
            async getVerifyCode(){
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
                    let getCode = await mobileCode(this.phoneNumber);
                    if (getCode.resultCode==0) {
                        this.showAlert = true;
                        this.alertText = getCode.resultMessage;
                        this.validate_token = false;
                        return
                    }

                    this.validate_token = true;
                }
            },
             async getCaptchaCode(){
                let res = await getcaptchas();
                this.captchaCodeImg = res.code;
            },
            //下一步
            async nextButton(){
                if(!this.validate_token)
                {
                    return;
                }
                if (!this.phoneNumber) {
                    this.showAlert = true;
                    this.alertText = '请输入手机号码';
                    return
                }else if(!this.mobileCode){
                    this.showAlert = true;
                    this.alertText = '请输入验证码';
                    return
                }else if(!this.rightPhoneNumber){
                    this.showAlert = true;
                    this.alertText = '请输入正确格式的手机号码'
                    return
                }

                // 验证码是否有效
                let res = await checkCode(this.phoneNumber, this.mobileCode);
                if (res.resultCode==0) {
                    this.showAlert = true;
                    this.alertText = res.resultMessage;
                   // this.getCaptchaCode()
                    return
                }else{
                    var telInfo = {
                        'tel':this.phoneNumber
                    };
                    var telInfoStr=JSON.stringify(telInfo);
                    localStorage.setItem("telInfo", telInfoStr);                   
                    this.$router.replace('/forget/confirmPassword');
                } 

            }, 
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .forgetPwdForm{
        background-color: #fff;
        margin-top: .2rem;
        .input_container{
            font-size: 0;
            display: flex;
            justify-content: space-between;
            @include wh(100%, 1.1rem);
            border-bottom: .01rem solid #d6d6d6;
            position: relative;
            input{
                padding: .25rem .2rem;
                @include sc(.3rem, #333);
                @include wh(100%, 99.99%);
                line-height: .5rem;
            }
            .phoneNumberInput{
                width: 5rem;
            }
            .btn{
                position: absolute;
                top: .17rem;
                right: .1rem;
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
        }
        .input_container:last-child{
            border-bottom: none;
        }
    }
    .submit_btn{
        margin: .4rem .26rem;
        @include sc(.32rem, #fff);
        background-color: #c0c0c0;
        height: .88rem;
        line-height: .88rem;
        border: 1px;
        border-radius: 0.1rem;
        text-align: center;
    }
    .submit_btn.active{
        background: $orange;
    }
</style>
