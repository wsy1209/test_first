<template>
    <div class="first_level_page login_page">
        <svg style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 38 38" id="squareSelectedActive">
                    <rect x="1" y="1" rx="6" ry="6" width="36"
                    height="36" style="fill:#ffa101;stroke:#ffa101;stroke-width:2"/>
                    <line x1="8" y1="18" x2="16" y2="27"
                    style="stroke:#fff;stroke-width:2"/>
                    <line x1="16" y1="27" x2="31" y2="12"
                    style="stroke:#fff;stroke-width:2"/>
                </symbol>

                <symbol viewBox="0 0 38 38" id="squareSelectedDefault">
                    <rect x="1" y="1" rx="6" ry="6" width="36"
                    height="36" style="fill:white;stroke:rgb(229,229,229);stroke-width:2"/>
                </symbol>

                <symbol id="clearIcon" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="19" stroke="rgb(210,210,210)" stroke-width="2" fill="rgb(210,210,210)"/>
                    <line x1="15" y1="15" x2="27" y2="27"
                    style="stroke:#fff;stroke-width:2"/>
                    <line x1="15" y1="27" x2="27" y2="15"
                    style="stroke:#fff;stroke-width:2"/>
                </symbol> 
            </defs>
        </svg>
        <div class="logo">
            <img src="../../images/logo.png">
        </div>
        <section class="login_form">
            <div class="input_div">
                <input type="text" placeholder="请输入手机号" v-model="userAccount" @input="inputPhone">
                <div v-if="userAccount" class="clear_input" @click="userAccount = ''; rightPhoneNumber = false;">
                    <svg>
                        <use :xlink:href="'#clearIcon'"></use>
                    </svg>
                </div>
            </div>
            <div class="input_div">
                <input type="password" placeholder="请输入登录密码" v-model="passWord">
                <div v-if="passWord" class="clear_input" @click="passWord = '';">
                    <svg>
                        <use :xlink:href="'#clearIcon'"></use>
                    </svg>
                </div>
            </div>
            <div class="pwd_choose_div">
                <div @click="rememberOrNot" class="remember_pwd left">                 
                    <svg class="icon_style" >
                        <use :xlink:href="checked ? '#squareSelectedActive' : '#squareSelectedDefault'"></use>
                    </svg>
                    记住密码
                </div>
                <div class="forget_pwd right">
                    <router-link to="/forget">
                        忘记密码？
                    </router-link>
                </div>
            </div>
            <div class="login_btn" :class="{active: passWord && userAccount}" @click="mobileLogin">
                登录
            </div>
        </section>
        <div class="regist_div">
            <router-link to="/regist">
                没有账号？点击进行注册>>
            </router-link>
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>

        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import alertTip from '../../components/common/alertTip'
    import md5 from 'js-md5';
    import {baseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import fetchJsonp from 'fetch-jsonp';
    import {accountLogin, getLogin, getDefaultAddress} from '../../service/getData'
    import loading from 'src/components/common/loading'

    export default {
        data(){
            return {
                sellerInfo: null, //获取到的用户信息
                userAccount: null, //用户名
                passWord: null, //密码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                checked: false, //记住密码是否选择
                sellerAddress:'', //商家收货地址
                sellerMapCode:'', //商家收货地址经纬度
                rightPhoneNumber: false, //手机号格式是否正确
                showLoading: false, //显示加载动画
            }
        },
        created(){
            this.remmberUserInfo();
        },
        mounted(){
        },
        components: {
            alertTip,
            loading,
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO','RECORD_ADDRESS','RECORD_DEFAULT_ADDRESS','INIT_BUYCART'
            ]),
            inputPhone(){

            },
            //是否记住密码
            rememberOrNot(){
                
            },
            //记住用户名密码
            remmberUserInfo(){

            },
            //发送登录信息
            async mobileLogin(){
                this.showLoading = true;
             //   this.sellerInfo = await getLogin(this.userAccount,this.passWord);
                this.sellerInfo={};
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (!this.sellerInfo) {
                    this.showLoading = false;
                    this.showAlert = true;
                    this.alertText = this.sellerInfo.resultMessage;
                }else{
                    //初始化vuex数据
                    //this.INIT_BUYCART(); //初始化购物车
                    //this.RECORD_USERINFO(this.sellerInfo); 
                    let sellerInfo = this.sellerInfo;
                    localStorage.setItem("sellerInfo", JSON.stringify(sellerInfo));  
                    this.$router.replace('/home');    
                }
            },
            closeTip(){
                this.showAlert = false;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .logo{
        @include wh(100%, 4.3rem);
        padding-top: 1.04rem;
        text-align: center;
        img{
            @include wh(2.6rem, 2.6rem);
        }
    }
    .login_form{
        margin: 0 .26rem;
        border-radius: .06rem;
        .input_div{
            @include wh(100%, 1.1rem);
            background: #fff;
            font-size: 0;
            position: relative;
            input{
                @include wh(100%, 100%);
                background: #fff;
                border-radius: 0;
                border-bottom: .01rem solid #d6d6d6;
                padding-left: .2rem;
                @include sc(.3rem, #333);
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
        .input_div:nth-child(2){
            input{
                border-bottom: 0;
            }
        }
        .pwd_choose_div{
            @include wh(100%, .46rem);
            padding: .16rem 0 0;
            div{
                @include sc(.3rem, #666);
                height: .3rem;
                line-height: .3rem;
            }
            .remember_pwd{
                svg{
                    @include wh(.22rem, .22rem);
                    float: left;
                    margin: .04rem;
                }
            }
        }
        .login_btn{
            @include wh(100%, .88rem);
            margin-top: .4rem;
            background: #c0c0c0;
            border-radius: .1rem;
            text-align: center;
            line-height: .88rem;
            @include sc(.32rem, #fff);
        }
        .login_btn.active{
            background: $orange;
        }
    }
    .regist_div{
        padding-top: 2.28rem;
        @include sc(.3rem, #333);
        text-align: center;
    }
</style>
