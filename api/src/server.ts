import app from './app.js';
import os from 'os';

// Função para obter o endereço IP local
const getLocalIp = (): string => {
  const interfaces = os.networkInterfaces();

  for (const interfaceName in interfaces) {
    const networkInterface = interfaces[interfaceName];

    if (networkInterface) {
      for (const iface of networkInterface) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  }

  return '127.0.0.1'; // Fallback para localhost
};

const localIp = getLocalIp();

// eslint-disable-next-line no-undef
const port = process.env.PORTA;

app.listen(port, () => {
  console.log(`Servidor rodando em:`);
  console.log(`- Local:   http://localhost:${port}`);
  console.log(`- Rede:    http://${localIp}:${port}`);
});
