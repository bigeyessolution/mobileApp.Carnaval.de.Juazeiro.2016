function goartista(idartista) {
    $('#fpromocoes #imgartista').attr('src', 'img/' + idartista + '.jpg');
    $('#fpromocoes #idartista').val(idartista);
    
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#fpromocoes" );
}

function enviarTexto () {
    dados = {
        "idartista": $('#idartista').val(),
        "nome": $('#nome').val(),
        "celular": parseInt($('#celular').val()),
        "texto": $('#texto').val()
    };
    
    $.post(base_url + 'Promocao?securekey=XcQLOs84ZPRhq2te8nMWJMh7RA3wJgkwi08Xh4P6JubYmt2iGC', dados, function (result) {
        alert (JSON.stringify(result));
    });
}