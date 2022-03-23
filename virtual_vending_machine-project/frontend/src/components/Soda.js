import React from 'react'
import sodaImage from '../images/soda-can.png'
import { useState, useEffect } from "react"

export default function Soda({ soda }) {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/sodas/${soda.name}`)
            .then(response => response.json())
            .then(data => setData(data))
    }, [soda.name])

    const download = (content, fileName, contentType) => {
        const a = document.createElement("a")
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click()
    }

    const purchaseSoda = () => {
        download(JSON.stringify(data), `${soda.name}.json`, 'text/json')
    }

    return (
        <div className='SodaContainer'>
            <div className='Soda'>
                <img src={sodaImage} alt='Soda Image' />
                <h3>{soda.name}</h3>
                <div className='soda-info'>
                    <p>{soda.description}</p>
                    <p>${soda.cost} </p>
                    <p>{soda.available_quantity} Sodas Left</p>
                </div>
            </div>
            <button className='purchase-button' onClick={purchaseSoda}>Purchase Soda</button>
        </div>
    )
}
