 <template>
    <div class="second_level_page">
        <div class="pay_result_container">
            <div class="pay_result_main">
                <div class="pay_result_text">
                    {{text}}
                </div>
                <div class="pay_result_money">
                    ￥{{payMoney}}
                </div>
            </div>
        </div>
        <div class="go_where_container">
            <div class="go_where_title">
                您可以选择
            </div>
            <div class="go_where_main">
                <div class="go_where_demo" @click="goIndex">
                    <div class="go_where_img">
                        <img src="../../../../images/cart.png">
                    </div>
                    <div class="go_where_text">
                        返回首页
                    </div>
                </div>
                <div class="go_where_demo" @click="goBalance">
                    <div class="go_where_img">
                        <img src="../../../../images/order.png">
                    </div>
                    <div class="go_where_text">
                        继续充值
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    import {fmoney} from 'src/config/mUtils'

    export default {
        data(){
            return{
                payMoney: 0.00,
                text: ''
            }
        },
        components: {
        },
        mounted(){
            this.payMoney = fmoney(this.$route.query.payMoney, 2);
            this.text = "您已经充值成功";           
        },
        props:[],
        methods: {
            goIndex(){
                this.$router.replace('/home');
            },
            goBalance(){
                this.$router.replace('/balance');
            },
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
    .pay_result_container{
        @include wh(100%, 3.44rem);
        background: #fff;
        .pay_result_main{
            margin: 0 1rem;
            border-bottom: .01rem solid #f0f0f0;
            height: 100%;
            padding-top: 1.2rem;
            div{
                @include sc(.34rem, #333);
                line-height: .34rem;
                text-align: center;
            }
            .pay_result_money{
                margin-top: .36rem;
                color: $orange;
            }
        }
    }
    .go_where_container{
        background: #fff;
        .go_where_title{
            text-align: center;
            @include sc(.26rem, #999);
            padding-top: .64rem;
            height: .9rem;
            line-height: .26rem;
            margin-bottom: .58rem;
        }
        .go_where_main{
            display: flex;
            .go_where_demo{
                flex: 1;
                text-align: center;
                @include sc(.26rem, #666);
                padding-bottom: .64rem;
                img{
                    @include wh(.48rem, .44rem);
                    margin-bottom: .16rem;
                }
            }
        }
    }
</style>
