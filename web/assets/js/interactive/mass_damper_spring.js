export function getMassDamperSpringDraw(id, maxPosition){
  let svg = document.querySelector(`#_window_${id}`).contentDocument;

  let svgWidth = parseFloat(
    svg.rootElement.getAttribute('width').replace(/[^.0-9]/g, '')
  );
  let massWidth = parseFloat(
    svg.querySelector('#massRect').getAttribute('width')
  );

  let oobL = svg.querySelector('#oobL');
  let oobR = svg.querySelector('#oobR');
  let oobTextL = svg.querySelector('#oobTextL');
  let oobTextR = svg.querySelector('#oobTextR');
  let mass = svg.querySelector('#massWhole');
  let domainToRange = (svgWidth + massWidth) / (2 * maxPosition);

  return (position) => {
    mass.setAttribute(
      'transform', `translate(${position * domainToRange})`
    );

    let overshoot = (Math.abs(position) - maxPosition).toFixed(2);
    oobTextR.innerHTML = `${overshoot}`;
    oobTextL.innerHTML = `${overshoot}`;

    if(position > maxPosition){
      oobR.setAttribute('visibility', 'visible');
    }
    else if(position < -maxPosition){
      oobL.setAttribute('visibility', 'visible');
    }
    else{
      oobR.setAttribute('visibility', 'hidden');
      oobL.setAttribute('visibility', 'hidden');
    }
  }
}
