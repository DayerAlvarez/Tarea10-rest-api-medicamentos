# API REST de Medicamentos

## Procedimientos para implementación

1. Clonar Repositorio

```
git clone https://
```

2. Reconstruir node_modules

```
npm install
```

3. Construir el archivo .env

```
DB_HOST=localhost
DB_PORT=3306
DB_PASSWORD=
DB_USER=root
DB_DATABASE=farmacia
```

4. Restaure la BD (db > database.sql)

```sql
CREATE DATABASE farmacia;

USE farmacia;

CREATE TABLE medicamentos
(
  id              INT AUTO_INCREMENT PRIMARY KEY,
  tipo            ENUM('A','B','C')    NOT NULL,
  nombre          VARCHAR(120)         NOT NULL,
  nomcomercial    VARCHAR(40)          NULL,     -- Permitimos NULL para este campo
  presentacion    ENUM('A','B','C')    NOT NULL,
  receta          ENUM('S','N')        NOT NULL,
  precio          DECIMAL(7,2)         NOT NULL 
)ENGINE = INNODB;
```

5. Ejecute el proyecto:

```
npm run dev
```

## Endpoints disponibles

### GET

- `/api/medicamentos` - Obtener todos los medicamentos
- `/api/medicamentos/:id` - Obtener medicamento por ID
- `/api/medicamentos/receta/:receta` - Obtener medicamentos por tipo de receta ('S' o 'N')
- `/api/medicamentos/tipo/:tipo` - Obtener medicamentos por tipo ('A', 'B' o 'C')

### POST

- `/api/medicamentos` - Crear un nuevo medicamento
  - Validaciones:
    - El nombre comercial puede ser NULL o cadena vacía "" (se convierte automáticamente a NULL)
    - El precio no puede ser negativo o cero

### PUT

- `/api/medicamentos/:id` - Actualizar un medicamento existente
  - Validaciones:
    - El precio no puede ser negativo o cero
    - El nombre comercial puede ser NULL o cadena vacía "" (se convierte automáticamente a NULL)

### DELETE

- `/api/medicamentos/:id` - Eliminar un medicamento
  - Restricciones:
    - No se pueden eliminar medicamentos que requieren receta médica ('S')

## Ejemplos de uso

### Crear un medicamento con nomcomercial NULL

Puedes crear un medicamento con nomcomercial NULL de tres formas:

1. **Omitiendo el campo**:
```json
{
  "tipo": "B",
  "nombre": "Paracetamol1234",
  "presentacion": "B",
  "receta": "N",
  "precio": "100"
}
```

2. **Enviando explícitamente `null`**:
```json
{
  "tipo": "B",
  "nombre": "Paracetamol1234",
  "nomcomercial": null,
  "presentacion": "B",
  "receta": "N",
  "precio": "100"
}
```

3. **Enviando una cadena vacía `""`**:
```json
{
  "tipo": "B",
  "nombre": "Paracetamol1234",
  "nomcomercial": "",
  "presentacion": "B",
  "receta": "N",
  "precio": "100"
}
```

Todas estas opciones guardarán el campo nomcomercial como NULL en la base de datos.