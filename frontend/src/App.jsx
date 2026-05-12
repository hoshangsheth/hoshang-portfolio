import { useEffect } from "react";
import "./App.css";
import Portfolio from "@/components/Portfolio";
import Atmosphere from "@/components/Atmosphere";
import { applyPerfClasses, subscribePerfChanges } from "@/lib/perf";

/**
 * App — top-level shell.
 *
 * - Applies hardware-tier classes to <html> on mount so CSS can fall back
 *   to cheaper effects on low-end devices and respect reduced-motion.
 * - Subscribes to motion-preference changes so toggling system settings
 *   mid-session re-renders without a hard reload.
 */
function App() {
  useEffect(() => {
    applyPerfClasses();
    const unsub = subscribePerfChanges(() => {
      // Force a re-application of classes; we don't need to re-render React
      // because every consumer reads the spec lazily.
      applyPerfClasses();
    });

    // Toggle a body class on tab visibility so CSS can pause every looping
    // keyframe at once — biggest mobile thermals win for a single line of
    // JS. The Atmosphere canvas already pauses its own RAF separately.
    const onVis = () => {
      document.body.classList.toggle("tab-hidden", document.hidden);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      unsub && unsub();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="App">
      <Atmosphere />
      <Portfolio />
    </div>
  );
}

export default App;
