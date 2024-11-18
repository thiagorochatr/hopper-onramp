import axios from "axios";
import { FastifyInstance } from "fastify";
import QRCode from 'qrcode';
import { getJwtToken } from "../middlewares/fetchJwtToken";

export async function generatePix(app: FastifyInstance) {
  app.get('/generate-pix', async (request, reply) => {
    const { amount } = request.query as { amount: string };

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOnsiaWQiOiIiLCJ1c2VyTmFtZSI6IiIsInBlcm1pc3Npb25zIjp7InBheU91dCI6dHJ1ZSwid2Vic29ja2V0cyI6dHJ1ZSwicGl4VG9Vc2QiOnRydWUsIm9uQ2hhaW4iOnRydWUsInN3YXAiOnRydWV9fSwiZXhwIjoxNzMxOTMyODAyLCJpYXQiOjE3MzE5MjkyMDIsInN1YiI6IjcyY2Q1MTg0LThjZDktNGU3Yi05MTJjLTJjZTU4NDE0ZjczMyIsInRva2VuSWQiOiI4ZjI5NDY3Ny05OTU4LTQ1MDUtODVjMS1lZTQ3MjBiMzVhYWQifQ.-cMkKQWKS1Fwx7X2Z7QRGCirN4RDG6BvC4Ws--6Dt-8";
    
    const options = {
      method: 'GET',
      url: `https://api.brla.digital:5567/v1/business/pay-in/br-code`,
      params: { amount },
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.request(options);
  
      const brCode = response.data.brCode;
  
      const qrCodeDataURL = await QRCode.toDataURL(brCode, { type: 'image/png' });
      const base64 = qrCodeDataURL.split(',')[1];
  console.log('Código Pix gerado:', brCode);
      return {
        brCode,
        base64,
      };
    } catch (error) {
      console.error('Erro ao gerar o QR Code:', error);
      reply.status(500).send({ error: 'Erro ao gerar o código Pix' });
    }
  });
}