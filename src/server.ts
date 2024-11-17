import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from 'dotenv';
import { transferOnchain } from "./routes/transfer-onchain";
import { generatePix } from "./routes/generate-pix";
import fastifyJwt from '@fastify/jwt';
import { fetchJwtToken } from './middlewares/fetchJwtToken';

dotenv.config();

const app = fastify();

(async () => {
  try {
    await fetchJwtToken();
  } catch (error) {
    console.error('Erro ao iniciar o servidor:');
    process.exit(1);
  }
})();

app.register(fastifyJwt, {
  secret: 'sua_chave_secreta',
});

app.register(cors, {
  origin: "*", // == true
});

app.get("/", async (request, reply) => {
  reply.send({ hello: "world" });
  return { hello: "world" };
});

app.register(generatePix);

app.register(transferOnchain);

app.listen({ port: Number(process.env.PORT) }).then(() => {
  console.log(`Server is running on port ${process.env.PORT}`);
});