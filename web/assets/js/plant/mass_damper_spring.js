class MassDamperSpring {
  constructor(initParameters){
    this.initParams = initParameters;

    WebAssembly.instantiateStreaming(
      fetch('wasm/mass_damper_spring.wasm')
    ).then(res => {
      let exp = res.instance.exports;

      this.getTime = exp.get_t;

      this.getPosition = () => {
        return exp.get_x(0);
      }

      this.getVelocity = () => {
        return exp.get_x(1);
      }

      this.step = (time, force) => {
        exp.step_relative_with_force(time, force);
      }

      this.init = res.instance.exports.init;

      this.init(
        this.initParams.mass,
        this.initParams.damper,
        this.initParams.spring,
        this.initParams.position,
        this.initParams.velocity
      );
    });
  }

  updateParameters(params){
    let pOrDef = (p, def) => {
      if(p == undefined){
        return def;
      }
      return p;
    }

    this.init(
      pOrDef(params.mass, this.initParams.mass),
      pOrDef(params.damper, this.initParams.damper),
      pOrDef(params.spring, this.initParams.spring),
      pOrDef(params.position, this.getPosition()),
      pOrDef(params.velocity, this.getVelocity())
    );
  }
}

export default MassDamperSpring;
