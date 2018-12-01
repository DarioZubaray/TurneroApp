var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';

    throw new Error('El escritorio es requerido');
}

var escritorio = searchParams.get('escritorio');
var labelTicket = $('#numeroTicket');

$('#escritorio').text('Escritorio ' + escritorio);

// socket.on('atenderTicket')

$('#btn_escritorio').click(function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp);
        if (resp.err) {
            console.log(resp.err);
        } else {
            if (resp === 'No hay tickets') {
                labelTicket.text(resp)
                alert(resp);
                return;
            } else {
                labelTicket.text(resp.numero);
            }
        }
    });
});