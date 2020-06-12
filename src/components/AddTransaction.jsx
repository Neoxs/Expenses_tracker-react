import React, { useState, useContext } from 'react'
import uniqid from 'uniqid'
import { GlobalContext } from '../context/GlobalState'


export const AddTransaction = () => {
    const [text, setText] = useState('')
    const [amount, setAmount] = useState(0)
    const [error, setError] = useState('intial')

    const { addTransaction } = useContext(GlobalContext)

    const onSubmit = e => {
        e.preventDefault()
        if(!error){
            const newTransaction = {
                id: uniqid(),
                text,
                amount: +amount
            }
            console.log(newTransaction)
    
            addTransaction(newTransaction)
        
        }
    }

    const handleChange = e => {
        if(e.target.value) {
            setError('')
        } else {
            e.target.type === "text" ? setError('text') : setError('amount')
        }

        e.target.type === "text" ? setText(e.target.value) : setAmount(e.target.value)
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" className={(error === 'both' || error === 'text') ? 'error' : ''} value={text} onChange={(e) => handleChange(e)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">
                        Amount <br />
                        (negative - expense, positive - income)
                    </label>
                    <input type="number" className={(error === 'both' || error === 'amount') ? 'error' : ''} value={amount} onChange={(e) => handleChange(e)} placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>    
        </>
    )
}
