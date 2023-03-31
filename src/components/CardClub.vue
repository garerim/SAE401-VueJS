<script setup>
import { ref, onMounted } from 'vue';
import {RouterLink} from 'vue-router'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'


const props = defineProps({
    club: Object
})

let apslData = ref([])
let sousLocData = ref([])
let photoData = ref([])
let isLoading = ref(false)

const getData = async () => {

    const res = await fetch("https://apisae401.azurewebsites.net/api/APourSousLoc/GetAPourSousLocs");
    const finalRes = await res.json();
    finalRes.forEach(fr => {
        if(fr.idClub == props.club.idClub){apslData.value.push(fr.idSousLocalisation);}
    })

    // const resSousLoc = await fetch("https://apisae401.azurewebsites.net/api/SousLocalisations/GetAll");
    const resSousLoc = await fetch("https://apisae401.azurewebsites.net/api/SousLocalisations/");
    const finalResSousLoc = await resSousLoc.json();
    finalResSousLoc.forEach(fr => {
        if(apslData.value.includes(fr.idSousLocalisation)){
            sousLocData.value.push(fr)
        }
    })

    const resPhoto = await fetch("https://apisae401.azurewebsites.net/api/Photo");
    const finalResPhoto = await resPhoto.json();
    finalResPhoto.forEach(photo => {
        if(photo.idClub == props.club.idClub){
            photoData.value.push(photo);
        }
    })

    isLoading.value = true
}

onMounted(() => {
    getData();
})

</script>

<template>

    <div class="card-club-container">
        <div>
            <Carousel v-if="isLoading">
                <Slide v-for="p in photoData" :key="p.idPhoto">
                    <img class="carousel__item" :src="p.urlphoto">
                </Slide>
    
                <template #addons>
                <Navigation />
                </template>
            </Carousel>
            <div v-else class="loader"></div>
        </div>
        <div class="content-club-container">
            <div class="destination-club">
                <span v-for="sl in sousLocData">{{ sl.nomSousLocalisation }}</span>
            </div>
            <RouterLink :to="{path: '/club/' + props.club.idClub}" class="libelle-club">{{props.club.nomClub}}</RouterLink>
        </div>
    </div>

</template>

<style scoped>

.loader{
    width: 100%;
    height: 200px;
    background-image: url('../assets/loader.gif');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: #fff;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px 0;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.card-club-container{
    width: 300px;
    height: auto;
    margin: 10px;
    text-decoration: none;
}

.card-club-container .img-container{
    width: 100%;
    height: auto;
    position: relative;
}
.card-club-container .img-container button{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    outline: none;
    border: none;
    background-color: #fff;
    background-size: 80%;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
}
.card-club-container .img-container button.prec{
    left: 5px;
    background-image: url('../assets/left-arrow.svg');
}
.card-club-container .img-container button.suiv{
    right: 5px;
    background-image: url('../assets/right-arrow.svg');
}


.card-club-container .img-container img{
    width: 100%;
    height: auto;
    object-fit: cover;
}
.card-club-container .img-container img.img-active{
    display: block;
}

.content-club-container .destination-club{
    font-weight: bold;
    color: #aaa;
    font-size: 14px;
}
.content-club-container .destination-club span{
    margin-right: 5px;
}
.content-club-container .libelle-club{
    font-weight: bold;
    color: #000;
}

</style>