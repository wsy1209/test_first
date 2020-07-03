<template>
     <div class="first_level_page brand_list_page">
        <div class="brand_demo left" @click="$router.push({path: '/goodsList', query: {}})">
            <img src="../../images/slider2.jpg" alt="">
        </div>
         <div class="brand_demo left" @click="$router.push({path: '/goodsList', query: {}})">
            <img src="../../images/slider2.jpg" alt="">
        </div>
        <div class="brand_demo left" @click="$router.push({path: '/goodsList', query: {}})">
            <img src="../../images/slider2.jpg" alt="">
        </div>
         <div class="brand_demo left" @click="$router.push({path: '/goodsList', query: {}})">
            <img src="../../images/slider2.jpg" alt="">
        </div>
        <div class="brand_demo left" @click="$router.push({path: '/goodsList', query: {}})">
            <img src="../../images/slider2.jpg" alt="">
        </div>
         <div class="brand_demo left" @click="$router.push({path: '/goodsList', query: {}})">
            <img src="../../images/slider2.jpg" alt="">
        </div>
        <div class="brand_demo left" @click="$router.push({path: '/goodsList', query: {}})">
            <img src="../../images/slider2.jpg" alt="">
        </div>
         <div class="brand_demo left" @click="$router.push({path: '/goodsList', query: {}})">
            <img src="../../images/slider2.jpg" alt="">
        </div>
        <div class="clear"></div>

<!--         <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition> -->
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {getAllBrand} from 'src/service/getData'
    import {imgBaseUrl} from 'src/config/env'
    import {imgToSamll} from 'src/config/mUtils'
    import loading from 'src/components/common/loading'

    export default {
        data() {
            return {
                brandList:null, //品牌列表
                showLoading: true, //显示加载动画
            }
        },
        created() {

        },
        mounted() {
            
        },
        components: {
            scroll,
            loading,
        },
        computed: {
        ...mapState([
            'userInfo',
        ]),
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    @import 'src/style/mixin';

    .brand_list_page{
        padding-left: .2rem;
        padding-bottom: .2rem;
        .brand_demo{
            background: #fff;
            margin-right: .2rem;
            margin-top: .2rem;
            @include wh(3.45rem, 1.8rem);
            @include sc(.3rem, #333);
            text-align: center;
            line-height: 1.8rem;
            img{
                @include wh(3.45rem, 1.8rem);
            }
        }
    }
</style>
