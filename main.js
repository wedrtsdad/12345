s_P= window.webkitSpeechRecognition;
speak123= new s_P();
speak_data="";
diff=0;
rwx=0;
lwx=0;
ny=0;
nx=0;
 
function setup(){
    canvas= createCanvas(700,530);
    canvas.position(750,220);
    video= createCapture(VIDEO);
    video.size(700,700);
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',pose1);
    }

    function modelLoaded() {
        console.log("modelLoaded");
    }
    

    function start(){
        speak123.start();
    }
    
    speak123.onresult= function(event) {
        console.log(event);
    
        content= event.results[0][0].transcript;

        x= Math.floor((Math.random()*900));
        y= Math.floor((Math.random()*600));
    }

    function pose1(results) {
        if (results.length > 0) {
            console.log(results);
            nx= results[0].pose.nose.x;
            ny= results[0].pose.nose.y;
            lwx= results[0].pose.leftWrist.x;
            rwx= results[0].pose.rightWrist.x;
            diff= Math.floor(Math.round(lwx - rwx));
        }
        speak();
    }

    function speak(){
        speak_data=content;
    
        var synth = window.speechSynthesis;
    
        var utterThis = new SpeechSynthesisUtterance(speak_data);
    
        synth.speak(utterThis);
    
        speak_data="";
    }

    function draw() {
        background("white");
        text(speak_data,x,y);
    }