import axios from 'axios';

const clientToUpdate = {
  idClient: 1,
  nomClient: 'Doe',
  prenomClient: 'Jane',
  mailClient: 'janedoe@test.com',
  telClient: '0608373223',
};

test('test de la mise à jour du client', async () => {
  // On effectue la mise à jour du client en utilisant axios.put
  const response = await axios.put(
    'https://apisae401.azurewebsites.net/api/Clients/81',
    clientToUpdate
  );

  // On vérifie que le code de réponse est bien 200
  expect(response.status).toBe(200);

  // On récupère le client mis à jour avec axios.get
  const updatedClientResponse = await axios.get(
    'https://apisae401.azurewebsites.net/api/Clients/1'
  );

  // On vérifie que les données du client ont bien été mises à jour
  expect(updatedClientResponse.data).toEqual(clientToUpdate);
});