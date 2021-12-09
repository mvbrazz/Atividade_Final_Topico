const axios = require('axios').default;

axios.get('http://localhost:3000/noticias')
    .then((response) => {
        console.log(response.data);
    });


axios.get('http://localhost:3000/noticias/3')
    .then((response) => {
        console.log(response.data);
    });



axios.put('http://localhost:3000/enviar/3')
    .then((response) => {
        console.log(response.data);
    });


