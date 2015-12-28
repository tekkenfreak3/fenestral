var fenestral = {
    run: function() {alert("foo"); fenestral.canvas = document.getElementById("canvas");},
}

fenestral.tile = function(row, col, image){
    this.row = row;
    this.col = col;
    this.image = new Image(image);
}
