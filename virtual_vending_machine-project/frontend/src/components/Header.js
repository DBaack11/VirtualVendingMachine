import React from 'react'

export default function Header({ balance }) {
    return (
        <div className='Header'>
            <h2>ColaCo Virtual Vending Machine</h2>
            <h3>Available Balance: ${balance}</h3>
        </div>
    )
}
