
import { mount } from "@vue/test-utils";
import axios from 'axios'

test("test de l'insertion", async () => {
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
  
    try {

         // Obtenez tous les clients existants
  const reponse = await axios.get('https://apisae401.azurewebsites.net/api/Clients')
  const clients = reponse.data

  // Vérifiez si un client avec le même nom et prénom existe déjà
  const existingClient = clients.find(client => client.nomClient === newClient.nomClient && client.prenomClient === newClient.prenomClient)

  if (existingClient) {
    // Le client existe déjà, supprimez-le
    const deleteResponse = await axios.delete(`https://apisae401.azurewebsites.net/api/Clients/${existingClient.idClient}`)
    expect(deleteResponse.status).toBe(204)
  } 
  
    // Le client n'existe pas, insérez-le
    const postResponse = await axios.post('https://apisae401.azurewebsites.net/api/Clients', newClient)
    expect(postResponse.status).toBe(201)
  




  

  
      
    } catch (error) {
      console.log(error); // Affiche l'erreur dans la console
      throw error; // Passe le test en échec
    }
  });