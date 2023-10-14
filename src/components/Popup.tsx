// /*global chrome*/

import { motion, Variants } from "framer-motion";
import { fullscreenIcon, ghIcon, settingsIcon, tabIcon } from "../assets";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export default function PopUp() {
//   async function getCurrentTab() {
//     // const queryOptions = { active: true, lastFocusedWindow: true };
//     // // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     // const [tab] = await chrome.tabs.query(queryOptions);

//     // console.log(tab);
//     // return tab;

//     const [tab] = await chrome.tabs.query({ active: true });

//     chrome.scripting.executeScript({
//       target: { tabId: tab.id! },

//       func: () => {
//         alert("hello from extention");
//       },
//     });

//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         // `tabs` is an array of tabs that are currently active in the current window.
//         // The first tab in the array is the current active tab.
//         const currentTab = tabs[0];
      
//         // You can access the title property of the current tab.
//         const tabTitle = currentTab.title;
      
//         console.log("Current tab title:", tabTitle);
//       });
//   }






const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url :string = URL.createObjectURL(blob);

        console.log(url)
        // You can do something with the recorded video, e.g., display it or save it.

        // Clean up resources
        stream.getTracks().forEach((track) => track.stop());
        chunks.length = 0;
      };

      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000); // Stop recording after 5 seconds (adjust as needed).
    } catch (error) {
      console.error('Error accessing user media:', error);
    }
  };


  return (
    <>
      <motion.div
        className="p-2"
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <div className="flex justify-between">
          <motion.h1
            variants={itemVariants}
            className="text-primary font-bold text-xl text-left"
          >
            ScreenFlow
          </motion.h1>

          <div className="svgs flex space-x-2 items-center">
            <a href="https://github.com/evergreenx/ScreenFlow" target="_blank">
              <motion.img
                src={ghIcon}
                alt="settingsicon"
                variants={itemVariants}
              />
            </a>
            <div className="settings">
              <motion.img variants={itemVariants} src={settingsIcon} />
            </div>
          </div>
        </div>

        <motion.p
          variants={itemVariants}
          className="my-4 text-sm text-black font-normal"
        >
          This extension helps you record and share help videos with ease.
        </motion.p>

        <motion.div
          className="tab flex justify-around mt-[32px]"
          variants={itemVariants}
        >
          <div className="fullscreen cursor-not-allowed ">
            <img src={fullscreenIcon} alt="tab" className="mx-auto" />

            <p className="font-sm text-[#928FAB] font-semibold">Full screen</p>
          </div>
          <div className="currenttab cursor-pointer">
            <img src={tabIcon} alt="tab" className="mx-auto" />

            <p className="font-sm font-semibold">Current tab</p>
          </div>
        </motion.div>

        <motion.button
          variants={itemVariants}
          onClick={startRecording}
          className="text-base font-medium bg-primary p-4 w-full rounded-[8px] text-[#FAFDFF] my-4  "
        >
          Start Recording
        </motion.button>
      </motion.div>
    </>
  );
}
