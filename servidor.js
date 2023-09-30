// Importar os módulos http, fs e path do Node.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// Definir a porta que o servidor irá escutar
const port = 6002;

// Criar um servidor HTTP usando o método createServer
const server = http.createServer((req, res) => {
  // Configurar o cabeçalho da resposta com o tipo de conteúdo sendo "text/html"
  res.setHeader('Content-Type', 'text/html');

  // Verificar se a URL solicitada é para a página index.html
  if (req.url === '/' || req.url === '/index.html') {
    // Ler o arquivo index.html
    fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, content) => {
      if (err) {
        res.writeHead(500); // Se houver um erro ao ler o arquivo, retornar código 500 (Internal Server Error)
        res.end('Error loading index.html'); // Enviar a mensagem de erro como resposta
        return;
      }

      res.writeHead(200); // Se a leitura do arquivo for bem-sucedida, retornar código 200 (OK)
      res.end(content); // Enviar o conteúdo do arquivo como resposta
    });
  } else if (req.url === '/sobre.html') {
    // Ler o arquivo sobre.html se a URL for "/sobre.html"
    fs.readFile(path.join(__dirname, 'sobre.html'), 'utf-8', (err, content) => {
      if (err) {
        res.writeHead(500); // Se houver um erro ao ler o arquivo, retornar código 500 (Internal Server Error)
        res.end('Error loading sobre.html'); // Enviar a mensagem de erro como resposta
        return;
      }

      res.writeHead(200); // Se a leitura do arquivo for bem-sucedida, retornar código 200 (OK)
      res.end(content); // Enviar o conteúdo do arquivo como resposta
    });
  } else if (req.url.startsWith('/arquivos/')) {
    // Servir arquivos de imagem da pasta 'arquivos'
    const imagePath = path.join(__dirname, req.url);
    const imageStream = fs.createReadStream(imagePath);

    imageStream.on('error', () => {
      res.writeHead(404); // Se a imagem não for encontrada, retornar código 404 (Not Found)
      res.end('Image not found'); // Enviar mensagem de erro como resposta
    });

    res.setHeader('Content-Type', 'image/png'); // Configurar o tipo de conteúdo como 'image/png' (ajustar de acordo com o tipo da imagem)
    imageStream.pipe(res); // Enviar a imagem como resposta usando pipe
  } else if (req.url.startsWith('/estilos/')) {
    // Servir arquivos CSS da pasta 'estilos'
    const cssPath = path.join(__dirname, req.url);
    const cssStream = fs.createReadStream(cssPath);

    cssStream.on('error', () => {
      res.writeHead(404); // Se o arquivo CSS não for encontrado, retornar código 404 (Not Found)
      res.end('CSS file not found'); // Enviar mensagem de erro como resposta
    });

    res.setHeader('Content-Type', 'text/css'); // Configurar o tipo de conteúdo como 'text/css'
    cssStream.pipe(res); // Enviar o arquivo CSS como resposta usando pipe
  } else {
    // Lidar com outras URLs não especificadas acima
    res.writeHead(404); // Retornar código 404 (Not Found) para URLs desconhecidas
    res.end('Page not found'); // Enviar mensagem de erro como resposta
  }
});

// Iniciar o servidor para escutar na porta especificada
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`); // Exibir mensagem no console quando o servidor estiver rodando
});
