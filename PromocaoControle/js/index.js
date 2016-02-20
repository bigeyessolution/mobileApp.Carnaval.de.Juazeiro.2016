var watchId = false;
var base_url = 'http://carnajua.bigeyessolution.com/';

$(function () {
//	watchId = setInterval(function () {
//		pegarVotosMomo ();
//		pegarVotosRainha();
//	}, 3000);

    $('#tbinscritos').dynatable({
        dataset: {
            defaultColumnIdStyle: 'trimDash',
            ajax: true,
            ajaxUrl: base_url + 'PromocaoControle?securekey=XcQLOs84ZPRhq2te8nMWJMh7RA3wJgkwi08Xh4P6JubYmt2iGC',
            ajaxOnLoad: true,
            records: []
        }
    });

});


function pegarVotosMomo () {
    $.getJSON(base_url + 'VotacaoMomo', function (data) {

        votosMomo = data.content;

        $.each(data.content, function(index, candidato) {
        	$('#voto_momo_' + candidato.idmomo).html(candidato.votos);
        });
    });
}

function pegarVotosRainha () {
    $.getJSON(base_url + 'VotacaoRainha', function (data) {
        votacao = data.votacao;
        localStorage.setItem('votacao', votacao);

        votosRainha = data.content;

        ordem = 0;

        function popularRainhas (index, rainha) {
        	id = rainha.idrainha;
        	votos = rainha.votos;

        	ordem++;

        	ordem_id = '#r' + ordem + ' ';

        	$(ordem_id + 'img').attr('src', 'img/rainha_0' + rainha.idrainha  + '_mini.jpg');
        	$(ordem_id + '.ui-li-count').html(rainha.votos);
        }

        $.each(data.content, popularRainhas);

//        console.log(JSON.stringify(data));
    });
}
