let slider = document.querySelector(".slider")
let handle = document.querySelector(".handle")
let valueDisplay = document.querySelector(".value")

let isDragging = false
let min = 0
let max = 100
let snapPoints = [0, 20, 40, 60, 80, 100]

function snapToNearest(value) {
    let closestSnap = snapPoints[0]
    let closestDistance = Math.abs(value - closestSnap)

    for (let snap of snapPoints) {
        let distance = Math.abs(value - snap)
        if (distance < closestDistance) {
            closestDistance = distance
            closestSnap = snap
        }
    }

    return closestSnap
}

function updateSlider(clientX) {
    let rect = slider.getBoundingClientRect()
    let ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    let value = min + ratio * (max - min)

    let snappedValue = snapToNearest(value)
    let snappedRatio = (snappedValue - min) / (max - min)
    let percentString = (snappedRatio * 100) + "%"

    handle.style.left = percentString
    slider.style.setProperty("--progress", percentString)
    valueDisplay.textContent = Math.round(snappedValue)
}

slider.onmousedown = (ev) => {
    isDragging = true
    updateSlider(ev.clientX)
}
document.onmouseup = () => isDragging = false
document.onmousemove = (ev) => { if (isDragging) updateSlider(ev.clientX) }