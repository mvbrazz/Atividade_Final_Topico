const express = require('express');
const storage = require('node-persist');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function getInscricao(){
    await storage.init();
    const email = await storage.getItem('Email');    
    return email;
}

async function getNoticias(){
    await storage.init();
    const noticias = await storage.getItem('Noticias');    
    return noticias;
}

async function postNoticias(noticia){
     
    await storage.init();
    
    const Noticias = await storage.getItem('Noticias');

    if(Noticias == null){
        console.log("1");
        await storage.setItem('Noticias',[{ID:0,Titulo: noticia.Titulo,resumo: noticia.resumo,url: noticia.url}]);
    }
    else{
        console.log("2");
        Noticias.push({ID:Noticias.length,Titulo: noticia.Titulo,resumo: noticia.resumo,url: noticia.url});
        await storage.updateItem('Noticias',Noticias);
    }

    console.log('Noticia Salva');
    
}

async function postInscricao(e_mail){
    await storage.init();
    
    const Email = await storage.getItem('Email');
    if(Email == null){
        console.log("1");
        await storage.setItem('Email',[{Email:e_mail.Email}]);  
    }
    else{
        console.log("2");
        Email.push({Email:e_mail.Email});
        await storage.updateItem('Email',Email);
    }
      

    console.log('Email salvo');
}

app.get('/noticias', (req, res) => {
    setTimeout(()=> {   // Para pegar o valor que acabou de ser inserido
        const noticias = getNoticias();
        noticias.then(v => {
        res.send(v); 
        }); 
    },10000); 
});

app.get('/noticias/:ID', (req, res) => {
    const IDs = parseInt(req.params.ID);
    var aux;
    if (isNaN(IDs)) {
        res.status(500).send('Non integer');
        return;
    }
    else{
        const noticias = getNoticias();

        noticias.then(v => {
            aux = v.find(b => b.ID == IDs); 
            if(!aux){
                res.status(500).send('Non integer');
                return;
            }
            else{
                res.send(aux);
            }
            
        });
    }
});

app.post('/noticias', (req, res) => {
    const noticia = req.body; 
    postNoticias(noticia);
    res.send('Noticia Adicionada');
    return noticia;
});

app.post('/inscricao', (req, res) => {
    const email = req.body; 
    postInscricao(email);
    res.send('Email Adicionado');
    return email;
});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
})