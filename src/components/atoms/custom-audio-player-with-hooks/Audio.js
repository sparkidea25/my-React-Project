import React from "react";

import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";

import "./styles.scss";

import useAudioPlayer from "./useAudioPlayer";

export function Audio({ sourceUrl }) {
  const {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime
  } = useAudioPlayer();

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="player">
          <audio id="audio" loop={false}>
            {/* <source src="./song.mp3" /> */}
            <source src={sourceUrl} />
            Your browser does not support the <code>audio</code> element.
         </audio>

          <div className="controls">
            <div className="w-100 d-flex justify-content-between align-items-start">
              <Song songName="Audio" />
              {playing ? (
                <Pause handleClick={() => setPlaying(false)} />
              ) : (
                  <Play handleClick={() => setPlaying(true)} />
                )}
            </div>
            <Bar
              curTime={curTime}
              duration={duration}
              onTimeUpdate={time => setClickedTime(time)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
