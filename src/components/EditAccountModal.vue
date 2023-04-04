<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2'
import axios from 'axios';
import { SHA256 } from 'crypto-js';


const emit = defineEmits(['closeModal'])
const props = defineProps({
    user: Object
})

var userUpdated = ref({})

const email = ref("")
const nom = ref("")
const prenom = ref("")
const naissance = ref(null)
const telephone = ref("")
const genre = ref("")
const numAdresse = ref(0)
const nomAdresse = ref("")
const codePostal = ref("")
const ville = ref("")
const pays = ref("")

const handleEdit = (e) => {
    e.preventDefault()

    if (email.value !== "") { userUpdated.value.mailClient = email.value }
    if (nom.value !== "") { userUpdated.value.nomClient = nom.value }
    if (prenom.value !== "") { userUpdated.value.prenomClient = prenom.value }
    if (naissance.value !== "" || naissance.value !== null) { userUpdated.value.dateNaissanceClient = naissance.value }
    if (telephone.value !== "") { userUpdated.value.telClient = telephone.value }
    if (genre.value !== "") { userUpdated.value.genreClient = genre.value }
    if (numAdresse.value !== 0) { userUpdated.value.numeroAdresseClient = parseInt(numAdresse.value) }
    if (nomAdresse.value !== "") { userUpdated.value.adresseClient = nomAdresse.value }
    if (codePostal.value !== "") { userUpdated.value.codePostalClient = codePostal.value }
    if (ville.value !== "") { userUpdated.value.villeClient = ville.value }
    if (pays.value !== "") { userUpdated.value.paysClient = pays.value }


    // console.log(userUpdated.value);

    axios.put('https://apisae401.azurewebsites.net/api/Clients/' + userUpdated.value.idClient, userUpdated.value)
    .then(response => {
        console.log(response.data);
        Swal.fire({
            icon: 'success',
            title: 'Bravo',
            text: 'Votre compte a bien été modifié'
        })
    })
    .catch(error => {
        console.error(error);
    });

    // fetch('https://apisae401.azurewebsites.net/api/Clients/' + userUpdated.value.idClient, {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(userUpdated.value)
    // })
    // .then(response => {
    //     Swal.fire({
    //         icon: 'success',
    //         title: 'Bravo',
    //         text: 'Votre compte a bien été modifié'
    //     })
    // })
    // .catch(error => {
    //     console.error(error);
    // });
}

onMounted(async () => {
    await axios.get('https://apisae401.azurewebsites.net/api/Clients/GetById/' + props.user)
        .then(response => {
            userUpdated.value = response.data
            // console.log(userUpdated.value);
        })
})

</script>

<template>
    <div class="edit-modal-container">
        <div class="bg-edit-modal" @click="() => emit('closeModal')"></div>
        <form class="edit-modal">
            <h3>Editer du Profil</h3>
            <p>Nom</p>
            <input type="text" placeholder="Ex : Smith" v-model="nom">
            <p>Prenom</p>
            <input type="text" placeholder="Ex : John" v-model="prenom">
            <p>Genre</p>
            <select v-model="genre">
                <option disabled value="">Genre</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
            </select>
            <p>Date de Naissance</p>
            <input type="date" v-model="naissance">
            <p>Email</p>
            <input type="text" placeholder="Ex : monadresse@gmail.com" v-model="email">
            <p>Num Tel</p>
            <input type="text" placeholder="Ex : 0606070809" v-model="telephone">
            <p>Num Adresse</p>
            <input type="number" placeholder="Ex : 9" v-model="numAdresse">
            <p>Rue Adresse</p>
            <input type="text" placeholder="Ex : Rue de la république" v-model="nomAdresse">
            <p>Code Postal</p>
            <input type="text" placeholder="Ex : 75000" v-model="codePostal">
            <p>Ville</p>
            <input type="text" placeholder="Ex : Paris" v-model="ville">
            <p>Pays</p>
            <input type="text" placeholder="Ex : France" v-model="pays">
            <button type="submit" @click="handleEdit">Sauvegarder</button>
        </form>
    </div>
</template>


<style scoped>
.edit-modal-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
}

.edit-modal-container .bg-edit-modal {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1001;
}

.edit-modal-container .edit-modal {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px 10px 20px;
    border-radius: 20px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1002;
}

.edit-modal-container .edit-modal button {
    cursor: pointer;
    outline: none;
    border: solid 1px #00558a;
    background-color: #fff;
    border-radius: 9999px;
    color: #00558a;
    font-weight: bold;
    padding: 5px 10px;
    margin: 10px;
    font-size: 17px;
    transition: all .3s;
}

.edit-modal-container .edit-modal button:hover {
    background-color: #00558a;
    color: #fff;
}

.edit-modal-container .edit-modal input,
.edit-modal-container .edit-modal select {
    width: 100%;
    margin-bottom: 5px;
}
</style>