 <template>
    <div class="cart_goods_buy">
        <svg style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 23 23" id="addIcon"> 
                    <line x1="0" y1="11.5" x2="23" y2="11.5"
                    style="stroke:rgb(102,102,102);stroke-width:2"/>
                    <line x1="11.5" y1="0" x2="11.5" y2="23"
                    style="stroke:rgb(102,102,102);stroke-width:2"/>
                </symbol>

                <symbol viewBox="0 0 23 23" id="minusIcon"> 
                    <line x1="0" y1="11.5" x2="23" y2="11.5"
                    style="stroke:rgb(175,173,173);stroke-width:2"/>
                </symbol>

                <symbol viewBox="0 0 23 23" id="minusIconActive"> 
                    <line x1="0" y1="11.5" x2="23" y2="11.5"
                    style="stroke:rgb(102,102,102);stroke-width:2"/>
                </symbol>

            </defs>
        </svg>
        <div class="cart_goods_buy_minus" @click.stop.prevent="minusCart()">
            <svg class="buy_icon_style">
                <use :xlink:href="'#minusIcon'"></use>
            </svg>
        </div>
        <div class="cart_goods_buy_num">
            {{buyNum}}
        </div>
        <div class="cart_goods_buy_add" @click.stop.prevent="addCart()">
            <svg class="buy_icon_style">
                <use :xlink:href="'#addIcon'"></use>
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
            }
        },
        mounted(){
      
        },
        props: ['buyNum'],
        methods: {
            minusCart(){
                this.$emit('minusCart')
            },
            addCart(){
                this.$emit('addCart')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .cart_goods_buy{
        display: flex;
        @include wh(2.64rem, .56rem);
        .cart_goods_buy_minus{
            @include wh(.78rem, 100%);
            border: .01rem solid #dcdcdc;
            border-right: none;
            border-bottom-left-radius: .08rem;
            border-top-left-radius: .08rem;
        }
        .cart_goods_buy_num{
            @include wh(1.08rem, 100%);
            border: .01rem solid #999;
            @include sc(.28rem, #464645);
            text-align: center;
            line-height: .56rem;
        }
        .cart_goods_buy_add{
            @include wh(.78rem, 100%);
            border: .01rem solid #999;
            border-left: none;
            border-top-right-radius: .08rem;
            border-bottom-right-radius: .08rem;
        }
        .buy_icon_style{
            @include wh(.23rem, .23rem);
            margin: .165rem .275rem;
            float: left;
        }
    }    
</style>
