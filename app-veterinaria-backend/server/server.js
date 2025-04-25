const express = require('express');
const bodyParser = require('body-parser');
const validateLogin = require('../logic/login'); // Importar la función de login
const cors = require('cors'); // Importar el paquete cors

const app = express();
const PORT = 3000;


  app.use(cors());
// Middleware para parsear JSON
app.use(bodyParser.json());



// Endpoint para iniciar sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body; // Credenciales enviadas en el cuerpo de la solicitud

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
  }

  const result = await validateLogin(email, password); // Llamar a la función de login

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(401).json({ error: result.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});