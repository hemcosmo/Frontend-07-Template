window.onload = () => {
  document.getElementById('btn').onclick = () => {
    s = []
    input = document.getElementById('input').value
    if(input) {
      createSlice(input)
      document.getElementById('preview').innerHTML = highlightAuto(JSON.stringify(expression(s), null, 2), ['json']).value
    }
  }
}