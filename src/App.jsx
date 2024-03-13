import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import './App.css'
import Dice from './components/Dice'


function App() {
  const [numbers, setNumbers] = useState(random())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRoll] = useState(0)
  const [maxScore , setMaxScore] = useState(JSON.parse(localStorage.getItem("MaxScore")||0))
  useEffect(() => {
    if (numbers.every(number => number.isHeld == true) && numbers.every(number => numbers[0].value == number.value)) {
      setTenzies(true)
      if(rolls<maxScore||maxScore==0){
        setMaxScore(rolls);
        
        localStorage.setItem("MaxScore",JSON.stringify(rolls))
      }
    }
  }, [numbers])

  const dices = numbers.map((number) => <Dice key={number.id} index={number.id} value={number.value} isHeld={number.isHeld} toggle={toggle} />)

  function generateNew() {
    return Math.ceil(Math.random() * 6)
  }
  function random() {
    let throws = []
    for (let i = 0; i < 10; i++) {
      throws.push({ id: i, value: generateNew(), isHeld: false })
    }
    return throws
  }
  function toggle(key) {
    setNumbers(prevNumbers => prevNumbers.map((number, index) => {
      if (index == key) return { ...number, isHeld: !number.isHeld }
      else return number
    }))
  }
  function roll() {
    const interval = setInterval(()=>
    setNumbers(numbers => numbers.map((number) => {
      if (number.isHeld === true) {
        return number
      }
      else {
        return { ...number, value: generateNew() }
      }
    }),10) )
    setTimeout(()=>clearInterval(interval),500)
    setRoll(prevRoll => prevRoll + 1)

  }
  function reset() {
    setTenzies(false)
    setNumbers(random)
    setRoll(0)
    console.log("Reset")
  }
  return (
    <>
      <div className='container'>
        {tenzies && <Confetti />}
        <div className='container-box'>
          <h1 style={{ "fontWeight": "700" }}>Tenzies</h1>
          <h3 style={{ "fontWeight": "400", "textAlign": "center", "padding": "20px" }}>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
          <div className='dices'>{dices}</div>
          <div>
          <div>Max Score :{maxScore}</div>
          <div>Current Score :{rolls}</div>
          </div>
          <button className='roll' onClick={tenzies ? reset : roll}>{tenzies ? "Reset" : "Roll"}</button>
        </div>
      </div>
    </>
  )
}

export default App
