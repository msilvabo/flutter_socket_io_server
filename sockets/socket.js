const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
console.log('Init Server');

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metallica'));

console.log(bands);

//Sockets mensajes
io.on('connection', client => {
    console.log('Cliente connected');    

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente disconnected');
    });

    client.on('mensaje', (payload) => {
        console.log('Index.js mensaje Recibido ', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje recibido'});        
    }); 

    client.on('emitir-mensaje',( payload ) => {
        // io.emit('nuevo-mensaje', payload);   // emite a todos
        console.log('Index.js     emitir-mensaje   recibido: ', payload);// emite a todos menos el que lo emitio
        client.broadcast.emit('nuevo-mensaje', payload);   
    });

    client.on('vote-band', (payload) =>{
        console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) =>{
        const banda = new Band(payload.name);
        bands.addBand(banda);
        io.emit('active-bands', bands.getBands());
    })

    client.on('delete-band', (payload) =>{
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    })
});