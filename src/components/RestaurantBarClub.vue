<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios'

    let restaurantGet = ref([])
    let restaurantData = ref([])
    let barGet = ref([])
    let barData = ref([])
    let photoData = ref([])
    let photoRestaurantData = ref([])
    let photoBarData = ref([])

    const props = defineProps({
        id: { type: Number,
             required: true }
    })

    const getData = async () => {
        const restaurantGet = await fetch("https://localhost:7220/api/Restaurants/");
        const finalRestaurantDataGet = await restaurantGet.json();
        finalRestaurantDataGet.forEach(restaurant => {
            if(restaurant.idClub == props.id){
                restaurantData.value.push(restaurant)
            }
        })

        const barGet = await fetch("https://localhost:7220/api/Bars/");
        const finalBarDataGet = await barGet.json();
        finalBarDataGet.forEach(bar => {
            if(bar.idClub == props.id){
                barData.value.push(bar)
            }
        })
          
        await axios.get("https://localhost:7220/api/Photo/")
        .then(response => {
            photoData.value=response.data  
        })

        


        photoData.value.forEach(photo => {
            restaurantData.value.forEach(restaurant => {
                if (photo.idRestaurant == restaurant.idRestaurant) {
                    console.log('inclu');
                    photoRestaurantData.value.push(photo)
                }
            });
        });

        photoData.value.forEach(photo => {
            barData.value.forEach(bar => {
                if (photo.idBar == bar.idBar) {
                    console.log('inclu');
                    photoBarData.value.push(photo)
                }
            });
        });
        // console.log(photoRestaurantData);
    }   

    onMounted(() => {
        getData();
    })
</script>


<template>
    <div id="restaurant-bar-bloc">
        <h1>Restaurants</h1> 
        <div v-if="restaurantData && photoRestaurantData" v-for="restaurant in restaurantData" class="bar-restaurant-presentation">
            <div v-for="photo in photoRestaurantData" class="photo-presentation">
                <img v-if="photo.idRestaurant == restaurant.idRestaurant" :src=photo.urlphoto>
            </div>
            <div class="text-presentation">
                <h1>{{ restaurant.nomRestaurant }}</h1>
                <p>{{ restaurant.descriptionRestaurant }}</p>
            </div>
        </div>   
        <div class="line"></div>
        
        <h1 id="limit">Bars</h1>
        <div v-if="barData && photoBarData" v-for="bar in barData" class="bar-restaurant-presentation">
            <div v-for="photo in photoBarData" class="photo-presentation">
                <img v-if="photo.idBar == bar.idBar" :src=photo.urlphoto>
            </div>
            <div class="text-presentation">
                <h1>{{ bar.nomBar }}</h1>
                <p>{{ bar.descriptionBar }}</p>
            </div>
        </div>
        <div class="line"></div>
    </div>    
</template>


<style scoped>
    #restaurant-bar-bloc{
        color: #454545;
        width: 80%;
        margin-left: 10%;
    }
    .bar-restaurant-presentation{
        width: 100%;
        float: left;
        margin-top: 5%;
    }

    .text-presentation{
        margin-left: 45%;
    }
    
    img{
        width: 40%;
        float: left;
        border-radius: 20px;
    }

    .line{
        height: 0;
        border-bottom: solid #a8a8a8 0.1px;
        margin: 5px;
    }

    #limit{
        margin-top: 60%;
    }
</style>