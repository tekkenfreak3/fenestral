function Fenestral(){
    var thingy;
    var maptiles;
    var tileIdx = 0;
    this.setup = function()
    {
        thingy = createObject({components: {position: new cPosition(0, 0), drawable: new cDrawable("dinosphere.png")}});

        maptiles = new jaws.SpriteSheet({image: "tileset.png", frame_size: [16, 16], scale_image: 2});
    };
    
    this.update = function()
    {
        currentTile = new jaws.Sprite({image: maptiles.frames[tileIdx % maptiles.frames.length],
                                       x: 64, y: 64});
        tileIdx += 1;
    };
    
    this.draw = function()
    {
        jaws.clear();
        thingy.draw();
        currentTile.draw();
    };


    function createObject(o)
    {
        function componentDraw()
        {
            _.each(this.components, function(elm, idx, l)
                   { if (elm.draw) { elm.draw();} });
        };

        function componentClaim(o)
        {
            _.each(o.components, function(elm, idx, l)
                   { console.log("elm: " + elm); elm.owner = o });
        };
        
        var ret = o;

        componentClaim(ret);
        ret.draw = _.bind(componentDraw, ret);
        return ret;
    };
    
    function cPosition(x, y)
    {
        this.x = x;
        this.y = y;
    };

    function cDrawable(sprite)
    {
        this.sprite = new jaws.Sprite({image: sprite});

        this.draw = function()
        {
            this.sprite.x = this.owner.components.position.x;
            this.sprite.y = this.owner.components.position.y;
            this.sprite.draw();
        }
    };
}


