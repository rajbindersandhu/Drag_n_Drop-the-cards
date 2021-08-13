
const cardArray = ['2C', '2D', '2H', '2S' , 
'3C', '3D', '3H', '3S', 
'4C', '4D', '4H', '4S', 
'5C', '5D', '5H', '5S', 
'6C', '6D', '6H', '6S', 
'7C', '7D', '7H', '7S', 
'8C', '8D', '8H', '8S', 
'9C', '9D', '9H', '9S', 
'10C', '10D', '10H', '10S',
'AC', 'AD', 'AH', 'AS',
'JC', 'JD', 'JH', 'JS', 
'KC', 'KD', 'KH', 'KS',
'QC', 'QD', 'QH', 'QS'];

const box =document.querySelector(".container");
const holder = document.querySelector(".card-holder");
const winnerBox = document.querySelector(".winner");
function checkBox(){  
    if(box.innerHTML.length == 104){    
        winnerBox.style.display = "block";
    }
}

function winnerDisplay(){
    displayCards();
    winnerBox.style.display = "none";
}

let x= document.querySelectorAll("div.card-holder > img");
x.forEach(function(hold){
    hold.addEventListener('dragenter', handleDragEnter);
    hold.addEventListener('dragleave', handleDragLeave);
    hold.addEventListener('dragover', handleDragOver);
    hold.addEventListener('drop', handleDrop);

});

function shuffle(lis){
    let newArray = [];
    let index = Math.floor(Math.random()*lis.length);
    for(let i=0;i<lis.length;i++){
        while(newArray.indexOf(index) != -1){
            index = Math.floor(Math.random()*lis.length) ; 
        };
        newArray.push(index);
    }
    return newArray;
};

let cards;
let cardNames ;
function displayCards(){
    cardNames = shuffle(cardArray)//cardArray.map(ele => ele);
    for(let i=0;i<cardArray.length;i++){
        //let index = Math.floor(Math.random()*cardNames.length);
        let imgBox = document.createElement("img");
        let divBox = document.createElement("div");
        divBox.className="divBox";
        imgBox .className = "img-box" ;
        imgBox.setAttribute("id",`${cardNames[i]}`);
        imgBox.setAttribute("draggable","true");
        imgBox.src=`images/${cardArray[cardNames[i]]}.jpg` ; 
        divBox.append(imgBox);
        box.append(divBox);
        //cardNames.splice(index,1);
    }
        cards = document.querySelectorAll(".img-box");
        cards.forEach(function(card){
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
     })
}
displayCards();


let dragSrcEl;
function handleDragStart(e){
    e.target.style.opacity = '0';
    dragSrcEl = e.target;
    
}

function handleDragEnd(e){
    if(dragSrcEl == undefined){
        e.target.style.opacity = '0';
    }
    else{
        e.target.style.opacity = '1';
    }
    
}
function handleDragEnter(e){
    e.target.classList.add("over");
}
function handleDragOver(e){
    e.preventDefault();
}
function handleDragLeave(e){
    e.target.classList.remove("over");
}
function handleDrop(e){
    e.stopPropagation();
    //console.log(dragSrcEl);
    if(/[C]/.test(dragSrcEl.src.split("/")[dragSrcEl.src.split("/").length - 1]) && /club/.test(e.target.src)){        
        dragSrcEl.remove();       
        dragSrcEl=undefined;
       //console.log("c");

    }
    else if(/[H]/.test(dragSrcEl.src.split("/")[dragSrcEl.src.split("/").length - 1]) && /heart/.test(e.target.src)){
        dragSrcEl.remove();
        dragSrcEl=undefined;
        //console.log("h");
       
    }    
    else if(/[D]/.test(dragSrcEl.src.split("/")[dragSrcEl.src.split("/").length - 1]) && /diamond/.test(e.target.src)){
        dragSrcEl.remove();
        dragSrcEl=undefined;
        //console.log("d");

    } 
    else if(/[S]/.test(dragSrcEl.src.split("/")[dragSrcEl.src.split("/").length - 1]) && /spade/.test(e.target.src)){
        dragSrcEl.remove();
        dragSrcEl=undefined;
       
        //console.log("s");
    } 
    e.target.classList.remove("over");
    checkBox();
}


