import { useEffect, useState } from "react";
import ScrollProgress from "./components/ScrollProgress";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Why from "./components/Why";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import AppPreview from "./components/AppPreview";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Give loader time to complete its animation
    const t = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Loader />
      {loaded && (
        <div className="relative">
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <Why />
            <Features />
            <HowItWorks />
            <AppPreview />
            <Waitlist />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
