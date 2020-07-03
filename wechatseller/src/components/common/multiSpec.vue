 <template>
    <div class="spec_container">
        <div v-for="spec in item.specifications" class="spec_demo">
            <div class="spec_detail">
                <div class="spec_name left">{{spec.name}}</div>
                <div class="spec_min_buy_num left">起批量:{{spec.priceRange ? JSON.parse(spec.priceRange)[0].num : 1}}</div>
                <cart-style class="right" 
                            :buyNum="specBuyNum(spec)"
                            @minusCart="minusCart(spec)"
                            @addCart="addCart(spec)"
                            >
                </cart-style>
            </div>
            <div class="spec_price_range">
                <div class="price_range_tip left">
                    <span>阶梯价展示</span>
                </div>
                <div class="price_range_text ellipsis">
                    {{priceRangeText(spec.priceRange)}}
                </div>
            </div>
        </div>
        <div class="bottom_height"></div>
    </div>
</template>

<script>
    import cartStyle from 'src/components/common/cartStyle'
    import {mapState,mapMutations} from 'vuex'

    export default {
    	data(){
            return{
            }
        },
        mounted(){
      
        },
        computed: {
            ...mapState([
                'userInfo','cartList',
            ]),
            /**
             * 监听cartList变化，更新当前用户的购物车信息userCart，同时返回一个新的对象
             */
            userCart: function (){
                return Object.assign({},this.cartList[this.userInfo.id]);
            },
        },
        props: ['item'],
        components: {
            cartStyle,
        },
        methods: {
            priceRangeText(priceRange){
                let text = '';
                let priceList = JSON.parse(priceRange);
                for(let i=0; i<priceList.length; i++){
                    let startText = '';
                    let endText ='';
                    if(i==0){
                        startText = '1';
                    }else{
                        startText = '' + priceList[i].num;
                    }
                    if(i==priceList.length - 1){
                        endText = '件以上)';
                    }else{
                        endText = '-' + priceList[i+1].num + '件),';
                    }
                    text += '￥' + priceList[i].price + '(' + startText + endText;   
                }
                return text;
            },
            specBuyNum(spec){
                let buyNum = 0;
                if (this.userCart&&this.userCart[this.item.warehouseCode]&&this.userCart[this.item.warehouseCode]['goodsList']&&this.userCart[this.item.warehouseCode]['goodsList'][spec.id]) {
                    buyNum += this.userCart[this.item.warehouseCode]['goodsList'][spec.id].buyNum;
                    return buyNum;
                }else {
                    return 0;
                }
            },
            addCart(spec){
                this.$emit('addCart', spec)
            },
            minusCart(spec){
                this.$emit('minusCart', spec)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .spec_container{
        .spec_demo{
            .spec_detail{
                margin: 0 .2rem;
                margin-top: .3rem;
                height: .56rem;
                .spec_name{
                    @include sc(.28rem, #333);
                    margin-top: .28rem;
                    line-height: .28rem;
                    margin-right: .3rem;
                }
                .spec_min_buy_num{
                    @include sc(.24rem, #666);
                    margin-top: .28rem;
                    line-height: .28rem;
                }
            }
            .spec_price_range{
                margin-top: .2rem;
                border-bottom: .01rem solid #e3e3e3;
                height: .5rem;
                padding: 0 .2rem;
                background: #fff9ef;
                .price_range_tip{
                    margin-right: .12rem;
                    span{
                        float: left;
                        margin-top: .08rem;
                        padding: .05rem;
                        line-height: .22rem;
                        display: inline-block;
                        border: .01rem solid #ff4400;
                        border-radius: .04rem;
                        @include sc(.22rem, #ff4400);
                    }
                }
                .price_range_text{
                    @include sc(.26rem, #666);
                    line-height: .5rem;
                }
            }
        }
        .bottom_height{
            @include wh(100%, .2rem);
        }
    }
</style>
