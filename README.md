# hopper-onramp

GET /
return { hello: "world" }

GET /generate-pix
query params
amount=string
return { brCode, base64 }

POST /onchain-transfer
body
{
  chain,
  inputCoin,
  outputCoin,
  to,
  value
}
