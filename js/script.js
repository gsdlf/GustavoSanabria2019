var nThumbs=9;
var nombresThumbs = new Array('FOTOGRAFÍA','DISEÑO GRÁFICO','BANNERS','PROGRAMACIÓN','ILUSTRACIÓN','VÍDEO','ANIMACIÓN','ILUSTRACIÓN','PROGRAMACIÓN','ARTE','FOTOGRAFÍA','DISEÑO','ANIMACIÓN','PROGRAMACIÓN','ARTE','FOTOGRAFÍA');
var anchoPantalla,
	altoPantalla;
var anchoMovil=false;
var cuadricula;

function empezar(){
	cuadricula=Math.sqrt(nThumbs);
	crearThumbs();
	$('#x_cerrar').css('opacity','0');
	$('#x_cerrar').css('display','block');
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
		$('.thumb').css('width',100/cuadricula+'%');
		$('.thumb').css('height',100/cuadricula+'%');
	}
}
window.onresize = resize;

function crearThumbs(){
	for (var i=0; i<nThumbs; i++){
		//$("#pagina").append('<div id="thumb_'+i+'" class="thumb '+nombresThumbs[i]+'" onclick="clickThumb('+i+')" onmouseover="thumbMouseover('+i+');" onmouseout="thumbMouseout('+i+');"><div class="gradiente_blanco"></div><div id="titulo_'+i+'" class="titulo sombra">'+nombresThumbs[i]+'</div></div>');
		$("#pagina").append('<div id="thumb_'+i+'" class="thumb '+nombresThumbs[i]+'" onclick="clickThumb('+i+')"><div class="gradiente_blanco"></div><div id="titulo_'+i+'" class="titulo sombra">'+nombresThumbs[i]+'</div></div>');
	}
	$( ".thumb" ).each(function( index ) {
	  //console.log( index + ": " + $( this ).text() );
	  var texto=$( '.titulo',this ).html();
	  $(this).append('<div class="titulo brillo">'+texto+'</div>');
	  $(this).append('<div class="titulo">'+texto+'</div>');
	});
	var textoX=$('.xcerrar').html();
	$('#x_cerrar').append('<div class="xcerrar brillo">'+textoX+'</div>');
	$('#x_cerrar').append('<div class="xcerrar">'+textoX+'</div>');
	crearSombra();
}

function crearSombra(){
	//sombra textos
	var shadowstring = '';
	var shadowstring2 = '';

	for(var i=0; i<10; i=i+0.1){
	    shadowstring += -i +'px '+i+'px rgba(0,0,50,1), ';
	    shadowstring2 += '0px '+i+'px rgba(0,0,50,1), ';
	}
	shadowstring = shadowstring.substr(0, shadowstring.length-2);
	shadowstring2 = shadowstring2.substr(0, shadowstring2.length-2);

	$('.sombra').attr('style', "text-shadow: " + shadowstring);
	$('.sombra45').attr('style', "text-shadow: " + shadowstring2);

	resize();
}

function clickThumb(n){
	$('#pagina').css('width',(100*cuadricula)+'vw');
	$('#pagina').css('height',($('#pagina').height()*3)+'px');

	$('#contenedor').css('overflow','hidden');

	var y=$('#thumb_'+n).offset().top-$('#cabecera').outerHeight();
	var x=$('#thumb_'+n).offset().left;

	var posicionY=Math.round($('#thumb_'+n).offset().top/$('#thumb_'+n).height());
	var posicionX=Math.round($('#thumb_'+n).offset().left/$('#thumb_'+n).width());

	$('#pagina').css('top',(($('#pagina').height()*posicionY-$('#cabecera').outerHeight())*-1)+'px');
	$('#pagina').css('left',($('#pagina').width()*posicionX*-1)+'px');

	$('#x_cerrar').css('display','block');
	$('#x_cerrar').css('opacity','1');
	//$('#x_cerrar').fadeIn(500);
}

/*function thumbMouseover(n){
	$('#thumb_'+n+' .gradiente_blanco').css('opacity','0.7');
}

function thumbMouseout(n){
	$('#thumb_'+n+' .gradiente_blanco').css('opacity','0.3');
}*/

function cerrar(){
	$('#pagina').css('width','');
	$('#pagina').css('height','');

	$('#contenedor').css('overflow','auto');

	$('#pagina').css('top','');
	$('#pagina').css('left','');

	$('#x_cerrar').css('opacity','0');

	setTimeout(function(){
		$('#x_cerrar').css('display','none');
	},500);
}

