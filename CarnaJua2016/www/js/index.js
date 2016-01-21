var base_url = 'http://carnajua.bigeyessolution.com/';
// var base_url = 'http://192.168.0.3/';

var ga = false;
var showVotacao = false;
var onLine = false;
var watchID = false;
var watchTime = false;
var raio = 0;

var iddevice = false;
var hash_key = false;

function onDeviceReady () {
    onResume();
    
    ga = window.analytics;
    
    if (ga) {
        window.analytics.startTrackerWithId('UA-59363254-4');
    }
}


function setOnLine () { 
    onLine = true; 
}

function setOffLine () { 
    onLine = false; 
}

function onPause () {
    clearInterval(watchTime);
    
//    gaPlugin.exit(gaSuccessHandler, gaErrorHandler);
}

function onResume () {
    
//    gaPlugin = window.plugins.gaPlugin;
//
//    if (gaPlugin) {
//        gaPlugin.init(gaSuccessHandler, gaErrorHandler, "UA-59363254-4", 10); 
//    }    
}

function gaSuccessHandler () {}

function gaErrorHandler () {}

//function trackGA (page) {
//    if (gaPlugin) {
//        gaPlugin.trackPage( gaSuccessHandler, gaErrorHandler, page);
//    }
//}

function onLoad () {
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("pause", onPause, false);
	document.addEventListener("resume", onResume, false);
	document.addEventListener("online", setOnLine, false);
	document.addEventListener("offline", setOffLine, false);
        
        $('#formpromo').on ('submit', enviarTexto);



//    $(':mobile-pagecontainer').on ('pagecontainerbeforechange', function (event, ui) {
//        if (ui.toPage instanceof Object) {
//            trackGA(ui.toPage.attr('id'));
//        }
//    });

    $(':mobile-pagecontainer').on ('pagecontainerchange', function (event, ui) {
        if (ui.toPage instanceof Object) {
            page_id = ui.toPage.attr('id');
            
            if (ga) {
                window.analytics.trackView(page_id);
            }
            
            if (page_id == 'fpromocoes') {
                
                $('#fpromocoes input').val('');
                
                $('#celular').mask('(##)#0000-0000');
                
                
            }
        }
    });

}