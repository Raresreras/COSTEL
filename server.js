import express from 'express';
const port = 8000;

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : false}));
app.use(express.json())

import http from 'http';
import { WebSocketServer } from 'ws';

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) =>{
    console.log("NEW CLIENT CONNECTED");

    ws.on('message', (message) =>{
        console.log('received: ' + message);
        
        //broadcast message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.parse(message)); 
            }
        });
    });
});

app.get('/', (req, res) => {
    res.status(200);
    res.render('index', {questionText : 'Awaiting question'}); //questionText will be used to display the question
});

app.get('/question', (req, res) =>{
    res.status(200);
    res.render('question');
});

app.post('/question', async (req, res) =>{
    console.log(req.body);
    res.redirect('question');
});


server.listen(port);
console.log('Server running on port ' + port);

