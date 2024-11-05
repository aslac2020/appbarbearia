const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());


const MONGODB_URI = 'mongodb+srv://andrelacerda:h8BhL3ms7moDHEqY@barbearia.udttw.mongodb.net/';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB Atlas');
}).catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});

const BarberSchema = new mongoose.Schema({
    nome: String,
    sobrenome: String,
    telefone: String,
    email: String,
    senha: String
});

const Barber = mongoose.model('barbearia', BarberSchema);

const handler = async (req, res) => {
    await cors()(req, res); 
  
    if (req.method === 'POST') {
      const { nome, telefone, servico } = req.body;
      try {
        const newBarber = new Barber({ nome, telefone, servico });
        await newBarber.save();
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
      } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
      }
    } else {
      res.status(405).json({ message: 'Método não permitido' });
    }
  };
  
  export default handler;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/barbearia', async (req, res) => {
    const { nome, telefone, sobrenome, email, senha  } = req.body;
    const newBarber = new Barber({ nome, telefone, sobrenome, email, senha    });
    await newBarber.save();
    res.status(201).send('Barbeiro cadastrado com sucesso!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
