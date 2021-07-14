img4 = "";
status = "";
object = [];
function preload() {
    img4 = loadImage("img4.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "STATUS: DETECTING OBJECTS";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img4, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    object = results;
}

function draw() {
    image(img4, 0, 0, 640, 420);
    if (status != "") {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "STATUS: OBJECT DETECTED";
            fill("white");
            noFill();
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 50, object[i].y + 50);
            stroke("white");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}