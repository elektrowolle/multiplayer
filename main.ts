function address_update () {
    microbit_list = new_microbit_list
    new_microbit_list = []
}
radio.onReceivedNumber(function (receivedNumber) {
    if (-1 == new_microbit_list.indexOf(receivedNumber)) {
        new_microbit_list.push(receivedNumber)
    }
})
input.onButtonPressed(Button.A, function () {
    start_round()
})
function play () {
    step = (input.runningTime() - my_turn) / 1000
    heading = (input.rotation(Rotation.Pitch) + 180) / 360 + 2
    led.plot(step, heading)
    if (heading < 0 || heading > 4) {
        radio.sendString("lost")
        my_turn = 0
    } else if (step > 4) {
        radio.sendValue("now", next_microbit)
        my_turn = 0
    } else {
    	
    }
}
function draw () {
    if (next_turn) {
        basic.showLeds(`
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            `)
    } else if (my_turn > 0) {
        basic.clearScreen()
        play()
    } else {
        led.plot(microbit_list.length, 0)
    }
}
function advertise () {
    radio.sendNumber(control.deviceSerialNumber())
}
radio.onReceivedValue(function (name, value) {
    if (name == "start") {
    	
    } else if (name == "next" && value == control.deviceSerialNumber()) {
        next_turn = true
    } else if (name == "now" && value == control.deviceSerialNumber()) {
        start_round()
    } else {
    	
    }
})
function start_round () {
    my_turn = input.runningTime()
    next_microbit = microbit_list._pickRandom()
    next_turn = false
    radio.sendValue("next", next_microbit)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    input.calibrateCompass()
})
let heading = 0
let my_turn = 0
let next_turn = false
let step = 0
let next_microbit = 0
let new_microbit_list: number[] = []
let microbit_list: number[] = []
let last_address_check = 0
let last_advertise = 0
microbit_list = []
new_microbit_list = []
next_microbit = 0
step = 0
next_turn = false
my_turn = 0
basic.forever(function () {
    if (input.runningTime() > 1000 + last_address_check) {
        address_update()
    }
    if (input.runningTime() > 250 + last_address_check) {
        advertise()
    }
    draw()
})
