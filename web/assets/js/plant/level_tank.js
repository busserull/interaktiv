class LevelTank {
  constructor(density, tankArea, tankHeight, initLevel){
    WebAssembly.instantiateStreaming(
      fetch('wasm/level_tank.wasm')
    ).then(res => {
      let exp = res.instance.exports;

      this.getTime = exp.get_t;

      this.getLevel = () => {
        return exp.get_x(0);
      }

      this.setOutValve = (valveOut) => {
        exp.set_u(0, valveOut);
      }

      this.step = (time, valveIn) => {
        exp.step_relative_with_force(time, valveIn);
      }

      res.instance.exports.init(
        density, tankArea, tankHeight, initLevel
      );


      this.setOutValve(100);
    })
  }

  interactiveLink(svgID, maxScale){
    this.intMaxScale = maxScale;

    let svg = document.querySelector(svgID).contentDocument;

    let rule = svg.querySelector('#tankRule');
    let ruleHeight = parseFloat(rule.getAttribute('height'));
    let ruleBase = parseFloat(rule.getAttribute('y'));

    this.intOverspillWarning = svg.querySelector('#overflowWarning');
    this.intTankHeight = ruleHeight;
    this.intBasePosition = ruleBase + ruleHeight;
    this.intLevel = svg.querySelector('#tankLevel');
  }

  interactiveDraw(){
    let level = this.getLevel();

    let height = level * this.intTankHeight / this.intMaxScale;

    if(level >= this.intMaxScale){
      height = this.intTankHeight;
      this.intOverspillWarning.setAttribute('visibility', 'visible');
    }
    else{
      this.intOverspillWarning.setAttribute('visibility', 'hidden');
    }

    this.intLevel.setAttribute('y', `${this.intBasePosition - height}`);
    this.intLevel.setAttribute('height', `${height}`);
  }
}

export default LevelTank;
