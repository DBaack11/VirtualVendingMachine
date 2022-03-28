import React from 'react'

export default function Links() {
    return (
        <div className='LinksContainer'>
            <div className='Links'>
                <h2>Links</h2>
                <hr />
                <div className='links-button-container'>
                    <a className='links-button' href='' target='_blank'>Admin Login</a>
                    <p></p>
                    <div className='bottom-links-container'>
                        <a className='links-button' href='' target='_blank'>View API</a>
                        <a className='links-button' href='https://github.com/DBaack11/VirtualVendingMachine' target='_blank' rel='noreferrer'>View GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
