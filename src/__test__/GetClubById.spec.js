import axios from 'axios';

test('test API call', async () => {
  const response = await axios.get('https://apisae401.azurewebsites.net/api/Clubs/GetById/1');
  console.log(response)
  expect(response.data.idClub).toBe(1);
});