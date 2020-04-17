var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

//Conexao
var con = mysql.createConnection({
    host :'localhost',
    port:'8889',
    user:'root',
    password:'root',
    database:'backend',
    multipleStatements: true
});
//Configuração Porta
var server = app.listen(4548,function() {
    var host = server.address().address
    var port = server.address().port
    console.log("start on 4548");
});
//Conexão
con.connect(function(error) {
    if(error) console.log(error);
    else console.log("connected");
});
//Seleciona usuarios pelo nomeclea
app.get('/listaReflection',function(req,res) {
  try {
    con.query("SELECT * FROM reflection",function (error,rows,fields) {
        if (rows.length == 0){
            res.send('sem reflections');
        }
        else{
            if(error){
                res.send('error');
            } 
            else{
                console.log(rows);
                res.send(rows);
            }
        }
    });
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }
});

app.get('/reflection/:id', function(req,res) {
  let id = req.params.id

  try {
    con.query("SELECT * FROM reflection WHERE `id` = '"+id+"' ",function (error,rows,fields) {
        if (rows.length == 0){
            res.send('sem reflections');
        }
        else{
            if(error){
                res.send('error');
            } 
            else{
                console.log(rows);
                res.send(rows);
            }
        }
    });
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }
});

function dateFormater(date){
    //10042020
    var day = date.substring(0, 2) ;
    var month = date.substring(2, 4);
    var year = date.substring(4);
    return year + "-" + month + "-" + day;
}
app.get('/reflection',function(req,res){
    let from = req.query.from
    let to = req.query.to
    from = dateFormater(from);
    to = dateFormater(to);

    try {
        con.query("SELECT * FROM reflection WHERE creationTime BETWEEN '"+from+"' AND '"+to+"'",function (error,rows,fields) {
            if(rows.length == 0){
                res.send({"erro":'Sem resposta'});
            }
            else{
                if(error){
                    res.json({"erro":"erro"});
                } 
                else{
                    res.send(rows);
                }
            }
        });
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    } 
});

app.get('/delete/:id', function(req,res) {
  let id = req.params.id

  try {
    con.query("DELETE FROM reflection WHERE `id` = '"+id+"' ",function (error,rows,fields) {
        if (rows.length == 0){
            res.send('sem reflections');
        }
        else{
            if(error){
                res.send('error');
            } 
            if (rows.affectedRows == 0) {
              res.json({"erro": "reflection n existe"});
            }
            else{
                console.log(rows.affectedRows);
                res.send(rows);
            }
        }
    });
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }
});

app.post('/createReflection',function(req,res) {
  let text = req.body.text;
  let creationTime = req.body.creationTime;
  try {
    con.query("INSERT INTO `reflection`(`text`, `creationTime`) VALUES ('"+text+"','"+creationTime+"')",function (error,rows,fields) {
        if(error){
            console.log(error);
            res.send(error);
        }
        else{
            console.log(rows);
            res.send('success');
        }
    });
} catch (error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
}
});

app.put('/update/:id', function (req, res) {
    let id = req.params.id
    let text = req.body.text

    try{
        con.query("UPDATE `reflection` SET `text`='"+text+"' WHERE `id` = '"+id+"'",function (error,rows,fields){
            if(error){
                res.json({"error":"erro"});
            }
            else{
                res.send(rows);
            }
        });
    }catch{
        res.json({"error ": error.message});
    }
});
