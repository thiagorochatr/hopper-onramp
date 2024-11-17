"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchJwtToken = fetchJwtToken;
exports.getJwtToken = getJwtToken;
const axios_1 = __importDefault(require("axios"));
let jwtToken = null;
async function fetchJwtToken() {
    const options = {
        method: 'POST',
        url: 'https://api.brla.digital:5567/v1/business/login',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        data: { email: process.env.BRLA_EMAIL, password: process.env.BRLA_PASSWORD },
    };
    try {
        const response = await axios_1.default.request(options);
        jwtToken = response.data.accessToken;
        console.log('Token JWT obtido:', jwtToken);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Erro ao obter o token JWT:', error.message);
        }
        else {
            console.error('Erro ao obter o token JWT:', error);
        }
        throw new Error('Falha ao autenticar com a API externa.');
    }
}
function getJwtToken() {
    return jwtToken;
}
