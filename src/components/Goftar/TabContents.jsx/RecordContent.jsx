import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { recordMic } from "../../../svgs/svg.jsx";
import Output from '../../outputs/output.jsx';
import {handleStartRecording, handleStopRecording,} from "../../../myFunctions/goftarRecordFuncs.jsx";
import '../../../styles/Goftar/TabContents/RecordContent.css';


const RecordContent = ({langSelect}) => {
  const [isFetch, setIsFetch] = useState(false);
  const [paused, setPaused] = useState(true);
  const audioRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");

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

  const recordHandler = () => {
    if (!isRecording) {
      handleStartRecording({
        mediaRecorderRef,
        setAudioUrl,
        setDuration,
        setIsRecording,
      });
    } else {
      handleStopRecording({ mediaRecorderRef, setIsRecording, setIsFetch });
    }
  };

 
  return (
    <div className="record">
      <audio
        id="audio"
        preload="none"
        ref={audioRef}
        style={{ display: "none" }} 
        onContextMenu={() => false}
        onEnded={() => setPaused(true)}
        hidden
        src={audioUrl}
      ></audio>
      {isFetch ? (
        // output  after fetch
        <div className="f-record">
          <Output
            setPaused={setPaused}
            paused={paused}
            audioRef={audioRef && audioRef}
            text={langSelect === "FA" ? text : engText}
            timeText={langSelect === "FA" ? timeText : engtimeText}
            currentTab={"record"}
            duration={duration}
            lang={langSelect}
            setIsFetch={setIsFetch}
          />
        </div>
      ) : (
        // output  before fetch 
        <motion.div
          className="pref-record"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div
            className={`record-icon ${
              isRecording && "-change-record-icon"
            }`}
            onClick={recordHandler}
          >
            {recordMic}
          </div>
          <span className="record-txt">
            برای شروع به صحبت، دکمه را فشار دهید متن پیاده شده آن، در اینجا ظاهر
            شود
          </span>
        </motion.div>
      )}
      
    </div>
  );
};

export default RecordContent;