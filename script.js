//btn defin
const homeBtn = document.getElementById('home_btn')
const makeQuizBtn = document.getElementById('make_your_quiz')
const tryQuizBtn = document.getElementById('try_your_quiz')
const historyBtn = document.getElementById('check_history')

const submitQuizBtn = document.querySelector('.submit-btn')

let currentQuiz = null;
const allQuizzes = [];

//let deleteBtn = document.querySelector('.delete-btn')
const submitBtn = document.querySelector('.question-btn')
const addBtn = document.querySelector('.add-btn')
//section for innerHTML
const questionListSec = document.getElementById('question_list')

const quizListDiv = document.getElementById('quiz_list')
const quizesDiv = document.getElementById('quizes')

//initialize
displaySection("home_page")

//displayment
function displaySection(sectionId) {
  document.querySelectorAll('main section').forEach(section => {
    section.style.display = 'none'
  })

  document.getElementById(sectionId).style.display = 'flex'
}

//check if question is empty
const hasEmptyField = (data) => {
  return data.some(item =>
  item.question === "" || item.answer === ""
)}

//get num of question
const getNum = () => {
  const questionNum = document.querySelectorAll('.question-item').length
  //console.log("question num was", questionNum)
  return questionNum
}

//page switch
makeQuizBtn.addEventListener('click', () => {
  displaySection("customize_questions")
  questionListSec.innerHTML = ''
  questionListSec.insertAdjacentHTML(
    'beforeend',
    `
    <div class="question-item">
      <textarea class="question-box" placeholder="Enter your question..."></textarea>
      <textarea class="answer-box" placeholder="Enter your answer..."></textarea>
      <button class="delete-btn">Delete a question</button>
    </div>
    `)
})

homeBtn.addEventListener('click', () => {displaySection("home_page")})

tryQuizBtn.addEventListener('click', () => {
  displaySection("try_quiz")
  quizListDiv.style.display = 'flex'
  quizesDiv.style.display = 'none'
  submitQuizBtn.style.display = 'none'
})

//add a question
addBtn.addEventListener('click', () => {
  questionListSec.insertAdjacentHTML(
    'beforeend',
    `
    <div class="question-item">
      <textarea class="question-box" placeholder="Enter your question..."></textarea>
      <textarea class="answer-box" placeholder="Enter your answer..."></textarea>
      <button class="delete-btn">Delete a question</button>
    </div>
    `
  )
  //console.log("question num is", getNum())
})

//delete a question
questionListSec.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    if ((getNum() - 1) === 0) {
    alert("The quiz cannot be empty.")
    return
  }
    e.target.parentElement.remove()
    console.log("question num is", getNum())
  }
})

//collect question info
const collectQuiz = () => {
  const quizData = Array.from(document.querySelectorAll('.question-item')).map(item => ({
    question: item.querySelector('.question-box').value,
    answer: item.querySelector('.answer-box').value,
  }))

  return quizData
}

//submit a quiz
submitBtn.addEventListener('click', () => {
  const quizData = collectQuiz()
  //check if data is empty
  if (hasEmptyField(quizData)) {
    alert("Questions and answers cannot be empty.")
    return
  }

  const quizName = prompt("Please enter a title for your quiz:")
  //check if title is empty
  if (quizName === null) {
    console.log("User cancelled")
    return
  }
  if (quizName.trim() === "") {
    alert("Quiz title cannot be empty.")
    return
  }

  const quiz = {quizName, quizData}
  console.log(quiz)
  //add title to sec2
  quizListDiv.innerHTML += `<button class="quiz-title">${quizName}</button>`
  
  const safeId = quizName.replaceAll(' ', '_')
  quizesDiv.innerHTML +=
  `
  <p class="title">${quizName}</p>
  <div class="quiz" id="is_id_${safeId}">
    ${getCodeFor(quiz)}
  </div>
  `

  allQuizzes.push(quiz);
  return quiz
})

submitQuizBtn.addEventListener('click', () => {
  const answers = document.querySelectorAll('.answer')

  answers.forEach((box, i) => {

        const userAnswer = box.value;
        const question = box.previousElementSibling;

        const correctAnswer =
            currentQuiz.quizData[i].answer;

        console.log(
            userAnswer,
            correctAnswer,
            userAnswer === correctAnswer
        );

        if (userAnswer === correctAnswer) {
          question.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
        } else {
          question.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
        }
    });
})

//when quiz is chosen
quizListDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('quiz-title')) {
    const quizTitle = e.target.textContent
    quizListDiv.style.display = 'none'
    console.log(quizTitle)
    const safeId = quizTitle.replaceAll(' ', '_')
    quizesDiv.style.display = 'flex'
    document.getElementById(`is_id_${safeId}`).style.display = 'flex'
    submitQuizBtn.style.display = 'flex'
    currentQuiz = allQuizzes.find(
            q => q.quizName === quizTitle
        );
  }
})


//function
function getCodeFor(quiz) {
    const quizName = quiz.quizName
    const quizData = quiz.quizData
    const safeNameId = quizName.replaceAll(' ', '_')
    
    console.log(quizData)
    
    const quizLength = quizData.length
    console.log(quizLength)
    
    let codes = ''
    for (let i = 0; i < quizLength; i++) {
        const question = quizData[i].question
        const answer = quizData[i].answer
        console.log(question, answer)
        codes += `
        <div class="oneQuestion">
        <p class="question" >${question}</p>
        <textarea class="answer" id="answer${i}_for_${safeNameId}" placeholder="Enter your answer..."></textarea>
        </div>
        `
    }
    
    //console.log(codes)
    return codes
}
