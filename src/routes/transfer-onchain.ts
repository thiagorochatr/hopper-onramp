import axios from "axios";
import { FastifyInstance } from "fastify";
import { getJwtToken } from "../middlewares/fetchJwtToken";

export async function transferOnchain(app: FastifyInstance) {
  app.post('/onchain-transfer', async (request, reply) => {
    const { chain, inputCoin, outputCoin, to, value } = request.body as {
      chain: string; inputCoin: string; outputCoin: string; to: string; value: number
    };
  
    const token = getJwtToken();
  
    const options = {
      method: 'POST',
      url: 'https://api.brla.digital:5567/v1/business/on-chain/transfer',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        chain,
        inputCoin,
        outputCoin,
        to,
        value
      },
    };
    
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error('Erro na operação on-chain:', error);
    }
  });
}