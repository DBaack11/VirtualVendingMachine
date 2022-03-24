import React from 'react';
import Soda from './Soda';
import Header from "./Header";
import { useState } from "react"


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
            <Header balance={balance} />
            <div className='VendingMachine'>
                {sodas}
            </div>
        </div>
    )
}
