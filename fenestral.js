function Fenestral(){
    var thingy;
    var maptiles;
    var tileIdx = 0;
    this.setup = function()
    {
        thingy = new jaws.Sprite({image: "dinosphere.png", x: 0, y: 0});
        maptiles = new jaws.SpriteSheet({image: "tileset.png", frame_size: [16, 16], scale_image: 2});
    },
    this.update = function()
    {
        currentTile = new jaws.Sprite({image: maptiles.frames[tileIdx % maptiles.frames.length],
                                       x: 64, y: 64});
        tileIdx += 1;
    },
    
    this.draw = function()
    {
        jaws.clear();
        thingy.draw();
        currentTile.draw();
    }
}


