
import axios from 'axios'
import { ref } from "vue";

let clients = ref([])
let postResponse = ref(null)

const newClient = {
    idTypeClient: 1,
    genreClient: "Femme",
    nomClient: "Doe",
    prenomClient: "Jane",
    dateNaissanceClient: "12 Feb 1076",
    mailClient: "Janedoe@test.com",
    telClient: "0608373223",
    numeroAdresseClient: 16,
    adresseClient: "Rue victoria",
    codePostalClient: "74000",
    villeClient: "Annecy",
    paysClient: "France",
    passwordClient: "testtesttest"
  };

test("test de l'insertion", async () => {
   
  
    try {

         // Obtenez tous les clients existants
  const reponse = await axios.get('https://apisae401.azurewebsites.net/api/Clients')
clients = reponse.data


  // Vérifiez si un client avec le même nom et prénom existe déjà
  const existingClient = clients.find(client => client.nomClient === newClient.nomClient && client.prenomClient === newClient.prenomClient)

  if (existingClient) {
    // Le client existe déjà, supprimez-le
    const deleteResponse = await axios.delete(`https://apisae401.azurewebsites.net/api/Clients/${existingClient.idClient}`)
    expect(deleteResponse.status).toBe(204)
  } 
  
    // Le client n'existe pas, insérez-le
    postResponse = await axios.post('https://apisae401.azurewebsites.net/api/Clients', newClient)
    expect(postResponse.status).toBe(201)
    
    } catch (error) {
      console.log(error); // Affiche l'erreur dans la console
      throw error; // Passe le test en échec
    }
  });

  test("test de la mise à jour d'un client", async () => {
    // Création du client


    console.log(postResponse.data)
    // Modification du client
    const updatedClient = {
        idTypeClient: 1,
        genreClient: "John",
        nomClient: "Doe",
        prenomClient: "Jane",
        dateNaissanceClient: "12 Feb 1076",
        mailClient: "Janedoe@test.com",
        telClient: "0608373223",
        numeroAdresseClient: 16,
        adresseClient: "Rue victoria",
        codePostalClient: "74000",
        villeClient: "Annecy",
        paysClient: "France",
        passwordClient: "testtesttest"
    }
    
    // Envoi de la requête PUT pour mettre à jour le client
    const putResponse = await axios.put(`https://apisae401.azurewebsites.net/api/Clients/${postResponse.data.idClient}`, updatedClient)
    console.log(postResponse.data)
    
    // Vérification du statut de la réponse
    // Vérification que le client a bien été mis à jour
    const getResponse = await axios.get(`https://apisae401.azurewebsites.net/api/Clients/${postResponse.data.idClient}`)
    expect(getResponse.data.prenomClient).toBe('John')
    console.log(getResponse)
    
    expect(putResponse.status).toBe(200)
    // Suppression du client créé pour nettoyer la base de données
    await axios.delete(`https://apisae401.azurewebsites.net/api/Clients/${postResponse.data.idClient}`)
  })