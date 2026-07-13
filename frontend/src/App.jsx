import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/common/ScrollToTop";
import useTheme from "./hooks/useTheme";
import AppRoutes from "./routes/AppRoutes";

const AppShell = () => {
  const { isDark } = useTheme();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDark ? "dark" : "light"}
      />
    </BrowserRouter>
  );
};

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <AppShell />
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
