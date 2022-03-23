import React from 'react';
import Soda from './Soda';


export default function VendingMachine({ data }) {

    const sodas = data.map(soda => {
        return (
            <Soda
                key={soda.id}
                soda={soda}
            />
        )
    })

    return (
        <div className='VendingMachine'>
            {sodas}
        </div>
    )
}
