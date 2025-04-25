const client = require('../db/redisClient'); // Importar el cliente Redis

// Función para validar el login
async function validateLogin(email, password) {
  try {
    const userKeys = await client.keys('user:*'); // Busca todas las claves que empiecen con "user:"

    for (const key of userKeys) {
      const user = await client.hGetAll(key); // Obtener los datos del usuario

      if (user.email === email && user.password === password) {
        return { success: true, message: `Login exitoso. Bienvenido, ${user.name}` };
      }
    }

    return { success: false, message: 'Credenciales incorrectas.' };
  } catch (error) {
    console.error("Error durante el login:", error);
    return { success: false, message: 'Error interno del servidor.' };
  }
}

// Exportar la función
module.exports = validateLogin;