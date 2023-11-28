const http = require('http');
const fs = require('fs');

http.createServer((request, response)=> {
    const file = request.url == '/' ? './www/index.html' : `./www/${request.url}`;

    if(request.url == '/registro'){
        let data = [];
        request.on("data", value =>{
            data.push(value);
        }).on("end", ()=>{
            let params = Buffer.concat(data).toString();
            response.write(params);
            response.end();
        });
    }else{

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