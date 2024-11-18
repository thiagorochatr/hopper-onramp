import axios from 'axios';

let jwtToken: string | null = null;

export async function fetchJwtToken() {
  const options = {
    method: 'POST',
    url: 'https://api.brla.digital:5567/v1/business/login',
    headers: { 
      accept: 'application/json',
      'content-type': 'application/json'
    },
    data: { 
      email: process.env.BRLA_EMAIL,
      password: process.env.BRLA_PASSWORD
    },
  };

  try {
    const response = await axios.request(options);
    jwtToken = response.data.accessToken;
    console.log('Token JWT obtido:', jwtToken);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao obter o token JWT:', error.message);
    } else {
      console.error('Erro ao obter o token JWT:', error);
    }
    throw new Error('Falha ao autenticar com a API externa.');
  }
}

export function getJwtToken() {
  return jwtToken;
}
