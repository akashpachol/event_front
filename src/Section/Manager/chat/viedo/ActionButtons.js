

const ActionButtons = ({ localStream }) => {

  const startStopVideo = () => {
    const videoTrack = localStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
  };

  const startStopAudio = () => {
    const audioTrack = localStream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
  };

  return (
    <div id="menu-buttons" className="row">
    <div className="button-wrapper video-button d-inline-block">
      <div className="button camera" onClick={startStopVideo}>
        <i className="fa fa-video"></i>
        <div className="btn-text">{" Start"} Video</div>
      </div>
    </div>

    <div className="button-wrapper d-inline-block">
      <i className="fa fa-caret-up choose-audio"></i>
      <div className="button mic" onClick={startStopAudio}>
        <i className="fa fa-microphone"></i>
        <div className="btn-text">Audio</div>
      </div>
    </div>
  
    <button 
       
            className="btn btn-danger hang-up"
        >Hang Up</button>
  </div>
  );
};

export default ActionButtons;
