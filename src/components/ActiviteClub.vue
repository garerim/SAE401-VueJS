<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios'
    import 'vue3-carousel/dist/carousel.css'

    const props = defineProps({
        id: { type: Number,
             required: true }
    })

    // console.log(props.id);

    let clubData = ref(null)
    let photoAleaClubData = ref(null)
    let photoData = ref([])
    let aPourSousLocData = ref([])
    let sousLocalisationData = ref([])
    let proposerDatas = ref([])
    let activiteALaCarteDatas = ref([])

    var idPhotoDataAlea = ref(null)
    var idPhotoAlea = ref(null)

    onMounted(() => {
        getData();
    })
    
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
            console.log(idPhotoDataAlea);
            console.log(photoData.value[idPhotoDataAlea]);
            console.log(photoData.value.length);
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

    console.log(clubData);
    
</script>


<template>
    <div id="info-activite-bloc" v-if="clubData">
            <h1>Quelles activités vont vous étonner à {{ clubData.nomClub }} ?</h1>
            <!-- <p>{{ activiteALaCarteDatas }}</p> -->
            <div v-for="activiteALaCarte in activiteALaCarteDatas">
                <h2>{{activiteALaCarte.titreActivite}}</h2>
            </div>
        </div>
</template>