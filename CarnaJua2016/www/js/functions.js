function goartista(idartista) {
    $('#fpromocoes #imgartista').attr('src', 'img/' + idartista + '.jpg');
    $('#fpromocoes #idartista').value(idartista);
    
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#fpromocoes" );
}