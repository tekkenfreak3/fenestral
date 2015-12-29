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


    // Just a rock paper scissors for now. sword beats axe, axe beats spear, spear
    // beats sword.
    // Functions are just markers, maybe add stuff later
    var swordsman = 0;
    var spearman = 1;
    var axeman = 2;
    function cFighter(type)
    {
        
        this.type = type;
        
        function fight(other)
        {
            switch (this.type)
            {
                case swordsman:
                if (other.components.fighter.type == this.type
                    || other.components.fighter.type ==  axeman)
                    return this;
                else
                    return other;
                break;

                case axeman:
                if (other.components.fighter.type == axeman
                   || other.components.fighter.type == spearman)
                    return this;
                else
                    return other;
                break;
                
                case spearman:
                if (other.components.fighter.type == spearman
                   || other.components.fighter.type == swordsman)
                    return this;
                else
                    return other;
                break;
            }
        }
    }
    
    function cHp(maxHP){
        this.maxHP = maxHP;
        this.currentHP = maxHP;
        var rectangleWidth = 200;
       
        function damage(damage){
            currentHP = currentHP - damage;
        }
       
        this.draw = function(){
            var drawWidth = currentHP / maxHP * rectangleWidth;
            var ctx = jaws.context;
            ctx.fillStyle="00ff00";
            ctx.fillRect(20, 20, drawWidth, 50);
           
            ctx.rect(20,20,rectangleWidth, 50);
            ctx.stroke();
        }
       
    };
}


