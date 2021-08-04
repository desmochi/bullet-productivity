
console.log('sketch start!');

var s = function (sketch){ //wrapper function creates the whole new p5 thing

    sketch.setup = function(){
        //console.log('sketch started!');
        document.body.style['userSelect'] = 'none';
        sketch.createCanvas(550, 550);
        sketch.colorMode(sketch.HSB, 360, 100, 100);
        sketch.backgroundColor = 95;
        //c.position(0,0);
        sketch.createCanvas(550, 550).style('pointer-events', 'none'); 
        // a particular graphic element is not the target of pointer events
        sketch.clear();
    }
    
    sketch.draw = function(){
        //background(0, 255, 0);
        sketch.stroke(0);
        sketch.strokeWeight(4);
        if (sketch.mouseIsPressed){
            sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
        }
        
        console.log('sketch looping!');
    }
};

var myp5 = new p5(s); //creates a new p5 thing
