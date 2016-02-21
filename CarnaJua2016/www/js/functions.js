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
        "q9a": $("input:checkbox[name='q9a']").prop('checked') ? 1 : 0,
        "q9b": $("input:checkbox[name='q9b']").prop('checked') ? 1 : 0,
        "q9c": $("input:checkbox[name='q9c']").prop('checked') ? 1 : 0,
        "q9d": $("input:checkbox[name='q9d']").prop('checked') ? 1 : 0,
        "q10a": $("input:checkbox[name='q10a']").prop('checked') ? 1 : 0,
        "q10b": $("input:checkbox[name='q10b']").prop('checked') ? 1 : 0,
        "q10c": $("input:checkbox[name='q10c']").prop('checked') ? 1 : 0,
        "q10d": $("input:checkbox[name='q10d']").prop('checked') ? 1 : 0,
        "q11a": $("input:checkbox[name='q11a']").prop('checked') ? 1 : 0,
        "q11b": $("input:checkbox[name='q11b']").prop('checked') ? 1 : 0,
        "q11c": $("input:checkbox[name='q11c']").prop('checked') ? 1 : 0,
        "q11d": $("input:checkbox[name='q11d']").prop('checked') ? 1 : 0,
        "q11e": $("input:checkbox[name='q11e']").prop('checked') ? 1 : 0,
        "q11f": $("input:checkbox[name='q11f']").prop('checked') ? 1 : 0,
        "q11g": $("input:checkbox[name='q11g']").prop('checked') ? 1 : 0,
        "q11h": $("input:checkbox[name='q11h']").prop('checked') ? 1 : 0,
        "q11i": $("input:checkbox[name='q11i']").prop('checked') ? 1 : 0,
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