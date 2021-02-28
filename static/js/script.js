//Challenge 1: Age in days

function displayAge(){
    var birthYear = prompt('When were you born?');
    var ageInDays = (2020-birthYear)*365;

    var h1 = document.createElement('h1');  //creates a 'h1' element
    var node = document.createTextNode("you are "+ageInDays+" days old");   //creates the text.
    h1.setAttribute('id','h1'); //sets an 'id' attribute to 'h1' element
    h1.appendChild(node);   //appends the text node to 'h1' element
    document.getElementById("result").appendChild(h1); //appends the h1 element to the element with the specified id.
}

function reset(){
    document.getElementById('h1').remove(); //removes the element with the specified id
}

//Challenge 2: Image Generator
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('cat-gen');
    image.src = "https://www.jigsawexplorer.com/puzzles/subjects/basket-kittens-157x150.jpg";
    div.appendChild(image);

}

//Challenge 3: Rock,Paper,Scissor
function rpsInt(){
    return Math.floor(Math.random()*3); //returns a value between 0-2
}

function numToChoice(num){
    return ['rock','paper','scissor'][num]; //returns either rock,paper or scissor
}

function decideWinner(yourChoice,compChoice){
    var rpsData = {
        'rock':{'scissor':1,
                'rock':0.5,
                'paper':0},
        'paper':{'rock':1,
                'paper':0.5,
                'scissor':0},
        'scissor':{'paper':1,
                    'scissor':0.5,
                    'rock':0}
    };

    var yourScore = rpsData[yourChoice][compChoice];    //user's score 
    var compScore = rpsData[compChoice][yourChoice];    //computer's score

    return [yourScore,compScore];
}

function finalMessage([yourScore,compScore]){
    if(yourScore===0){
        return {'message':'You Lost!','color':'red'};
    }
    else if(yourScore===0.5){
        return {'message':'Tied!','color':'yellow'};
    }
    else{
        return {'message':'You Won!','color':'green'};
    }
}

function rpsFrontend(humanImgChoice,botImgChoice,finalMessage){
    var imgData = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissor':document.getElementById('scissor').src
    };

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    document.getElementById('div-1').innerHTML = "<img src='" + imgData[humanImgChoice] + "' style= 'box-shadow:0px 10px 50px blue;'>";
    document.getElementById('div-3').innerHTML = "<img src='" + imgData[botImgChoice] + "' style= 'box-shadow:0px 10px 50px red;'>";
    document.getElementById('div-2').innerHTML = "<h1 style= 'color:"+ finalMessage.color +"'>"+ finalMessage.message +"</h1>";

}

function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice,botChoice;
    humanChoice = yourChoice.id;    //user chooses
    botChoice = numToChoice(rpsInt()); // computer randomly chooses
    console.log('Computer choice:',botChoice);
    results = decideWinner(humanChoice,botChoice);
    console.log(results);
    message = finalMessage(results);
    console.log(message); 
    rpsFrontend(humanChoice,botChoice,message);
}

//Challenge 4: Change colors of all buttons
    var allButtons = document.getElementsByTagName('button');
    var copyAllButtons = [];
    for(let i=0;i<allButtons.length;i++){
        copyAllButtons.push(allButtons[i].classList[1]);
    }
    function buttoncolorChange(buttonColor){
        if(buttonColor.value === 'red'){
            buttonsRed();
        }
        else if(buttonColor.value === 'green'){
            buttonsGreen();
        }
        else if(buttonColor.value === 'reset'){
            buttonReset();
        }
        else{
            buttonsRandom();
        }
    }

    function buttonsRed(){
        for(let i=0;i < allButtons.length; i++){
            allButtons[i].classList.remove(allButtons[i].classList[1]); //removing the buttons color class
            allButtons[i].classList.add('btn-danger');
        }
    }

    function buttonsGreen(){
        for(let i=0;i < allButtons.length; i++){
            allButtons[i].classList.remove(allButtons[i].classList[1]); 
            allButtons[i].classList.add('btn-success');
        }
    }

    function buttonReset(){
        for(let i=0; i < allButtons.length; i++){
            allButtons[i].classList.remove(allButtons[i].classList[1]);
            allButtons[i].classList.add(copyAllButtons[i]);
        }
    }
    
    function buttonsRandom(){
        let colorChoices = ['btn-primary','btn-warning','btn-success','btn-danger'];
        for(let i=0; i < allButtons.length; i++){
            let num = Math.floor(Math.random()*4);
            allButtons[i].classList.remove(allButtons[i].classList[1]);
            allButtons[i].classList.add(colorChoices[num]);
        }
    }

//Challenge 5: BlackJack
let blackjackScore = {
    'you':{'scoreSpan':'#your-score','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-score','div':'#dealer-box','score':0},
    'card':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':1},
    'wins':0,
    'loss':0,
    'draw':0,
    'isStand':false,
    'turnsOver': false,
};

const YOU = blackjackScore['you'];
const DEALER = blackjackScore['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');  //adding sound to the click of hit button
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3'); 

document.querySelector("#hit").addEventListener('click',blackjackHit);  //querySelector is an alternative to onclick function

document.querySelector('#stand').addEventListener('click',blackjackStand);

document.querySelector('#deal').addEventListener('click',blackjackDeal);

function blackjackHit(){    //function of hit button
    if(blackjackScore['isStand'] === false){
        let card = randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
        console.log(YOU['score']);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackScore['card'][randomIndex];
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;    //getting the card image corresponding to the card that pops up after hit
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();    //playing the sound of the hit button
    }
}

function blackjackDeal(){   //the functions resets the table
    if(blackjackScore['turnsOver'] === true){
        blackjackScore['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');   //selecting all the images together. Holds an array
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for(let i=0; i<yourImages.length; i++){
        yourImages[i].remove();
        }

        for(let i=0; i<dealerImages.length; i++){
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-score').textContent = YOU['score'];
        document.querySelector('#dealer-score').textContent = DEALER['score'];
        document.querySelector('#your-score').style.color = 'white';
        document.querySelector('#dealer-score').style.color = 'white';

        document.querySelector('#final-result').textContent = "Let's Play!";
        document.querySelector('#final-result').style.color = "black";

        blackjackScore['turnsOver'] = false;
    } 
}

function updateScore(card,activePlayer){    //updating the score of the active player.
    activePlayer['score'] += blackjackScore['cardsMap'][card];
}

function showScore(activePlayer){   //shows the score at the front-end.
    if(activePlayer['score']<=21){
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = "Busted!";
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    
}

function sleep(ms){
    return new Promise(resolve =>setTimeout(resolve,ms));
}

async function blackjackStand(){
    blackjackScore['isStand'] = true;
    while(DEALER['score'] < 16 && blackjackScore['isStand'] === true){
        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackScore['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
    console.log(blackjackScore['turnsOver']);

}


function computeWinner(){   //deicides the winner
    let winner;

    if(YOU['score'] <= 21){
        //condition: higher score than dealer or when dealer busts but you're not busted
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            blackjackScore['wins']++;
            winner = YOU;
        }
        //condition: when dealer score is higher than yours
        else if(DEALER['score'] > YOU['score']){
            blackjackScore['loss']++;
            winner = DEALER;
        }
        //condition: dealer score and your score are same
        else if(YOU['score'] === DEALER['score']){
            blackjackScore['draw']++;
        }
    }
    //condition: when you're busted but dealer doesn't
    else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackScore['loss']++;
        winner = DEALER;
    }
    //condition: when your and dealer both get busted
    else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackScore['draw']++;
    }
    console.log(blackjackScore);
    return winner;
}

function showResult(winner){
    var message,messageColor;
    if(blackjackScore['turnsOver'] === true){
        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackScore['wins'];
            message = "You won!";
            messageColor = "green";
            winSound.play();
        }
        else if(winner === DEALER){
            document.querySelector('#loss').textContent = blackjackScore['loss'];
            message = "You lost!";
            messageColor = "red";
            lossSound.play();
        }
        else{
            document.querySelector('#draw').textContent = blackjackScore['draw'];
            message = 'You tied!';
            messageColor = 'blue';
        }
        document.querySelector('#final-result').textContent = message;
        document.querySelector('#final-result').style.color = messageColor;
    }
}