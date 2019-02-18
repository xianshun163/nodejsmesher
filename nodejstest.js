var express = require('express');
var http = require('http');
var router = express();

//����������
var hostName = '127.0.0.1';
//���ö˿�
var port = 8090;

//��������
var server = router.listen(port,function(){
      console.log("ok")

});
                       
router.get('/consumer', function (req, res, next) {         
    var name=req.query.name;
    var port=req.query.port;  
    console.log('name:'+name+',port:'+port);                         
    // ���������ѡ��                         
    var options = {                           
       host: '127.0.0.1',                     
       port: '30101',                          
       path: 'http://' + name + ':' + port + '/'                    
    };                                        
                                              
    // ������Ӧ�Ļص�����                     
    var callback = function(response){        
       // ���ϸ�������                        
       var body = '';                         
       response.on('data', function(data) {   
          body += data;                       
       });                                    
                                              
       response.on('end', function() {        
            // ���ݽ������                     
            console.log(body);      
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf8'});
            res.write(body);
            res.end();            
       });   
       response.on('error', function (e) {
        console.log("Got error: " + e.message);
       });                                 
    }                                         
    // �����˷�������                       
    var req = http.request(options, callback);
    req.end();             

});
                      

//  ��ҳ��� "Hello World"        
router.get('/', function (req, res) {
   console.log("get home ");  
   res.send('Hello nodejs');         
})  

router.get('/consumer2', function (req, res, next) {         
    var name=req.query.name;
    var port=req.query.port;                           
    console.log('name:'+name+',port:'+port);                         
    // ���������ѡ��                         
    var options = {                           
       host: '127.0.0.1',                     
       port: '8090',                          
       path: 'http://' + name + ':' + port + '/'                    
    };                                         
                                              
    // ������Ӧ�Ļص�����                     
    var callback = function(response){        
       // ���ϸ�������                        
       var body = '';                         
       response.on('data', function(data) {   
          body += data;                       
       });                                    
                                              
       response.on('end', function() {        
            // ���ݽ������                     
            console.log(body);      
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf8'});
            res.write(body);
            res.end();            
       });                                    
    }                                         
    // �����˷�������                       
    var req = http.request(options, callback);
    req.end();             

});
      
                    
        