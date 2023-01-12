import { padsData } from "./padsData";
import { useEffect, useState } from "react";

export default function App() {
  const [display, setDisplay] = useState("Tap to play");
  const [volume, setVolume] = useState(0.9);
  const handleClick = (e) => {
    if (e.type === "click") {
      setDisplay(e.target.name);
      e.target.querySelector("audio").play();
    }

    if (e.type === "keydown") {
      const key = document.getElementById(e.key.toUpperCase());
      if (key) {
        key.play();
        key.parentElement.classList.add("pushed");
        setTimeout(() => {
          key.parentElement.classList.remove("pushed");
        }, 100);
        setDisplay(key.parentElement.name);
      }
    }
  };
  const handleChange = (e) => {
    setVolume(e.target.value);
    Array.from(document.querySelectorAll("audio")).forEach((audio) => {
      audio.volume = e.target.value;
      volume === 0 ? (audio.muted = true) : (audio.muted = false);
    });
  };
  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      handleClick(event);
    });
  }, []);

  return (
    <div id="app">
      <div id="drum-machine">
        <div id="display">{display}</div>
        <div className="volume">
          <input
            max="1"
            min="0"
            step="0.01"
            type="range"
            value={volume}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="drum-pads">
          {padsData.map((pad, key) => (
            <button
              id={pad.title.replace(" ", "-")}
              name={pad.title}
              className="drum-pad"
              key={key}
              onClick={(e) => handleClick(e)}
            >
              {pad.id}
              <audio id={pad.id} className="clip" src={pad.src}></audio>
            </button>
          ))}
        </div>
      </div>
      <div className="footer">
        Designed and coded by{" "}
        <a href="https://linkedin.com/in/cheikhouwgueye">cheikhouw</a>
      </div>
    </div>
  );
}
