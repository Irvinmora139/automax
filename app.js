const http = require('http');
const fs = require('fs');

http.createServer((request, response)=> {
    const file = request.url == '/' ? './www/index.html' : `./www/${request.url}`;

    if (request.method === 'POST') {
        let data = [];
        request.on('data', (value) => {
            data.push(value);
        }).on('end', () => {
            const params = Buffer.concat(data).toString();
            
            fs.appendFile('formulario.txt', params + '\n', (err) => {
                if (err) {
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.write('Error interno del servidor');
                    response.end();
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write('<h1>Informacion enviada correctamente');
                    response.write('<meta http-equiv="refresh" content="2;url=/">');
                    response.end();
                }
            });
        });
    } else{

        fs.readFile(file, (err, data)=> {     
            if(err){
                response.writeHead(404, {"Content_Type":"text/html"}); 
                response.write("Not found");
                response.end();   
            } else {
                const extension = request.url.split('.').pop();
                switch(extension){
                    case 'txt':
                        response.writeHead(200, {"Content_Type":"text/plain"});  
                        break;
                    case 'html':
                        response.writeHead(200, {"Content_Type":"text/html"}); 
                        break; 
                    case 'css':
                        response.writeHead(200, {"Content_Type":"text/css"});  
                        break;
                    case 'js':
                        response.writeHead(200, {"Content_Type":"text/javascript"});  
                        break;
                    case 'jpg':
                        response.writeHead(200, {"Content_Type":"image/jpg"});  
                        break;
                    case 'png':
                        response.writeHead(200, {"Content_Type":"image/png"});  
                        break;
                    default:
                        response.writeHead(200, {"Content_Type":"text/plain"});  
                        break;
                }            
                response.write(data);
                response.end();        
            }
         });
    }
    
}).listen(8888);     