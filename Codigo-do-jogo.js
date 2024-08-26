const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "CARACA, VOCÊ APRENDEU MESMO EM!"
      break
    case (performance >= 70):
      message = "Parabéns! Mandou bem"
      break
    case (performance >= 50):
      message = "Podia ter feito melhor! Mas acho que deu pra entender, né?"
      break
    default:
      message = "A NÃO GENTE, vamos ter que refazer!"
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Como deve ser o descarte adequado da bateria de um celular??",
    answers: [
      { text: "<Jogar na lixeira de casa, já que está perto>", correct: false },
      { text: "<Jogar no mato perto de casa>", correct: false },
      { text: "<Entregue a empresas competentes de reciclagem>", correct: true },
      { text: "<Guardar em casa, um dia pode ser util>", correct: false }
    ]
  },
  {
    question: "O que é lixo eletrônico?",
    answers: [
      { text: "Lixo como ventilador e televisão quebrada", correct: true },
      { text: "Lixo Radioativo>", correct: false },
      { text: "Lixo comum de casa", correct: false },
      { text: "Não é lixo, é so forma de", correct: false }
    ]
  },
  {
    question: "Porque é importante se livrar de lixo?",
    answers: [
      { text: "Só porque pedem", correct: false },
      { text: "Não é importante, na verdade", correct: false },
      { text: "Pela paz mundial", correct: false },
      { text: "Evitar a poluição do mundo", correct: true }
    ]
  },
  {
    question: "É verdade que poucas pessoas sabem sobre como reciclar o lixo eletrônico?",
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false }
    ]
  },
  {
    question: 'Quem é responsavél pela reciclagem do lixo eletrônico',
    answers: [
      { text: "Eu que vós falo", correct: false },
      { text: "Empresas legalizadas", correct: true },
      { text: "Seu vizinho", correct: false },
      { text: "TODO MUNDO", correct: false }
    ]
  },
  {
    question: "Como podemos criar um mundo mais saúdavel",
    answers: [
      { text: "Reciclando", correct: true },
      { text: "Tomando cuidado onde jogamos o lixo", correct: true },
      { text: "Perguntando onde jogar algo, em caso de duvida", correct: true },
      { text: "Orientando o amigo, a jogar o lixo no lugar certo", correct: true }
    ]
  },
  {
    question: "Quais desses é um lixo eletrônico",
    answers: [
      { text: "Casca de banana", correct: false },
      { text: "Pilha da TV", correct: true },
      { text: "Garrafa de plástico", correct: false },
      { text: "Papel", correct: false },
    ]
  },
]
