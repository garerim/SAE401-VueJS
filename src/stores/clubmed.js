import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getAuth } from 'firebase/auth'
import axios from 'axios'

export const clubMedStore = defineStore('clubmed', () => {

    // Variables Exportées
    const clubs = reactive([])
    const restaurants = reactive([])
    const bars = reactive([])
    const avis = reactive([])
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

    // Restaurant
    axios.get("https://apisae401.azurewebsites.net/api/Restaurant")
    .then(response => {
        response.data.forEach(Restaurant => restaurants.push(Restaurant))
    })

    // Bar
    axios.get("https://apisae401.azurewebsites.net/api/Bar")
    .then(response => {
        response.data.forEach(Bar => bars.push(Bar))
    })

    // Avis
    axios.get("https://apisae401.azurewebsites.net/api/Avi")
    .then(response => {
        response.data.forEach(avi => avis.push(avi))
    })

    return { clubs, user, photos, APourSousLocs, SousLocs, restaurants, bars, avis }
})