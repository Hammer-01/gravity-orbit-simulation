let Body;
let bodies = [];
let massRatio = 1;
let G = 6.674;

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    noStroke();
    colorMode(HSB);
    
    Body = function(mass, x, y, vx, vy, colour) {
        this.m = mass;
        this.x = x || width/2;
        this.y = y || height/2;
        
        this.vx = vx || 0;
        this.vy = vy || 0;
        this.ax = 0;
        this.ay = 0;
        
        this.c = colour || color(random(360), 100, 100);
    };
    Body.prototype.draw = function() {
        fill(this.c);
        circle(this.x, this.y, this.m/massRatio);
    };
    Body.prototype.update = function(bodies) {
        for (body of bodies) {
            if (body !== this) {
                // F = G * M * m / r^2
                let force = -G * this.m * body.m / sq(dist(this.x, this.y, body.x, body.y));
                let angle = atan2(body.y - this.y, body.x - this.x);
                // Update acc, vel, pos
                this.ax += force * cos(angle);
                this.ay += force * sin(angle);      
                this.vx += this.ax;
                this.vy += this.ay;
                this.x += this.vx;
                this.y += this.vy;
            }
        }
        this.draw();
    };
    
    bodies.push(new Body(100), new Body(75, 100, 100);
}

function draw() {
    background(255);
    for (body of bodies) {
        body.update(bodies);
    }
}
