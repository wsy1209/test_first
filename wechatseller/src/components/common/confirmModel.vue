 <template>
    <div class="alet_container">
	    <section class="tip_text_container">
            <div class="tip_icon">提示</div>
            <p class="tip_text">{{confirmText}}</p>
            <div class="decision_container">
                <div class="cancel_btn" @click="cancel">取消</div>
                <div class="confirm_btn" @click="confirm">确认</div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                positionY: 0,
                timer: null,
            }
        },
        mounted(){
      
        },
        props: ['confirmText'],
        methods: {
            cancel(){
                this.$emit('cancel')
            },
            confirm(){
                this.$emit('confirm')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alet_container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        background: rgba(0,0,0,.7);
    }
    .tip_text_container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1.43rem;
        margin-left: -3.17rem;
        width: 6.34rem;
        height: 2.86rem;
        animation: tipMove .4s ;
        background-color: #fff;
        padding-top: .44rem;
        border-radius: 0.2rem;
        .tip_icon{
            @include wh(100%, .36rem);
            text-align: center;
            @include sc(.36rem, #333);
            line-height: .36rem;
        }
        .tip_text{
            @include wh(100%, .32rem);
            @include sc(.32rem, #333);
            line-height: .32rem;
            text-align: center;
            margin-top: .28rem;
        }
        .decision_container{
            margin-top: .46rem;
            display: flex;
            @include wh(100%, 1rem);
            line-height: 1rem;
            border-top: .01rem solid #dedede;
            text-align: center;
            line-height: 1rem;
            .cancel_btn{
                flex: 1;
                @include sc(.38rem, #333);
                border-right: .01rem solid #dedede;
            }
            .confirm_btn{
                flex: 1;
                @include sc(.38rem, $orange);
            }
            .confirm_btn.active{
                background-color: #fafafa;
            }
        }
    }
    
</style>
