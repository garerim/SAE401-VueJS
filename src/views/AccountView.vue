<script setup>
import { onMounted, ref } from 'vue';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth'
import { useRouter } from 'vue-router';
import EditAccountModal from '../components/EditAccountModal.vue'
import axios from 'axios';
import moment from 'moment';
import { clubMedStore } from "../stores/clubmed.js"

const clubmed = clubMedStore()

const openModal = ref(false)

const router = useRouter()


const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        router.push("/")
    })
}

const openEdit = () => {
    openModal.value = !openModal.value
}

</script>

<template>
    <div class="account-container">
        <!-- {{ user }} -->
        <h1>Mon Compte</h1>
        <div v-if="clubmed.user.value" class="account-info">
            <p>Nom : {{ clubmed.user.value.nomClient }}</p>
            <p>Prenom : {{ clubmed.user.value.prenomClient }}</p>
            <p>Genre : {{ clubmed.user.value.genreClient }}</p>
            <p>Date de Naissance : {{ moment(clubmed.user.value.dateNaissanceClient).format('DD MMM YYYY') }}</p>
            <p>Email : {{ clubmed.user.value.mailClient }}</p>
            <p>Num Tel : +33 {{ clubmed.user.value.telClient }}</p>
            <p>Num Adresse : {{ clubmed.user.value.numeroAdresseClient }}</p>
            <p>Rue Adresse : {{ clubmed.user.value.adresseClient }}</p>
            <p>Code Postal : {{ clubmed.user.value.codePostalClient }}</p>
            <p>Ville : {{ clubmed.user.value.villeClient }}</p>
            <p>Pays : {{ clubmed.user.value.paysClient }}</p>
        </div>
        <div class="account-btn-container">
            <button class="signout-btn" v-if="clubmed.user.value" @click="handleSignOut">Se Déconnecter</button>
            <button class="edit-btn" v-if="clubmed.user.value" @click="openEdit">Editer</button>
        </div>
    </div>

    <EditAccountModal :user="clubmed.user.value.idClient" @close-modal="openEdit" v-if="openModal && clubmed.user.value"/>
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
    margin-right: 5px;
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

.edit-btn{
    margin-left: 5px;
    cursor: pointer;
    outline: none;
    border: solid 2px #00558a;
    background-color: #fff;
    font-size: 18px;
    font-weight: bold;
    border-radius: 9999px;
    color: #00558a;
    padding: 5px 20px;
    margin-top: 20px;
    transition: all .2s ease-in-out;
}

.edit-btn:hover{
    background-color: #00558a;
    color: #fff;
}

</style>