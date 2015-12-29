function Fenestral(){
    var maptiles;
    var thingy;
    var tileIdx = 0;
    this.setup = function()
    {
        this.thingy = createObject({components: {position: new cPosition(0, 0), drawable: new cDrawable("dinosphere.png"), hp: new cHp(100)}});
        thingy = this.thingy;
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
        var rectangleWidth = 32;
       
        this.damage = function(damage){
            this.currentHP = this.currentHP - damage;
        }
       
        this.draw = function(){
        	var hpPercent = this.currentHP / maxHP;
            var drawWidth =  hpPercent * rectangleWidth;
            var ctx = jaws.context;
            
            if(hpPercent >= .75)
            	ctx.fillStyle="#00ff00";
            else if(hpPercent >= .50)
            	ctx.fillStyle="yellow";
            else if(hpPercent >= .25)
            	ctx.fillStyle="orange";
            else 
            	ctx.fillStyle="red";
            
            ctx.fillRect(0, 200, drawWidth, 50);
           
            ctx.fillStyle="red";
            ctx.lineWidth="4";
            ctx.rect(0,200,rectangleWidth, 50);
            ctx.stroke();
        }
       
    };
}


