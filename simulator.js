let Body;
let bodies = [];
let showMassValue = false;
let maxMass = 10000; // temp number, will set to 0 later

function setup() {
    createCanvas(windowWidth, windowHeight);

    noStroke();
    colorMode(HSB);
    textAlign(CENTER, CENTER);
    
    Body = function(mass, fixed, x, y, vx, vy, colour) {
        this.m = mass;

        this.fixed = fixed;

        this.x = x || width/2;
        this.y = y || height/2;
        
        this.vx = vx || 0;
        this.vy = vy || 0;
        this.ax = 0;
        this.ay = 0;
        
        // may deprecate manually setting colour
        this.c = colour || color(180 - Math.log10(mass) * 180 / Math.log10(maxMass), 100, 100);
    };
    Body.prototype.draw = function() {
        fill(this.c);
        circle(this.x, this.y, 10 * Math.log10(this.m));
        if (showMassValue) {
            fill(0);
            text(this.m, this.x, this.y);
        }
    };
    Body.prototype.update = function(bodies) {
        if (!this.fixed) {
            for (let body of bodies) {
                if (body !== this) {
                    this.ax = this.ay = 0;
                    // F = G * M * m / r^2
                    let force = body.m / sq(dist(this.x, this.y, body.x, body.y));
                    let angle = atan2(body.y - this.y, body.x - this.x);
                    // Update acc and vel. will update pos later when every body has been processed
                    this.ax += force * cos(angle);
                    this.ay += force * sin(angle);
                    this.vx += this.ax;
                    this.vy += this.ay;
                    this.x += this.vx;
                    this.y += this.vy;
                }
            }
            for (let body of bodies) {
                if (body !== this) {
                    this.x += this.vx;
                    this.y += this.vy;
                }
            }
        }
        this.draw();
    };
    Body.prototype.updateColour = function(newBodyMass) { // keep or no?
        // this.c = 
    };
    
    bodies.push(new Body(10000, true), new Body(100, false, width/2, height/4, 5)); // temporary until gui option
}

function draw() {
    background(255);
    for (let body of bodies) {
        body.update(bodies);
        console.log(`m: ${body.m}, vx: ${body.vx}, vy: ${body.vy}`);
    }
}
