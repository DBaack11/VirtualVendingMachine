import React from 'react'

export default function Links() {
    return (
        <div className='LinksContainer'>
            <div className='Links'>
                <h2>Links</h2>
                <hr />
                <div className='center-buttons'>
                    <div className='links-button-container'>
                        <a className='links-button' href='https://dbaack.pythonanywhere.com/admin' target='_blank' rel='noreferrer'>Admin Login</a>
                        <p></p>
                        <div className='bottom-links-container'>
                            <a className='links-button' href='https://dbaack.pythonanywhere.com/sodas' target='_blank' rel='noreferrer'>View API</a>
                            <a className='links-button' href='https://github.com/DBaack11/VirtualVendingMachine' target='_blank' rel='noreferrer'>View GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
