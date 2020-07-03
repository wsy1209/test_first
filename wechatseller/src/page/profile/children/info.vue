 <template>
    <div class="second_level_page info_page">
        <section class="info_container">
            <div class="head_img_group item_group">
                <input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
                <div class="title left">头像</div>
                <div class="content right">
                    <img  v-if="userInfo" :src="userInfo.headImg">
                    <img v-else src="../../../images/goodsDefault.png">
                </div>
            </div>
            <div class="item_group">
                <div class="title left">用户名</div>
                <div class="content right">
                    {{infotel}}
                </div>
            </div>
            <div class="item_group">
                <div class="title left">真实姓名</div>
                <div class="content right">
                    {{username}}
                </div>
            </div>
            <div class="item_group">
                <div class="title left">合作等级</div>
                <div class="content right">
                    普通商家
                </div>
            </div>
        </section>
        <section class="shopping_container">
            <router-link to="/profile/info/address" class="item_group">
                <div class="title left">收货地址</div>
                <div class="content svg_content right">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 20">
                        <polyline points="0,0 14,10 0,20" style="fill:none;stroke:rgb(153,153,153);stroke-width:4"/>
                    </svg> 
                </div>
            </router-link>
            <router-link to="/profile/info/modifyPassword" class="item_group">
                <div class="title left">修改密码</div>
                <div class="content svg_content right">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 20">
                        <polyline points="0,0 14,10 0,20" style="fill:none;stroke:rgb(153,153,153);stroke-width:4"/>
                    </svg> 
                </div>
            </router-link>
            <router-link to="/profile/info/modifyPayPassword" class="item_group">
                <div class="title left">修改支付密码</div>
                <div class="content svg_content right">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 20">
                        <polyline points="0,0 14,10 0,20" style="fill:none;stroke:rgb(153,153,153);stroke-width:4"/>
                    </svg> 
                </div>
            </router-link>
        </section>
        <div class="exit_login" @click="exitlogin">
            退出登录
        </div>

        <section class="coverpart" v-if="show">
            <section class="cover-background"></section>
            <section class="cover-content " :class="{'cover-animate' : isEnter, 'cover-animate-leave' : isLeave}">
                <div class="sa-icon">
                    <img src="../../../images/tipIcon.png">
                </div>
                <h2>是否退出登录</h2>
                <div class="sa-botton">
                    <button class="waiting" @click="waitingThing">再等等</button>
                    <button class="quitlogin"  @click="outLogin">退出登录</button>
                </div>
            </section>
        </section>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>

        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>

        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import {signout,editSellerHeadImg,uploadheadImage} from 'src/service/getData'
    import alertTip from 'src/components/common/alertTip'
    import {getImgPath} from 'src/components/common/mixin'
    import {imgBaseUrl,baseUrl} from 'src/config/env'
    import {removeStore} from 'src/config/mUtils'
    import loading from 'src/components/common/loading'

    export default {
        data(){
            return{
                username:'',    //用户名
                resetname:'', //重置用户名
                infotel:'',     //用户手机
                avatar:'',      //用户头像
                show:false,     //显示提示框
                isEnter:true,  //是否登录
                isLeave:false, //是否退出
                showAlert: false,
                alertText: null,
                imgBaseUrl,
                showLoading: false, //显示加载动画
            }
        },
        beforeDestroy(){
            clearTimeout(this.timer)
        },
        mounted(){
                if (this.userInfo && this.userInfo.uid) {
                    this.username = this.userInfo.trueName;
                    this.infotel = this.userInfo.tel;
                    this.avatar = this.userInfo.headImg;                   
                }
        },
        components: {
            alertTip,
            loading,
        },
        mixins: [getImgPath],
        computed:{
            ...mapState([
                'userInfo', 'imgPath'
            ]),
        },
        methods: {
            ...mapMutations([
                'OUT_LOGIN', 'SAVE_AVANDER'
            ]),

            exitlogin(){
                this.show=true;
                this.isEnter=true;
                this.isLeave=false;
            },
            waitingThing(){
                //取消推出
                clearTimeout(this.timer)
                this.isEnter=false;
                this.isLeave=true;
                this.timer = setTimeout(() =>{
                    clearTimeout(this.timer)
                    this.show=false;
                },200)
            },
            //退出登录
            async outLogin(){
                this.OUT_LOGIN();
                removeStore('sellerInfo');
                removeStore('defaultAddress');
                removeStore('buyCart');
                removeStore('user_id');
                this.waitingThing();
                this.$router.replace('/login');
                //await signout();
            },
            async uploadAvatar(){
                //上传头像
                if (this.userInfo) {
                    let input = document.querySelector('.profileinfopanel-upload')
/*                    let data = new FormData();

                    data.append('file', input.files[0]);
                    data.append('type', 4);
                    data.append('sellerId', 1);*/
                    try{
                        this.showLoading = true;
                        let res = await uploadheadImage(input.files[0],4,1);
                        this.showLoading = false;
                     //   let res = await response.json();
                        if (res.resultCode == 200) {
                            this.showLoading = true;
                            this.userInfo.headImg = imgBaseUrl+res.data;
                            await editSellerHeadImg(res.data,this.userInfo.token);
                            this.showLoading = false;
                        }
                    }catch (error) {
                        this.showAlert = true;
                        this.alertText = '上传失败';
                        alert(error);
                    }
                }
            }
        },
        watch: {
            userInfo: function (value) {
                if (value && value.uid) {
                    this.showLoading = true;
                    this.username = value.trueName;
                    this.infotel = value.tel;
                    this.avatar = value.headImg;
                    this.showLoading = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin.scss';

    .info_container{
        background: #fff;
        margin: .2rem 0;
    }
    .item_group{
        clear: both;
        margin-left: .24rem;
        border-bottom: .01rem solid #f4f4f4;
        height: 1.1rem;
        line-height: 1.1rem;
        position: relative;
        display: block;
        .profileinfopanel-upload{
            display: block;
            position: absolute;
            opacity: 0;
            top: 0;
            left: 0;
            @include wh(100%,100%);
        }
        .title{
            @include sc(.3rem, #333);
        }   
        .content{
            @include sc(.28rem, #666);
            padding-right: .24rem;
        }
        .svg_content{
            padding: 0 .24rem;
            svg{
                @include wh(.14rem, .2rem);
            }
        }
    }
    .head_img_group{
        height: 1.88rem;
        line-height: 1.3rem;
        padding-top: .3rem;
        img{
            @include wh(1.3rem, 1.3rem);
            border-radius: .65rem;
        }
        .content{
            line-height: 0;
        }
    }
    .item_group:last-child{
        border-bottom: 0;
    }
    .shopping_container{
        background: #fff;
    }
    .exit_login{
        @include wh(100%, 1.02rem);
        text-align: center;
        line-height: 1.02rem;
        margin-top: .2rem;
        @include sc(.34rem, #333);
        background: #fff;
    }


    .coverpart{
        @include wh(100%,100%);
        @include allcover;
        .cover-background{
            @include wh(100%,100%);
            @include allcover;
            background: rgba(0,0,0,.7);
            z-index:100;
        }
        .cover-content{
            width: 5.4rem;
            background: #fff;
            padding: .2rem;
            position:absolute;
            top:50%;
            left:50%;
            z-index:1000;
            margin-top: -1.75rem;
            margin-left: -2.7rem;
            @include borderRadius(.1rem);
            .sa-icon{
                @include borderRadius(50%);
                margin:.2rem 0 .3rem;
                position:relative;
                text-align: center;
                @include wh(100%, 1.16rem);
                img{
                    @include wh(1.16rem, 1.16rem);
                }
            }
            h2{
                @include wh(100%, .3rem);
                text-align:center;
                @include sc(.3rem,#333);
                line-height: .3rem;
            }
            .sa-botton{
                margin-top: .38rem;
                @include wh(100%, .8rem);
                clear: both;
                button{
                    float: left;
                    width: 2.4rem;
                    display:inline-block;
                    @include borderRadius(.08rem);
                    @include sc(.3rem, #fff);
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                }
                .waiting{
                    background:#C1C1C1;
                    margin-right: .1rem;
                }
                .quitlogin{
                    margin-left: .1rem;
                    background: $orange;
                }
            }

        }
    }
@-webkit-keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, 100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, 100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@-webkit-keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  100% {
    opacity: 0;
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  100% {
    opacity: 0;
  }
}
body .coverpart .cover-animate{
    transition:all 1s;
    animation:bounceIn .6s;
}
body .coverpart .cover-animate-leave{
    animation:zoomOut .4s;
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>
