var map = false;
var mapMarkers = new L.FeatureGroup();
var mapPuzzlesPoints = [];
var userMarker = false;
var userCircleMarker = false;
var userMarkerLayer = new L.FeatureGroup();
var watchId = false;

function createMap () 
{
    var mapAttribution = 'Map Data &copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> and Contributors';
    
    centerPoint = appConf.start_position[0];
    
    map = L.map('map', {zoomControl: false}).setView([centerPoint.lat, centerPoint.lng], 18);

    //@TODO: verificar se vai usar offline ou não.
    L.tileLayer('data/map/{z}/{x}/{y}.jpg', {
        attribution: mapAttribution,
        minZoom: 16,
        maxZoom: 18
    }).addTo(map);
    
    //TODO: criar limites
    
    userMarker = L.marker(L.latLng(0, 0),{ icon: userIcon });
    userCircleMarker = L.circleMarker(L.latLng(0, 0), {
        stroke: true, color: '#b35731', weigth: 2, opacity: 0.5,
        fill: true, fillColor: '#dbaf9c', fillOpacity: 0.5
    });
    userCircleMarker.setRadius(20);
    userMarkerLayer.addLayer(userCircleMarker);
    userMarkerLayer.addLayer(userMarker);
    
    map.addLayer(mapMarkers);
}



function goartista(idartista) {
    if ( ! tempoArtista(idartista) ) return;
    
    $('#fpromocoes #imgartista').attr('src', 'img/' + idartista + '.jpg');
                    
    $('#fpromocoes input').val('');
    $('#fpromocoes #idartista').val(idartista);

    $('#fpromocoes #btnEnviar').val('Enviar');
    
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#fpromocoes" );
}

function enviarTexto () {
    dados = {
        "idartista": $('#idartista').val(),
        "nome": $('#nome').val(),
        "celular": $('#celular').val(),
        "texto": $('#texto').val()
    };
    
    $.post(base_url + 'Promocao?securekey=XcQLOs84ZPRhq2te8nMWJMh7RA3wJgkwi08Xh4P6JubYmt2iGC', dados, function (result) {
        navigator.notification.confirm(dados.message, function () {}, '', ['OK']);
    }).fail(function () {
        navigator.notification.confirm('Ocorreu uma falha ao enviar sua mensagem, tende novamente mais tarde!', function () {}, '', ['OK']);
    });
}

function tempoArtista (idartista) {
    tartista = {
        "1": (new Date(2016, 0, 24, 12, 0, 0, 0)).getTime(),
        "19": (new Date(2016, 0, 24, 12, 0, 0, 0)).getTime(),
        "2": (new Date(2016, 0, 22, 12, 0, 0, 0)).getTime(),
        "4": (new Date(2016, 0, 22, 12, 0, 0, 0)).getTime(),
        "7": (new Date(2016, 0, 22, 12, 0, 0, 0)).getTime(),
        "3": (new Date(2016, 0, 23, 12, 0, 0, 0)).getTime(),
        "5": (new Date(2016, 0, 23, 12, 0, 0, 0)).getTime()
    };
    
    
    tempo = tartista[idartista];
    agora = (new Date()).getTime();
    

    return agora <= tempo;
}