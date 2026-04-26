import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowUp, ArrowRight, ArrowLeft as ArrowLeftIcon, Layers, Landmark, CheckCircle2, ChevronRight, MapPin } from "lucide-react";
import floor1 from "../assets/floor-1.png";
import { useNav } from "../context/NavigationContext";
import { navSteps } from "../data/rooms";
import LangToggle from "../components/LangToggle";

export const Route = createFileRoute("/navigate")({ component: NavigateScreen });

function NavigateScreen() {
  const router = useRouter();
  const { step, setStep } = useNav();
  const total = navSteps.length;
  const current = navSteps[Math.min(step - 1, total - 1)];
  const pct = (step / total) * 100;

  const next = () => {
    if (step >= total) router.navigate({ to: "/arrived" });
    else setStep(step + 1);
  };

  const Arrow = current.arrow === "up" ? ArrowUp : current.arrow === "right" ? ArrowRight : ArrowLeftIcon;

  return (
    <div className="nav-screen">
      <header className="nav-header">
        <button className="icon-btn" onClick={() => router.history.back()}><ArrowLeft size={20} /></button>
        <div className="center">
          <div className="t">Smart Campus Navigation</div>
          <div className="s"><span className="dot" /> GPS ACTIVE</div>
        </div>
        <LangToggle short />
      </header>

      <div className="progress-card">
        <div className="progress-top">
          <div>
            <div className="l">PROGRESS</div>
            <div className="step">Step {step} of {total}</div>
          </div>
          <div className="r">
            <div className="lab">Remaining</div>
            <div className="rem">{Math.max(1, total - step)} minute{total - step === 1 ? "" : "s"}</div>
          </div>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
        <div className="fastest"><CheckCircle2 size={16} color="#22C55E" /> On the fastest route</div>
      </div>

      <div className="direction-card">
        <div className="floor-pill"><Layers size={14} /> Floor {current.floor}</div>
        <div className="arrow-circle"><Arrow size={72} strokeWidth={2.5} /></div>
        <div className="dir-text">{current.instruction}</div>
        <div className="dir-sub"><Landmark size={16} /> {current.sub}</div>
      </div>

      <div className="mini-map">
        <img src={floor1} alt="Mini map" />
        <div className="pin" />
        <div className="mini-badge"><MapPin size={12} /> MINI MAP VIEW</div>
      </div>

      <div className="nav-actions">
        <button className="btn btn-primary" onClick={next}>
          {step >= total ? "Finish" : "Next Step"} <ChevronRight size={18} />
        </button>
        <button className="text-link" onClick={() => { setStep(1); router.navigate({ to: "/" }); }}>
          × Cancel Navigation
        </button>
      </div>
    </div>
  );
}
