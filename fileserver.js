var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require("path");

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname;  
  var filename = path.join(process.cwd(), uri);  
  path.exists(filename, function(exists) {  
    if(!exists) {  
        response.writeHead(404, {"Content-Type": "text/plain"});  
        response.write("404 Not Found\n");  
        response.end();  
        return;  
    }  
      
    fs.readFile(filename, "binary", function(err, file) {  
      if(err) {  
          response.writeHead(500, {"Content-Type": "text/plain"});  
          response.write(err + "\n");  
          response.end();  
          return;  
      }  
        
      response.writeHead(200);  
      response.write(file, "binary");  
      response.end();  
    });  
  }); 
}).listen(9614);