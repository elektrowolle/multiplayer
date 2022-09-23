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
    my_turn = true
    radio.sendValue("next", microbit_list._pickRandom())
}
let my_turn = false
let next_turn = false
let new_microbit_list: number[] = []
let microbit_list: number[] = []
let last_address_check = 0
let last_advertise = 0
microbit_list = []
new_microbit_list = []
let step = 0
next_turn = false
my_turn = false
basic.forever(function () {
    if (input.runningTime() > 1000 + last_address_check) {
        address_update()
    }
    if (input.runningTime() > 250 + last_address_check) {
        advertise()
    }
    draw()
})
