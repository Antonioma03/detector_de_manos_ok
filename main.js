opsion1="";
opsion2="";
Webcam.set({
width:360,
height:310,
image_format:'png',
png_quality:90
});
camara=document.getElementById("camara")
Webcam.attach('#camara');
function tomarfoto(){
    Webcam.snap(function(data_uri){
        document.getElementById("resultado").innerHTML='<img id="foto_tomada" src="'+data_uri+'"/>';
    });
}
clasificasion=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5U8BM-K-t/model.json',modelocargado);
function modelocargado(){
    console.log('modelo cargado');
}
function ablar(){
    var voz=window.speechSynthesis;
    bosobsion1="la primera prediccion es "+opsion1;
    bosobsion2="la segunda prediccion es "+opsion2;
    var vozfinal=new SpeechSynthesisUtterance(bosobsion1+bosobsion2);
    voz.speak(vozfinal);
}
function identificar(){
    foto=document.getElementById('foto_tomada');
    clasificasion.classify(foto,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("emosion1").innerHTML=results[0].label;
        document.getElementById("emosion2").innerHTML=results[1].label;
      opsion1=results[0].label; 
      opsion2=results[1].label;
      ablar();
      if(results[0].label=="victoria"){
          document.getElementById("salidaemoji1").innerHTML="&#9996";
      }
      if(results[0].label=="hola"){
        document.getElementById("salidaemoji1").innerHTML="&#9995";
    }
    if(results[0].label=="ok"){
        document.getElementById("salidaemoji1").innerHTML="&#128076";
    }
    if(results[1].label=="victoria"){
        document.getElementById("salidaemoji2").innerHTML="&#9996";
    }
    if(results[1].label=="hola"){
        document.getElementById("salidaemoji2").innerHTML="&#9995";
    }
    if(results[1].label=="ok"){
        document.getElementById("salidaemoji2").innerHTML="&#128076";
    }
    }
}