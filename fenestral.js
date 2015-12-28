function Fenestral(){
    var thingy;
    this.setup = function() {thingy = new jaws.Sprite({image: "dinosphere.png", x: 0, y: 0});},
    this.draw = function() { jaws.clear(); thingy.draw();}
}


