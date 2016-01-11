function verificar_device () {
    iddevice = localStorage.getItem('iddevice');
    hash_key = localStorage.getItem('hash_key');
    
    votouMomo = localStorage.getItem('votouMomo');
    votouMomo = votouMomo == null ? false : (votouMomo == 'true' ? true : false);
    
    votosMomo = localStorage.getItem('votosMomo');
    votosMomo = votosMomo == null ? false : JSON.stringify(votosMomo);
    
    votouRainha = localStorage.getItem('votouRainha');
    votouRainha = votouRainha == null ? false : (votouRainha == 'true' ? true : false);
    
    votosRainha = localStorage.getItem('votosRainha');
    votosRainha = votosRainha == null ? false : JSON.stringify(votosRainha);
    
    votacao = localStorage.getItem('votacao');
    votacao = votacao == null ? false : (votacao == 'true' ? true : false);
    
    verificarVotacaoMomo();

    verificarVotacaoRainha();
    
    if (iddevice == null) {
        iddevice = false;
        hash_key = false;
    	
        cadastrarDevice();
        
    } 

    habilitarBotoesVotacao();
}

function cadastrarDevice () {

    $.post(base_url + 'Device?securekey=XcQLOs84ZPRhq2te8nMWJMh7RA3wJgkwi08Xh4P6JubYmt2iGC', 
    {
      uuid: device.uuid,
      serial: device.serial,
      model: device.model,
      version: device.version,
      platform: device.platform
    }, 
    function (result) {
        // console.log(JSON.stringify(result));
        
        iddevice = result.iddevice;
        localStorage.setItem('iddevice', iddevice);
        
        hash_key = result.hash_key;
        localStorage.setItem('hash_key', hash_key);

        localStorage.setItem('votouMomo', false);
        localStorage.setItem('votouRainha', false);

        votouMomo = false;
        votouRainha = false;
    }).done(function() {
        verificarVotacaoRainha();
        verificarVotacaoMomo();
    });
}

function habilitarBotoesVotacao () {
    votouMomo = localStorage.getItem('votouMomo');
    votouMomo = votouMomo == 'true' ? true : false;

    votacao = localStorage.getItem('votacao');
    votacao = votacao == 'true' ? true : false;
    
    if (!votouMomo && votacao) {
        $('#votacao_momo_1 .btn-resultado').hide();
        $('#votacao_momo_1 .btn-votar').show();
    } else {
        $('#votacao_momo_1 .btn-votar').hide();
        $('#votacao_momo_1 .btn-resultado').show();
    }
    
    if (!votouRainha && votacao) {
        $('#votacao_rainha_1 .btn-resultado').hide();
        $('#votacao_rainha_2 .btn-resultado').hide();
        $('#votacao_rainha_3 .btn-resultado').hide();
        
        $('#votacao_rainha_1 .btn-votar').show();
        $('#votacao_rainha_2 .btn-votar').show();
        $('#votacao_rainha_3 .btn-votar').show();
    } else {
        $('#votacao_rainha_1 .btn-votar').hide();
        $('#votacao_rainha_2 .btn-votar').hide();
        $('#votacao_rainha_3 .btn-votar').hide();
        
        $('#votacao_rainha_1 .btn-resultado').show();
        $('#votacao_rainha_2 .btn-resultado').show();
        $('#votacao_rainha_3 .btn-resultado').show();
    }
    
}


function verificacoes () {
    if (iddevice == false) {
        verificar_device();
    }
    
    if (votacao) {
        verificarVotacaoMomo();
    
        verificarVotacaoRainha();
        
        habilitarBotoesVotacao ();
    } else {
        clearInterval(watchTime);
    }
}

function updateVotosMomo () {
//    console.log(votouMomo);
    
    if (votosMomo) {
        $.each(votosMomo, function (index, momo) {
            $('#votacao_momo_' + momo.idmomo + ' .btn-resultado').html(momo.votos);
        });
    }
}

function updateVotosRainha () {
    if (votosRainha) {
        $.each(votosRainha, function (index, rainha) {
            $('#votacao_rainha_' + rainha.idrainha + ' .btn-resultado').html(rainha.votos);
        });
    }
}
