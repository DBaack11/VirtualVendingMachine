import React from 'react';
import Soda from './Soda';
import Header from "./Header";
import { useState } from "react"
import Balance from './Balance';
import Links from './Links';


export default function VendingMachine({ data }) {

    const [balance, setBalance] = useState(4)
    const childSetBalance = (newBalance) => {
        setBalance(newBalance)
    }

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
            <Header />
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
