

export function changeBackgroundColor(color: string) {
    let element = document.querySelector(".weather-app-container") as HTMLElement
    let searchItems = document.querySelector(".searchItems") as HTMLElement
    let root = document.getElementById('root') as HTMLElement
    if (color === "black") {
        searchItems.style.height = String(root.clientHeight) + "px"
        element.style.backgroundColor = color
    }
    else {
        element.style.backgroundColor = "transparent"

        searchItems.style.height = "auto"
    }


}

export function setButtonStyle(isHourly: boolean) {
    const dailyBtn = document.querySelector(".dailyBtn") as HTMLElement
    const hourlyBtn = document.querySelector(".hourlyBtn") as HTMLElement

    if (isHourly) {

        dailyBtn.style.backgroundColor = "#ffffff"
        dailyBtn.style.color = "#000000"
        hourlyBtn.style.backgroundColor = "#000000"
        hourlyBtn.style.color = "#ffffff"

    }
    else {
        hourlyBtn.style.backgroundColor = "#ffffff"
        hourlyBtn.style.color = "#000000"
        dailyBtn.style.backgroundColor = "#000000"
        dailyBtn.style.color = "#ffffff"

    }

}