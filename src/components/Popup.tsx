import { motion, Variants } from "framer-motion";
import { fullscreenIcon, ghIcon, settingsIcon, tabIcon } from "../assets";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export default function PopUp() {
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
      </motion.div>
    </>
  );
}
