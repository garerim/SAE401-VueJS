<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    open: Boolean
})

</script>

<template>
    <nav class="nav-menu" :class="{ 'nav-menu open': props.open }">
        <ul class="menu">
            <li><RouterLink to="/reserve">Réserver</RouterLink></li> 
            <li><RouterLink to="/offres">Nos offres</RouterLink></li> 
            <li><RouterLink to="/decouvrir">Découvrir Club Med</RouterLink></li> 
            <li><RouterLink to="/destination">Destinations</RouterLink></li> 
            <li><RouterLink to="/gamme-luxe">Notre Gamme Luxe</RouterLink></li> 
            <li><RouterLink to="/faq">FAQ</RouterLink></li> 
        </ul>
    </nav>
</template>

<style scoped>
    .nav-menu{
        height: 50px;
    }

    ul{
        list-style-type: none;
        display: flex;
        align-items: center;
        height: 100%;
    }

    ul a{
        text-decoration: none;
        text-transform: uppercase;
        color: #000;
        font-size: .9em;
        font-weight: bold;
        margin: 0 .8vw;
    }

    ul li:nth-child(1) a{color: red;}
    ul li:nth-child(2) a{color: #00558a;}

    @media screen and (max-width: 970px) {
        .nav-menu{
            position: absolute;
            top: 60px;
            background-color: #baf3f9;
            width: 100%;
            height: 100vh;
            transform: translateX(-100%);
            transition: transform .4s ease-in-out;
        }

        .nav-menu.open {
            transform: translateX(0);
        }

        .menu{
            width: 100%;
            flex-direction: column;
            align-items: start;
        }

        .menu li{
            width: 100%;
            text-align: center;
        }


        .menu a{
            display: block;
            padding: 10px 0 10px 10px;
            font-size: 18px;
        }

    }
</style>