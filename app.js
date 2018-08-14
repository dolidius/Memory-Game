const cards = document.querySelectorAll('.card');
const github = document.querySelector('.github');

let isFlipped = false;
let firstCard, secondCard;
let lockBoard = false;

cards.forEach(card => card.addEventListener('click', memory));


function memory(){
    if(lockBoard)return;

    if(firstCard === this)return;

    this.childNodes[1].style.transform = "rotateY(-180deg)";
    this.childNodes[3].style.transform = "rotateY(0)";

    if(!isFlipped){
        firstCard = this;
        isFlipped = true;
        return;
    }

    secondCard = this;
    if(firstCard.dataset.name === secondCard.dataset.name){
        if(firstCard.dataset.name === "github"){
            github.style.visibility = "visible";
            github.style.opacity = "1";
        }
        firstCard.removeEventListener('click', memory);
        secondCard.removeEventListener('click', memory);
        reset();
    }else{
        lockBoard = true;
        setTimeout(()=> {
            firstCard.childNodes[1].style.transform = "rotateY(0)";
            firstCard.childNodes[3].style.transform = "rotateY(-180deg)";
            secondCard.childNodes[1].style.transform = "rotateY(0)";
            secondCard.childNodes[3].style.transform = "rotateY(-180deg)";
            reset();
        },1200);
       
    }
    
}

function reset(){
    [isFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function changeOrder(){
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random() * 18);
        card.style.order = randomNum;
    });
}());