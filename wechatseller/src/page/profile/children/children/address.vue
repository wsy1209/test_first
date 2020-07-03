 <template>
  	<div class="second_level_page address_page">
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
        <div class="address_list">
            <div v-for="todo in list" class="address_demo">
                <div class="address_info">
                    <div class="contacter_info">
                        <div class="contacter_name left">{{ todo.contacter }}</div>
                        <div class="contacter_tel right">{{ todo.tel }}</div>
                    </div>
                    <div class="address_detail ellipsis">
                        {{ todo.mainAddress }}<br>{{ todo.address }}
                    </div>
                </div>
                <div class="address_operate">
                    <div class="default_address left" @click="changeDefault(todo.id,todo.lat,todo.lng)">
                        <svg>
                            <use :xlink:href="todo.isDefault==1 ? '#circleSelectedActive' : '#circleSelectedDefault'"></use>
                        </svg>
                        默认地址
                    </div>
                    <div class="edit_del_address right">
                        <div @click="toEdit(todo.id)" class="edit_address left">
                            <img src="../../../../images/modify.png">
                            修改
                        </div>
                        <div class="del_address left" @click="deleteSite(todo)">
                            <img src="../../../../images/delete.png">
                            删除
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div @click="toAdd" class="add_address_btn">
             添加新地址
        </div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false;" :alertText="alertText"></alert-tip>
        <confirm-model v-if="showConfirm" @cancel="showConfirm = false;" @confirm="confirmDos()" :confirmText="confirmText"></confirm-model>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key='
9de6e06db9f3f1eedaca66f0782ecb72'"></script> 
<script>
    import Vue from 'vue'
    import {getImgPath} from 'src/components/common/mixin'
    import {mapState,mapActions,mapMutations} from 'vuex'
    import {getAddressList, delAddress,changeDefault,getSellerTarAddress} from 'src/service/getData'
    import alertTip from 'src/components/common/alertTip'
    import confirmModel from 'src/components/common/confirmModel'
    
    export default {
        data(){
            return{
    			deletesite:false, //是否编辑状态
    			editText:'编辑',
    			adressList:[], //地址列表
                map:'',
                thisData:'',
                list:[],
                addressId:'',//当前进行操作的addressId
                token:'',
                alertText: '',
                showAlert: false,
                confirmText: '',
                showConfirm: false,
            }
        },        
        mounted(){
            this.initData();
            this.getMessge();
        },
        components: {
            alertTip,
            confirmModel,
        },
        computed:{
             ...mapState([
                'userInfo','removeAddress'
            ]),             
        },      
        methods: {
        	...mapMutations([
                'RECORD_DEFAULT_ADDRESS'
            ]),         
            //初始化信息
            initData(){
                if (this.userInfo && this.userInfo.id) {
                    this.token = this.userInfo.token;                    
                }               
            },
            //获取所有地址
            async getMessge(){
                this.thisData = await getAddressList(this.token);
                this.list = this.thisData.data;
            },
            toEdit(addressId){
                if(this.$route.meta && this.$route.meta.type == 'confirmOrder'){
                    this.$router.push({path:'/confirmOrder/chooseAddress/addAddress',query:{addressId:addressId}});
                }else{
                    this.$router.push({path:'/profile/info/address/add',query:{addressId:addressId}});
                }
                /*:to="{path:$route.meta && $route.meta.type == 'confirmOrder' ? '/confirmOrder/chooseAddress/editAddress' : '/profile/info/address/edit',query:{}}"*/
            },
            toAdd(){
                if(this.$route.meta && this.$route.meta.type == 'confirmOrder'){
                    this.$router.push({path:'/confirmOrder/chooseAddress/addAddress'});
                }else{
                    this.$router.push({path:'/profile/info/address/add'});
                }
            },
            //删除地址
            async deleteSite(address){
                if(address.isDefault == 1){
                    this.showAlert = true;
                    this.alertText = '默认地址不能删除';
                }else if(address.isDefault == 0){
                    this.showConfirm = true;
                    this.confirmText = '确定要删除此项记录吗？';
                    this.addressId = address.id;
                }
            },
            async confirmDos(){
                this.showConfirm = false;
                let flag =  await delAddress(this.addressId, this.token);
                if(flag.resultCode==200) {
                    this.getMessge();
                }
                this.showAlert = true;
                this.alertText = flag.resultMessage;
            },
            //改变默认地址
            async changeDefault(addressId,lat,lng){
                for(let key in this.list){
                    if(this.list[key].id == addressId){
                        this.list[key].isDefault = 1;
                    }else{
                        this.list[key].isDefault = 0;
                    }
                }
                if (this.userInfo && this.userInfo.uid) {
                    await changeDefault(addressId,this.token);
                    //获得默认地址
                    let tar = await getSellerTarAddress(addressId,this.token);
                    this.RECORD_DEFAULT_ADDRESS(tar.data);                    
                }
            }
        },
        watch: {
            userInfo: function (value) {               
                this.initData();               
            },
            $route(){
                this.getMessge();
            }
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';

    .address_list{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: .98rem;
        overflow: scroll;
    }
    .address_demo{
        background: #fff;
        margin-bottom: .2rem;
        .address_info{
            padding: .4rem .3rem 0 .5rem;
            border-bottom: .01rem solid #FAFAFA;
            .contacter_info{
                @include sc(.34rem, #4a4a4a);
                @include wh(100%, .34rem);
                line-height: .34rem;
            }
            .address_detail{
                @include wh(100%, .72rem);
                line-height: .36rem;
                @include sc(.26rem, #4a4a4a);
                margin: .21rem 0;
                text-align: justify;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .address_operate{
            background: #fff;
            @include wh(100%, .9rem);
            padding: 0 .3rem 0 .5rem;
            line-height: .9rem;
            @include sc(.26rem, #848689);
            .default_address{
                svg{
                    @include wh(.3rem, .3rem);
                    float: left;
                    margin-top: .3rem;
                    margin-right: .14rem;
                }
            }
            .edit_del_address{
                img{
                    float: left;
                    margin-top: .31rem;
                    margin-right: .14rem;
                }
                .edit_address{
                    margin-right: .52rem;
                    img{
                        @include wh(.24rem, .28rem);
                    }
                }
                .del_address{
                    img{
                        @include wh(.22rem, .28rem);
                    }
                }
            }
        }
    }
    .add_address_btn{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: .98rem;
        text-align: center;
        line-height: .98rem;
        background: $orange;
        @include sc(.34rem, #fff);
    }


    .rating_page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .edit{
    	right: 0.4rem;
        @include sc(0.7rem, #fff);
        @include ct;
    }
    .address{
    	width:100%;
    	margin-top:.4rem;
    	border-top:1px solid #d9d9d9;
    	border-bottom:1px solid #d9d9d9;
    	.addresslist{
    		background:#fff;
    		li{
    			border-bottom:1px solid #d9d9d9;
    			padding:.4rem;
    			@include fj(space-between);
    			p{
    				line-height:.9rem;
    				@include sc(.6rem,#333);
    				span{
    					display:inline-block;
    					@include sc(.6rem,#333);
    				}
    			}
    			.deletesite{
    				display:flex;
    				align-items:center;
    				span{
    					display:block;
    					@include sc(.8rem,#999)
    				}
    			}
    		}
    		li:nth-of-type(1){
    			background:#FFF8C3;
    		}
    	}
    	.addsite{
    		margin-top:.4rem;
    		background:#fff;
    		padding:.2rem .4rem;
    		border-top:1px solid #d9d9d9;
    		@include fj(space-between);
    		span{
    			display:block;
    			@include sc(.7rem,#333);
    			line-height:1.4rem;
    		}
    		.addsvg{
    			@include wh(.66667rem,1.4rem);
    			svg{
    				@include wh(100%,100%);
    			}
    		}
    	}
    }
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
 .addbutton{
        margin:.6rem auto;

        height: 1rem;
        background:#4cd964;
        @include borderRadius(3px);
        button{
            width:100%;
            @include sc(.6rem,#fff);
            line-height:1.6rem;
            background:none;
            font-weight:700;
            opacity:.6;
        }
        .butopacity{
            transition: all .4s;
            opacity:1;
        }
    }
</style>
