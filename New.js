//var oneParticle;
var particleSystem = [];
//var sound;
var attractors = [];
var bg;
var y=0;

//function preload(){
//    sound = loadSound('explosion.m4a')
//}


function setup() {
    rectMode(CENTER);
    bg = loadImage("../bg.png");

    y++;
  if (y > height) {
    y = 0;
  }
    
    
    var canvas = createCanvas(windowWidth,
                              windowHeight);

    frameRate(30);
    
    //colorMode(HSB,360,100,100,100);
    
    //var pos =  createVector(width/2, height/2);
    //var vel =  createVector(0, 5); //5 is speed
    //oneParticle = new Particle(pos, vel);
    
    
  colorMode(HSB,360,100,100,100);
    
   var at = new Attractor(createVector(width/2, height/2),5);
    attractors.push(at);
}

function draw() {
  
    background(bg);
    blendMode(SCREEN);
    
    for(var i=particleSystem.length-1; i>=0; i--){
        var p = particleSystem[i];
        
        if(p.areYouDeadYet()){
            particleSystem.splice(i,1);
            
        //if(particleSystem.length<300){createMightyParticles(p.getPos())}*/
        } else {//update and render the particle
        p.update();
        p.draw();
        
    }
    }
    if(mouseIsPressed){
        createMightyParticles();
    }
    
    attractors.forEach(function(at){
        at.draw();
    });
}


function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    attractors.forEach(function(a){
        a.pos.x = width/2;
        a.pos.y = height/2;
    });
}

 var Particle= function(pp,vv,hh){
    var pos= pp.copy();  //*add velocity to the position*/
    var vel = vv.copy(); 
    var acc = createVector(0,0.15);
    var psize = random(2,6);
     
    var initialLifeSpan = random (100,500);
    this.lifeSpan = initialLifeSpan;
    
    var hh = random(hh-10, hh+10);
     
    this.update = function(){
        
        this.lifeSpan--;//*this.lifeSpan = this.lifeSpan - 1;*/
        
        attractors.forEach(function(A){
          
            //var radius = 20;              
            var att = p5.Vector.sub(A.getPos(),pos);
            var distanceSq = att.magSq();
             if(distanceSq > 10){
                    //att.div(distanceSq);
                    //att.mult(2*A.getStrength());
                    //att.normalize();
                    att.div(20);
                    //if(att.mag() > 10){ att.normalize(); att.mult(4);}
                    acc.add(att);
              }
            
            });
    vel.add(acc);
    //vel.mult(0);
    var vvv = acc.rotate(HALF_PI);
       // vvv.normalize();
    //vvv.mult(100);
    vel.set(vvv.x, vvv.y);
        //vel.limit(3.5);

    
    pos.add(vel);

    acc.mult(0);
    //vel.limit(3.5);
        
    
}
       
     
    
    this.draw= function(){
            
        var transparency = map(this.lifeSpan,0,initialLifeSpan,0,80);
        stroke(hh,80,80);
        line(pos.x,pos.y,pos.x -0.5*vel.x, pos.y - 0.5*vel.y);
        noStroke();
        fill(hh,80,80,transparency);
        ellipse(pos.x, 
                pos.y,
                psize,
                psize);
        }
    
    this.areYouDeadYet = function(){
        return false;
        //return this.lifeSpan <= 0;
    }
    
    this.getPos = function(){
        return pos.copy();
    }}
    
 
    
   function createMightyParticles(initialPos){
    //sound.play();
     var pos; 
       if(!initialPos){
           //pos = createVector(mouseX/width, mouseY/height);
           pos = createVector(mouseX, mouseY);
        }else{
            pos = initialPos.copy();
        }
       
       
            
        var hue=random(50,65);
        var saturation = random(0,80);
       
       for(var i=0;i<1;i++){
            //pos = createVector(random(0, width), random(0, height));
            var vel = createVector(0,1);
            vel.rotate(random(0,TWO_PI));
            vel.mult(random(1,3));

            var newBorn = new Particle(pos, vel, hue);
            particleSystem.push(newBorn)
            
        }
}
    
var Attractor = function(pos, s){
    this.pos = pos.copy();
    var strength = s;
    this.draw = function (){
        noStroke ();
        fill(255,223,0);
        ellipse(this.pos.x, this.pos.y,
               strength, strength);
    }
this.getStrength = function(){
    return strength;
}
this.getPos = function(){
    //return createVector(percentage.x * width, pertentage.y* height);
    return this.pos.copy();
}

}
//function mouseClicked(){
//    createMightyParticles();
//}
//the mouseClicked function should be outside the particle

//*var particle = new Particle(myposition, my velocity);*/