import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getAuth } from 'firebase/auth'
import axios from 'axios'

export const clubMedStore = defineStore('clubmed', () => {

    // Variables Exportées
    const clubs = reactive([])
    const user = reactive({})
    const photos = reactive([])
    const APourSousLocs = reactive([])
    const SousLocs = reactive([])
    


    // Utilisateur 
    const auth = getAuth()
    if (auth.currentUser !== null) {
        const email = auth.currentUser.email
    
        axios.get("https://apisae401.azurewebsites.net/api/Clients/GetByEmail/" + email)
        .then(response => {
            user.value =  response.data
        })
    }

    // Club
    axios.get("https://apisae401.azurewebsites.net/api/Clubs")
    .then(response => {
        response.data.forEach(club => clubs.push(club))
    })

    // Photo
    axios.get("https://apisae401.azurewebsites.net/api/Photo")
    .then(response => {
        response.data.forEach(photo => photos.push(photo))
    })

    // APourSousLoc
    axios.get("https://apisae401.azurewebsites.net/api/APourSousLoc/GetAPourSousLocs")
    .then(response => {
        response.data.forEach(apsl => APourSousLocs.push(apsl))
        // console.log(response.data);
    })

    // APourSousLoc
    axios.get("https://apisae401.azurewebsites.net/api/SousLocalisations/")
    .then(response => {
        response.data.forEach(sl => SousLocs.push(sl))
    })

    return { clubs, user, photos, APourSousLocs, SousLocs }
})