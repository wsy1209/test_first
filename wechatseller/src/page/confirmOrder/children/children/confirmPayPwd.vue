<template>
    <div class="second_level_page confirm_pay_pwd_page">
        <form class="confirmPayPwd">
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
    import {resetPayPwd} from 'src/service/getData'
    import md5 from 'js-md5'
    import {mapState} from 'vuex'

    export default {
        data(){
            return {
                phoneNumber:null, //手机号码
                newPassword: null,//新密码
                confirmNewPassword: null, //确认新密码
                validateConfirm: false,//判断新密码与确认密码是否一致
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                tipType: 0, //1:找回支付密码成功，返回
            }
        },
        components: {
            alertTip,
        },
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        created(){
            this.phoneNumber = this.$route.params.phoneNumber;
        },
        methods: {
            inputConfirmNewPwd(){
  
            },
            //确定重置支付密码
            async confirmButton(){

            },
            closeTip(){
 
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .confirmPayPwd{
        background-color: #fff;
        margin-top: .2rem;
        .input_container{
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
