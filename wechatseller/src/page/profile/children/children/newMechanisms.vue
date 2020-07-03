<template>
    <div class="second_level_page new_mechanisms_page">
        <v-scroll class="mechanism_scroll" :on-refresh="onRefresh" :on-infinite="onInfinite" :loading-text="loadingText" >
            <div v-for=" value in listdata" class="mechanism_demo">
                <div class="mechanism_text left">
                    <div class="mechanism_name">
                        {{value.mechanismName}}
                    </div>
                    <div class="mechanism_message">
                        {{value.message}}
                    </div>
                </div>
                <div v-if="value.isAgree==1" class="mechanism_btn agree right">
                    已添加
                </div>
                <div v-else class="mechanism_btn right">
                    接受
                </div>
            </div>
        </v-scroll>
        <div v-if="Object.keys(listdata).length == 0" class="no_data">
            <img src="../../../../images/no_data.png" alt="">
        </div> 
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import Scroll from 'src/components/common/pulldown';
import {mapState} from 'vuex'
import {getMechanismList} from 'src/service/getData'

export default {
    data(){
        return{
            newMechanismstitle: '新的供应商',
            token:'',
            pageStart:1,
            pageEnd:10,
            loadingText:'加载中...',
            counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
            num : 10,  // 一次显示多少条
            listdata: [], // 下拉更新数据存放数组
            downdata: []  // 上拉更多的数据存放数组
        }
    },
    mounted(){
        this.initData();
    },
    computed:{
        ...mapState([
            'userInfo',
        ]),
    },
    components:{
        'v-scroll':Scroll
    },
    methods:{
        //初始化数据
        async initData(){
            this.counter = 1;
            this.pageStart = 1;
            this.pageEnd = 10;
            this.token = this.userInfo.token;
            let mechanismData = await getMechanismList(this.token,this.pageStart,this.pageEnd);
            this.listdata = mechanismData.data;
            //启动上拉加载功能
            if(this.num > this.listdata.length){
                //禁用上拉加载功能
                this.loadingText='加载完毕……';
                this.$el.querySelector('.load-more').style.display = 'none';
            }else{
                this.$el.querySelector('.load-more').style.display = 'block';
            }  
        },
        //下拉刷新，count=2，从第二页开始加载数据
        onRefresh(done) {
            this.loadingText='加载中……';
            this.initData();
            done() // call done
        },
        //上拉加载，
        async onInfinite(done){
            this.counter++;
            this.pageEnd = this.num * this.counter;
            this.pageStart = this.pageEnd - this.num+1;
            let mechanismDatas = await getMechanismList(this.token,this.pageStart,this.pageEnd);
            this.downdata = mechanismDatas.data;
            this.listdata = this.listdata.concat(this.downdata);
            if(this.num > this.downdata.length){
                //禁用上拉加载功能
                this.loadingText='加载完毕……';
                this.$el.querySelector('.load-more').style.display = 'none';
            }
            done() // call done
        }
    },
    watch:{
        userInfo:function(value){
            this.initData();
        }
    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .mechanism_scroll{
        top: 0;
    }
    .mechanism_demo{
        background: #fff;
        margin-top: .2rem;
        @include wh(100%, 1.24rem);
        .mechanism_text{
            margin-left: .24rem;
            .mechanism_name{
                @include sc(.3rem, #333);
                margin-top: .26rem;
                height: .28rem;
                line-height: .28rem;
                margin-bottom: .1rem;
            }
            .mechanism_message{
                @include sc(.28rem, #333);
                height: .26rem;
                line-height: .26rem;
            }
        }
        .mechanism_btn{
            margin-right: .24rem;
            @include wh(.96rem, .5rem);
            background: $orange;
            @include sc(.28rem, #fff);
            border: 0;
            border-radius :.1rem;
            text-align: center;
            line-height: .5rem;
            margin-top: .37rem;
        }
        .mechanism_btn.agree{
            background: #fff;
            color: #363434;
        }
    }
    .no_data{
        position: absolute; 
        top: 0; 
        left: 0; 
        right: 0; 
        bottom: 0; 
        text-align: center; 
        padding-top: 3.5rem; 
        background: #f4f4f4; 
        z-index: 10;
        img{
            width: 1.88rem;
            height: 2.6rem;
        }
    }
</style>
