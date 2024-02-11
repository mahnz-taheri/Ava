export const restartHandler = ({
    setIsFetch,
    setPaused,
    audioRef,
  }) => {
    setIsFetch && setIsFetch(false);
    setPaused(true);
    audioRef.current?.pause();
  };
  
  export const formatDuration = (value) => {
    const hour = Math.floor(value / 3600);
    const minute = Math.floor((value - hour * 3600) / 60);
    const secondLeft = value - (minute * 60 + hour * 3600);
    return `${hour !== 0 ? hour + ":" : ""}${
      minute === 0 ? "0" + minute : minute
    }:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  };
  
  // copy text handler
  export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  
  // copy handlers
  export const tooltipCloseHandler = ({ setOpen }) => {
    setOpen(false);
  };

  export const tooltipOpenHandler = ({ setOpen }) => {
    setOpen(true);
  };
  
  export const deleteHandler = ({
    files,
    setFiles,
    audioRef,
    item,
  }) => {
    const filesUpdate = files.filter((file) => file.id !== item.id);
    setFiles(filesUpdate);
    audioRef.current?.pause();
  };
  
  export const downloadHandler = ({ item, audioRef }) => {
    const link = document.createElement("a");
    link.href = item?.audio || audioRef?.current?.src || "";
    link.download = "audio.mp3";
    link.click();
  };