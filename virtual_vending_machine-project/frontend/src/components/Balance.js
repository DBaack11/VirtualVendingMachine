import React from 'react'

export default function Balance({ balance, childSetBalance }) {

    // Arrow function 'replenishFunds' used to reset the value of the balance
    // in the parent component VendingMachine
    const replenishFunds = () => {
        childSetBalance(4)
    }

    return (
        <div className='BalanceContainer'>
            <div className='Balance'>
                <h2>Available Balance</h2>
                <hr />
                {balance === 0 ? <p className='no-money'>${balance.toFixed(2)}</p>
                    : <p className='balance-amount'>${balance.toFixed(2)}</p>}
                <button className='replenish-button' onClick={replenishFunds}>Replenish Funds</button>
            </div>
        </div>
    )
}
