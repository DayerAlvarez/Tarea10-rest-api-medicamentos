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

INSERT INTO medicamentos
  (tipo, nombre, nomcomercial, presentacion, precio, receta)
  VALUES
    ('A', 'Paracetamol', 'Doloforte', 'A', 15.50, 'N'),
    ('B', 'Ibuprofeno', 'Advil', 'B', 25.80, 'N'),
    ('A', 'Amoxicilina', 'Amoxil', 'C', 45.20, 'S'),
    ('C', 'Loratadina', 'Claritine', 'A', 35.40, 'N'),
    ('B', 'Diclofenaco', 'Voltaren', 'B', 28.90, 'S'),
    ('A', 'Omeprazol', 'Prilosec', 'C', 52.30, 'S'),
    ('C', 'Dexametasona', 'Decadron', 'A', 65.70, 'S'),
    ('B', 'Metformina', 'Glucophage', 'B', 42.10, 'S'),
    ('A', 'Atorvastatina', 'Lipitor', 'C', 78.50, 'S'),
    ('C', 'Cetirizina', 'Zyrtec', 'A', 22.60, 'N'),
    ('B', 'Aspirina', 'Bayer', 'B', 18.75, 'N'),
    ('A', 'Ciprofloxacino', 'Cipro', 'C', 55.40, 'S');

SELECT * FROM medicamentos;