/* Phoenix */
import css from "../css/app.css"
import "phoenix_html"

/* Plants */
import MassDamperSpring from "./plant/mass_damper_spring"
import LevelTank from "./plant/level_tank"

/* Draw functions */
import { getMassDamperSpringDraw } from "./interactive/mass_damper_spring"

/* Interactive utilities */
import { getSlider, getParametersPanel } from "./interactive_utilities"

let mds = new MassDamperSpring({
    'mass': 1.0,
    'damper': 0.1,
    'spring': 1.0,
    'position': 0.0,
    'velocity': 0.0
});

let simulationStepTime = 50;

getParametersPanel('SampleSystem', mds);

///
let tank = new LevelTank(1000, 1, 4, 2);

window.onload = () => {
  let drawMDS = getMassDamperSpringDraw('SampleSystem', 2.0);
  let forceSlider = getSlider('SampleSystem', 'force', -2.0, 2.0, 'N');

  window.setInterval(() => {
    let force = forceSlider();
    mds.step(simulationStepTime / 1000, force);
    drawMDS(mds.getPosition());
  }, simulationStepTime);

  ///
  let valveSlider = document.querySelector('#levelSlider');
  let valveLabel = document.querySelector('#levelSliderLabel');
  tank.interactiveLink('#_window_levelTank', 4.0);
  window.setInterval(() => {
    let valve = parseFloat(valveSlider.value);
    valveLabel.innerText = `${valve} %`;
    tank.step(simulationStepTime / 1000, valve * 5.0);
    tank.interactiveDraw();
  }, simulationStepTime);
}
