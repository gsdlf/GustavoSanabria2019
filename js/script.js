var nThumbs=9;
var nombresThumbs = new Array('FOTOGRAFÍA','DISEÑO GRÁFICO','BANNERS','PROGRAMACIÓN','ILUSTRACIÓN','VÍDEO','ANIMACIÓN','ILUSTRACIÓN','PROGRAMACIÓN','ARTE','FOTOGRAFÍA','DISEÑO','ANIMACIÓN','PROGRAMACIÓN','ARTE','FOTOGRAFÍA');
var anchoPantalla,
	altoPantalla;
var anchoMovil=false;
var cuadricula;
var scrollMovil;
var altoThumbMovil='30vw'; //56vw
var altoThumbMovilActual=altoThumbMovil;
var menuAbierto=true;
var zoomMenu=false;

var submenu_0='<div id="item_0_0" class="item" style="transition-delay: 0.5s;" onclick="clickItem(0)"><div class="fotoitem"></div>';
	submenu_0+='<div class="descripcionitem"><p class="titularitem">LUZINTERRUPTUS</p><p class="subtitularitem">INSTALACIONES DE ARTE URBANO CON LUZ<BR>+</p></div></div>';

var submenu_1='<div id="item_0_0" class="item" style="transition-delay: 0.6s;" onclick="clickItem(1)"><div class="fotoitem"></div>';
	submenu_1+='<div class="descripcionitem"><p class="titularitem">LUZINTERRUPTUS</p><p class="subtitularitem">INSTALACIONES DE ARTE URBANO CON LUZ<BR>+</p></div></div>';

var submenu_2='<div id="item_0_0" class="item" style="transition-delay: 0.7s;" onclick="clickItem(2)"><div class="fotoitem"></div>';
	submenu_2+='<div class="descripcionitem"><p class="titularitem">LUZINTERRUPTUS</p><p class="subtitularitem">INSTALACIONES DE ARTE URBANO CON LUZ<BR>+</p></div></div>';

var submenu_3='<div id="item_0_0" class="item" style="transition-delay: 0.8s;" onclick="clickItem(3)"><div class="fotoitem"></div>';
	submenu_3+='<div class="descripcionitem"><p class="titularitem">LUZINTERRUPTUS</p><p class="subtitularitem">INSTALACIONES DE ARTE URBANO CON LUZ<BR>+</p></div></div>';

var submenu_mas='<div id="item_0_0" class="item" style="transition-delay: 0.9s;" onclick="clickItem(4)"><div class="masitem">+</div>';
	submenu_mas+='<div class="descripcionitem"><p class="titularitem">VER MÁS FOTOGRAFÍA</p><p class="subtitularitem"></p></div></div>';

function empezar(){
	cuadricula=Math.sqrt(nThumbs);
	crearThumbs();
	$('#x_cerrar').css('opacity','0');
	$('#x_cerrar').css('display','block');
	$('.item').css('opacity','0');
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
		$('.thumb').css('height',altoThumbMovilActual);
	}else{
		$('.thumb').css('width',100/cuadricula+'%');
		$('.thumb').css('height',100/cuadricula+'%');
	}

	//console.log($('#x_cerrar').height());

	//$('.contenido').css('height',($('#pagina').height()-$('#titulo_0').height())+'px');
	//$('.contenido').css('top',($('.xcerrar.brillo').height())+'7vw');
}
window.onresize = resize;

function crearThumbs(){
	for (var i=0; i<nThumbs; i++){
		//$("#pagina").append('<div id="thumb_'+i+'" class="thumb '+nombresThumbs[i]+'" onclick="clickThumb('+i+')" onmouseover="thumbMouseover('+i+');" onmouseout="thumbMouseout('+i+');"><div class="gradiente_blanco"></div><div id="titulo_'+i+'" class="titulo sombra">'+nombresThumbs[i]+'</div></div>');
		$("#pagina").append('<div id="thumb_'+i+'" class="thumb '+nombresThumbs[i]+'" onclick="clickThumb('+i+')"><div class="gradiente_blanco"></div><div id="titulo_'+i+'" class="titulo sombra">'+nombresThumbs[i]+'</div></div>');
	}
	$( ".thumb" ).each(function( index ) {
	  $(this).append('<div class="contenido">'+submenu_0+submenu_1+submenu_2+submenu_mas+'</div>');
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
	if (zoomMenu==false){
		if (anchoMovil==true){
			$('.thumb').css('height','95vh');
			altoThumbMovilActual='95vh';
			var posicionY=Math.round($('#thumb_'+n).offset().top/$('#thumb_'+n).height());
			//$('#pagina').css('top',(($('#pagina').height()*posicionY-$('#cabecera').outerHeight())*-1)+'px');
			scrollMovil=$("html, body").scrollTop();
			$("html, body").animate({ scrollTop: (($('#pagina').height()*posicionY)) }, 500);
			$('.thumb .item').css('opacity','1');
			$('.thumb .gradiente_blanco').css('opacity','0.7');
		}else{
			$('#pagina').css('width',(100*cuadricula)+'vw');
			$('#pagina').css('height',($('#pagina').height()*3)+'px');

			$('#contenedor').css('overflow','hidden');

			var y=$('#thumb_'+n).offset().top-$('#cabecera').outerHeight();
			var x=$('#thumb_'+n).offset().left;

			var posicionY=Math.round($('#thumb_'+n).offset().top/$('#thumb_'+n).height());
			var posicionX=Math.round($('#thumb_'+n).offset().left/$('#thumb_'+n).width());

			$('#pagina').css('top',(($('#pagina').height()*posicionY-$('#cabecera').outerHeight())*-1)+'px');
			$('#pagina').css('left',($('#pagina').width()*posicionX*-1)+'px');

			$('#thumb_'+n+' .item').css('opacity','1');
			$('#thumb_'+n+' .gradiente_blanco').css('opacity','0.7');
		}
		$('.contenido').css('opacity','1');
		$('.contenido').css('visibility','visible');

		$('#x_cerrar').css('display','block');
		$('#x_cerrar').css('opacity','1');
		
		zoomMenu=true;
	}
}

function cerrar(){
	if (anchoMovil==true){
		$('.thumb').css('height',altoThumbMovil);
		altoThumbMovilActual=altoThumbMovil;
		$("html, body").animate({ scrollTop: scrollMovil }, 500);
	}else{
		$('#pagina').css('width','100vw');
		$('#pagina').css('height','95vh');

		$('#contenedor').css('overflow','auto');

		$('#pagina').css('top','5vh');
		$('#pagina').css('left','0');		
	}

	$('.item').css('opacity','0');
	$('.contenido').css('opacity','0');

	$('.thumb .gradiente_blanco').css('opacity','0.3');

	$('#x_cerrar').css('opacity','0');

	setTimeout(function(){
		$('#x_cerrar').css('display','none');
		$('.contenido').css('visibility','hidden');
	},500);

	zoomMenu=false;
}

function menu(){
	console.log(menuAbierto,zoomMenu);
	if (menuAbierto==true){
		if (zoomMenu==true){
			cerrar();
			setTimeout(menu,500);
		}else{
			if (anchoMovil==true){
				$('#pagina').css('left',-anchoPantalla+'px');
			}else{
				$('#pagina').css('top',-altoPantalla+'px');
			}
			menuAbierto=false;
		}		
	}else{
		if (anchoMovil==true){
			$("html, body").animate({ scrollTop: 0 }, 500);
			$('#pagina').css('left','0');
		}else{
			$('#pagina').css('top','5vh');
		}
		menuAbierto=true;
	}
	
}

function clickItem(n){
	console.log("click item");
}

