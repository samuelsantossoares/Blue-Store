const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configuração
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Armazenar usuários conectados
const users = new Map();

wss.on('connection', (ws) => {
  let username = `Usuário${Math.floor(Math.random() * 1000)}`;
  
  // Adiciona novo usuário
  users.set(ws, username);
  console.log(`${username} conectado`);
  
  // Notifica todos sobre o novo usuário
  broadcast({
    type: 'notification',
    content: `${username} entrou no chat`,
    users: Array.from(users.values())
  });
  
  // Envia a lista de usuários para o novo participante
  ws.send(JSON.stringify({
    type: 'init',
    username: username,
    users: Array.from(users.values())
  }));
  
  // Mensagens recebidas
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    if (data.type === 'set_username') {
      // Atualiza nome de usuário
      const oldUsername = users.get(ws);
      users.set(ws, data.username);
      
      broadcast({
        type: 'notification',
        content: `${oldUsername} agora é ${data.username}`,
        users: Array.from(users.values())
      });
    } else {
      // Encaminha mensagem para todos
      broadcast({
        type: 'message',
        content: data.content,
        sender: users.get(ws),
        timestamp: new Date().toISOString()
      });
    }
  });
  
  // Quando usuário desconecta
  ws.on('close', () => {
    const disconnectedUser = users.get(ws);
    users.delete(ws);
    
    broadcast({
      type: 'notification',
      content: `${disconnectedUser} saiu do chat`,
      users: Array.from(users.values())
    });
    
    console.log(`${disconnectedUser} desconectado`);
  });
});

// Função para enviar para todos os clientes
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
