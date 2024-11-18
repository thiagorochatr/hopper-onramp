import axios from "axios";
import { FastifyInstance } from "fastify";
import QRCode from 'qrcode';
import { getJwtToken } from "../middlewares/fetchJwtToken";

export async function generatePix(app: FastifyInstance) {
  app.get('/generate-pix', async (request, reply) => {
    const { amount } = request.query as { amount: string };

    const token = getJwtToken();
    
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