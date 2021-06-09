const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Stefan spielt mit _____Bruder und _____ Schwester.",
        choice1: "seinen, seiner",
        choice2: 'seinem, seiner',
        choice3: 'seiner, seinem',
        choice4: 'seinem, seinen',
        answer: 2,
    },
    {
        question: "Armin gab _____ Freund das geliehene Geld wieder zurück.",
        choice1: "seines",
        choice2: "seinen",
        choice3: "seiner",
        choice4: "seinem",
        answer: 4,
    },
    {
        question: "Markus spielt gerne mit _____ alten Opa Schach auf _____ Küchentisch.",
        choice1: "dem, seinem",
        choice2: "dem, der",
        choice3: "seinem, der",
        choice4: "seinem, dem",
        answer: 4,
    },
    {
        question: "Harald versteckt_____ein wunderschönes Geschenk unter_____Tisch.",
        choice1: "mich, dem",
        choice2: "mir, dem",
        choice3: "mir, den",
        choice4: "mich, den",
        answer: 2,
    },
    {
        question: "Der alte Mann winkt seit Jahren_____   _____ Nachbarn zu.",
        choice1: "aller, netter",
        choice2: "allen, nettem",
        choice3: "allen, netten",
        choice4: "aller, nettem",
        answer: 3,
    },
    {
        question: "Hast du _____ _____ schon gesagt?",
        choice1: "das, ihr",
        choice2: "es, ihr",
        choice3: "das, ihre",
        choice4: "es, ihrem",
        answer: 2,
    },
    {
        question: "Susi gab _____ Mann ein süßes Bonbon aus der Tüte.",
        choice1: "Ihrem",
        choice2: "ihrem",
        choice3: "ihnen",
        choice4: "Ihnen",
        answer: 2,  
    },
    {
        question: "Möchtest du mit _____ _____ Kino gehen?",
        choice1: "uns, ins",
        choice2: "uns, im",
        choice3: "ihr, am",
        choice4: "ihr, im",
        answer: 1,
    },
    {
        question: "Meine Mutter verzeiht _____immer gleich.",
        choice1: "mich",
        choice2: "Mir",
        choice3: "Mich",
        choice4: "mir",
        answer: 4,
    },
    {
        question: "Sandra telefoniert mit _____ _____Handy ständig in der Arbeit.",
        choice1: "Dem, Neuen",
        choice2: "dem, neuer",
        choice3: "dem, neuen",
        choice4: "den, neuen ",
        answer: 3,
    },
    {
        question: "Im Urlaub schwimme ich mit _____ Freunden _____ Meer.",
        choice1: "meinen, im",
        choice2: "meiner, in",
        choice3: "meinen, in",
        choice4: "meiner, im",
        answer: 1,
    },
    {
        question: "Franz arbeitet mit _____ fleißigen Kellnern _____ Restaurant.",
        choice1: "Anderen, in",
        choice2: "Anderen, im",
        choice3: "anderen, in",
        choice4: "anderen, im",
        answer: 4,
    },
    {
        question: "Meine Tante ist mit _____ Onkel in _____Urlaub nach Australien gefahren.",
        choice1: "meines, den",
        choice2: "meiner, der",
        choice3: "meinen, den",
        choice4: "meinem, den",
        answer: 4,
    },
    {
        question: "Ich gehe mit _____ _____ Freund essen.",
        choice1: "einer, guten",
        choice2: "einem, guten",
        choice3: "eines, guten",
        choice4: "einen, guten",
        answer: 2,
    },
    {
        question: "Wir schenkten _____ eine tolle Reise nach Afrika.",
        choice1: "ihn",
        choice2: "ihm ",
        choice3: "ihrem",
        choice4: "ihnen",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
