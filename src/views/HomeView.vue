<script setup>
import CardClub from '../components/CardClub.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios'

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

const getData = async () => {
    // axios.get("https://localhost:7220/api/Clients")
    // .then(response => {
    //   response.data.forEach(club => {
    //     clubData.value.push(club)
    //   })
    // })
    // .catch(error => {
    //     console.log(error);
    // })
    axios.get("https://localhost:7220/api/Clubs")
    .then(response => {
      response.data.forEach(club => {
        clubData.value.push(club)
      })
    })
}

const getPhotoRand = async () => {
    let id = Math.ceil(Math.random() * 512)
    axios.get("https://localhost:7220/api/Photo/GetById/" + id)
    .then(response => {
        photoHome.value = response.data
    })
    
}

onMounted(() => {
    getPhotoRand();
    getData();
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

    <!-- <p v-for="c in clubData">{{ c.mailClient }}</p> -->

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

</style>
