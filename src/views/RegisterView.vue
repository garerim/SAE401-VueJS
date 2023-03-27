<script setup>
import { ref, onMounted } from 'vue';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { useRouter, RouterLink } from 'vue-router'
import GoogleButton from '../components/GoogleButton.vue';
import axios from 'axios';

const email = ref("")
const password = ref("")
const nom = ref("")
const prenom = ref("")
const naissance = ref(null)
const telephone = ref("")
const genre = ref("")
const numAdresse = ref("")
const nomAdresse = ref("")
const codePostal = ref("")
const ville = ref("")
const pays = ref("")

const router = useRouter()

onMounted(() => {
    if (getAuth().currentUser) {
        router.push('/account')
    }
})

const register = () => {
    if(verifyRegisterData()){

        const sendAPI = false

        const newClient = {
              idTypeClient: 1,
              genreClient: genre.value,
              nomClient: nom.value,
              prenomClient: prenom.value,
              dateNaissanceClient: naissance.value,
              mailClient: email.value,
              telClient: telephone.value,
              numeroAdresseClient: numAdresse.value,
              adresseClient: nomAdresse.value,
              codePostalClient: codePostal.value,
              villeClient: ville.value,
              paysClient: pays.value,
              passwordClient: password.value
        }

        fetch('https://localhost:7220/api/Clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newClient)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            sendAPI = true
        })
        .catch(error => console.error(error));

        // axios.post('https://localhost:7220/api/Clients', newClient)
        // .then(response => {
        //     console.log(response.data);
        //     sendAPI = true
        // })
        // .catch(error => {
        //     console.log(error.message);
        // });


        if (sendAPI) {
            const auth = getAuth()
            createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((data) => {
                console.log("Successfully registered");
                console.log(auth.currentUser);
                router.push('/account')
            })
            .catch((error) => {
                console.log(error.code);
                alert(error.message)
            })
        }
    }
}

const verifyRegisterData = () => {
         if (genre.value == null || genre.value == ""){return false}
    else if (nom.value == null || nom.value == ""){return false}
    else if (prenom.value == null || prenom.value == ""){return false}
    else if (naissance.value == null || naissance.value == ""){return false}
    else if (email.value == null || email.value == ""){return false}
    else if (telephone.value == null || telephone.value == ""){return false}
    else if (numAdresse.value == null || numAdresse.value == ""){return false}
    else if (nomAdresse.value == null || nomAdresse.value == ""){return false}
    else if (codePostal.value == null || codePostal.value == ""){return false}
    else if (ville.value == null || ville.value == ""){return false}
    else if (pays.value == null || pays.value == ""){return false}
    else if (password.value == null || password.value == ""){return false}
    else return true
}

</script>


<template>
    <div class="register-container">
        <div class="form-register">
            <h1>Inscription</h1>
            <div class="input-container">

                <div class="input-left-container">
                    <input placeholder="Email" type="text" v-model="email">
                    <input placeholder="Mot de passe" type="password" v-model="password">
                    <input type="text" placeholder="Nom" v-model="nom">
                    <input type="text" placeholder="Prenom" v-model="prenom">
                    <input type="date" v-model="naissance">
                    <input type="tel" placeholder="Numéro de téléphone" maxlength="10" v-model="telephone">
                </div>

                <div class="input-right-container">
                    <select v-model="genre">
                        <option disabled value="">Genre</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                        <option value="Autre">Autre</option>
                    </select>
                    <input type="text" placeholder="Numéro Adresse" v-model="numAdresse">
                    <input type="text" placeholder="Rue Adresse" v-model="nomAdresse">
                    <input type="text" maxlength="5" placeholder="Code Postal" v-model="codePostal">
                    <input type="text" placeholder="Ville" v-model="ville">
                    <input type="text" placeholder="Pays" v-model="pays">
                </div>
            </div>

            <button class="signin-btn" @click="register">Créer un compte</button>
            <GoogleButton/>
        </div>
        <p>
            Vous avez déjà un compte ?<br>
            <RouterLink to="/signin">Connectez-vous</RouterLink>
        </p>
    </div>
</template>


<style scoped>

.register-container{
    /* width: 25vw; */
    min-width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
}

.form-register{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.form-register h1{
    font-size: 28px;
}

.input-container{
    display: flex;
    width: 100%;
}

@media screen and (max-width: 660px) {
    .register-container{
        transform: translate(-50%, -40%);
    }

    .input-container{
        flex-direction: column;
    }

    .input-container .input-left-container, .input-container .input-right-container{
        width: 100% !important;
        margin: 10px 0 !important;
    }


}

.input-container h2{
    text-align: center;
    font-size: 18px;
}
.input-container .input-left-container{
    width: 50%;
    margin: 0 5px 0 0;
}
.input-container .input-right-container{
    width: 50%;
    margin: 0 0 0 5px;
}
.form-register input, .form-register select{
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid #000;
    padding: 5px 10px;
    margin: 5px 0;
    border-radius: 0;
}

.form-register .signin-btn{
    margin: 10px 0;
    cursor: pointer;
    outline: none;
    border: none;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border-radius: 9999px;
    padding: 7px 20px;
    background-color: #00558a;
}

.register-container p{
    text-align: center;
    font-size: 15px;
    margin: 15px 0 5px 0;
}

</style>