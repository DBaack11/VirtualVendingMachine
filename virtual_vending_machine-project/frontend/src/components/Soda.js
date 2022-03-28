import React from 'react'
import sodaImage from '../images/soda-can.png'
import { useState, useEffect } from "react"
import useModal from "use-modal-element"

export default function Soda({ soda, balance, childSetBalance }) {
    // Variable data initialized with the useState() hook used to store and set the Soda's properties
    const [data, setData] = useState([])

    // Variable data initialized with the useState() hook used to store and set the the user's new balance after a purchase
    const [newBalance, setNewBalance] = useState(0)

    // Variable data initialized with the useState() hook used to store and set the available quantity of the soda
    const [availableQuantity, setAvailableQuantity] = useState(soda.available_quantity)

    // useEffect() hook used to retrieve the specific soda's data from the API
    useEffect(() => {
        // if running locally, change url to 'http://localhost:8000/sodas/${soda.name}'
        fetch(`https://dbaack.pythonanywhere.com/sodas/${soda.name}`)
            .then(response => response.json())
            .then(data => setData(data))
    }, [soda.name])

    // useModal() custom hook used to activate a modal when a purchase is attempted with insufficient funds
    const [InsufficientFundsModal, toggleInsufficientFundsModal] = useModal({
        withBackground: {
            closable: false,
        },
        withCloseButton: true,
        withControlButton: {
            type: "default",
            text: "Replenish Funds",
            customClassName: "modal-button",
            action: () => replenishFunds(),
        },
    });

    // useModal() custom hook used to activate a modal to confirm an attempted purchase
    const [ConfirmPurchaseModal, toggleConfirmPurchaseModal] = useModal({
        withBackground: {
            closable: false,
        },
        withCloseButton: true,
        withControlButton: {
            type: "default",
            text: "Confirm Purchase",
            customClassName: "modal-button",
            action: () => purchaseSoda(),
        },
    });

    // Arrow function 'download' used to take in JSON data and convert it into a JSON file for the user to download
    const download = (content, fileName, contentType) => {
        const a = document.createElement("a")
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click()
    }

    // Arrow function 'updateAPI' used to send a PUT request to update the quantity of the soda after a purchase
    const updateAPI = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: soda.id,
                name: soda.name,
                description: soda.description,
                cost: soda.cost,
                available_quantity: availableQuantity - 1
            })
        };
        // if running locally, change url to 'http://localhost:8000/sodas/${soda.name}'
        fetch(`https://dbaack.pythonanywhere.com/sodas/${soda.name}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data.name + " | API Updated, Available Quantity: " + (availableQuantity - 1)))
    };

    // Arrow function 'purchaseSoda' used to set the user's new balance, download the appropriate JSON file, 
    // and update the API after the purchase.
    const purchaseSoda = () => {
        childSetBalance(newBalance)
        download(JSON.stringify(data), `${soda.name}.json`, 'text/json');
        updateAPI()
        setAvailableQuantity(availableQuantity - 1)
        toggleConfirmPurchaseModal()
    }

    // Arrow function 'replenishFunds' used to reset the value of the balance
    // in the parent component VendingMachine
    const replenishFunds = () => {
        childSetBalance(4)
        toggleInsufficientFundsModal()
    }

    // Arrow function 'handleClick' used to check whether the user's funds are sufficient
    // for the attempted purchase and toggles the approriate modal
    const handleClick = () => {
        setNewBalance(parseFloat(balance) - parseFloat(soda.cost))
        const testBalance = parseFloat(balance) - parseFloat(soda.cost)
        testBalance < 0 ? toggleInsufficientFundsModal() : toggleConfirmPurchaseModal()
    }

    return (
        <div className='SodaContainer'>
            <div className='Soda'>
                <img src={sodaImage} alt='Soda Can' />
                <h3 className='soda-name'>{soda.name}</h3>
                <div className='soda-info'>
                    <h2>{soda.name}</h2>
                    <hr />
                    <p className='soda-cost'>${soda.cost} </p>

                    <p className='soda-description'>{soda.description}</p>
                    <hr />
                    <p className='soda-quantity'><span>{availableQuantity}</span> Sodas Left</p>
                </div>
            </div>
            <InsufficientFundsModal>
                <div className='modal'>
                    <h2>Insufficient Funds</h2>
                    <hr />
                    <p>You are unable to complete this purchase due to insufficient funds.</p>
                    <p>Your current balance is <span className='modal-span'>${balance.toFixed(2)}</span>.</p>
                    <p>Would you like to replenish your funds?</p>
                </div>
            </InsufficientFundsModal>
            <ConfirmPurchaseModal>
                <div className='modal'>
                    <h2>Confirm Purchase</h2>
                    <hr />
                    <p>You are purchasing this item for <span className='modal-span'>${soda.cost}</span>.</p>
                    <p>Your new balance will be <span className='modal-span'>${newBalance.toFixed(2)}</span>.</p>
                    <p>Click the button to confirm your purchase.</p>
                </div>
            </ConfirmPurchaseModal>
            <button className='purchase-button' onClick={handleClick}>Purchase Soda</button>
        </div>
    )
}
