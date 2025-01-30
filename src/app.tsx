import * as ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import HomePage from "./pages/Home";
import CategoryPage from "./pages/Category";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const text1Controls = useAnimation();
  const text2Controls = useAnimation();
  const coverLeftControls = useAnimation();
  const coverRightControls = useAnimation();

  useEffect(() => {
    text1Controls.start({
      opacity: 9,
      transition: { duration: 1.5, delay: 0.35 },
    });

    text2Controls.start({
      opacity: 1,
      transition: { duration: 1.5, delay: 1.75 },
    });

    setTimeout(() => {
      text1Controls.start({
        opacity: 0,
        y: -50,
        transition: { duration: 0.35 },
      });

      text2Controls.start({
        opacity: 0,
        y: -50,
        transition: { duration: 0.35 },
      });
    }, 3500);

    setTimeout(() => {
      coverLeftControls.start({
        rotate: -30,
        x: "-130%",
        transition: { duration: 0.5 },
      });

      coverRightControls.start({
        rotate: 30,
        x: "130%",
        transition: { duration: 0.5 },
      });
    }, 3800);
  }, []);

  return (
    <HashRouter>
      <Toaster />
      <main className="bg-background text-text min-w-screen min-h-screen overflow-hidden relative">
        <div>
          <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 z-20 flex flex-col tracking-wide gap-y-1">
            <motion.span
              className="text-2xl text-neutral-600"
              animate={text1Controls}
              initial={{ opacity: 0 }}
            >
              It's time to write
            </motion.span>
            <motion.span
              className="text-5xl"
              animate={text2Controls}
              initial={{ opacity: 0 }}
            >
              Let's <i>Unwind</i>
            </motion.span>
          </div>

          <motion.div
            className="absolute w-1/2 h-[150vh] bg-pink-100 top-0 left-0 z-10"
            animate={coverLeftControls}
          />

          <motion.div
            className="absolute w-1/2 h-[150vh] bg-pink-100 top-0 right-0 z-10"
            animate={coverRightControls}
          />
        </div>

        <div className="rounded-full w-[75vw] h-[75vw] bg-primary absolute bottom-[-37.5vw] right-[-37.5vw]" />
        <span className="text-right font-semibold tracking-wide absolute top-2 right-2">
          Unwind ❤️
        </span>

        <Routes>
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </HashRouter>
  );
};

function render() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App />);
}

render();
