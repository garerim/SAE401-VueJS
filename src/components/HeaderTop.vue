<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import Menu from './Menu.vue';

let menuOpened = ref(false)
let search = ref(false)

const showSearch = () => {
  if (menuOpened.value === true){openMenu()}
  search.value = !search.value
}

const openMenu = () => {
  if (search.value === true){showSearch()}
  menuOpened.value = !menuOpened.value
}


</script>

<template>
  <header>
    <div class="search" :class="{ 'search show': search }">
      <input type="text" placeholder="Recherche...">
    </div>

    <div @click="openMenu" class="btn-menu"></div>

    <RouterLink class="logo" to="/">
      <svg viewBox="0 0 500 93" aria-hidden="true" class="absolute fill-current h-full inset-0 w-full" focusable="false"><path fill="#00558a" d="M500 72l-9.6-9.6-9.6 9.6 9.6 9.6L500 72zm-3.9-69.2c-.5-2.3-5.7 1-16.6 10.9 4.4 4.9 6.5 2.1 10.1.8 2.8 5.4 3.9 29.8-14.5 37 .5-24.6.8-50.8.8-50.8 0-.8-.5-.8-1-.8-4.9.8-14 9.6-21 17.1 3.9 6.2 8.5.5 12.4-1 0 1-.8 19.2-.5 37.6-18.9 1.6-15.8-37.5-14.8-42.5.5-4.1-12.2 4.9-18.4 10.6 2.1 3.6 4.7 2.8 8.3 1.6-1.3 17.4 10.9 33.4 25.1 32.9.5 17.9 2.3 35.5 7.5 36.8.8.3 1.3-18.1 1.6-38.6 34-10.6 21-51.6 21-51.6zM80.8 66.1V14.8H67.4v51.8c0 11.1 5.4 17.1 18.4 17.1H94v-9.8h-5.4c-5.7-.1-7.8-1.9-7.8-7.8zm201.6-50.6l-19.7 52.1L243 15.5h-19.2v68.1h13.5V43c0-2.6 0-7-.3-9.8h.5l18.9 50.5h12.4L288 33.2h.3c-.3 2.8-.3 7.3-.3 9.8v40.7h13.5V15.5h-19.1zm-161.9 69c16.8 0 25.1-6 25.1-22V31.6h-13.5v30.6c0 9.3-5.7 12.7-11.9 12.7s-11.9-3.4-11.9-12.7V31.6H94.8v30.8c.3 16.1 8.8 22.1 25.7 22.1zm45.6-22.3v-9.3c0-9.3 7.3-12.7 13.5-12.7s13.5 3.4 13.5 12.7v9.3c0 9.3-7.3 12.7-13.5 12.7-6.3.2-13.5-3.4-13.5-12.7zm39.6-9.1c0-12.7-7.3-22.3-24.4-22.3-5.2 0-10.6 1.3-15 3.4V14.8h-13.5v47.4c0 16.1 9.6 22 26.4 22 16.8 0 26.4-6.7 26.4-22.8.1 0 .1-8.3.1-8.3zm199.7-.3v9.3c0 9.3-7.3 12.7-13.5 12.7s-13.5-3.4-13.5-12.7v-9.3c0-9.3 7.3-12.7 13.5-12.7 6.3.1 13.5 3.7 13.5 12.7zm-15-22c-17.1 0-24.4 9.6-24.4 22.3v8.3c0 16.1 9.6 22.8 26.4 22.8 16.8 0 26.4-6 26.4-22V14.8h-13.2v19.4c-4.6-2.1-10-3.4-15.2-3.4zm-69.7 22.3c0-9.6 7.3-13.2 13.5-13.2s13.5 3.6 13.5 13.2h-27zM351 69.9c-5.7 3.9-9.8 5.2-16.3 5.2-7.8 0-14.2-4.4-14.2-12.7v-1h39.9V57c0-16.1-9.6-26.2-26.4-26.2S307.5 40.9 307.5 57v2.1c0 15.5 9.3 25.4 27.2 25.4 9.1 0 16.8-1.8 24.6-8l-8.3-6.6zM31.9 84.5c17.6 0 28.5-9.1 30.8-21.2H48.4c-2.3 8-8.3 11.9-16.8 11.9-13.2 0-18.1-8.8-18.1-22.3v-6.7c0-15 6.5-22 18.1-22 8.3 0 14.2 3.6 16.8 11.9h14.2C60 23.9 49.4 14.9 31.8 14.9 11.7 14.8 0 26.9 0 45.9v9.3c0 17.9 11.1 29.3 31.9 29.3z"></path></svg>
    </RouterLink>

    <Menu :open="menuOpened"/>

    <div class="container-button-menu">
      <img @click="showSearch" src="../assets/search.svg" alt="icone rechercher">
      <RouterLink to="/register"><img src="../assets/user.svg" alt="icone utilisateur"></RouterLink>
      <a href="#"><img src="../assets/star.svg" alt="icone favoris"></a>
    </div>

  </header>
</template>

<style scoped>
header{
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
}

header .search{
  width: 100%;
  height: 60px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-100%);
  transition: transform .3s ease-in-out;
  background-color: #baf3f9;
}

header .search.show{
  transform: translateY(100%);
}

header .search input{
  width: 90%;
  height: 50px;
  padding: 20px;
  border-radius: 9999px;
  outline: none;
  font-size: 18px;
}

header .btn-menu{
  width: 30px;
  height: 30px;
  background-image: url('../assets/menu.svg');
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 3vw;
  display: none;
  cursor: pointer;
}

header .logo svg{
  width: 160px;
  height: auto;
  margin-left: 3vw;
}

header .container-button-menu{
  margin-right: 3vw;
  height: 60px;
  display: flex;
  align-items: center;
}
header .container-button-menu img{
  margin: 0 .2vw;
}

@media screen and (max-width: 970px) {
    header .logo{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    header .logo svg{
      width: 130px;
      height: auto;
    }

    header .btn-menu{
      display: block;
    }

    header .container-button-menu img{
      width: 25px;
      height: 25px;
    }
}
</style>