<template>
    <div class="second_level_page confirm_pwd_page">
        <form class="confirmPwd">
            <section class="input_container">
                <input type="password" placeholder="请输入新密码" name="newPassword" v-model="newPassword">
            </section>
            <section class="input_container">
                <input type="password" placeholder="请确认新密码" name="confirmNewPassword" @input="inputConfirmNewPwd" v-model="confirmNewPassword">
            </section>
        </form>
        <div class="submit_btn" :class="{active: validateConfirm}" @click="confirmButton">确定</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import alertTip from 'src/components/common/alertTip'
    import {resetPwd} from 'src/service/getData'
    import md5 from 'js-md5';

    export default {
        data(){
            return {
                phoneNumber:null, //手机号码
                newPassword: null,//新密码
                confirmNewPassword: null, //确认新密码
                validateConfirm: false,//判断新密码与确认密码是否一致
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                tipType: 0, //1:找回密码成功，返回
            }
        },
        components: {
            alertTip,
        },
        created(){
        },
        methods: {
            inputConfirmNewPwd(){
                if(this.newPassword == this.confirmNewPassword){
                    this.validateConfirm = true;
                }else{
                    this.validateConfirm = false;
                }
            },
            //确定修改密码
            async confirmButton(){
                if (!this.newPassword) {
                    this.showAlert = true;
                    this.alertText = '请输入新密码';
                    this.tipType = 0;
                    return
                }else if(!this.confirmNewPassword){
                    this.showAlert = true;
                    this.alertText = '请确认新密码';
                    this.tipType = 0;
                    return
                }else if(this.newPassword!=this.confirmNewPassword){
                    this.showAlert = true;
                    this.alertText = '新密码和确认密码不一致';
                    this.tipType = 0;
                    return
                }
                var telInfo=localStorage.getItem("telInfo");
                if(telInfo != '' && telInfo != null){                
                    telInfo = JSON.parse(telInfo);
                    this.phoneNumber = telInfo.tel;
                }
                else
                {
                    this.showAlert = true;
                    this.alertText = "手机号码不能为空";
                    this.tipType = 0;
                    return;
                }
                let res = await resetPwd(this.phoneNumber, md5(this.newPassword));
                if (res.resultCode==0) {
                    this.showAlert = true;
                    this.alertText = res.resultMessage;
                    this.tipType = 0;
                    return
                }else{
                    this.showAlert = true;
                    this.alertText = res.resultMessage;
                    this.tipType = 1;
                } 
            },
            closeTip(){
                this.showAlert = false;
                if(this.tipType == 1){
                    this.$router.go(-1);
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .confirmPwd{
        background-color: #fff;
        margin-top: .2rem;
        .input_container{
            font-size: 0;
            display: flex;
            justify-content: space-between;
            border-bottom: .01rem solid #d6d6d6;
            @include wh(100%, 1.1rem);
            input{
                padding: .25rem .2rem;
                @include sc(.3rem, #333);
                @include wh(100%, 99.99%);
                line-height: .5rem;
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
