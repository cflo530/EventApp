const axios = require('axios');

exports.genImage = async category => {
    let obj = await axios.get(`https://imagegen.herokuapp.com/?${category}`)
    return obj.request.res.responseUrl
}