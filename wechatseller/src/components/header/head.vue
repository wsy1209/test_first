<template>
    <header id='head_top'>
        <!-- <slot name='search'></slot> -->
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 20 34">
                <polyline points="24,34 4,17 24,0" style="fill:none;stroke:rgb(153,153,153);stroke-width:4"/>
            </svg> 
        </section>
        <section class="head_main ellipsis" :class="{head_main1: goBack, head_main2: showBtn}">
            <input class="head_search" type="text" placeholder="请输入品牌或者商品名称" @blur="blur" v-model="cond" @focus="focus">
        </section>
        <section class="head_bth" v-if="showBtn" @click="search">
            <div>搜索</div>
        </section>
        <!-- <slot name="msite-title"></slot> -->
    </header>
</template>

<script>
    export default {
    	data(){
            return{
                cond: '',
                showBtn: false,
                flag:''
            }
        },
        mounted(){
            this.flag = this.$route.query.flag;
            if(this.flag!=3 && this.flag!=5 && this.flag!=6)
            {
                this.cond = this.$route.query.key ? this.$route.query.key : '';
            }
            
        },
        props: ['goBack'],
        computed: {
        },
        methods: {
            focus(){
                this.showBtn = true
            },
            blur(){
                //this.showBtn = false
            },
            search(){
                this.$router.push({path: '/goodsList', query: {flag:4,key:this.cond}});
            }
        },
        watch: {
            $route: function(value){
               if(this.flag!=3 && this.flag!=5 && this.flag!=6)
               {
                   this.cond = this.$route.query.key;
               }
            }
        }

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #head_top{
        background-color: $bgColor;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, 1.08rem);
        box-shadow: 0 0.01rem 0.025rem rgba(0,0,0,.1);
    }
    .head_goback{
        position: absolute;
        top: 0;
        left: 0;
        svg{
            margin: .37rem 0.25rem;
            @include wh(.2rem, .34rem);
            display: block;
        }
    }
    .head_main{
        position: absolute;
        top: .2rem;
        left: .2rem;
        right: .2rem;
        height: .68rem;
        z-index: 101;
        .head_search{
            display: block;
            @include wh(100%, 100%);
            border: .01rem solid $lineColor;
            border-radius: .1rem;
            padding-left: .6rem;
            line-height: .3rem;
            background: #fff url(../../images/searchIcon.png)  no-repeat .2rem center;
            background-size: .3rem .28rem;
        }
    }
    .head_main1{
        left: .7rem;
    }
    .head_main2{
        right: 1rem;
    }
    .head_bth{
        position: absolute;
        right: 0;
        top: .2rem;
        width: 1rem;
        text-align: center;
        @include sc(.3rem, #666);
        line-height: .68rem;
    }
</style>
