import {pool} from '../db.js'
//req = requiere > solicitud  (CLIENTE) 
//res = results > respuesta (SERVIDOR)


export const getMedicamentos = async (req, res) => {
  try{
    const querySQL = "SELECT * FROM medicamentos"
    const [results] = await pool.query(querySQL)
    res.send(results)
  }catch(error){
    console.error("No se puede concretar GET", error)
    res.status(500).json({ message: "Error en el servidor" })
  }
}

export const getMedicamentoByid = async (req, res) => {
  try {
    const id = req.params.id;
    const querySQL = "SELECT * FROM medicamentos WHERE id = ?";
    const [results] = await pool.query(querySQL, [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "ID NO EXISTE" });
    }

    res.send(results[0]); // Envía solo el medicamento encontrado
  } catch (error) {
    console.error("No se puede concretar GET por ID", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getMedicamentosByReceta = async (req, res) => {
  try {
    const receta = req.params.receta;
    
    // Validar que el valor de receta sea 'S' o 'N'
    if (receta !== 'S' && receta !== 'N') {
      return res.status(400).json({ message: "El valor de receta debe ser 'S' o 'N'" });
    }
    
    const querySQL = "SELECT * FROM medicamentos WHERE receta = ?";
    const [results] = await pool.query(querySQL, [receta]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No hay medicamentos con este tipo de receta" });
    }

    res.send(results);
  } catch (error) {
    console.error("No se puede concretar GET por receta", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getMedicamentosByTipo = async (req, res) => {
  try {
    const tipo = req.params.tipo;
    
    // Validar que el valor de tipo sea 'A', 'B' o 'C'
    if (tipo !== 'A' && tipo !== 'B' && tipo !== 'C') {
      return res.status(400).json({ message: "El valor de tipo debe ser 'A', 'B' o 'C'" });
    }
    
    const querySQL = "SELECT * FROM medicamentos WHERE tipo = ?";
    const [results] = await pool.query(querySQL, [tipo]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No hay medicamentos de este tipo" });
    }

    res.send(results);
  } catch (error) {
    console.error("No se puede concretar GET por tipo", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const createMedicamentos = async (req, res) => {
  try{
    let {tipo, nombre, nomcomercial, presentacion, receta, precio} = req.body

    // Convertir cadena vacía en nomcomercial a NULL
    if (nomcomercial === "") {
      nomcomercial = null;
    }

    // Validar que el precio no sea negativo o cero
    if (precio <= 0) {
      return res.status(400).json({
        status: false,
        message: "El precio no puede ser negativo o cero",
        id: null
      })
    }

    const querySQL = `INSERT INTO medicamentos (tipo, nombre, nomcomercial, presentacion, receta, precio) VALUES (?,?,?,?,?,?)`
    
    const [results] = await pool.query(querySQL, [tipo, nombre, nomcomercial, presentacion, receta, precio])

    if(results.affectedRows == 0){
      res.send({
        status: false,
        message: "No se pudo completar el proceso",
        id: null
      })
    }else{
      res.send({
        status: true,
        message: "Registrado correctamente",
        id: results.insertId
      })
    }
  }catch(error){
    console.error("No se pudo concretar POST", error)
    res.status(500).json({ message: "Error en el servidor" })
  }
}

export const updateMedicamentos = async (req, res) => {
  try{
    const id = req.params.id
    let {tipo, nombre, nomcomercial, presentacion, receta, precio} = req.body

    // Convertir cadena vacía en nomcomercial a NULL
    if (nomcomercial === "") {
      nomcomercial = null;
    }

    // Validar que el precio no sea negativo o cero
    if (precio <= 0) {
      return res.status(400).json({
        status: false,
        message: "El precio no puede ser negativo o cero"
      })
    }

    const querySQL = `
    UPDATE medicamentos SET
      tipo = ?,
      nombre = ?,
      nomcomercial = ?,
      presentacion = ?,
      receta = ?,
      precio = ?
    WHERE id = ? 
    `

    const [results] = await pool.query(querySQL, [tipo, nombre, nomcomercial, presentacion, receta, precio, id])
  
    if(results.affectedRows == 0){
      return res.status(404).json({
        message: 'El ID no existe'
      })
    }
  
    res.sendStatus(202)
  }
  catch(error){
    console.error("No se puede concretar PUT", error)
    res.status(500).json({ message: "Error en el servidor" })
  }
}

export const deleteMedicamentos = async (req, res) => {
  try{
    const id = req.params.id

    // Verificar si el medicamento requiere receta
    const queryCheck = "SELECT receta FROM medicamentos WHERE id = ?"
    const [checkResults] = await pool.query(queryCheck, [id])

    if (checkResults.length === 0) {
      return res.status(404).json({
        message: 'EL ID ENVIADO NO EXISTE'
      })
    }

    // No permitir eliminar medicamentos con receta 'S'
    if (checkResults[0].receta === 'S') {
      return res.status(403).json({
        message: 'No se puede eliminar medicamentos que requieren receta médica'
      })
    }

    const querySQL = 'DELETE FROM medicamentos WHERE id = ?'
    const [results] = await pool.query(querySQL, [id])

    res.send({ message: 'Eliminado correctamente' })
  }
  catch(error){
    console.error("No se pudo concretar DELETE", error)
    res.status(500).json({ message: "Error en el servidor" })
  }
}