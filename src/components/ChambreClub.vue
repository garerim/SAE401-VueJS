<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios'

    let comptabiliserGet = ref([])
    let comptabiliserData = ref([])
    let typechambreGet = ref([])
    let typechambreData = ref([])

    const props = defineProps({
        id: { type: Number,
             required: true }
    })

    const getData = async () => {
        const comptabiliserGet = await fetch("https://apisae401.azurewebsites.net/api/Comptabiliser/GetComptabiliserByIdClub?id=" + props.id);
        const finalComptabiliserGet = await comptabiliserGet.json();
        finalComptabiliserGet.forEach(comptabiliser => {
            if(comptabiliser.idClub == props.id){comptabiliserData.value.push(comptabiliser.idTypeChambre);}
        })
        
        const typechambreGet = await fetch("https://apisae401.azurewebsites.net/api/TypeChambres");
        const finalTypechambreGet = await typechambreGet.json();
        finalTypechambreGet.forEach(typeChambre => {
            if(comptabiliserData.value.includes(typeChambre.typeChambreId)){
                typechambreData.value.push(typeChambre)
            }
        })
    }    

    onMounted(() => {
        getData();
    })
</script>


<template>
    <h1>Chambres</h1>
    <p v-if="typechambreData" v-for="chambre in typechambreData">{{ chambre.typeChambreNom }}</p>
</template>


<style scoped>

</style>