import React from 'react'


type DataBoxProps = {
    title: string
    icon: string
    body?: any
    footer?: string 
}

export default function DataBox({title, icon, body, footer}: DataBoxProps) {
  return (
    <div>
        <header>
            <img src={require("../assests/Icons/"+icon)} alt="" />
            <h1>{title}</h1>
        </header>
            
        <body>
            {body }
        </body>

        <footer>
            {footer && <p>{footer}</p>}

        </footer>
    </div>
  )
}

