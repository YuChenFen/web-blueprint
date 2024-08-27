const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const BASE_PATH = './server/src';

const httpPost = 3000;
const wsPost = 3001;
let fingerprint = getRamdomString();

const server = http.createServer();
server.on("request", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let path = req.url;
    if (path === '/') {
        path = '/index.html';
    }
    let filePath = BASE_PATH + path;
    console.log(filePath);
    if (req.method === 'POST') {
        let body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            let { data } = JSON.parse(body);
            console.log(data);
            if (!fs.existsSync(filePath)) {
                res.end();
                return;
            }
            fs.writeFileSync(filePath, data);
            updatePage();
            res.end();
        });
    } else if (req.method === 'GET') {
        let data;
        if (path === '/index.html') {
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            data = fs.readFileSync(filePath, 'utf8');
            data += `<script type="text/javascript" src="/client.js"></script>`
        } else if (path === '/client.js') {
            data = fs.readFileSync(filePath, 'utf8');
            data = data.replace(/ws:\/\/localhost:8081/g, `ws://localhost:${wsPost}/${fingerprint}`);
        } else {
            if (!fs.existsSync(filePath)) {
                res.writeHead(404);
                res.end();
                return;
            }
            data = fs.readFileSync(filePath, 'utf8');
        }
        res.write(data);
        res.end();
    }
})
server.listen(httpPost);
console.log('Server started');
const wss = new WebSocket.Server({ port: wsPost, path: `/${fingerprint}` });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        message = JSON.parse(message);
        switch (message.command) {
            case 'reload':
                updatePage(ws);
                break;
        }
    });
});


function updatePage(ws = null) {
    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                command: 'reload'
            }));
        }
    });
}

function getRamdomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}