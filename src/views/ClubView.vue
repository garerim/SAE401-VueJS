<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios'
    import { Carousel, Navigation, Slide } from 'vue3-carousel'
    import 'vue3-carousel/dist/carousel.css'
    import { RouterLink } from 'vue-router'
    import HomeClub from '../components/HomeClub.vue'
    import ActiviteClub from '../components/ActiviteClub.vue'
    import ChambreClub from '../components/ChambreClub.vue'
    import RestaurantBarClub from '../components/RestaurantBarClub.vue'

    const props = defineProps({
        id: { type: Number,
            required: true }
    })

    let clubData = ref(null)
    let photoAleaClubData = ref(null)
    let photoData = ref([])
    let aPourSousLocData = ref([])
    let sousLocalisationData = ref([])
    let proposerDatas = ref([])
    let activiteALaCarteDatas = ref([])

    var idPhotoDataAlea = ref(null)
    var idPhotoAlea = ref(null)

    let affichageComp = ref("Le Resort")

    const handleAffichage = (item) => {
        affichageComp.value = item
    }


    let settings = {
      itemsToShow: 1,
      snapAlign: 'center',
    }

    let breakpoints = {
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: 'start',
      },
    }

    var menuArray = ["Le Resort", "Chambres", "Activités & Spa", "Enfants & Famille", "Restaurants & Bars"]

    const getData = async () => {
        axios.get("https://localhost:7220/api/Clubs/GetById/" + props.id)
        .then(response => {
            clubData.value=response.data  
        })

        axios.get("https://localhost:7220/api/Photo/")
        .then(response => {
            response.data.forEach(photo => {                
                if (photo.idClub==clubData.value.idClub) {
                    photoData.value.push(photo)
                }                
            })
            idPhotoDataAlea = Math.ceil(Math.random() * Object.getOwnPropertyNames(photoData).length)
            idPhotoAlea = photoData.value[idPhotoDataAlea].idPhoto;
        })      

        const res = await fetch("https://localhost:7220/api/APourSousLoc/GetAPourSousLocs/");
        const finalRes = await res.json();
        finalRes.forEach(fr => {
            if(fr.idClub == props.id){aPourSousLocData.value.push(fr.idSousLocalisation);}
        })

        const resSousLoc = await fetch("https://localhost:7220/api/SousLocalisations");
        const finalResSousLoc = await resSousLoc.json();
        finalResSousLoc.forEach(fr => {
            if(aPourSousLocData.value.includes(fr.idSousLocalisation)){
                sousLocalisationData.value.push(fr)
            }
        })

        
        axios.get("https://localhost:7220/api/Photo/GetById/" + idPhotoAlea)
        .then(response => {
            photoAleaClubData.value=response.data  
        })

        const resProposer = await fetch("https://localhost:7220/api/Proposer/GetProposerByIdClub?id=" + props.id);
        const finalResProposer = await resProposer.json();
        finalResProposer.forEach(fr => {
            if(fr.idClub == props.id){
                proposerDatas.value.push(fr.idActivite);
            }
        })
        
        const resActivite = await fetch("https://localhost:7220/api/Activite");
        const finalResActivte = await resActivite.json();
        // console.log(proposerDatas.value);
        finalResActivte.forEach(item => {
            // console.log(item);
            if(proposerDatas.value.includes(item.idActivite)){
                activiteALaCarteDatas.value.push(item)
            }
        })



        
    }    

    onMounted(() => {
        getData();
    })
    
</script>


<template>  
    <div v-if="photoData && clubData && aPourSousLocData && sousLocalisationData">
        <div id="header-picture-bloc">
            <div v-for="photo in photoData" >
                <img id="header-picture" v-if="photo.idBar == null && photo.idRestaurant==null && photo.idDomaineSkiable==null && photo.idTypeActivite==null && photo.idTypeChambre==null" :src="photo.urlphoto">    
            </div>
        </div>
        <div id="header-bar-club">
            <span v-for="sousLocalisation in sousLocalisationData" class="title-name-souslocalisation">{{sousLocalisation.nomSousLocalisation.toUpperCase()}}</span>
            <h1 id="title-name-club" v-if="clubData">{{ clubData.nomClub }}</h1>
            <form action="">
                <input type="date">
                <select name="" id="">
                    <option value="">item 1</option>
                    <option value="">item 2</option>
                    <option value="">item 3</option>
                </select>
                <select name="" id="">
                    <option value="">item 1</option>
                    <option value="">item 2</option>
                    <option value="">item 3</option>
                </select>
                <input type="submit" id="location-choice-button" value="Choisir mon hébergement">

            </form>
        </div>
        <div id="carousel-menu-club">
            <Carousel :settings="settings" :breakpoints="breakpoints">
                <Slide class="carousel-menu" v-for="item in menuArray" :key="item">
                    <div class="carousel__item slide-carousel-menu" @click="$event => handleAffichage(item)">{{ item }}</div>
                </Slide>
                

                <template #addons>
                <Navigation />
                </template>
            </Carousel>
        </div>

        <div v-if="affichageComp == 'Le Resort'">
            <HomeClub :id="props.id"/>
        </div>
        <div v-if="affichageComp == 'Chambres'">
            <ChambreClub :id="props.id"/>
        </div>

        <div v-if="affichageComp == 'Activités & Spa'">
            <ActiviteClub :id="props.id"/>
        </div>       

        <div v-if="affichageComp == 'Restaurants & Bars'">
            <RestaurantBarClub :id="props.id"/>
        </div> 

    </div>
    <div v-else id="loader">
        <img id="picture-presentation" src="../assets/loader.gif" alt="">
    </div>
</template>


<style scoped>
    #loader{
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #loader img{
        width: 20%;
    }

    #header-picture-bloc{
        position: relative;
        width: 100%;
        height: 500px;
        overflow: hidden;
        display: flex;
    }

    #header-picture{
        z-index: 9;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);   
        width: 100%;
    }


    #header-bar-club{
        font-stretch: ultra-expanded;
        z-index: 10;
        position: relative;
        left: 10%;
        margin-top: -60px;
        background-color: white;
        color: #454545;
        box-shadow: 0px 10px 15px rgb(223, 223, 223);
        width: 80%;
        height: 170px;
        padding: 0.5%;
        border-radius: 2px;
    }

    #title-name-club{
        margin-left: 10px;
        font-size: 1.7em;
    }

    .title-name-souslocalisation{
        margin-left: 10px;
        font-size: 0.9em;
    }


    #header-bar-club form{
        text-align: center;
    }

    #header-bar-club input, #header-bar-club select{
        font-family: Trident, "Trebuchet MS", "Helvetica Neue", Helvetica, Arial, sans-serif;
        width: 20%;
        margin: 1%;
        height: 45px;
        border: solid 1px rgb(202, 202, 202);
        border-radius: 2px;
    }

    #location-choice-button{
        
        background-color: #088c20;
        border: #088c20;
        color: white;
    }

    #carousel-menu-club{
        width: 75%;
        margin: 6% 12.5%;
    }

    .carousel-menu{
        border: solid 0.5px #b1b1b1;
        color: #454545;
        padding: 15px 0;
        transition: all 0.3s ease;
    }
    .carousel__slide:hover{
        cursor: pointer;
        background-color: #00558a;
        color: white;
    }

    #content-presentation{
        display: flex;
        flex-wrap: wrap;
    }
    #bloc-size-photo{
        width: 70%;
        overflow: hidden;
        text-align: center;
        float: right;
        margin-right: 5%;
        border-radius: 2%;
    }

    #photo-presentation{
        flex: 1;
    }
    
    #photo-presentation img{
        width: 200%;
        height: auto;
    }

    #note-club{
        background-color: white;
        color: #454545;
        box-shadow: 0px 0px 7px 1px rgb(211, 211, 211);
        position: absolute;
        width: 180px;
        height: 260px;
        text-align: center;
        border-radius:5px;
        margin-left: 43%;
        margin-top: -3%;
    }
    
    #note-club img{
        width: 100px;
        border-radius:100px;
        margin-top: 15px;
    }
    
    #name-club-note{
        text-align: left;
        width: 120px;
        font-size: 1em;
        margin-left: 10px;
        margin-top: 15px;
    }

    #loc-club-note{
        text-align: left;
        width: 120px;
        font-size: 1em;
        margin-left: 10px;
        margin-top: 10px;
    }
    
    #note-club p{
        margin-top: 15px;
    }

    #text-presentation{
        flex: 1;
        padding: 20px;
        justify-content: center;
        align-items: center;
        color: #454545;
    }

    #text-presentation h1{
        font-size: 3.3em;
        margin-left: 13%;
        margin-top: 7%;
    }

    #text-presentation p{
        width: 60%;
        font-size: 1em;
        margin-top: 7%;
        margin-left: 13%;
        letter-spacing : 1px;
    }   

    #map {
        width: 27vw;
        height: 30vh;
    }

    /* max 790px */
    @media screen and (max-width: 790px) {

        #header-picture-bloc{
            overflow: hidden;
        }

        #header-picture{ 
            top: 30%;
        }       
    }

    @media screen and (max-width: 1255px) {
        #content-presentation{
            display: block;
        }

        #photo-presentation, #text-presentation{
            width: 100%;
        }       


        #bloc-size-photo{
            width: 70%;
            overflow: hidden;
            text-align: center;
            border-radius: 2%;
            float: none;
            margin: 0;
        }

        #photo-presentation{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #note-club{
            position: static;
            margin: 0;
            margin-left: auto;
            margin-right: auto;
            margin-top: 10%;
        }
        
        #text-presentation{
            flex: 1;
            padding: 20px;
            justify-content: center;
            align-items: center;
            color: #454545;
        }

        #text-presentation h1{
            text-align: center;
            font-size: 3.3em;
            margin-left: 5%;
            margin-top: 7%;
        }

        #text-presentation p{
            text-align: center;
            width: 90%;
            font-size: 1em;
            margin-top: 7%;
            margin-left: 5%;
            letter-spacing : 1px;
        } 
    }
</style>
