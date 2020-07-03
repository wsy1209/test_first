<template>
    <div class="second_level_page add_address_page">        
        <svg style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 30 30" id="circleSelectedActive"> 
                    <circle cx="15" cy="15" r="13" stroke-width="2" fill="#F5F5F5" stroke="#CECECE"/>
                    <circle cx="15" cy="15" r="7" stroke-width="0" fill="#8A8A8A"/>
                </symbol>

                <symbol viewBox="0 0 30 30" id="circleSelectedDefault">
                    <circle cx="15" cy="15" r="13" stroke-width="2" fill="#F5F5F5" stroke="#CECECE"/>
                </symbol>
            </defs>
        </svg>
        <section class="add_address_form">
            <div class="input_div">
                <div class="input_group">
                    <label for="message" class="input_label left">收货人</label>
                    <input class="left" type="text" id="message" placeholder="请输入收货人姓名" v-model="message">
                    <div v-if="message" class="clear_input" @click="message = ''">
                        <svg>
                            <use :xlink:href="'#clearIcon'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="input_div">
                <div class="input_group">
                    <label for="telenum" class="input_label left">联系电话</label>
                    <input class="left" type="text" id="telenum" placeholder="请输入收货人电话" v-model="telenum" @input="inputPhone">
                    <div v-if="telenum" class="clear_input" @click="telenum = ''">
                        <svg>
                            <use :xlink:href="'#clearIcon'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="input_div area_input_div">
                <div class="input_group" @click="toGao()">
                    <label for="area_text" class="input_label left">所在地区</label>
                    <span class="left area_text">{{mainAddress}}</span>
                    <img class="location_icon" src="../../../../../images/location.png">
                </div>
            </div>
            <div class="input_div address_detail_input_div">
                <div class="input_group">
                    <label for="mesthree" class="input_label left">详细地址</label>
                    <textarea class="left address_detail" type="text" id="mesthree" maxlength="45" placeholder="例：楼号-楼层-门牌号" v-model="mesthree"></textarea>
                    <div v-if="mesthree" class="clear_input" @click="mesthree = ''">
                        <svg>
                            <use :xlink:href="'#clearIcon'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="input_div set_default_input_div">
                <div class="input_group">
                    <label for="isDefault" class="input_label set_default_label left">设为默认地址</label>
                    <div class="clear_input select_icon" @click="setDefault">
                        <svg>
                            <use :xlink:href="isDefault == 1 ? '#circleSelectedActive' : '#circleSelectedDefault'"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="save_address_btn":class="{active: message && mainAddress && mesthree && rightPhoneNumber}" @click="submitThing">
                保存
            </div>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script src="https://unpkg.com/vue-amap/dist/index.js"></script>
<script>
    import {mapState, mapMutations} from 'vuex'
    import {postAddAddress, getSellerTarAddress} from 'src/service/getData'
    import alertTip from 'src/components/common/alertTip'


    export default {
      data(){
            return{
                addressId:'',//收货地址Id
    			message:'', //收货人姓名
                mainAddress:'',//所在区域
    			mesthree:'', //详细地址
    			telenum:'', //手机号
                isDefault: 0, //是否设为默认地址
                showAlert: false, //弹出框
                alertText: null, //弹出信息
                lng:null,//经度
                lat:null,//经度
                rightPhoneNumber: false, //输入的手机号码是否符合要求
                isEditDefault: false, //是否是编辑默认地址
            }
        },
        created(){
        },
        mounted(){
            if(this.$route.query.addressId){
                this.addressId = this.$route.query.addressId;
                this.initData(this.addressId);
            }else{
                this.addressId = 0;
            }
        },
        components: {
            alertTip,
        },
        computed:{
             ...mapState([
                'userInfo',
            ]),            
        },
        props:[],
        methods: {
        	...mapMutations([
            	'RECORD_DEFAULT_ADDRESS'
            ]),
            async initData(addressId){
                let res = await getSellerTarAddress (addressId,this.userInfo.token);
                if(res.resultCode==200){
                    this.message = res.data.contacter;
                    this.telenum = res.data.tel;
                    this.mesthree = res.data.address;
                    this.lng = res.data.lng;
                    this.lat = res.data.lat;
                    this.mainAddress = res.data.mainAddress;
                    this.isDefault = res.data.isDefault;
                    this.rightPhoneNumber = true;
                    if(this.isDefault == 1){
                        this.isEditDefault = true;
                    }
                }
            },
            //判断输入的电话号码
            inputPhone(){
                if(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.telenum)){
                    this.rightPhoneNumber = true;
                }else{
                    this.rightPhoneNumber = false;
                }
            },
            setDefault(){
                if(this.isEditDefault){
                    this.showAlert = true;
                    this.alertText = '当前地址为默认地址';
                    this.isDefault = 1;
                }else{
                    this.isDefault = this.isDefault == 0 ? 1 : 0;
                }
            },
            toGao(){
                if(this.$route.meta && this.$route.meta.type == 'confirmOrder'){
                    this.$router.replace({name:'searchAddress', params:{'addressId': this.addressId, 'mainAddress': this.mainAddress, 'lng': this.lng, 'lat': this.lat}});
                }else{
                    this.$router.replace({name:'addDetail', params:{'addressId': this.addressId, 'mainAddress': this.mainAddress, 'lng': this.lng, 'lat': this.lat}});
                }               
            },
            getMainAddress(){
                this.lng = this.$route.query.lng;
                this.lat = this.$route.query.lat;
                this.mainAddress = this.$route.query.mainAddress;
            },
            //保存地址
            async submitThing(){
                if(this.rightPhoneNumber!=null && !this.rightPhoneNumber){
                    this.showAlert = true;
                    this.alertText = '请输入正确格式的收货人电话';
                    return
                }
                else if(!this.message){
                    this.showAlert = true;
                    this.alertText = '请输入收货人姓名';
                    return
                }else if (!this.mainAddress) {
                    this.showAlert = true;
                    this.alertText = '请输入所在地区';
                    return
                }else if(!this.mesthree){
                    this.showAlert = true;
                    this.alertText = '请输入详细地址';
                    return
                }

                let res = await postAddAddress(this.userInfo.token, this.message,this.telenum,this.mesthree,this.lng,this.lat,this.mainAddress, this.isDefault, this.addressId);
                if (res.resultCode==200) {
                    this.RECORD_DEFAULT_ADDRESS(res.data);
                    this.$router.go(-1);
                    // if(this.$route.meta && this.$route.meta.type == 'confirmOrder'){
                    //     this.$router.push({path:"/confirmOrder/chooseAddress"});
                    //     this.$router.go(-1);
                    // }else{
                    //     this.$router.go(-1);
                    // }  
                }else{
                    this.alertText = res.message;
                }             
            }
        },watch: {
            $route(){
                this.getMainAddress();
            }
        }
    

    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';

    .add_address_form{
        .input_div{
            background: #fff;
            @include wh(100%, 1.1rem);
            .input_group{
                font-size: 0;
                padding-left: .4rem;
                @include wh(100%, 100%);
                line-height: 1.1rem;
                position: relative;
                border-bottom: .01rem solid #FAFAFA;
                label{
                    @include sc(.3rem, #333);
                    @include wh(1.78rem, 100%);
                    display: inline-block;
                }
                .area_text{
                    @include sc(.3rem, #333);
                    margin-right: .14rem;
                    max-width: 4.7rem;
                    line-height: .5rem;
                    padding: .3rem 0;
                    text-align: justify;
                    height: 1.6rem;
                }
                .location_icon{
                    @include wh(.22rem, .3rem);
                    margin-top: .4rem;
                    float: left;
                }
                .set_default_label{
                    width: 2rem;
                }
                input{
                    padding: .3rem 0;
                    @include wh(5.1rem, 99.99%);
                    line-height: .5rem;
                    @include sc(.3rem, #333);
                }
                .address_detail{
                    padding: .3rem 0;
                    @include wh(5.1rem, 2.1rem);
                    line-height: .5rem;
                    @include sc(.3rem, #333);
                    resize : none;
                }
                .clear_input{
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding: .4rem .2rem;
                    svg{
                        @include wh(.3rem, .3rem);
                        float: left;
                    }
                }
                .select_icon{
                    padding: .4rem;
                }
            }
        }
        .input_div:last-child .input_group{
            border-bottom: none;
        }
        .area_input_div{
            @include wh(100%, 1.6rem);
        }
        .address_detail_input_div{
            @include wh(100%, 2.1rem);
        }
        .save_address_btn{
            height: .88rem;
            margin: .4rem .26rem .2rem;
            background: #c0c0c0;
            border-radius: .1rem;
            text-align: center;
            line-height: .88rem;
            @include sc(.32rem, #fff);
        }
        .save_address_btn.active{
            background: $orange;
        }
    }
</style>
