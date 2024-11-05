const mongoose = require('mongoose');
const cors = require('cors');

// Conecte ao MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://andrelacerda:h8BhL3ms7moDHEqY@barbearia.udttw.mongodb.net/';
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

// Função handler para lidar com requisições
const handler = async (req, res) => {
    await cors()(req, res); // Habilitar CORS para permitir requisições de qualquer origem
    
    if (req.method === 'POST') {
        // Receber os dados do request body
        const { nome, sobrenome, telefone, email, senha } = req.body;
        try {
            const newBarber = new Barber({ nome, sobrenome, telefone, email, senha });
            await newBarber.save();
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
};

module.exports = handler;
