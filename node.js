const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Conecte-se ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/guia-turistico', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Definição dos modelos de dados
const Turista = mongoose.model('Turista', new mongoose.Schema({
    nome: String,
    nif: String,
    email: String,
    telefone: String
}));

const Guia = mongoose.model('Guia', new mongoose.Schema({
    nome: String,
    nif: String,
    email: String,
    anoInicio: Number
}));

const PontoInteresse = mongoose.model('PontoInteresse', new mongoose.Schema({
    nome: String,
    descricao: String,
    latitude: Number,
    longitude: Number
}));

const Percurso = mongoose.model('Percurso', new mongoose.Schema({
    descricao: String,
    turista: { type: mongoose.Schema.Types.ObjectId, ref: 'Turista' },
    guia: { type: mongoose.Schema.Types.ObjectId, ref: 'Guia' },
    pontos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PontoInteresse' }]
}));

// Middleware para analisar JSON
app.use(bodyParser.json());

// Rotas para turistas
app.post('/api/turistas', async (req, res) => {
    try {
        const turista = new Turista(req.body);
        await turista.save();
        res.status(201).send(turista);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Rotas para guias
app.post('/api/guias', async (req, res) => {
    try {
        const guia = new Guia(req.body);
        await guia.save();
        res.status(201).send(guia);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Rotas para pontos de interesse
app.post('/api/pontos', async (req, res) => {
    try {
        const ponto = new PontoInteresse(req.body);
        await ponto.save();
        res.status(201).send(ponto);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Rotas para percursos
app.post('/api/percursos', async (req, res) => {
    try {
        const percurso = new Percurso(req.body);
        await percurso.save();
        res.status(201).send(percurso);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/percursos', async (req, res) => {
    try {
        const { turistaId } = req.query;
        const percursos = await Percurso.find({ turista: turistaId })
            .populate('guia')
            .populate('pontos');

        res.send(percursos);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
