var rows = [];
var col_n = 50;
var row_n = 50;

function setup(){
    createCanvas(500, 500);

    //frameRate(15);

    init_cells();
}

function draw(){
    background(0);

    noStroke();

    for(var i = 0, y = 0; i < row_n; i++, y += 5){
        for(var j = 0, x = 0; j < col_n; j++, x += 5){
            fill(rows[i][j] == 1 ? 255 : 0);
            rect(x, y, 5, 5);

            var cell = rows[i][j];
            var neighbours = get_neighbours(i, j);

            if(cell && (neighbours < 2 || neighbours > 3)){
                rows[i][j] = 0;
            } else if((cell && neighbours >= 2 && neighbours <= 3) || (!cell && neighbours == 3)){
                rows[i][j] = 1;
            } else{
                rows[j][i] = cell;
            }
        }
    }

    //update_cells();
}

function get_neighbours(r, c){
    neighbours = 0;

    //top and bottom
    for(var i = r - 1; i <= r + 1; i += 2){
        for(j = c - 1; j <= c + 1; j++){
            try{
                if(typeof rows[i][j] == "undefined") continue;
                neighbours += rows[i][j];
            } catch(e){
                //neighbour doesnt exist
            }
        }
    }

    //left
    if(c > 0) neighbours += rows[r][c - 1];

    //right
    if(c < col_n - 1) neighbours += rows[r][c + 1];

    return neighbours;
}


/* populates cells randomly */
function init_cells(){
    for(var i = 0; i < row_n; i++){
        var r = [];
        for(var j = 0; j < col_n; j++){
            r.push(random([0, 1]));
        }
        rows.push(r);
    }
}
