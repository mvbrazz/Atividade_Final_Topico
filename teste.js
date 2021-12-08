const storage = require('node-persist');


async function main(){

await storage.init();
const aux  = await storage.getItem('Testando');
//users.push({ID: 3});
aux.push({ID:4,NOME: 'D'});

//await storage.setItem('Testando',[{ID:0,NOME: 'A'}]);
//await storage.setItem('Testando',[{ID:1,NOME: 'B'}]);
await storage.updateItem('Testando',aux);

}
main().catch(console.error);