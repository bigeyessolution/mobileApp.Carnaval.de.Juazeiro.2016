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
                iconSize: [25, 35],
                iconAnchor: [12, 35],
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
    
    $.post(
    base_url + 'Promocao?securekey=XcQLOs84ZPRhq2te8nMWJMh7RA3wJgkwi08Xh4P6JubYmt2iGC', 
    dados, 
    function (result) {
        navigator.notification.confirm(
            'Mensagem cadastrada com sucesso. Aguarde o resultado!', 
            function () {}, '', ['OK']
        );
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

function enviarPesquisa () {
    dados = {
        "q1": $("input:radio[name='q1']:checked").val(),
        "q2": $("input:radio[name='q2']:checked").val(),
        "q3": $("input:radio[name='q3']:checked").val(),
        "q4": $("input[name='q4']").val(),
        "q5": $("input:radio[name='q5']:checked").val(),
        "q6": $("input:radio[name='q6']:checked").val(),
        "q7": $("input:radio[name='q7']:checked").val(),
        "q8": $("input:radio[name='q8']:checked").val(),
        "q9a": $("input[name='q9a']").is(':checked'),
        "q9b": $("input[name='q9b']").is(':checked'),
        "q9c": $("input[name='q9c']").is(':checked'),
        "q9d": $("input[name='q9d']").is(':checked'),
        "q10a": $("input[name='q10a']").is(':checked'),
        "q10b": $("input[name='q10b']").is(':checked'),
        "q10c": $("input[name='q10c']").is(':checked'),
        "q10d": $("input[name='q10d']").is(':checked'),
        "q11a": $("input[name='q11a']").is(':checked'),
        "q11b": $("input[name='q11b']").is(':checked'),
        "q11c": $("input[name='q11c']").is(':checked'),
        "q11d": $("input[name='q11d']").is(':checked'),
        "q11e": $("input[name='q11e']").is(':checked'),
        "q11f": $("input[name='q11f']").is(':checked'),
        "q11g": $("input[name='q11g']").is(':checked'),
        "q11h": $("input[name='q11h']").is(':checked'),
        "q11i": $("input[name='q11i']").is(':checked'),
        "q12": $("input[name='q12']").val()
    };
    
    $.post(
        base_url + 'Pesquisa?securekey=XcQLOs84ZPRhq2te8nMWJMh7RA3wJgkwi08Xh4P6JubYmt2iGC', 
        dados, 
    function (result) {
        navigator.notification.confirm(
            'Respostas enviadas com sucesso!', 
            function () {}, '', ['OK']
        );
    }).fail(function () {
        navigator.notification.confirm('Ocorreu uma falha ao enviar suas respostas, tende novamente mais tarde!', function () {}, '', ['OK']);
    });
}