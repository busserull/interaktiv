import {Socket} from "phoenix"

const socket = new Socket("/socket", {params: {token: ""}})

socket.connect()

const channelState = document.querySelector('#simulatorState');
const channel = socket.channel(`simulation:${window.userId}`, {});
channel.join()
    .receive("ok", resp => {
        channelState.style.display = 'none';
    })
    .receive("error", resp => {
        channelState.style.display = 'block';
        channelState.innerText = 'Simulation already running in another tab';
    });


let simWindow = document.querySelector('#simulatorWindow');
simWindow.width = simWindow.clientWidth;
simWindow.height = simWindow.clientHeight;

const initPlant = document.querySelector('#initPlant');
const startPlant = document.querySelector('#startPlant');
const stopPlant = document.querySelector('#stopPlant');

initPlant.addEventListener('click', _ => {
    let params = {
        'plant': 'mass_damper_spring',
        'step_ms': 40,
        'init': {
            't': 0.0,
            'x': [2.0, 0.0],
            'u': [0.0, 0.0]
        },
        'params': {
            'mass': 1.0,
            'damper': 0.1,
            'spring': 1.0
        }
    };

    channel.push('init', params);

});

startPlant.addEventListener('click', _ => {
    channel.push('start', {});
});

stopPlant.addEventListener('click', _ => {
    channel.push('stop', {});
});

let force = 0.0;
const forcePlantPlus = document.querySelector('#forcePlantPlus');
const forcePlantMinus = document.querySelector('#forcePlantMinus');

forcePlantPlus.addEventListener('click', _ => {
    force += 0.2;
    channel.push('force', [0.0, force]);
});

forcePlantMinus.addEventListener('click', _ => {
    force -= 0.2;
    channel.push('force', [0.0, force]);
});

function drawMass(c, x, y, massDim){
    const w = massDim;
    const h = massDim;

    c.save();
    c.strokeStyle = '#242424';
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(x - w/2, y - h/2);
    c.lineTo(x + w/2, y - h/2);
    c.lineTo(x + w/2, y + h/2);
    c.lineTo(x - w/2, y + h/2);
    c.closePath();
    c.stroke();

    c.fillStyle = '#242424';
    c.font = `${0.8 * massDim}px serif`;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('m', x, y);

    c.restore();
}

function drawVerticalLine(c, x, margin, yMax){
    c.save();
    c.strokeStyle = '#242424';
    c.beginPath();
    c.moveTo(x, margin);
    c.lineTo(x, yMax - margin);
    c.stroke();
    c.restore();
}

channel.on('state', state => {
    let c = simWindow.getContext('2d');
    c.clearRect(0, 0, simWindow.width, simWindow.height);

    drawVerticalLine(c, simWindow.width / 2, 20, simWindow.height);

    const x = state.x[0];
    const xMax = 2.0;
    const massDim = 60;
    const xCenter = simWindow.width / 2;
    const yCenter = simWindow.height / 2;
    const simRange = (simWindow.width - massDim / 2) - xCenter;

    const xPos = xCenter + (x / xMax) * simRange;

    drawMass(c, xPos, yCenter, massDim);
})

export default socket
