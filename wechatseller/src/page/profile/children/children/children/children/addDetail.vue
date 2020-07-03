<template>
    <div class="amap-page-container second_level_page">
        <div class="amap-demo" >
            <el-amap-search-box class="amap_search" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>      
            <el-amap vid="amapDemo" :center="center" :zoom="zoom" class="amap_ditu" :events="events">
                <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
            </el-amap>
        </div>

      <div class="amap_text">
          {{ mainAddress }}
      </div>
      <div class="amap_btn" @click = "submitThing">
          确定
      </div>

    </div>
</template>


<script src="https://unpkg.com/vue-amap/dist/index.js"></script>
<script>
 import headTop from 'src/components/header/head'
      module.exports = {
      data() {
        let self = this;

        return {
          zoom: 18,
          center: [113.65,34.76 ],
          mainAddress: '',
          addressId:null,
          lng:'',
          lat:'',
          flag:true,
          markers: [
            {
              position: [113.65,34.76],
              events: {
                click: () => {
                  alert('click marker');
                },
                dragend: (e) => {
                  this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                }
              },
              visible: true,
              draggable: false
            }
          ],
          searchOption: {
            city: '郑州市',
            citylimit: true
          },
        
          events: {
            init(){
                
                  let  geolocation = new AMap.Geolocation({ loaded: false});

                  let geocoder = new AMap.Geocoder({
                    radius: 30000,
                    extensions: "all"
                  });
                   geolocation.getCityInfo((status,result) =>{
                    self.searchOption.city=result.city;

                  });
                  geolocation.getCurrentPosition((status, result) => {
                    
                  if (result && result.position) {
                     if(self.flag)
                     {
                      self.lng = result.position.lng;
                      self.lat = result.position.lat;
                     
                      //地图标记清空
                      self.markers.length=0;
                      //定位地图中心
                      self.center = [self.lng, self.lat];
                     //添加地图标记
                      let marker = {
                          position: [self.lng,self.lat],
                      };
                      self.markers.push(marker);  
                      //获取地图定位的详细地址
                      geocoder.getAddress([self.lng ,self.lat], function(status, result) {
                      if (status === 'complete' && result.info === 'OK') {
                        if (result && result.regeocode) {
                          self.mainAddress = result.regeocode.formattedAddress;
                          self.$nextTick();
                          }
                        }
                      });  
                      self.loaded = true;
                     }
                    self.$nextTick();
                  }
                });
            },
            click(e) {
              let { lng, lat } = e.lnglat;
              self.lng = lng;
              self.lat = lat;
                 
              // 这里通过高德 SDK 完成。
              let geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
              });    
              geocoder.getAddress([lng ,lat], function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.regeocode) {
                    self.mainAddress = result.regeocode.formattedAddress;
                    self.$nextTick();
                  }
                }
              });   
            self.choseePoint();
            }, 
          },
          lng: 0,
          lat: 0
        };
      },
        mounted(){
            this.addressId = this.$route.params.addressId;
            this.mainAddress = this.$route.params.mainAddress;
            this.lng = this.$route.params.lng;
            this.lat = this.$route.params.lat;
            if(this.lng&&this.lat) {
              this.flag = false;
              this.markers.length=0;  
              let marker = {
                  position: [this.lng,this.lat]
              };
              this.markers.push(marker);
              this.center = [this.lng,this.lat];
            }
        },
        methods:{
       
        changePosition() {
          let position = this.markers[0].position;
          this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
        },
        chnageDraggle() {
          let draggable = this.markers[0].draggable;
          this.markers[0].draggable = !draggable;
        },
        toggleVisible() {
          let visableVar = this.markers[0].visible;
          this.markers[0].visible = !visableVar;
        },
        addMarker() { 
          let marker = {
            position: [this.lng,this.lat],
          };
          this.markers.push(marker);
        },
        removeMarker() {
          if (!this.markers.length) return;
          this.markers.splice(this.markers.length - 1, 1);
        },
        choseePoint(){
            this.removeMarker();
            this.addMarker();
        },
        
         onSearchResult(pois) {
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
             
            });
            console.log(this.markers.length);
            let cente = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.center = [cente.lng, cente.lat];


          }

        }, 
        async submitThing(){
            this.$router.replace({path:this.$route.meta && this.$route.meta.type == 'confirmOrder'? "/confirmOrder/chooseAddress/addAddress" : "/profile/info/address/add",query:{lng:this.lng,lat:this.lat,mainAddress:this.mainAddress}});
        },
    }
};


</script>

<style lang="scss">
    @import '../../../../../../style/mixin';

    .amap_search{
        background-color: $bgColor!important;
        width: 100%!important;
        height: 1.08rem!important;
        box-shadow: 0 0.01rem 0.025rem rgba(0,0,0,.1)!important;
        .search-box-wrapper{
            top: .2rem!important;
            left: .2rem!important;
            right: 1rem!important;
            height: .68rem!important;
            width: auto!important;
            input{
                display: block;
                width: 100%;
                height: 100%!important;
                border: .01rem solid $lineColor!important;
                border-radius: .1rem;
                padding-left: .6rem;
                line-height: .68rem!important;
                background: #fff url(../../../../../../images/searchIcon.png)  no-repeat .2rem center;
                background-size: .3rem .28rem;
            }
            .search-btn{
                position: absolute;
                right: -1rem;
                top: 0;
                width: 1rem!important;
                text-align: center;
                @include sc(.3rem, #666);
                line-height: .68rem;
            }
        } 
        .search-tips{
          @include sc(.3rem, #333);
          width: 100%;
          line-height: .4rem;
        }
    }
    .amap_ditu{
        width: 100%;
        height: 7.5rem!important;
        .amap-logo{
          display: none!important;
        }
        .amap-copyright{
            display: none!important;
        }
    }
    .amap_text{
        @include sc(.3rem, #333);
        margin: .4rem .2rem .5rem;
        height: .6rem;
    }
    .amap_btn {
        @include wh(5rem, .88rem);
        background: $orange;
        line-height: .88rem;
        text-align: center;
        margin: 0 auto;
        @include sc(.34rem, #fff);
        border-radius: .44rem;
    }
</style>
