import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Output from '../../outputs/output.jsx';
import { linkIcon } from "../../../svgs/svg.jsx";
import { linkHandler } from '../../../myFunctions/goftarLinkFuncs';
import '../../../styles/Goftar/TabContents/LinkContent.css';

const LinkContent = ({langSelect}) => {
  const [isFetch, setIsFetch] = useState(false);
  const [paused, setPaused] = useState(true);
  const [linkValue, setLinkValue] = useState("");
  const audioRef = useRef(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const notify = (value) => toast.error(value);

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

  const linkHandleClick = () => {
    linkHandler({ linkValue, notify, setAudioDuration, setIsFetch });
  };

  return (
    <div className="goftar-link">
      {/*link input alerts */}
      <ToastContainer position="bottom-left" style={{ color: "#ff1654" }} />
      <audio
        id="audio"
        preload="none"
        ref={audioRef}
        style={{ display: "none" }}
        onContextMenu={() => false}
        onEnded={() => setPaused(true)}
        hidden
        src={linkValue}
      ></audio>
      {isFetch ? (
        //output - after fetch
        <div className="goftar-link-fetch">
          <Output
            setPaused={setPaused}
            paused={paused}
            audioRef={audioRef && audioRef}
            text={langSelect === "FA" ? text : engText}
            timeText={langSelect === "FA" ? timeText : engtimeText}
            currentTab={"link"}
            duration={audioDuration}
            lang={langSelect}
            setIsFetch={setIsFetch}
          />
        </div>
      ) : (
        // output - before fetch
        <motion.div
          className="goftar-link-prefetch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="link-container">
            <div className="link-icon-container" onClick={linkHandleClick}>
              {linkIcon}
            </div>
            <input
              type="text"
              placeholder="example.com/sample.mp3"
              className="link-input"
              value={linkValue}
              onChange={(event) => setLinkValue(event.target.value)}
            />
          </div>
          <span className="link-text">
            نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد و دکمه را فشار
            دهید
          </span>
        </motion.div>
      )}

    </div>
  );
};

export default LinkContent;