import express from 'express'
import medicamentosRoutes from './routers/medicamentos.routes.js';

const app = express();

app.use(express.json()) // Server recibe el JSON 
app.use('/api/', medicamentosRoutes);

export default app