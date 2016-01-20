function verificarVotacaoMomo () {
    $.getJSON(base_url + 'VotacaoMomo', function (data) {
        votacao = data.votacao;
        
        localStorage.setItem('votacao', votacao);
        
        votosMomo = data.content;
        
        localStorage.setItem('votosMomo', JSON.stringify(votosMomo));
        
        updateVotosMomo();
        
//        console.log(JSON.stringify(data));
    });
}

function verificarVotacaoRainha () {
    $.getJSON(base_url + 'VotacaoRainha', function (data) {
        votacao = data.votacao;
        localStorage.setItem('votacao', votacao);
        
        votosRainha = data.content;
        
        localStorage.setItem('votosRainha', JSON.stringify(votosMomo));
        
        updateVotosRainha();
                
//        console.log(JSON.stringify(data));
    });
}

function votarMomo (idmomo) {
    $.post(base_url + 'VotacaoMomo?securekey=XcQLOs84ZPRhq2te8nMWJMh7RA3wJgkwi08Xh4P6JubYmt2iGC', 
    {
      iddevice: localStorage.getItem('iddevice'),
      hash_key: localStorage.getItem('hash_key'),
      idmomo: idmomo
    }, 
    function (result) {
        // console.log (JSON.stringify(result));
        
        idmomo = result.content[0].idmomo;
        votosMomo = result.content;
        
        votouMomo = true;        
        localStorage.setItem('votouMomo', true);
        
        localStorage.setItem('votosMomo', JSON.stringify(votosMomo));
        
        updateVotosMomo();
        
        habilitarBotoesVotacao ();

        navigator.notification.confirm(
            'Voto para Rei Momo computado com sucesso!', 
            function () {}, '', ['OK']
        );
             
    }).fail(function () { 
        // console.log ('Falhou');
    });
}

function votarRainha (idrainha) {
    $.post(base_url + 'VotacaoRainha?securekey=XcQLOs84ZPRhq2te8nMWJMh7RA3wJgkwi08Xh4P6JubYmt2iGC', 
    {
      iddevice: localStorage.getItem('iddevice'),
      hash_key: localStorage.getItem('hash_key'),
      idrainha: idrainha
    }, 
    function (result) {
        idrainha = result.content[0].idmomo;
        votosRainha = result.content;
        
        votouRainha = true;        
        localStorage.setItem('votouRainha', true);
        
        localStorage.setItem('votosRainha', JSON.stringify(votosRainha));
        
        updateVotosRainha();
        
        habilitarBotoesVotacao ();

        
        navigator.notification.confirm(
            'Voto para Rainha do Carnaval computado com sucesso!', 
            function () {}, '', ['OK']
        );
        
//        console.log (JSON.stringify(result));
    });
}