import {Router} from 'express'
import {
  createMedicamentos, 
  deleteMedicamentos, 
  getMedicamentoByid, 
  getMedicamentos,
  getMedicamentosByReceta,
  getMedicamentosByTipo,
  updateMedicamentos
} from '../controllers/medicamentos.controller.js'
const router = Router();

// Rutas GET
router.get('/medicamentos', getMedicamentos)
router.get('/medicamentos/:id', getMedicamentoByid)
router.get('/medicamentos/receta/:receta', getMedicamentosByReceta)
router.get('/medicamentos/tipo/:tipo', getMedicamentosByTipo)

// Ruta POST
router.post('/medicamentos', createMedicamentos)

// Ruta PUT
router.put('/medicamentos/:id', updateMedicamentos)

// Ruta DELETE
router.delete('/medicamentos/:id', deleteMedicamentos)

export default router;