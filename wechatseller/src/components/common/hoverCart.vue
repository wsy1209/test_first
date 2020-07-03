 <template>
    <div class="hover_cart">
        <router-link to="/cart">
            <div class="cart_num">{{cartTotalNum()}}</div>
            <img src="../../images/hoverCart.png">
        </router-link>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
    	data(){
            return{
               showMoveDot: [], //控制下落的小圆点显示隐藏
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
        methods: {
            cartTotalNum(){
                let buyNum = 0;
                if (this.userCart) {
                    for(let warehouseCode in this.userCart){
                        for(let specId in this.userCart[warehouseCode]['goodsList']){
                            buyNum += this.userCart[warehouseCode]['goodsList'][specId].buyNum;
                        }
                    }
                }
                return buyNum;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .hover_cart{
        position: fixed;
        top: 50%;
        right: .2rem;
        width: 1.1rem;
        height: 1.1rem;
        z-index: 100;
        img{
            width: 100%;
            height: 100%;
        }
        .cart_num{
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: .2rem;
            min-width: .36rem;
            height: .36rem;
            line-height: .36rem;
            text-align: center;
            font-size: .24rem;
            color: #fff;
            background: #ff4400;
            border-radius: .18rem;
            padding-left: .05rem;
            padding-right: .05rem;
        }
    }
</style>

