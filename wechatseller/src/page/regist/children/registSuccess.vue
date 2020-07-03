<template>
    <div class="second_level_page regist_success_page">
        <div class="regist_success_main">
            <img src="../../../images/success_icon.png">
            <div class="regist_success_title">提交成功</div>
            <div class="regist_success_tip">
                注册信息已经提交，等待管理员审核；工作人员会在1-2个工作日为你处理，审核通过后，你将收到开店的短信提醒，请注意查收。
            </div>
            <div class="btn" @click="goLogin">确定</div>
        </div>
    </div>
</template>

<script>

    export default {
        data(){
            return {
            }
        },
        components: {
        },
        created(){
        },
        methods: {
            goLogin(){
                //this.$router.replace('/login');
                this.$router.go(-1);
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .regist_success_main{
        background: #fff;
        text-align: center;
        padding-bottom: .6rem;
        img{
            @include wh(1.3rem, 1.3rem);
            margin-top: .88rem;
            margin-bottom: .5rem;
        }  
        .regist_success_title{
            height: .4rem;
            line-height: .4rem;
            @include sc(.4rem, #333);
        }
        .regist_success_tip{
            margin: .32rem .4rem .42rem;
            @include sc(.3rem, #666);
            text-align: justify;
            text-indent: 2em;
            line-height: .46rem;
        }
        .btn{
            margin: 0 .4rem;
            background: $orange;
            border-radius: .1rem;
            @include sc(.34rem, #fff);
            height: .88rem;
            line-height: .88rem;
        }
    }
</style>