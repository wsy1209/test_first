<template>
    <section class="pay-mask">
        <div class="container">
            <div class="pay_title">
                <div>请输入支付密码</div>
                <div class="cancel-pay" @click="closeMask">
                    <svg width="100%" height="100%" viewBox="0 0 38 38">
                        <line x1="0" y1="0" x2="38" y2="38"
                        style="stroke:rgb(197,197,197);stroke-width:2"/>
                        <line x1="38" y1="0" x2="0" y2="38"
                        style="stroke:rgb(197,197,197);stroke-width:2"/>
                    </svg> 
                </div>
            </div>
            <div class="flex f-d-r pay_content">
                <div class="ipt_pay">
                    <input type="password" maxlength="1" disabled>
                </div>
                <div class="ipt_pay">
                    <input type="password" maxlength="1" disabled>
                </div>
                <div class="ipt_pay">
                    <input type="password" maxlength="1" disabled>
                </div>
                <div class="ipt_pay">
                    <input type="password" maxlength="1" disabled>
                </div>
                <div class="ipt_pay">
                    <input type="password" maxlength="1" disabled>
                </div>
                <div class="ipt_pay">
                    <input type="password" maxlength="1" disabled>
                </div>
                <div class="clear"></div>
            </div>
        </div>
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
            <li class="b9"></li>
            <li @click="btnpassword($event)">0</li>
            <li class="b9" @click="btndelete">删除</li>
            </ul>
        </footer>
    </section>
</template>
<script>
    import md5 from 'js-md5';

    export default {
        data() {
            return {
                index: -1,
            }
        },
        created() {        
        },
        mounted() {
            let payinput = document.getElementsByClassName('ipt_pay');
            payinput[0].getElementsByTagName('input')[0].focus();
            for (let i = 0; i < payinput.length; i++) {
                payinput[i].getElementsByTagName('input')[0].value = '';
            }    
        },
        methods: {
            btnpassword(e) {
                let obj = e.currentTarget;
                if (this.index < 5) {
                    this.index++;
                    document.getElementsByClassName('ipt_pay')[this.index].getElementsByTagName('input')[0].value = obj.innerText;
                }
                if (this.index == 5) {
                    let pay_pwd = '';
                    let payinput = document.getElementsByClassName('ipt_pay');
                    for (let i = 0; i < payinput.length; i++) {
                        pay_pwd += payinput[i].getElementsByTagName('input')[0].value;
                    }
                    this.pwdDone(md5(pay_pwd))
                }
            },
            btndelete() {
                let payinput = document.getElementsByClassName('ipt_pay');
                if (this.index >= 0) {
                    payinput[this.index].getElementsByTagName('input')[0].value = '';
                    this.index--;
                }
            },
            closeMask(){
                this.$emit('closeMask')
                let payinput = document.getElementsByClassName('ipt_pay');
                for (let i = 0; i < payinput.length; i++) {
                    payinput[i].getElementsByTagName('input')[0].value = '';
                }
                this.index = -1;
            },
            pwdDone(pay_pwd) {
                this.$emit('pwdDone', pay_pwd)
                let payinput = document.getElementsByClassName('ipt_pay');
                for (let i = 0; i < payinput.length; i++) {
                    payinput[i].getElementsByTagName('input')[0].value = '';
                }
                this.index = -1;
            }
        },
        watch: {
            data: function(value){
            }
        }
    }
</script>
<style scoped>
    img {
        width: 100%;
        height: 100%;
    }
    section {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 998;
        background: rgba(0, 0, 0, .6);
    }
    .flex{
        clear: both;
    }
    .container {
        position: absolute;
        top: 50%;
        left: .6rem;
        right: .6rem;
        background: #fff;
        border-radius: .2rem;
        padding-bottom: .27rem;
        margin-top: -2.5rem;
    }
    .pay_title {
        position: relative;
        font-size: .4rem;
        text-align: center;
        color: #333;
        padding-top: .06rem;
        height: 1.06rem;
        line-height: 1rem;
        border-bottom: .01rem solid #ddd;
    }
    .cancel-pay{
        position: absolute;
        top: .1rem;
        right: .2rem;
        width: .38rem;
        height: .38rem;
    }
    .close {
        position: absolute;
        right: .2rem;
        top: .2rem;
        width: .72rem;
        height: .72rem;
    }
    .pay_content {
        margin: .5rem;
    }
    .ipt_pay {
        float: left;
        width: .883333rem;
        height: .883333rem;
        font-size: 0;
        border: .01rem solid #999;
        border-left: 0;
        border-radius: 0;
    }
    .ipt_pay input {
        height: .8rem;
        width: .8rem;
        margin: .04rem;
        background: #fff;
        text-align: center;
        /*font-size: .8rem; */
    }
     .ipt_pay:first-child{
        border-left: .01rem solid #999;
    } 
    footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        font-weight: 600;
    }
    .pay_btn {}
    .pay_btn li {
        width: 33.3333%;
        float: left;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background: #fff;
        font-size: .48rem;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }
    .pay_btn li:active {
        background: #C2C2C2;
    }
    .b9:active {
        background: #fff !important;
    }
    .b9 {
        background: #C2C2C2 !important;
    }
</style>