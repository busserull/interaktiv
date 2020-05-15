export function getSlider(id, tag, min, max, unit){
  let slider = document.querySelector(`#_slider_${id}${tag}`);
  let label = document.querySelector(`#_label_${id}${tag}`);

  let sMin = parseFloat(slider.min);
  let sMax = parseFloat(slider.max);

  return () => {
    let x = parseFloat(slider.value);
    let y = min + (x - sMin) * (max - min) / (sMax - sMin);
    label.innerText = `${y.toFixed(2)} ${unit}`;
    return y;
  }
}

export function getParametersPanel(id, plant){
  let form = document.querySelector(`#_parameters_${id}`);

  form.addEventListener('submit', event => {
    let data = new FormData(form);
    let entries = Array.from(data.entries());

    let fields = {};
    entries.forEach(entry => {
      fields[entry[0]] = parseFloat(entry[1]);
    });

    plant.updateParameters(fields);
  });
}
