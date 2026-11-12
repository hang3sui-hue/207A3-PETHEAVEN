import { useState } from 'react'
import { Link } from 'react-router-dom'
import { quizQuestions } from '../data/careTips'

// "Are you ready to adopt?" – an interactive quiz, one question at a time.
export default function ReadinessQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])

  const finished = step === quizQuestions.length

  function choose(option) {
    setAnswers([...answers, option])
    setStep(step + 1)
  }

  function restart() {
    setAnswers([])
    setStep(0)
  }

  if (finished) {
    const total = (key) => answers.reduce((sum, a) => sum + a[key], 0)
    const ready = total('ready')
    const pet = total('dog') > total('cat') ? 'Dog' : 'Cat'
    const maxReady = quizQuestions.length * 2
    const percent = Math.round((ready / maxReady) * 100)

    let message
    if (ready >= 8) message = `You look ready to adopt! Based on your answers, a ${pet.toLowerCase()} could fit your life very well.`
    else if (ready >= 5) message = `You are nearly ready. Read the tips on this page and talk with your family first. A ${pet.toLowerCase()} may suit you.`
    else message = 'Maybe not right now – and that is OK! You can still help as a volunteer or a supporter.'

    return (
      <div className="quiz-card quiz-result">
        <p className="eyebrow">Your result</p>
        <div className="meter" role="img" aria-label={`Readiness ${percent} percent`}>
          <span style={{ width: `${percent}%` }} />
        </div>
        <p className="quiz-score">{percent}% ready</p>
        <p>{message}</p>
        <div className="success-actions">
          {ready >= 5 ? (
            <Link to={`/pets?species=${pet}`} className="btn btn-primary">
              See {pet.toLowerCase()}s for adoption
            </Link>
          ) : (
            <Link to="/signup" className="btn btn-primary">
              Become a supporter
            </Link>
          )}
          <button className="btn btn-outline" onClick={restart}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  const q = quizQuestions[step]
  return (
    <div className="quiz-card">
      <div className="quiz-progress" aria-hidden="true">
        {quizQuestions.map((_, i) => (
          <span key={i} className={i < step ? 'done' : i === step ? 'current' : ''} />
        ))}
      </div>
      <p className="eyebrow">
        Question {step + 1} of {quizQuestions.length}
      </p>
      <h3 key={step} className="quiz-question">
        {q.question}
      </h3>
      <div className="quiz-options">
        {q.options.map((option) => (
          <button key={option.text} className="quiz-option" onClick={() => choose(option)}>
            {option.text}
          </button>
        ))}
      </div>
      {step > 0 && (
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => {
            setAnswers(answers.slice(0, -1))
            setStep(step - 1)
          }}
        >
          ← Back
        </button>
      )}
    </div>
  )
}
