<template>
    <div class="myMessages_page">
        <router-link to='' class="message_demo">
            <div class="message_text left">
                新的供应商
            </div>
            <div class="message_num left">
                0
            </div>
            <div class="message_more right">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 20">
                    <polyline points="0,0 14,10 0,20" style="fill:none;stroke:rgb(194,194,194);stroke-width:4"/>
                </svg> 
            </div>
        </router-link>
        <router-link to='' class="message_demo">
            <div class="message_text left">
                收到的礼券
            </div>
            <div class="message_num left">
                0
            </div>
            <div class="message_more right">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 20">
                    <polyline points="0,0 14,10 0,20" style="fill:none;stroke:rgb(194,194,194);stroke-width:4"/>
                </svg> 
            </div>
        </router-link>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {getNewMechanismsNum,getReceiveVouchersNum} from 'src/service/getData'

export default {
    data(){
        return{
            myMessagestitle: '消息中心',
            mechanismNum:0,
            voucherNum:0,
            token:'',
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
    },
    methods:{

    },
    watch:{
        userInfo:function(value){
            
        }
    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .message_demo{
        display: block;
        @include wh(100%, 1rem);
        background: #fff;
        margin-top: .2rem;
        .message_text{
            @include sc(.3rem, #333);
            line-height: 1rem;
            margin-left: .24rem;
        }
        .message_num{
            @include sc(.24rem, #fff);
            background: #ff4400;
            @include wh(.36rem, .36rem);
            border-radius: .18rem;
            text-align: center;
            line-height: .36rem;
            margin-top: .32rem;
            margin-left: .14rem;
        }
        .message_more{
            padding: .36rem .3rem;
            svg{
                float: left;
                @include wh(.2rem, .28rem);
            }
        }
    }
</style>
