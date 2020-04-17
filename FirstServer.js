var express = require("express");
var bodyParser = require("body-parser");
var app  = express();
const teste = "tesasdte";
const _MS_PER_DAY  = 1000 * 60 * 60 * 24;
const REGEX = /^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])([12]\d{3})$/g;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000,function(){
    console.log(`Server running at http://localhost:3000/`);
  })

app.post('/post',function(req,res){
  res.send('post');
});
app.get('/diferenca',function(req,res){
      let entrada = req.query.data
      res.json({ "dias": calculaTempo(entrada)});
});
function calculaTempo(entrada){
  if (entrada == null) {return 'erro'}
  if (entrada.match(REGEX)) {
        let today = new Date();   
        let dateDateobj = new Date(today.getFullYear(),today.getMonth()+1,today.getDate());
        let requestReturn = entrada;
        let dateRequestoBJ = new Date(requestReturn.substr(4),requestReturn.substr(2,2),requestReturn.substr(0,2));
        let retorno = "";
        if(dateDateobj.getTime() === dateRequestoBJ.getTime()) {
          retorno = "Data de hoje"
        }
        else if (dateRequestoBJ.getTime() < dateDateobj.getTime()) {
          retorno = "Data é antes de hoje, já se passaram "+  Math.abs(dateDiffInDays(dateRequestoBJ, dateDateobj)) +" dias";
        }
        else if (dateRequestoBJ.getTime() > dateDateobj.getTime()) {
          retorno = "Data é depois de hoje, faltam "+  Math.abs(dateDiffInDays(dateRequestoBJ, dateDateobj)) +" dias";
        }
        else {
          retorno = "Algo deu errado"
        }
        return retorno;
  }
  else{    
     return 'erro';
  }
}
function dateDiffInDays(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc1 - utc2 ) / _MS_PER_DAY);
}
