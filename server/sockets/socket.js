const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.emit('estadoActual', {
        ultimo: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatroTickets()
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        const siguiente = ticketControl.siguiente();
        callback({ ticket: siguiente });
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'escritorio es necesario'
            })
        }

        let atender = ticketControl.atenderTicket(data.escritorio);

        callback(atender);

        client.broadcast.emit('ultimosCuatro', { ultimosCuatro: ticketControl.getUltimosCuatroTickets() });
    });

});