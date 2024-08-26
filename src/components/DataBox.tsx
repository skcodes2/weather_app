import React from 'react'


type DataBoxProps = {
    title: string
    icon: string
    body?: any
    footer?: string
}

export default function DataBox({ title, icon, body, footer }: DataBoxProps) {
    return (
        <div className='data-box'>
            <header className='header'>
                <img className="img" src={require("../assests/Icons/" + icon)} alt="" />
                <p className='title'>{title}</p>
            </header>

            <body className='body'>
                {body}
            </body>

            <footer className='footer'>
                {footer && <p className='text'>{footer}</p>}

            </footer>
        </div>
    )
}

