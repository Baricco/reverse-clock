import './App.css';
import Clock from'./Clock.js';
import ToggleSwitch from './ToggleSwitch.js';

var toggleSwitch = new ToggleSwitch();

var colors = [
  [ "#FF6000", "#FFA559", "#FFE6C7" ],        // morning
  [ "#FFD966", "#F4B183", "#DF865B" ],        // day
  [ "#4E31AA", "#2F58CD", "#3795BD" ],        // evening
  [ "#685D8A", "#443C68", "#2E2548" ]         // night
]
function App() {

  return (
    <div className="App">
      
      <div id="ClockDiv">
        { new Clock(colors, 500, 20, "#222222", toggleSwitch.isChecked).render() }      
      </div>

      <div className = "reverseSwitch">
        { toggleSwitch.render() }
      </div>

    </div>
  );
}

export default App;
