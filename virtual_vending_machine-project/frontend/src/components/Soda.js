import React from 'react'
import sodaImage from '../images/soda-can.png'
import { useState, useEffect } from "react"
import useModal from "use-modal-element"

export default function Soda({ soda, balance, childSetBalance }) {
    const [data, setData] = useState([])
    const [newBalance, setNewBalance] = useState(0)
    const [availableQuantity, setAvailableQuantity] = useState(soda.available_quantity)

    useEffect(() => {
        fetch(`http://localhost:8000/sodas/${soda.name}`)
            .then(response => response.json())
            .then(data => setData(data))
    }, [soda.name])

    const [InsufficientFundsModal, toggleInsufficientFundsModal] = useModal({
        withBackground: {
            closable: false,
        },
        withCloseButton: true,
        withControlButton: {
            text: "Replenish Funds",
            action: () => replenishFunds(),
        },
    });

    const [ConfirmPurchaseModal, toggleConfirmPurchaseModal] = useModal({
        withBackground: {
            closable: false,
        },
        withCloseButton: true,
        withControlButton: {
            text: "Confirm Purchase",
            action: () => purchaseSoda(),
        },
    });

    const download = (content, fileName, contentType) => {
        const a = document.createElement("a")
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click()
    }

    const updateAPI = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: soda.id,
                name: soda.name,
                description: soda.description,
                cost: soda.cost,
                available_quantity: soda.available_quantity - 1
            })
        };
        fetch(`http://localhost:8000/sodas/${soda.name}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log("API Updated, Available Quantity: " + data.available_quantity))
    };

    const purchaseSoda = () => {
        childSetBalance(newBalance)
        download(JSON.stringify(data), `${soda.name}.json`, 'text/json');
        updateAPI()
        setAvailableQuantity(availableQuantity - 1)
        toggleConfirmPurchaseModal()
    }

    const replenishFunds = () => {
        childSetBalance(4)
        toggleInsufficientFundsModal()
    }

    const handleClick = () => {
        setNewBalance(parseFloat(balance) - parseFloat(soda.cost))
        balance == 0 ? toggleInsufficientFundsModal() : toggleConfirmPurchaseModal()
    }

    return (
        <div className='SodaContainer'>
            <div className='Soda'>
                <img src={sodaImage} alt='Soda Image' />
                <h3 className='soda-name'>{soda.name}</h3>
                <div className='soda-info'>
                    <p className='soda-description'>{soda.description}</p>
                    <p className='soda-cost'>${soda.cost} </p>
                    <p className='soda-quantity'>{availableQuantity} Sodas Left</p>
                </div>
            </div>
            <InsufficientFundsModal title="Insufficient Funds">
                <p>You are unable to complete this purchase due to insufficient funds.</p>
                <p>Your current balance is ${balance}.</p>
                <p>Would you like to replenish your funds?</p>
            </InsufficientFundsModal>
            <ConfirmPurchaseModal title="Confirm Purchase">
                <p>You are purchasing this item for ${soda.cost}.</p>
                <p>Your new balance will be ${newBalance}.</p>
                <p>Click the button to confirm your purchase.</p>
            </ConfirmPurchaseModal>
            <button className='purchase-button' onClick={handleClick}>Purchase Soda</button>
        </div>
    )
}
