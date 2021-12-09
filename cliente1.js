const axios = require('axios').default;

setTimeout(() =>{
    axios.post('http://localhost:3000/noticias', {Titulo:'A primeira tentativa',
    resumo: 'Quando foi iniciado o projeto',url: 'www.visualStudio.com.br'})
},1000);
setTimeout(() =>{
axios.post('http://localhost:3000/noticias', {Titulo:'A segunda tentativa',
resumo: 'Quando foi iniciado o projeto',url: 'www.visualStudio.com.br'})
},2000);
setTimeout(() =>{
axios.post('http://localhost:3000/noticias', {Titulo:'A terceira tentativa',
resumo: 'Quando foi iniciado o projeto',url: 'www.visualStudio.com.br'})
},3000);
setTimeout(() =>{
axios.post('http://localhost:3000/noticias', {Titulo:'A quarta tentativa',
resumo: 'Quando foi iniciado o projeto',url: 'www.visualStudio.com.br'})
},4000);
setTimeout(() =>{
axios.post('http://localhost:3000/noticias', {Titulo:'A quinta tentativa',
resumo: 'Quando foi iniciado o projeto',url: 'www.visualStudio.com.br'})
},5000);

setTimeout(() =>{
    axios.post('http://localhost:3000/inscricao', {Email:'1@hotmail.com'})
},6000);

setTimeout(() =>{
    axios.post('http://localhost:3000/inscricao', {Email:'2@hotmail.com'})
},7000);

setTimeout(() =>{
    axios.post('http://localhost:3000/inscricao', {Email:'3@hotmail.com'})
},8000);

setTimeout(() =>{
    axios.post('http://localhost:3000/inscricao', {Email:'4@hotmail.com'})
},9000);

setTimeout(() =>{
    axios.post('http://localhost:3000/inscricao', {Email:'5@hotmail.com'})
},10000);

setTimeout(() =>{
    axios.post('http://localhost:3000/inscricao', {Email:'6@hotmail.com'})
},11000);

setTimeout(() =>{
    axios.post('http://localhost:3000/inscricao', {Email:'7@hotmail.com'})
},12000);

setTimeout(() =>{
    axios.get('http://localhost:3000/noticias')
    .then((response) => {
        console.log(response.data);
    });
},13000);

