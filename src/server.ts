import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from 'dotenv';
import { transferOnchain } from "./routes/transfer-onchain";
import { generatePix } from "./routes/generate-pix";
import fastifyJwt from '@fastify/jwt';
import { fetchJwtToken } from './middlewares/fetchJwtToken';
import { generatePixTest } from "./routes/generate-pix-test";

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
app.register(generatePixTest);

app.register(transferOnchain);

app.listen({ host: '0.0.0.0', port: process.env.PORT ? Number(process.env.PORT) : 3333 }).then(() => {
  console.log(`Server is running on port 3333`);
});