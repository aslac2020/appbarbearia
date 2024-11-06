const mongoose = require('mongoose');


// Conecte ao MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Defina o modelo de dados
const BarberSchema = new mongoose.Schema({
    nome: String,
    sobrenome: String,
    telefone: String,
    email: String,
    senha: String
});

const Barber = mongoose.model('barbearia', BarberSchema);

const handler = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Responde com 200 para requisições OPTIONS
    }

    if (req.method === 'POST') {
        const { nome, sobrenome, telefone, email, senha } = req.body;
        try {
            const newBarber = new Barber({ nome, sobrenome, telefone, email, senha });
            await newBarber.save();
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
};


module.exports = handler;
