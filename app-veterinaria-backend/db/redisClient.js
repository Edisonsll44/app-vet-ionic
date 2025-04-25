const redis = require('redis');

// Crear y configurar el cliente Redis
const client = redis.createClient({
  socket: {
    host: 'localhost', // Cambia esto si Redis está en otro host
    port: 6379,        // Puerto predeterminado de Redis
  },
});

// Conectar al cliente Redis al iniciar
(async () => {
  try {
    await client.connect();
    console.log('Conexión exitosa con Redis.');
  } catch (error) {
    console.error('Error al conectar con Redis:', error);
  }
})();

// Manejar errores de conexión
client.on('error', (err) => {
  console.error('Error de conexión con Redis:', err);
});

// Exportar el cliente Redis
module.exports = client;