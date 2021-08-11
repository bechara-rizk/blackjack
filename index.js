

function randomNb(start,end){
    let nb=Math.random();
    nb*=(end+1);
    nb=Math.floor(nb);
    nb+=start;
    return nb;
}

function test(){
    console.log("test");
}

/* let hit=document.getElementById("hit");
hit.disabled=true; */