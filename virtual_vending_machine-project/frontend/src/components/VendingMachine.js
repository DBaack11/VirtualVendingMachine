import React from 'react';
import Soda from './Soda';
import { useState } from "react"
import Balance from './Balance';
import Links from './Links';

export default function VendingMachine({ data }) {

    // Variable data initialized with the useState() hook used to store and set the user's balance
    const [balance, setBalance] = useState(4)

    // Arrow function 'childSetBalance' used to allow child components (Soda and Balance) to set
    // the value of balance in the parent (VendingMachine)
    const childSetBalance = (newBalance) => {
        setBalance(newBalance)
    }

    // Arrow function 'sodas' used to convert each object in the retrieved JSON into a Soda object
    const sodas = data.map(soda => {
        return (
            <Soda
                key={soda.id}
                soda={soda}
                balance={balance}
                childSetBalance={childSetBalance}
            />
        )
    })

    return (
        <div>

            <div className='VendingMachineContainer'>
                <div className='VendingMachine'>
                    {sodas}
                </div>
                <div className='RightColumn'>
                    <Balance balance={balance} childSetBalance={childSetBalance} />
                    <Links />
                </div>
            </div>

        </div>
    )
}
