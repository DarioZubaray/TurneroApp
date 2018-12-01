var socket = io();

var labelTicket1 = $('#lblTicket1');
var labelTicket2 = $('#lblTicket2');
var labelTicket3 = $('#lblTicket3');
var labelTicket4 = $('#lblTicket4');

var labelEscritorio1 = $('#lblEscritorio1');
var labelEscritorio2 = $('#lblEscritorio2');
var labelEscritorio3 = $('#lblEscritorio3');
var labelEscritorio4 = $('#lblEscritorio4');

var lblTickets = [labelTicket1, labelTicket2, labelTicket3, labelTicket4];
var lblEscritorios = [labelEscritorio1, labelEscritorio2, labelEscritorio3, labelEscritorio4];

socket.on('estadoActual', function(data) {
    console.log(data);
    actualizaHTML(data.ultimosCuatro);
});

socket.on('ultimosCuatro', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.ultimosCuatro);
});

function actualizaHTML(ultimosCuatro) {
    for (var i = 0; i <= ultimosCuatro.length - 1; i++) {
        lblTickets[i].text('Ticket ' + ultimosCuatro[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimosCuatro[i].escritorio);
    }
}