const bestOfSelect = document.querySelector('#bestOf'); //Selecting the bestOf input(dropdown)
const matchCode = document.querySelector('.match').innerHTML;//Copying the code of match
const resetButton= document.querySelector('#reset');
const playTo = document.querySelector('#playTo');
let matches = document.querySelectorAll('.match');
let numberMatches=0;
let max=5;

const player1 = {
    Name: prompt("Welcome!! Enter the First player's name!!"),
    score:0,
    display:matches[numberMatches].children[0].children[0].children[0],
    addButton: document.querySelector('#player1add'),
    wins:0
}
const player2 = {
    Name: prompt("Welcome!! Enter the Second player's name!!"),
    score:0,
    display:matches[numberMatches].children[0].children[0].children[1],
    addButton: document.querySelector('#player2add'),
    wins :0
}


bestOfSelect.addEventListener('change',()=>{
   
   const bestOf = parseInt(bestOfSelect.value);

   for (const match of matches) {
       match.remove();
   }

   for(let i=1; i<=bestOf;i++){
        const match  = document.createElement('div');
        match.innerHTML = matchCode;
        match.classList.add('match', 'card', 'column', 'is-4');
        document.querySelector('#matchHolder').appendChild(match);
   }
   
   matches = document.querySelectorAll('.match');
   reset();
})


playTo.addEventListener('change',()=>{
    max=parseInt(playTo.value);
    reset();
    })



const input = ()=>{
    player1.display = matches[numberMatches].children[0].children[0].children[0];
    player2.display = matches[numberMatches].children[0].children[0].children[1];
}


const updateScore = (player , opponent )=>{
    player.score++;

    if (player.score == max-1 && opponent.score== max-1) {
        max++;
    }
   if(player.score===max){
       max=parseInt(playTo.value);
       player.display.classList.add("has-text-success");
       opponent.display.classList.add("has-text-danger");
       player.display.textContent = player.score;
       player.score=0;
       opponent.score=0;
       player.wins++;
       
       if (player.wins == Math.ceil(matches.length/2)) {
           numberMatches=matches.length-1;
         setTimeout(function(){
            alert(`${player.Name} WINS!!!!!`);
         },500)  ;
       }
       if(numberMatches===matches.length-1){
        player.addButton.disabled = true;
        opponent.addButton.disabled = true;
    }
    
    numberMatches++;
    if (numberMatches< matches.length) {
        input();
    }
      
    
   }
else{
     player.display.textContent = player.score;
}

}

const reset = ()=>{
    player1.wins=0;
    player2.wins=0;
   player1.score=0;
   player2.score=0;
   numberMatches=0;
   input();
   player1.addButton.disabled = false;
   player2.addButton.disabled = false;
  
       for (const match of matches) {
        match.children[0].children[0].children[0].textContent=player1.score;
        match.children[0].children[0].children[1].textContent=player2.score;
        match.children[0].children[0].children[0].classList.remove("has-text-success", "has-text-danger");
        match.children[0].children[0].children[1].classList.remove("has-text-danger","has-text-success");
   }
}


resetButton.addEventListener('click', reset);


player1.addButton.addEventListener('click',()=>{
        updateScore(player1,player2);
})

player2.addButton.addEventListener('click',()=>{
    updateScore(player2,player1);
    
      })


