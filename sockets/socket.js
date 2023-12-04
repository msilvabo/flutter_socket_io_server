
const {io} = require('../index');
//Sockets mensajes
io.on('connection', client => {
    console.log('Cliente connected');    
client.on('disconnect', () => { 
    console.log('Cliente disconnected');
 });

client.on('mensaje', (payload) => {
    console.log('Index.js mensaje Recibido ', payload);
    io.emit('mensaje', {admin: 'Nuevo mensaje recibido'});        
}); 
});