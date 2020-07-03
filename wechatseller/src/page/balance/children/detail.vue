<template>
    <div class="second_level_page bill_page">
        <div class="my_scroll">
            <ul>
              <li>
                 <div class="time"><span>2018-02-03</span></div>
                 <div class="bill_box">
                   <div class="top">消费</div>
                   <div class="middle">
                      <h2>本金</h2>
                      <p>￥0</p>
                   </div>
                   <div class="sm no_margin clear"><span class="left">奖励金</span><span class="right">￥0</span></div>
                   <div class="bottom clear"><span class="left">积分数量</span><span class="right">0</span></div>
                 </div>
              </li>
               <li>
                 <div class="time"><span>2018-02-06</span></div>
                 <div class="bill_box">
                   <div class="top">消费</div>
                   <div class="middle">
                      <h2>本金</h2>
                      <p>￥0</p>
                   </div>
                   <div class="sm no_margin clear"><span class="left">奖励金</span><span class="right">￥0</span></div>
                   <div class="bottom clear"><span class="left">积分数量</span><span class="right">0</span></div>
                 </div>
              </li>   
              <li>
                 <div class="time"><span>2018-02-06</span></div>
                 <div class="bill_box">
                   <div class="top">消费</div>
                   <div class="middle">
                      <h2>本金</h2>
                      <p>￥0</p>
                   </div>
                   <div class="sm no_margin clear"><span class="left">奖励金</span><span class="right">￥0</span></div>
                   <div class="bottom clear"><span class="left">积分数量</span><span class="right">0</span></div>
                 </div>
              </li>           
            </ul>
        </div>
<!--         <div v-if="Object.keys(listdata).length == 0" class="no_data">
            <img src="../../../images/no_data.png" alt="">
        </div>   -->       
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
import Scroll from 'src/components/common/pulldown';
import {mapState} from 'vuex'
import {getSellerAccountList} from 'src/service/getData'
import {fmoney} from 'src/config/mUtils'
import {formatDate} from 'src/config/date.js'

export default {
    data(){
        return{
            token:'',
            pageStart:1,
            pageEnd:10,
            counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
            num : 10,  // 一次显示多少条
            listdata: [], // 下拉更新数据存放数组
            downdata: [],  // 上拉更多的数据存放数组
            nowDate:'',//时间
            fmoney
        }
    },
    mounted () {
       
    },
    components: {
        headTop,
        'v-scroll':Scroll
    },
    computed:{
        ...mapState([
            'userInfo',
        ]),
    },
    filters:{
        formateDate(myTime)
        {
            let time=new Date(myTime);
            return formatDate(time,"yyyy-MM-dd hh:mm:ss");
        }
    },
    methods:{
        //初始化数据
        async initData(){

        },
        //下拉刷新，count=2，从第二页开始加载数据
        onRefresh(done) {

        },
        //上拉加载，
        async onInfinite(done){

        }
            
    },
    watch:{
        userInfo:function(value){
           
        }
    }
}

</script>

<style lang="scss" scoped>
    .bill_page ul li{padding:0 .28rem;}
    .bill_page ul li:last-child{margin-bottom: .4rem;}
    .my_scroll{top: 0; background: #f4f4f4;}
    .yo-scroll .pull-refresh{font-size: .2rem; color: #999}
    .time{text-align: center;margin:.26rem 0; font-size: 0; line-height: 0;}
    .time span{ line-height:.4rem;background:rgba(0,0,0,0.3);color:#fff;font-size:.22rem;border-radius:.08rem;padding:0 .1rem;}
    .bill_box{background:#fff;border-radius:.1rem;}
    .bill_box .top{padding:.3rem;font-size:.32rem;color:#333;}
    .bill_box .middle{text-align: center;}
    .bill_box .middle h2{font-size:.28rem;color:#999;}
    .bill_box .middle p{font-size:.36rem;color:#ffa101;margin-top:.18rem;}
    .bill_box .sm{margin-top:.48rem;padding:.24rem;font-size:.28rem;color:#666;border-bottom:.02rem dashed #dfdfdf;}
    .bill_box .sm{margin-top:0;}
    .bill_box .sm .right{color:#333;}
    .bill_box .bottom{padding:.24rem;font-size:.28rem;color:#666;}
    .bill_box .bottom .right{color:#333;}
    .no_data{position: absolute; top: 0; left: 0; right: 0; bottom: 0; text-align: center; padding-top: 3.5rem; background: #f4f4f4; z-index: 10;}
    .no_data img{width:1.88rem; height:2.6rem;}
</style>
