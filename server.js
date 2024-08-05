const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const atrativosRoutes = require('./routes/atrativosRoutes');
const destinosRoutes = require('./routes/destinosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const { exec } = require('child_process'); // Modulo para executar comandos do sistema operacional

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Servir arquivos estáticos da pasta 'frontend'
app.use(express.static('frontend'));

// Routes
app.use('/atrativos', atrativosRoutes);
app.use('/destinos', destinosRoutes);
app.use('/usuarios', usuariosRoutes);

// Rota para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log("\n\n %cAbra o navegador e acesse http://localhost:3000\n\n", "color: blue; font-size: 16px;");
    exec('start http://localhost:3000');
});