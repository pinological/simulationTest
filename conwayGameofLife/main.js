function create2DGrid(col,row){
    return new Array(col).fill().map(()=>new Array(row).fill(0))
}

function randomGrid(grid){
    for(let i=0;i<grid[0].length;i++){
        for(let j=0;j<grid.length;j++){
            grid[i][j]= Math.floor(Math.random()*2)
        }
    }
}

function drawGrid(grid,resolution){
    for(let i=0;i<grid[0].length;i++){
        for(let j=0;j<grid.length;j++){
            if(grid[i][j]==1){
                fill(255)
                rect(i*resolution,j*resolution,resolution,resolution)
            }
        }
    }
}

function countNeb(grid,i,j){
    let count = 0;
    for(let x=-1;x<2;x++){
        for(let y=-1;y<2;y++){
            count += grid[i+x][j+y]
        }
    }
    return count - grid[i][j];
}

let resolution = 2;
let row , col;

let grid;
function setup(){
     createCanvas(400, 400);
     row = width/resolution , col = height/resolution;
     grid = create2DGrid(col,row)
     randomGrid(grid)
}


function draw(){
    background(0)
    
    //reset
    drawGrid(grid,resolution)

    let next = create2DGrid(col,row);

    for(let i=0;i<grid[0].length;i++){
        for(let j=0;j<grid.length;j++){
            if(i==0||i==col-1 || j==0||j==row-1){
                grid[i][j]=1
            }
            else{
                let count = countNeb(grid,i,j)
                let nowState = grid[i][j];
                if(count <2 || count>3){
                    next[i][j]=0
                }
                else if(nowState==0 && count==3){
                    next[i][j]=1
                }
                else{
                    next[i][j]=nowState
                }
            }
        }
    }
    
    grid = next;
}