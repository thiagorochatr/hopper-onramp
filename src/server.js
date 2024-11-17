"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const transfer_onchain_1 = require("./routes/transfer-onchain");
const generate_pix_1 = require("./routes/generate-pix");
const jwt_1 = __importDefault(require("@fastify/jwt"));
const fetchJwtToken_1 = require("./middlewares/fetchJwtToken");
dotenv_1.default.config();
const app = (0, fastify_1.default)();
(async () => {
    try {
        await (0, fetchJwtToken_1.fetchJwtToken)();
    }
    catch (error) {
        console.error('Erro ao iniciar o servidor:');
        process.exit(1);
    }
})();
app.register(jwt_1.default, {
    secret: 'sua_chave_secreta',
});
app.register(cors_1.default, {
    origin: "*", // == true
});
app.get("/", async (request, reply) => {
    reply.send({ hello: "world" });
    return { hello: "world" };
});
app.register(generate_pix_1.generatePix);
app.register(transfer_onchain_1.transferOnchain);
app.listen({ port: 3333 }).then(() => {
    console.log(`Server is running on port 3333`);
});
