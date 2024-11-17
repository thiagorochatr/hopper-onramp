"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferOnchain = transferOnchain;
const axios_1 = __importDefault(require("axios"));
const fetchJwtToken_1 = require("../middlewares/fetchJwtToken");
async function transferOnchain(app) {
    app.post('/onchain-transfer', async (request, reply) => {
        const { chain, inputCoin, outputCoin, to, value } = request.body;
        const token = (0, fetchJwtToken_1.getJwtToken)();
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
            const response = await axios_1.default.request(options);
            return response.data;
        }
        catch (error) {
            console.error('Erro na operação on-chain:', error);
        }
    });
}
