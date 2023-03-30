<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios'
    import { Carousel, Navigation, Slide } from 'vue3-carousel'
    import 'vue3-carousel/dist/carousel.css'

    const props = defineProps({
        id: { type: Number,
             required: true }
    })

    
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
        itemsToShow: 1,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 1,
        snapAlign: 'start',
      },
    }

    var menuArray = ["Le Resort", "Chambres", "Activités & Spa", "Enfants & Famille", "Restaurants & Bars"]

    // console.log(props.id);

    let clubData = ref(null)
    let photoAleaClubData = ref(null)
    let photoData = ref([])
    let aPourSousLocData = ref([])
    let sousLocalisationData = ref([])
    let proposerDatas = ref([])
    let activiteALaCarteDatas = ref([])
    let aviData = ref([])
    let aviNoteData = ref([])

    var idPhotoDataAlea = ref(null)
    var idPhotoAlea = ref(null)

    let avg = 0;
    let sum = 0;

    

    
    
    const getData = async () => {
        await axios.get("https://localhost:7220/api/Clubs/GetById/" + props.id)
        .then(response => {
            clubData.value=response.data
        })

        await axios.get("https://localhost:7220/api/Photo/")
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

        const aviGet = await fetch("https://localhost:7220/api/Avi");
        const finalAviGet = await aviGet.json();
        finalAviGet.forEach(avi => {
            if(avi.idClub == props.id){
                aviData.value.push(avi)
                aviNoteData.value.push(avi.noteAvi)
            }
        })
        
    }

    onMounted( async () => {
        await getData();

        //-----MAP DU CLUB-----        
        // Definition du point de camera sur la carte
        var map = L.map('map').setView([parseFloat(clubData.value.longitudeLocalisationClub), parseFloat(clubData.value.latitudeLocalisationClub)], 16);
        // Le nombre 16 correspond au zoom sur la carte

        // // Definition d'un markeur sur la map
        var marker = L.marker([parseFloat(clubData.value.longitudeLocalisationClub), parseFloat(clubData.value.latitudeLocalisationClub)]).addTo(map);

        //Configuration label du marqueur
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        marker.bindPopup(clubData.value.nomClub).openPopup();

        
        aviNoteData.value.forEach((note)=>{
            console.log(note);
            sum += note
        });
        
        avg = sum / aviNoteData.value.length
        
    });
    

    

</script>


<template>
    <div id="content-presentation" v-if="clubData">
        <div id="photo-presentation">
            <div v-if="photoAleaClubData" id="bloc-size-photo">
                <img :src="photoAleaClubData.urlphoto"> 
            </div>
        </div>
        <div id="note-club">
            <img src="../assets/clubmed_logo.jpg" alt="">
            <h1 id="name-club-note">{{ clubData.nomClub }}</h1>
            <h1 id="loc-club-note" v-for="sousLocalisation in sousLocalisationData">{{ sousLocalisation.nomSousLocalisation }}</h1>
            <p>0 avis pour l'instant</p>
        </div>
        <div id="text-presentation">
            <h1>{{ clubData.nomClub }}</h1>
            <p>{{ clubData.descriptionClub }}</p>
        </div>  
    </div>
    <div id="info-club-bloc" v-if="clubData">
        <h1>Informations pratiques</h1>
        <div id="map"></div>
        <div id="info-club">            
            <h2>{{ clubData.adresseClub }}</h2><br>
            <h2>0{{ clubData.telClub }}</h2><br>
            <h2>{{ clubData.mailClub }}</h2>
        </div>
    </div>
    <h1 id="avis-club-title">Note des voyageurs</h1>
    <div id="avis-club-bloc" >
        <div id="avis-club">
            <img src="../assets/clubmed_logo.jpg" alt="">
            <h3>{{ aviData.length }} avis posté(s)</h3>
            <h3 v-if="avg">Note : {{ avg }}</h3>
            <!-- rajouter des petits ronds -->
        </div>
        <div id="carousel-avis-club">
            <Carousel :settings="settings" :breakpoints="breakpoints">
                <Slide class="carousel-avis" v-for="avi in aviData" :key="avi">
                    <div class="carousel__item slide-carousel-menu">
                        <h1>{{ avi.titreAvi }}</h1>
                        <h1>{{ avi.noteAvi }}</h1>
                        <p>{{ avi.commentaireAvi }}</p>
                    </div>
                </Slide>
                

                <template #addons>
                <Navigation />
                </template>
            </Carousel>
        </div>
    </div>
</template>

<style scoped>
    

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

    #info-club-bloc{
        width: 80%;
        margin-left: 10%;
        margin-top: 6%;
    }

    #map {
        margin-top: 3%;
        width: 50%;
        height: 50vh;
        float: left;
        border-radius: 20px;
    }
    #info-club {
        margin-top: 5%;
        font-size: 12px;
        font-weight: 100;
        width: 40%;
        margin-left: 5%;
        float: left;
        border: #454545 1px solid;
        border-radius: 10px;
        padding: 20px;
    }

    #avis-club-title{
        margin-top: 30%;
        margin-left: 10%;
    }

    #avis-club-bloc{
        width: 80%;
        margin-left: 10%;
        margin-top: 2%;
        display: flex;
        
    }
    
    #avis-club{
        border: solid 0.5px #b1b1b1;
        border-radius: 10px;
        color: #454545;
        text-align: center;
        padding: 20px;
        padding-left: 40px;
        padding-right: 40px;
        margin-left: 25%;
    }

    #avis-club-bloc img{
        width: 100px;
        border-radius:100px;
        margin-top: 15px;
    }
    
    #carousel-avis-club{
        width: 30%;
        margin-left: 5%;
    }
    
    .carousel-avis{
        width: 100%;
        border: solid 0.5px #b1b1b1;
        border-radius: 10px;
        color: #454545;
        transition: all 0.3s ease;
        font-size: 14px;
        text-align: left;
        padding: 20px;
        padding-left: 40px;
        padding-right: 40px;
        
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