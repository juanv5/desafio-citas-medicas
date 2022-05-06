// 1. El registro de los usuarios debe hacerse con la API Random User usando axios para
// consultar la data.
// este modulo ordena el codigo
const axios = require("axios");

const url = 'https://randomuser.me/api'

const getData = async() => {
    const { data } = await axios.get(url)
    return data.results // se usa results porque es la parte que nos interesa obtener de la api
}

module.exports = getData