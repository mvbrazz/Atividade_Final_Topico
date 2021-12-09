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

async function getNoticiasID(IDs){
    
    if (isNaN(IDs)) {
        res.status(500).send('Non integer');
        return;
    }
    else{

        await storage.init();
        const noticias = await storage.getItem('Noticias');    
        var aux = noticias.find(b => b.ID == IDs);
  
        return aux;
  
    }
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

async function enviaEmail(IDs,aux){

    await storage.init();
    // PEGANDO AS NOTICIAS
    
    const noticias = await storage.getItem('Noticias');    
    var noticia = noticias.find(b => b.ID == IDs);
    var aux1 = noticia;

    // PEGANDO OS EMAILS
            
    const emails = await storage.getItem('Email');  
    var aux2 = emails;

    // CRIANDO O EMAIL 
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'cuho4qjp7jbiyhsz@ethereal.email',
            pass: 'E3UPQ7qzV9Ee2uXUWx'
        }
    });
    // ENVIANDO O EMAIL
    const info = await transporter.sendMail({
        from: 'dpfltysygc66yhqj@ethereal.email',
        to: aux2[aux].Email,
        subject: aux1.Titulo,
        text: aux1.resumo + " " + aux1.url
    
    });
    console.log('mensagem id: ',  info.messageId);
    console.log('mensagem url: ',  nodemailer.getTestMessageUrl(info));
    

}

async function getEmail(IDs){
var aux = 0;

if (isNaN(IDs)) {
    res.status(500).send('Non integer');
    return;
}
else{
    await storage.init();    
    const emails = await storage.getItem('Email');  
    var aux2 = emails;
    console.log("Total de emails: " + aux2.length);

    const tempo = setInterval(() => {

        enviaEmail(IDs,aux);
        aux++;
        if(aux == aux2.length){
            aux=0;
            clearInterval(tempo);
        }

    }, 2000);
    return aux2;
}
}

app.get('/noticias', (req, res) => {
    setTimeout(()=>{
        const noticias = getNoticias();
        noticias.then(v => {
        res.send(v); 
        }); 
    },1000);
});

app.get('/noticias/:ID', (req, res) => {
    const IDs = parseInt(req.params.ID);
    setTimeout(()=>{
    const aux = getNoticiasID(IDs);

    aux.then(v => {
        res.send(v);
    });
    },1000);
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

app.put('/enviar/:ID', (req, res) => {
    
    const IDs = parseInt(req.params.ID); 
    //var aux = getEmail(IDs);

    setTimeout(()  => {
        var aux = getEmail(IDs);
        aux.then(v => {
            res.send(v); 
        }); 
    },14000);
});
app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
})