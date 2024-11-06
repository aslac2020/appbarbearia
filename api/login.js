const mongoose = require('mongoose');
const Barber = require('./barbearia'); 

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email, senha } = req.body;
        try {
            const user = await Barber.findOne({ email, senha });
            if (user) {
                res.status(200).json({ message: 'Login bem-sucedido' });
            } else {
                res.status(401).json({ message: 'Email ou senha incorretos' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
};

module.exports = handler;
