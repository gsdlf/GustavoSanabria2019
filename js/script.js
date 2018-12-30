var nThumbs=9;
var nombresThumbs = new Array('FOTOGRAFÍA','DISEÑO GRÁFICO','BANNERS','PROGRAMACIÓN','ILUSTRACIÓN','VÍDEO','ANIMACIÓN','ILUSTRACIÓN','PROGRAMACIÓN','ARTE','FOTOGRAFÍA','DISEÑO','ANIMACIÓN','PROGRAMACIÓN','ARTE','FOTOGRAFÍA');
var anchoPantalla,
	altoPantalla;
var anchoMovil=false;

function empezar(){
	crearThumbs();
};

function resize() {
	anchoPantalla=window.innerWidth;
	altoPantalla=window.innerHeight;

	if (anchoPantalla<480){
		anchoMovil=true;
	}else{
		anchoMovil=false;
	}

	if (anchoMovil==true){
		$('.thumb').css('width','100vw');
		$('.thumb').css('height','56vw');
	}else{
		var cuadricula=Math.sqrt(nThumbs);
		$('.thumb').css('width',100/cuadricula+'%');
		$('.thumb').css('height',100/cuadricula+'%');
	}

    /*if (window.innerWidth / window.innerHeight >= ratio) {
        var w = window.innerHeight * ratio;
        var h = window.innerHeight;
    } else {
        var w = window.innerWidth;
        var h = window.innerWidth / ratio;
    }
    renderer.view.style.width = w + 'px';
    renderer.view.style.height = h + 'px';

    escalaLienzo=h/size[1];

    var capaEmail=document.getElementById("pedirEmail");
    capaEmail.style.width=w+"px";

    document.getElementById("bocadillo").style.fontSize = (30 * escalaLienzo)+'px';
    document.getElementById("bocadillo").style.lineHeight = (26 * escalaLienzo)+'px';
    document.getElementById("textoPeque").style.fontSize = (19 * escalaLienzo)+'px';
    document.getElementById("enviarEmail").style.fontSize = (36 * escalaLienzo)+'px';
    document.getElementById("q1").style.fontSize = (19 * escalaLienzo)+'px';
    document.getElementById("aviso").style.fontSize = (19 * escalaLienzo)+'px';

    anchoStage=stage.width;
    setTimeout(function(){
    	anchoStage=stage.width;
    	//capaEmail.style.width=stage.width+"px";
    }, 500);*/
}
window.onresize = resize;

function crearThumbs(){
	for (var i=0; i<nThumbs; i++){
		$("#pagina").append('<div id="thumb_'+i+'" class="thumb '+nombresThumbs[i]+'"><div class="gradiente_blanco"></div><div id="titulo_'+i+'" class="titulo sombra">'+nombresThumbs[i]+'</div></div>');
	}
	$( ".thumb" ).each(function( index ) {
	  //console.log( index + ": " + $( this ).text() );
	  var texto=$( this ).text();
	  $(this).append('<div class="titulo brillo">'+texto+'</div>');
	  $(this).append('<div class="titulo">'+texto+'</div>');
	});
	crearSombra();
}

function crearSombra(){
	//sombra textos
	var shadowstring = '';

	for(var i=0; i<200; i++){
	    shadowstring += -i +'px '+i+'px rgba(0,0,50,1), ';
	}
	shadowstring = shadowstring.substr(0, shadowstring.length-2);

	//document.getElementById("titulo_1").setAttribute("style", "text-shadow: " + shadowstring);

	$('.sombra').attr('style', "text-shadow: " + shadowstring);

	resize();
}

