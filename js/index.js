console.log('hello');
const nextBtn = document.querySelector(".quiz__next")
const ansBtn = document.querySelector(".quiz__answer")
const quizQues = document.querySelector(".quiz__question h2")
const timer = document.querySelector("#time")

const quizMusic = new Audio("media/Kbc.mp3")

const API ='https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple'

let answer;
const initial = 30;

function quizQuestion (){
    fetch(`${API}`).then(response => response.json()).then(displayData);
}

displayData =(res)=>{
    let quiz = res.results[0].question;
    console.log(quiz);
    quizQues.innerHTML = quiz;
    quizMusic.play()

    console.log(res.results[0].correct_answer);
    answer = res.results[0].correct_answer;

}

startTimer = () =>{
    
}

window.onload = quizQuestion();


nextBtn.addEventListener('click', quizQuestion)
nextBtn.addEventListener('click', startTimer)

ansBtn.addEventListener('click', ()=>{
    alert(answer)
})
