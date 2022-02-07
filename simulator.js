let Body;
let bodies = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    text('Hello World!', width/2, height/2);
    
    colorMode(HSB);
    
    Body = function(mass, x, y, colour) {
        this.m = mass;
        this.x = x || width/2;
        this.y = y || height/2;
        this.c = colour || color(random(360),1,1);
    };
    Body.prototype.draw = function() {
        
    };
}

function draw() {
    
}
