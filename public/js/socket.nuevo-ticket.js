var socket = io();
let label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('perdimos conexion con el servidor');
});

socket.on('estadoActual', function(estadoActual) {
    label.text(estadoActual.ultimo);
});

$('button').click(function() {
    console.log('button listener click');
    socket.emit('siguienteTicket', {}, function(resp) {
        console.log('siguiente: ', resp);

        label.text(resp.ticket);
    });
});