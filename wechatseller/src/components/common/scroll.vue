<template>
  <div :id="wrapper" class="better-scroll-root">  <!--该节点需要定位，内容以此节点的盒模型为基础滚动。另外，该节点的背景色配合上拉加载、下拉刷新的UI，正常情况下不可作它用。-->
      <div class="content-bg better-scroll-container">  <!--如果需要调滚动内容的背景色，则改该节点的背景色-->
          <div> <!--不太需要，待优化-->
              <div v-if="pulldown" class="pulldown-tip">
                  <i class="pull-icon indexicon icon-pull-down" :class="[pulldownTip.rotate]"></i>
                  <span class="tip-content">{{pulldownTip.text}}</span>
              </div>

              <transition name="fade">
                  <div v-if="loadingDownStatus.isShow" class="loading-pos">
                      <div class="loading-container">
                          <img v-if="!loadingDownStatus.isRefreshFinished" src="../../images/loading1.gif">
                      </div>
                      <span class="loading-connecting">{{loadingDownStatus.status}}</span>
                  </div>
              </transition>
          </div>
          <slot></slot>
          <div> 
            <div v-if="pullup" class="pullup-tip">
                <i class="pull-icon indexicon icon-pull-pullup" :class="[pullupTip.rotate]"></i>
                <span class="tip-content">{{pullupTip.text}}</span>
            </div>
            <div v-show="loadingUpStatus.isShow" class="loading-up-pos">
                <div class="loading-container">
                    <img src="../../images/loading1.gif">
                </div>
                <span class="loading-connecting">{{loadingUpStatus.status}}</span>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
      props: {
          /**
           * 1 滚动的时候会派发scroll事件，会截流。
           * 2 滚动的时候实时派发scroll事件，不会截流。
           * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
           */
          probeType: {
              type: Number,
              default: 1
          },
          /**
           * 点击列表是否派发click事件
           */
          click: {
              type: Boolean,
              default: true
          },
          /**
           * 是否开启横向滚动
           */
          scrollX: {
              type: Boolean,
              default: false
          },
          /**
           * 是否派发滚动事件
           */
          listenScroll: {
              type: Boolean,
              default: false
          },
          /**
           * 列表的数据
           */
          data: {
              type: Array,
              default: null
          },
          /**
           * 数据是否加载完成，用于上拉加载
           */
          loadFinish: {
              type: Boolean,
              default: false
          },
          /**
           * 是否派发滚动到底部的事件，用于上拉加载
           */
          pullup: {
              type: Boolean,
              default: false
          },
          /**
           * 是否派发顶部下拉的事件，用于下拉刷新
           */
          pulldown: {
              type: Boolean,
              default: false
          },
          /**
           * 是否派发列表滚动开始的事件
           */
          beforeScroll: {
              type: Boolean,
              default: false
          },
          /**
           * 当数据更新后，刷新scroll的延时。
           */
          refreshDelay: {
              type: Number,
              default: 20
          },
          /**
           * 如果启用loading交互，传递loading的状态
           * isShow: false
           * showIcon: false,    // 是否显示loading的icon
           * status: ''  // '正在加载...', '加载完成', '刷新失败', ''
           * 下拉刷新loading
           */
          loadingDownStatus: {
              type: Object,
              default: function () {
                  return {
                      isShow: false,
                      isRefreshFinished: false,
                      status: ''
                  };
              }
          },
          /**
           * 如果启用loading交互，传递loading的状态
           * isShow: false
           * status: ''  // '正在加载...', '加载完成', '刷新失败', ''
           * 上拉加载loading
           */
          loadingUpStatus: {
              type: Object,
              default: function () {
                  return {
                      isShow: false,
                      status: ''
                  };
              }
          },
          /**
           * 是否启用下拉刷新的交互
           */
          pulldownUI: {
              type: Boolean,
              default: false
          },
          /**
           * 是否启用上拉加载的交互
           */
          pullupUI: {
              type: Boolean,
              default: false
          },
          wrapper: {
              default: 'wrapper',
          }
      },
      data() {
          return {
              loadingConnecting: false,
              pulldownTip: {
                  text: '下拉刷新',     // 松开立即刷新
                  rotate: ''    // icon-rotate
              },
              pullupTip: {
                  text: '上拉加载',     // 松开立即加载
                  rotate: ''    // icon-rotate
              },
          };
      },
      mounted() {
          // 保证在DOM渲染完毕后初始化better-scroll
          this.$nextTick(() => {
              //this._initScroll()
              setTimeout(() => {
                  this._initScroll()
              }, 20)
              if(!this.loadFinish){
                  this.pullupTip = {
                      text: '上拉加载',     // 松开立即刷新
                      rotate: ''    // icon-rotate
                  }
              }else{
                  this.pullupTip = {
                      text: '暂无更多数据',     // 松开立即刷新
                      rotate: ''    // icon-rotate
                  }
              }
          });
          this.loadingDownStatus.isShow = false;
      },
      methods: {
          _initScroll() {

              // console.log(document.getElementById(this.wrapper))
              //console.log(this.wrapper)

              if (!document.getElementById(this.wrapper)) {
                  return;
              }
              // better-scroll的初始化
              this.scroll = new BScroll(document.getElementById(this.wrapper), {
                  probeType: this.probeType,
                  click: this.click,
                  scrollX: this.scrollX
              });

              // 是否派发滚动事件
              if (this.listenScroll || this.pulldown || this.pullup) {
                  let me = this;
                  this.scroll.on('scroll', (pos) => {
                      if (this.listenScroll) {
                          me.$emit('scroll', pos);
                      }

                      if (this.pulldown) {
                          // 下拉动作
                          if (pos.y > 50) {
                              this.pulldownTip = {
                                  text: '松开立即刷新',
                                  rotate: 'icon-rotate'
                              }
                          } else {
                              this.pulldownTip = {
                                  text: '下拉刷新',     // 松开立即刷新
                                  rotate: ''    // icon-rotate
                              }
                          }
                          if(!this.loadFinish){
                              this.pullupTip = {
                                  text: '上拉加载',     // 松开立即刷新
                                  rotate: ''    // icon-rotate
                              }
                          }else{
                              this.pullupTip = {
                                  text: '暂无更多数据',     // 松开立即刷新
                                  rotate: ''    // icon-rotate
                              }
                          }
                      }

                      if (this.pullup) {
                        if(!this.loadFinish){
                            // 上拉动作
                            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                                this.pullupTip = {
                                    text: '松开立即加载',
                                    rotate: 'icon-rotate'
                                }
                            } else {
                                this.pullupTip = {
                                    text: '上拉加载',     // 松开立即刷新
                                    rotate: ''    // icon-rotate
                                }
                            }
                        }else{
                              this.pullupTip = {
                                  text: '暂无更多数据',     // 松开立即刷新
                                  rotate: ''    // icon-rotate
                              }
                        }
                      }
                  })
              }

              // 是否派发滚动到底部事件，用于上拉加载
              if (this.pullup) {
                  this.scroll.on('scrollEnd', () => {
                      //console.log('scrollEnd');
                      //console.log(this.scroll);
                      if(!this.loadFinish){
                          // 滚动到底部
                          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                              setTimeout(() => {
                                  // 重置提 示信息
                                  this.pullupTip = {
                                      text: '上拉加载',     // 松开立即加载
                                      rotate: ''    // icon-rotate
                                  }
                              },600);
                              this.$emit('pullup');
                          }
                      }else{
                          this.pullupTip = {
                              text: '暂无更多数据',     // 松开立即刷新
                              rotate: ''    // icon-rotate
                          }
                      }
                  });
              }

              // 是否派发顶部下拉事件，用于下拉刷新
              if (this.pulldown) {
                  this.scroll.on('touchend', (pos) => {
                      // 下拉动作
                      if (pos.y > 50) {
                          setTimeout(() => {
                              // 重置提示信息
                              this.pulldownTip = {
                                  text: '下拉刷新',     // 松开立即刷新
                                  rotate: ''    // icon-rotate
                              }
                          },600);
                          this.$emit('pulldown');
                      }
                      if(!this.loadFinish){
                          this.pullupTip = {
                              text: '上拉加载',     // 松开立即刷新
                              rotate: ''    // icon-rotate
                          }
                      }else{
                          this.pullupTip = {
                              text: '暂无更多数据',     // 松开立即刷新
                              rotate: ''    // icon-rotate
                          }
                      }
                  });
              }

              // 是否派发列表滚动开始的事件
              if (this.beforeScroll) {
                  this.scroll.on('beforeScrollStart', () => {
                      this.$emit('beforeScroll')
                  });
              }
          },
          disable() {
              // 代理better-scroll的disable方法
              this.scroll && this.scroll.disable();
          },
          enable() {
              // 代理better-scroll的enable方法
              this.scroll && this.scroll.enable();
          },
          refresh() {
              // 代理better-scroll的refresh方法
              this.scroll && this.scroll.refresh();
          },
          scrollTo() {
              // 代理better-scroll的scrollTo方法
              this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
          },
          scrollToElement() {
              // 代理better-scroll的scrollToElement方法
              this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
          }
      },
      watch: {
          // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
          data() {
              setTimeout(() => {
                  this.refresh();
              }, this.refreshDelay);
          },
          loadFinish: function(value){
              if(!value){
                  this.pullupTip = {
                      text: '上拉加载',     // 松开立即刷新
                      rotate: ''    // icon-rotate
                  }
              }else{
                  this.pullupTip = {
                      text: '暂无更多数据',     // 松开立即刷新
                      rotate: ''    // icon-rotate
                  }
              }
          },
          loadingDownStatus: function(value){
              if(value.isShow){
                  setTimeout(() => {
                      this.loadingDownStatus.isShow = false;
                  }, 2000);
              }
          }
      }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
      opacity: 0
    }
    .better-scroll-root {
        font-size: .24rem;
        color: #999;
        .loading-pos, .pulldown-tip, .pullup-tip {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: .8rem;
            line-height: .8rem;
            text-align: center;
            z-index: 1000;
        }
        .loading-pos {
            position: fixed;
            background-color: rgba(0, 0, 0, .8);
            .loading-connecting{
                color: #fff;
            }
        }
        .loading-up-pos{
            position: relative;
            text-align: center;
            margin-top: -.8rem;
        }
        .loading-container{
            display: inline-block;
            img{
                height: .3rem;
                vertical-align: middle;
            }
        }
        .pulldown-tip {
            top: -.8rem;
            z-index: 1;
        }
        .pull-icon {
            position: absolute;
            top: 0;
            left: 30%;
            color: #999;
            font-size: .24rem;
            transition: all 0.15s ease-in-out;
        }
        .pull-icon.icon-rotate {
            transform:rotate(180deg);
        }
        .pullup-tip{
            position: relative;
            height: 1.4rem;
        }
    }
</style>
