const http = require('http')
const arreglo = require('lodash')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
const chalk = require('chalk')
const axios = require("axios");

let listaDeUsuarios = [];

http
    .createServer(function (req, res) {

        if (req.url.includes('/usuario')) {
        axios
            .get("https://randomuser.me/api/")
            .then((data) => {

                listaDeUsuarios.push({
                    nombre: data.data.results[0].name.first,
                    apellido: data.data.results[0].name.last,
                    ID: uuidv4().slice(0, 6),
                    timestamp: moment().format('MMM Do YYYY, h:mm:ss a'),

                })
               
                console.log(chalk.blue('Usuario creado'))
               
            })
            .catch((err) => {
                console.log(err);
            })

        res.end()
        }

        if (req.url.includes('/consulta')) {

                    let i= 1;
            arreglo.forEach(listaDeUsuarios,(e) => {
              
                res.write(`${i}. Nombre: ${e.nombre} - Apellido: ${e.apellido} - ID: ${e.ID} - Timestamp: ${e.timestamp}\n`)
                console.log(chalk.blueBright.bold.bgWhite(`${i}. Nombre: ${e.nombre} - Apellido: ${e.apellido} - ID: ${e.ID} - Timestamp: ${e.timestamp}`));
                
                     i++;
    
            })
    
            res.end();
        }
    })
    .listen(8080, () => console.log(chalk.greenBright.bold('Escuchando el puerto 8080')))


