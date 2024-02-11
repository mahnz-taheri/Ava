  // recording voice
  export const handleStartRecording = ({
    mediaRecorderRef,
    setAudioUrl,
    setDuration,
    setIsRecording,
  }) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
  
        const recordedChunks = [];
  
        mediaRecorder.addEventListener("dataavailable", (event) => {
          recordedChunks.push(event.data);
        });
  
        mediaRecorder.onstop = function () {
          const blob = new Blob(recordedChunks, {
            type: "audio/webm",
          });
          const audioUrl = URL.createObjectURL(blob);
          setAudioUrl(audioUrl);
  
          //duration of voice
          const fileReader = new FileReader();
          fileReader.onloadend = () => {
            const audioContext = new window.AudioContext();
            const arrayBuffer = fileReader.result;
  
            audioContext.decodeAudioData(arrayBuffer, (buffer) => {
              const durationInSeconds = buffer.duration;
              setDuration(durationInSeconds);
            });
          };
  
          fileReader.readAsArrayBuffer(blob);
        };
  
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
        alert("no access to microphone");
      });
  };
  
  export const handleStopRecording = ({
    mediaRecorderRef,
    setIsRecording,
    setIsFetch,
  }) => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setIsFetch(true);
  };