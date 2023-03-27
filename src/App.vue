<script setup>
import { RouterView } from 'vue-router'
import HeaderTop from './components/HeaderTop.vue';
</script>

<template>
  <HeaderTop/>
<!-- 
  <router-view v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <component :is="Component" :key="$route.path" />
    </transition>
  </router-view> -->

  <RouterView />
</template>

<style scoped>  

.slide-enter-active, .slide-leave-active{
  transition: opacity 1s, transform 1s;
}

.slide-enter-from, .slide-leave-to{
  opacity: 0;
  transform: translateX(-30%);
}

</style>
