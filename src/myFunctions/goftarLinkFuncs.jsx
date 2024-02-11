// link input validate
const checkString = (str) => {
  const extensions = [".mp3", ".mpeg", ".mp4", ".wave"];
  return extensions.some((ext) => str.includes(ext));
};

export const linkHandler = ({linkValue, notify, setAudioDuration, setIsFetch,
}) => {
  if (linkValue === "") {
    notify("!لینک خالی است");
  } else if (!checkString(linkValue)) {
    notify("!فرمت لینک وارد شده نادرست است");
  } else {
    const audio = new Audio(linkValue);
    audio.addEventListener("loadedmetadata", () => {
      setAudioDuration(audio.duration);
    });
    setIsFetch(true);
  }
};