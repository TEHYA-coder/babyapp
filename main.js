status = "" ;
objects = [];
sound = "";

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
   
}

function preload() {
    sound = loadSound("music2.mp3");
}

function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
}

function gotResult(error, result) {
   if(error)
   {
    console.log(error);
   }

   console.log(result);
   objects = result;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        objectDetector.detect(video, gotResult)
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("#FF0000");
            text(objects[i].label , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

            if(objects[i].label == "person")
            {
                document.getElementById("no_of_objects").innerHTML = "Baby Found"
                sound.stop();
            }

        else{
             document.getElementById("no_of_objects").innerHTML = "Baby Not Found"
             sound.play();
            }


        }
        if(objects.length == 0)
        {
            document.getElementById("no_of_objects").innerHTML = "Baby Not Found"
                sound.play();
        }
    }


}