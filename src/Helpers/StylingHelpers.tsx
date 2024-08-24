

export function changeBackgroundColor(color:string){
    let element = document.querySelector(".weather-app-container") as HTMLElement
    let searchItems = document.querySelector(".searchItems") as HTMLElement
    let root = document.getElementById('root') as HTMLElement
    if(color==="black"){
        searchItems.style.height = String(root.clientHeight)+"px"
        element.style.backgroundColor = color
    }
    else{
        element.style.backgroundColor = "transparent"
        
        searchItems.style.height = "auto"
    }
    
    
}

