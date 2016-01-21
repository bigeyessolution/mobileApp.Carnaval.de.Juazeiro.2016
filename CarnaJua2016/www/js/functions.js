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

    console.log(JSON.stringify(dados));
    
    $.post(base_url + 'Promocao?securekey=XcQLOs84ZPRhq2te8nMWJMh7RA3wJgkwi08Xh4P6JubYmt2iGC', dados, function (result) {
        alert (JSON.stringify(result));
    });
}

function tempoArtista (idartista) {
    tartista = {
        1: (new Date(2016, 1, 19, 12, 0, 0, 0)).getTime(),
        //1: (new Date(2016, 1, 24, 12, 0, 0, 0)).getTime(),
        19: (new Date(2016, 1, 24, 12, 0, 0, 0)).getTime(),
        2: (new Date(2016, 1, 22, 12, 0, 0, 0)).getTime(),
        4: (new Date(2016, 1, 22, 12, 0, 0, 0)).getTime(),
        7: (new Date(2016, 1, 22, 12, 0, 0, 0)).getTime(),
        3: (new Date(2016, 1, 23, 12, 0, 0, 0)).getTime(),
        5: (new Date(2016, 1, 23, 12, 0, 0, 0)).getTime()
    };
    
    
    tempo = t[idartista];
    agora = (new Date()).getTime();
    
    return agora <= tempo;
}