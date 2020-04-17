const express = require('express')
const server = express() //Instancia um servidor
const PORT = process.env.PORT || 3000; // Define qual porta o servidor vai ouvir
const _MS_PER_DAY  = 1000 * 60 * 60 * 24;
const REGEX = /^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])([12]\d{3})$/g;

server.listen(PORT, () => console.log(`Server running at http://localhost:3000/`));

server.get("/diferenca", (request, response) => {
        var reqDate = request.query.data
        var days = calcDateDiff(reqDate)
        response.json({ "dias": days});
} );


function calcDateDiff(dateString) {
    var day = dateString.substring(0, 2) 
    var month = dateString.substring(2, 4)
    var year = dateString.substring(4)

    var formattedDate = year + "-" + month + "-" + day // Formatamos a data para o padrao ISO, que o javascript usa
    var requestedDate = new Date(formattedDate) // Instanciamos um objeto com a data que foi pedida
    var today = new Date() // Instanciamos um objeto com a data de hoje

    var diffMilli = (requestedDate - today ) // Diferenca das datas em milissegundos
    var diffDays = parseInt( diffMilli/ (_MS_PER_DAY), 10);  // Diferenca das datas em dias

    return diffDays
}