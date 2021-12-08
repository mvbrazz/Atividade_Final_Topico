const express = require('express');
const storage = require('node-persist');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function getNoticias(){
    await storage.init();
    const noticias = await storage.getItem('Noticias');
    //console.log(noticias);
    return noticias;
}

async function postNoticias(noticia){
    
    await storage.init();
    
    const Noticias = await storage.getItem('Noticias');

    if(Noticias == null){
        await storage.setItem('Noticias',[{ID:0,Titulo:'O inicio',resumo: 'Iniciado',url: 'www.google.com.br'}]);
    }
    else{
        
        Noticias.push({ID:Noticias.length,Titulo: noticia.Titulo,resumo: noticia.resumo,url: noticia.url});
        await storage.updateItem('Noticias',Noticias);
        
    }

    console.log('Noticia Salva');
    
}

app.get('/noticias', (req, res) => {
    var Note;
    const noticias = getNoticias();
    noticias.then(v => {
        res.send(v); 
    });
 
});

app.post('/noticias', (req, res) => {
    const noticia = req.body; 
    postNoticias(noticia);
    res.send('Noticia Adicionada');
    return noticia;
});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
})