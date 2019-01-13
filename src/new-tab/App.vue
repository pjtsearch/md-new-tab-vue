<template>
  <div><transition name="slide-fade" mode="out-in"><router-view/></transition></div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  padding-top:0px;
  transition-duration: 0.1s;
  transition-property: opacity,padding-top;
  transition-timing-function: linear;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
