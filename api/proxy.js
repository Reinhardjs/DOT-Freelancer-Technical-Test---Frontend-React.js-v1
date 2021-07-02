const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/', createProxyMiddleware({
  secure: false,
  target: 'https://rajaongkir.com',
  changeOrigin: false,
  headers: {
    host: "rajaongkir.com",
    origin: null
  }
}));
app.listen(8000);