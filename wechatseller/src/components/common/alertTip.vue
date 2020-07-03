 <template>
    <div class="alet_container">
	    <section class="tip_text_container">
            <div class="tip_icon">
                <img src="../../images/tipIcon.png">
            </div>
            <p class="tip_text">{{alertText}}</p>
            <div class="confrim" @click="closeTip">确定</div>
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
        props: ['alertText'],
        methods: {
            closeTip(){
                this.$emit('closeTip')
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
        z-index: 300;
        background: rgba(0,0,0,.7);
    }
    .tip_text_container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1.75rem;
        margin-left: -2.7rem;
        width: 5.4rem;
        height: 3.5rem;
        animation: tipMove .4s ;
        background-color: #fff;
        padding-top: .4rem;
        border-radius: 0.1rem;
        .tip_icon{
            @include wh(100%, 1.16rem);
            text-align: center;
            img{
                @include wh(1.16rem, 1.16rem);
            }
        }
        .tip_text{
            @include sc(.3rem, #333);
            line-height: .3rem;
            text-align: center;
            margin-top: .3rem;
            padding: 0 .2rem;
        }
        .confrim{
            position: absolute;
            bottom: .2rem;
            left: .2rem;
            right: .2rem;
            height: .8rem;
            @include sc(.3rem, #fff);
            background-color: $orange;
            text-align: center;
            line-height: .8rem;
            border-radius: .08rem;
        }
    }
    
</style>
