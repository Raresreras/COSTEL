import http from 'http';
import fs from 'fs/promises'
import url from 'url'
import path from 'path'
const port = 8000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) =>{
    let filepath;
    if (req.method === 'GET'){
        if (req.url === '/question') {
            filepath = path.join(__dirname, '/public', '/question.html');
        }
        else {
            filepath = path.join(__dirname, '/public', '/index.html');
        }
    }
    if (req.method === "POST"){
        //POST black magic
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        // When all data has been received
        req.on('end', () => {
            console.log(body);
        })

        //defaulting to the question path
        filepath = path.join(__dirname, '/public', '/question.html');
    }
    
    const data = await fs.readFile(filepath);
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.write(data);
    res.end();
});

server.listen(port, () => {
    console.log('Server running on port ' + port);
});