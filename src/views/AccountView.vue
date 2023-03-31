<script setup>
import { onMounted, ref } from 'vue';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth'
import { useRouter } from 'vue-router';
import axios from 'axios';
import moment from 'moment';
const user = ref([])
const isLoggedIn = ref(false)
// const props = defineProps({
//     id: { required: true }
// })
const router = useRouter()

onMounted(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user){
            isLoggedIn.value = true
        } else {
            isLoggedIn.value = false
        }
    })

    const email = auth.currentUser.email
    
    axios.get("https://apisae401.azurewebsites.net/api/Clients/GetByEmail/" + email)
    .then(response => {
        user.value = response.data
    })
})

const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        router.push("/")
    })
}

</script>

<template>
    <div class="account-container">
        <h1>Mon Compte</h1>
        <div class="account-info">
            <p>Nom : {{ user.nomClient }}</p>
            <p>Prenom : {{ user.prenomClient }}</p>
            <p>Genre : {{ user.genreClient }}</p>
            <p>Date de Naissance : {{ moment(user.dateNaissanceClient).format('DD MMM YYYY') }}</p>
            <p>Email : {{ user.mailClient }}</p>
            <p>Num Tel : +33 {{ user.telClient }}</p>
            <p>Num Adresse : {{ user.numeroAdresseClient }}</p>
            <p>Rue Adresse : {{ user.adresseClient }}</p>
            <p>Code Postal : {{ user.codePostalClient }}</p>
            <p>Ville : {{ user.villeClient }}</p>
            <p>Pays : {{ user.paysClient }}</p>
        </div>
        <button class="signout-btn" v-if="isLoggedIn" @click="handleSignOut">Se Déconnecter</button>
    </div>
</template>

<style scoped>

.account-container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.account-info{
    width: fit-content;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.account-info p {
    padding: 5px 10px;
    border-radius: 10px;
}

.account-container h1{
    text-align: center;
    text-transform: uppercase;
    font-size: 60px;
    color: #fff;
    -webkit-text-stroke: 2px #00558a;
}

.account-info p {
    margin: 5px 0;
    font-size: 16px;
}

.signout-btn{
    cursor: pointer;
    outline: none;
    border: solid 2px crimson;
    background-color: #fff;
    font-size: 18px;
    font-weight: bold;
    border-radius: 9999px;
    color: crimson;
    padding: 5px 20px;
    margin-top: 20px;
    transition: all .2s ease-in-out;
}

.signout-btn:hover{
    background-color: crimson;
    color: #fff;
}

</style>