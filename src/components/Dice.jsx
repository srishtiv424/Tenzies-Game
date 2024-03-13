import React from 'react'

function Dice({ value, isHeld, toggle, index }) {
    let dice = {
        1: [[50, 50]],
        2: [
            [20, 20],
            [80, 80]
        ],
        3: [
            [20, 20],
            [50, 50],
            [80, 80]
        ],
        4: [
            [20, 20],
            [20, 80],
            [80, 20],
            [80, 80]
        ],
        5: [
            [20, 20],
            [20, 80],
            [50, 50],
            [80, 20],
            [80, 80]
        ],
        6: [
            [20, 20],
            [20, 80],
            [50, 20],
            [50, 80],
            [80, 20],
            [80, 80]
        ]
    }
    function createDice(){        
    return  dice[value].map((values,index)=>
         (   <div className='dots' key={index} style={{top:`${values[0]}%` , left:`${values[1]}%`}}></div>
    ));
    }

    return (
        <button className='box' onClick={() => toggle(index)} style={{ "backgroundColor": isHeld ? "#59E391" : "#FFFFFF" }}>
           <div className='box-c'>{createDice()}</div>
        </button>
    )
}

export default Dice