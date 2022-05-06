const http = require('http')
const moment = require('moment')
const chalk = require('chalk')
const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')
const getData = require('./getdata')

const users = [] // array avcio para extrae los datos de la promesa
const getInfo = async() => { //funcion async
    const data = await getData()
    for (const user of data) { //va a iterar la data
        const name = user.name.first //primer nombre de la persona
        const lastName = user.name.last // para el apellido
        const id = uuidv4().slice(0, 6) //va a cortar y trabajaremos en 6 caracteres // 2.  campo id único
        const date = moment().format('MMM Do YYYY hh:mm:ss') // 3.campo timestamp almacenando la fecha de registro
            // obtenida con Moment.
        users.push({ name, lastName, id, date }) //le pasamos los objetos al array users de más arriba   push con datos
    }
    return users
}
http.createServer(async(req, res) => { //creacion de server, funcion asinc para los usuarios
    if (req.url.includes('/users')) {
        const users = await getInfo()
        res.write(`<html>`) //para dar formato
        res.write(`<head><meta charSet="utf-8"/></head>`)
        _.forEach(users, (user, i) => { //i es las veces que iteracon lodash en el index

            const userData = `${i+1}. Nombre: ${user.name}. Apellido: ${user.lastName}. Id: ${user.id}.Fecha: ${user.date}\n`
            res.write(`<h3>${userData}</h3>`) //se guarda en la constante userData
            console.log(chalk.blue.bgWhite.bold(userData)) // 5. imprimir por la consola del servidor la misma lista
                // de usuarios pero con fondo blanco y color de texto azul usando el paquete Chalk.
        })
        res.write(`</html>`)
        res.end()
    }
}).listen(8080, () => {
    console.log('Escuchando en el puerto 8080')
})