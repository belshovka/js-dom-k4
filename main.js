let slider = document.querySelector(".slider")
let handle = document.querySelector(".handle")
let value = document.querySelector(".value")

let isDragging = false
let min = 0
let max = 100

function updateSlider(clientX) {
    let rect = slider.getBoundingClientRect()
    let ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    let percent = ratio * 100 + "%"

    handle.style.left = percent
    slider.style.setProperty("--progress", percent)
    value.textContent = Math.round(min + ratio * (max - min))
}

slider.onmousedown = (ev) => {
    isDragging = true
    updateSlider(ev.clientX)
}
document.onmouseup = () => isDragging = false
document.onmousemove = (ev) => { if (isDragging) updateSlider(ev.clientX) }

updateSlider(slider.getBoundingClientRect().left + (slider.getBoundingClientRect().width * 0.5))