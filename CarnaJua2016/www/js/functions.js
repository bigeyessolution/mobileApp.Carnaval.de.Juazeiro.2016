var map = false;
var mapMarkers = new L.FeatureGroup();
var mapTrios = [];
var mapcenter = {
    lat: -9.4124,
    lng: -40.4997
};

var userMarker = false;
var userCircleMarker = false;
var userMarkerLayer = new L.FeatureGroup();
var watchID = false;
var showPuzzleEnabledMessage = false;
var map_folder = false;

function createMap () {    
    map = L.map('map', {zoomControl: false}).setView([mapcenter.lat, mapcenter.lng], 17);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.addLayer(mapMarkers);
}

function monitorarTrios () {
    pegarPosicoesDosTrios();
    
    watchID = setInterval(pegarPosicoesDosTrios, 10000);
}

function pegarPosicoesDosTrios () {
    $.getJSON(base_url + 'Trios', function (data) {
        trios = data.content;
        
        clearMap();
         
        $.each(trios, function (key, trio){
            var icone = L.icon({
                iconUrl: 'img/pins/' + trio.idartista + '.png',
                //iconRetinaUrl: 'css/images/marker-icon-2x.png',
                iconSize: [25, 41],
                iconAnchor: [12, 40],
                popupAnchor: [3, -43],
                shadowUrl: 'img/pins/sombra.png',
                shadowSize: [41, 41],
                shadowAnchor: [11, 40]
            });
            
            var marker = L.marker(
                L.latLng(trio.lat,trio.lng),
                { icon: icone, clickable: false }
            );
            
			marker.bindPopup (
				trio.artista, 
				{ closeButton: false }
			);
            
            var trioMarker = {
                serial: trio.serial,
                idartista: trio.idartista,
                artista: trio.artista,
                lat: trio.lat,
                lng: trio.lng,
                marker: marker
            };

            mapTrios.push (trioMarker);
            mapMarkers.addLayer(trioMarker.marker);
        });
    });
}

function clearMap () {
    if (mapTrios.length > 0 ) {
        mapMarkers.clearLayers();
        mapTrios = [];
    }
}

/**
 * 
 * @param {integer} lat
 * @param {integer} lng
 * @returns {undefined}
 */
function setCenterToLocation (lat, lng) 
{
    map.panTo( L.latLng(lat, lng) );
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
