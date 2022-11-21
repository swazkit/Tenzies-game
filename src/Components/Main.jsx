import Die from "./Die"
import React from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function Main() {

    const [dice, setDice] = React.useState(allNewDie())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstInstance = dice[0].value
        const allSameValue = dice.every(die => die.value === firstInstance )
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won", tenzies);
        }
    }, [dice])



    function allNewDie() {
        const dieHead = []
        for(let i = 0; i < 10; i++){
            dieHead.push({value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()})
        }
        return dieHead
    }

    function generateDie (){
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false, 
            id: nanoid()
        }
    }

    const dieElements = dice.map(die => (
        <Die 
            isHeld={die.isHeld} 
            value={die.value} 
            key={die.id} 
            diceHold={() => diceHold(die.id)} 
        />
    ))
    

    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld? die : generateDie()
            }))} else {
                setTenzies(false)
                setDice(allNewDie)
            }
    }

    function diceHold(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    

    return (
        <div className="game">
            {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="buttons">
                {dieElements}
            </div>
            <div onClick={rollDice} className="roll-button">{tenzies? "New Game" : "Roll"}</div>
        </div>
    )
}