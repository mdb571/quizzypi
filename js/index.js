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
     quizMusic.play()
}

displayData =(res)=>{
    let quiz = res.results[0].question;
    console.log(quiz);
    quizQues.innerHTML = quiz;

    console.log(res.results[0].correct_answer);
    answer = res.results[0].correct_answer;

    startTimer();

}

startTimer = () =>{
    const x = setInterval(() => {
        time.innerHTML = Number(time.innerHTML) - 1;
    }, 1000)
    setTimeout(() => {
        clearInterval(x);
        // time.innerHTML = 30;
        // quizQuestion();
    }, 30 * 1000)
}

window.onload = quizQuestion();


nextBtn.addEventListener('click', quizQuestion)


ansBtn.addEventListener('click', ()=>{
    alert(answer)
})
