var express = require('express');
var http = require('http');
var router = express();

//设置主机名
var hostName = '127.0.0.1';
//设置端口
var port = 8090;

//创建服务
var server = router.listen(port,function(){
      console.log("ok")

});
                       
router.get('/consumer', function (req, res, next) {         
    var name=req.query.name;
    var port=req.query.port;  
    console.log('name:'+name+',port:'+port);                         
    // 用于请求的选项                         
    var options = {                           
       host: '127.0.0.1',                     
       port: '30101',                          
       path: 'http://' + name + ':' + port + '/'                    
    };                                        
                                              
    // 处理响应的回调函数                     
    var callback = function(response){        
       // 不断更新数据                        
       var body = '';                         
       response.on('data', function(data) {   
          body += data;                       
       });                                    
                                              
       response.on('end', function() {        
            // 数据接收完成                     
            console.log(body);      
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf8'});
            res.write(body);
            res.end();            
       });   
       response.on('error', function (e) {
        console.log("Got error: " + e.message);
       });                                 
    }                                         
    // 向服务端发送请求                       
    var req = http.request(options, callback);
    req.end();             

});
                      

//  主页输出 "Hello World"        
router.get('/', function (req, res) {
   console.log("get home ");  
   res.send('Hello nodejs');         
})  

router.get('/consumer2', function (req, res, next) {         
    var name=req.query.name;
    var port=req.query.port;                           
    console.log('name:'+name+',port:'+port);                         
    // 用于请求的选项                         
    var options = {                           
       host: '127.0.0.1',                     
       port: '8090',                          
       path: 'http://' + name + ':' + port + '/'                    
    };                                         
                                              
    // 处理响应的回调函数                     
    var callback = function(response){        
       // 不断更新数据                        
       var body = '';                         
       response.on('data', function(data) {   
          body += data;                       
       });                                    
                                              
       response.on('end', function() {        
            // 数据接收完成                     
            console.log(body);      
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf8'});
            res.write(body);
            res.end();            
       });                                    
    }                                         
    // 向服务端发送请求                       
    var req = http.request(options, callback);
    req.end();             

});
      
                    
        