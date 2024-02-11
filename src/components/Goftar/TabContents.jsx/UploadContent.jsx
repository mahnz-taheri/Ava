import { useState, useRef, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";

import Output from '../../outputs/output.jsx';
import { uploadIcon } from '../../../svgs/svg.jsx';
import { fileHandler } from '../../../myFunctions/goftarUploadFuncs.jsx';
import '../../../styles/Goftar/TabContents/UploadContent.css';

const UploadContent = ({langSelect}) => {
  const [isFetch, setIsFetch] = useState(false);
  const [paused, setPaused] = useState(true);
  const [file, setFile] = useState(undefined);
  const [filePath, setFilePath] = useState(null);
  const audioRef = useRef(null);
  const [audioDuration, setAudioDuration] = useState(0);

  const text =
    "[با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او]";
  const engText =
    "[---][---] Lili, take another walk out [of] your fake world [---][---] [Please] put all the drugs out of your hand [---][---] [---][---] You'll see that you can breathe without no back [up] [---][---] So much [stuff] you got to [understand] For every step [---][---] in any walkAny town of any thought[I'll] be your guideFor every street of [any] [sceneAny] place you've never [beenI'll] be your guide [---][---][---][---]";

  const timeText = [
    {
      id: 1,
      text: "[با]",
      from: 0,
      to: 3,
    },
    {
      id: 2,
      text: "[---]",
      from: 3,
      to: 6,
    },
    {
      id: 3,
      text: "[---]",
      from: 6,
      to: 8,
    },
    {
      id: 4,
      text: "[با]",
      from: 8,
      to: 12,
    },
    {
      id: 5,
      text: "[او]",
      from: 12,
      to: 14,
    },
    {
      id: 6,
      text: "و و و و و",
      from: 14,
      to: 18,
    },
  ];
  const engtimeText = [
    {
      id: 1,
      text: "lili",
      from: 0,
      to: 2,
    },
    {
      id: 2,
      text: "[---]",
      from: 2,
      to: 4,
    },
    {
      id: 3,
      text: "takeanother walk",
      from: 4,
      to: 7,
    },
    {
      id: 4,
      text: "[---]",
      from: 7,
      to: 8,
    },
    {
      id: 5,
      text: "out [of] your fake world",
      from: 8,
      to: 14,
    },
  ];

  useEffect(() => {
    if (file) {
      const audio = new Audio(URL.createObjectURL(file));
      audio.addEventListener("loadedmetadata", () => {
        setAudioDuration(audio.duration);
      });
      setIsFetch(true);
    }
  }, [file]);

  const handleFileChange = (event) => {
    fileHandler({ event, setFile, setFilePath });
  };

 

  return (
    <div className="goftar-upload">
      <audio
        id="audio"
        preload="none"
        ref={audioRef}
        style={{ display: "none" }} 
        onContextMenu={() => false}
        onEnded={() => setPaused(true)}
        hidden
        src={filePath ? filePath : ""}
      ></audio>
      {isFetch ? (
        // output after fetch
        <div className="goftar-upload-fetch">
          <Output
            setPaused={setPaused}
            paused={paused}
            audioRef={audioRef && audioRef}
            text={langSelect === "FA" ? text : engText}
            timeText={langSelect === "FA" ? timeText : engtimeText}
            currentTab={"upload"}
            duration={audioDuration}
            lang={langSelect}
            setIsFetch={setIsFetch}
          />
        </div>
      ) : (
        //  before fetch 
        <motion.div
          className="goftar-upload-prefetch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <label htmlFor="upload-file">
            <div className="upload-icon-container">
              {uploadIcon}
            </div>
            <input
              id="upload-file"
              type="file"
              name="upload-file"
              accept=".mpeg,.mp3,.wave,.mp4"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
          <span className="upload-text">
            برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید متن پیاده
            شده آن، در اینجا ظاهر می شود
          </span>
        </motion.div>
      )}
      
    </div>
  );
};

export default UploadContent;