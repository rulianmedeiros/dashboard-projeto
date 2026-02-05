import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// Rota para buscar os leads reais do seu n8n
app.get('/api/leads', async (req, res) => {
    const { id, campaign } = req.query;
    try {
        // Substitua pela sua URL de Produção do n8n
        const response = await axios.get('http://65.108.148.196:5678/webhook/leads', {
            params: { id, campaign }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do n8n' });
    }
});

app.listen(3001, () => {
    console.log('Backend do Dashboard rodando na porta 3001');
});