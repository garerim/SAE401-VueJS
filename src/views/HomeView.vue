<script setup>
import CardClub from '../components/CardClub.vue';
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios'
import { clubMedStore } from "../stores/clubmed.js"

const clubmed = clubMedStore()

let clubData = ref([])
let searchQuery = ref("")
let photoHome = ref(null)

const filteredItems = computed(() => {
    if (!searchQuery) {
        return clubData.value
      }
      return clubData.value.filter(item => {
        return item.nomClub.toLowerCase().includes(searchQuery.value.toLowerCase())
      })
})

const getPhotoRand = async () => {
    let id = Math.ceil(Math.random() * 512)
    axios.get("https://apisae401.azurewebsites.net/api/Photo/GetById/" + id)
    .then(response => {
        photoHome.value = response.data
    })
}

onMounted(() => {
    getPhotoRand();
    clubData.value = clubmed.clubs
})
</script>

<template>

    <div class="homepage-image">
        <img v-if="photoHome" :src="photoHome.urlphoto" alt="photo de la page d'accueil">
    </div>
    <h1>Bienvenue au Club Med !</h1>
    <h2>Découvrez tous nos clubs à travers le monde</h2>
    <input type="text" v-model="searchQuery" placeholder="Rechercher...">
    <div class="container">
        <CardClub v-for="c in filteredItems" :club="c" />
    </div>

    <footer>
        <RouterLink to="#">Politiques de confidentialités</RouterLink>
        <RouterLink to="/about">A propos de nous</RouterLink>
        <RouterLink to="#">Contact</RouterLink>
        <RouterLink to="#">Mentions Légales</RouterLink>
    </footer>

</template>

<style scoped>

    .homepage-image{
        width: 100%;
        height: 50vh;
        overflow: hidden;
        position: relative;
    }

    .homepage-image img{
        width: 100%;
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        height: auto;
    }

    h1{
        text-align: center;
        font-size: 60px;
        color: #00558a;
        margin: 20px 0 10px;
    }

    h2{
        margin: 20px 0 10px;
        text-align: center;
        text-transform: uppercase;
    }

    input{
        width: 90%;
        display: block;
        margin: 0 auto;
        outline: none;
        font-size: 24px;
        padding: 5px;
        border-radius: 5px;
    }

    footer{
        width: 100%;
        height: auto;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 85, 138, 0.5);
    }

    footer a{
        text-decoration: none;
        color: #fff;
        margin: 0 10px;
    }

</style>
