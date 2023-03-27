<script setup>
import { ref, onMounted } from 'vue';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useRouter, RouterLink } from 'vue-router';
import GoogleButton from '../components/GoogleButton.vue';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const email = ref("")
const password = ref("")
const errMsg = ref()
const router = useRouter()

onMounted(() => {
    if (getAuth().currentUser) {
        router.push('/account')
    }
})

const signin = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log("Successfully signined");
        console.log(auth.currentUser);
        Swal.fire({
            icon: 'success',
            title: 'Connexion réussi',
            footer: '<a href="/account">Voir votre compte</a>'
        })
    })
    .catch((error) => {
        console.log(error.code);
        switch(error.code){
            case 'auth/invalid-email':
                errMsg.value = 'Adresse Mail Invalide'
                break;
            case 'auth/user-not-found':
                errMsg.value = 'Utilisateur Inconnu'
                break;
            case 'auth/wrong-password':
                errMsg.value = 'Mot de passe Incorrect'
                break;
            default:
                errMsg.value = 'Email ou Mot de passe incorrect'
                break;
        }
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errMsg.value,
        })
    })
}

</script>


<template>
    <div class="signin-container">
        <div class="form-signin">
            <h1>Connexion</h1>
            <input placeholder="Email" type="email" v-model="email">
            <input placeholder="Mot de passe" type="password" v-model="password">
            <button class="create-account-btn" @click="signin">Se connecter</button>
            <GoogleButton/>
        </div>
        <p>
            Vous n'avez pas de compte ? <br>
            <RouterLink to="/register">Créez un compte</RouterLink>
        </p>
    </div>
</template>


<style scoped>

.signin-container{
    width: 25vw;
    min-width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
}

.form-signin{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.form-signin h1{
    font-size: 28px;
}
.form-signin input{
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid #000;
    padding: 5px 10px;
    margin: 5px 0;
    border-radius: 0;
}

.form-signin .create-account-btn{
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

.signin-container p{
    text-align: center;
    font-size: 15px;
    margin: 15px 0 5px 0;
}

</style>