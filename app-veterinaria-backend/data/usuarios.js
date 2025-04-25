const client = require('../db/redisClient');

// Datos JSON
const users = [
  {
    id: 1,
    email: "usuario1@vetapp.com",
    password: "123456",
    name: "Carlos Ramírez",
  },
  {
    id: 2,
    email: "usuario2@vetapp.com",
    password: "abcdef",
    name: "Luisa Torres",
  },
];

// Función para insertar usuarios en Redis
async function insertUsersToRedis() {
  try {
    await client.connect(); // Conectar al cliente Redis

    for (const user of users) {
      const key = `user:${user.id}`; // Clave única para cada usuario
      await client.hSet(key, user); // Insertar el usuario como un hash
      console.log(`Usuario ${user.name} insertado con éxito en Redis.`);
    }
  } catch (error) {
    console.error("Error al insertar usuarios en Redis:", error);
  } finally {
    await client.disconnect(); // Cerrar la conexión con Redis
  }
}

// Ejecutar la función
insertUsersToRedis();