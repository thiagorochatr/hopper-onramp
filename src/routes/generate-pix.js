"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePix = generatePix;
const axios_1 = __importDefault(require("axios"));
const qrcode_1 = __importDefault(require("qrcode"));
const fetchJwtToken_1 = require("../middlewares/fetchJwtToken");
async function generatePix(app) {
    app.get('/generate-pix', async (request, reply) => {
        const { amount } = request.query;
        const token = (0, fetchJwtToken_1.getJwtToken)();
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
            const response = await axios_1.default.request(options);
            const brCode = response.data.brCode;
            const qrCodeDataURL = await qrcode_1.default.toDataURL(brCode, { type: 'image/png' });
            const base64 = qrCodeDataURL.split(',')[1];
            console.log('Código Pix gerado:', brCode);
            return {
                brCode,
                base64,
            };
        }
        catch (error) {
            console.error('Erro ao gerar o QR Code:', error);
            reply.status(500).send({ error: 'Erro ao gerar o código Pix' });
        }
    });
}
