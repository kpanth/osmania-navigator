import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowUp, ArrowRight, ArrowLeft as ArrowLeftIcon, Layers, Landmark, CheckCircle2, ChevronRight, MapPin } from "lucide-react";
import floorGround from "../assets/floor-ground.png";
import floor1 from "../assets/floor-1.png";
import { useNav } from "../context/NavigationContext";
import { rooms } from "../data/rooms";
import { buildPath, buildSteps } from "../data/routes";
import LangToggle from "../components/LangToggle";

export const Route = createFileRoute("/navigate")({ component: NavigateScreen });

function NavigateScreen() {
  const router = useRouter();
  const { step, setStep, start, destination } = useNav();
  const startRoom = rooms.find(r => r.id === start);
  const destRoom  = rooms.find(r => r.id === destination);

  const path  = startRoom && destRoom ? buildPath(startRoom, destRoom) : [];
  const steps = startRoom && destRoom ? buildSteps(startRoom, destRoom) : [];
  const total = Math.max(steps.length, 1);
  const safeStep = Math.min(step, total);
  const current = steps[safeStep - 1];
  const pct = (safeStep / total) * 100;

  const next = () => {
    if (safeStep >= total) router.navigate({ to: "/arrived" });
    else setStep(step + 1);
  };

  const arrowKey = current?.direction === "left" ? "left" : current?.direction === "right" ? "right" : "up";
  const Arrow = arrowKey === "up" ? ArrowUp : arrowKey === "right" ? ArrowRight : ArrowLeftIcon;

  // Map progress along path: each step (except the first "Start at...") corresponds to the segment ending at path[i]
  // Start step -> point 0; subsequent step k -> point k.
  const curFloor = current?.floor ?? startRoom?.floor ?? "G";
  const floorImg = curFloor === "1" ? floor1 : floorGround;

  // Points for the current floor
  const floorPts = path.filter(p => p.floor === curFloor);
  // Index in full path for current step (clamped)
  const fullIdx = Math.min(safeStep - 1, path.length - 1);
  // How many of floorPts are "traveled" so far
  const traveledCount = path.slice(0, fullIdx + 1).filter(p => p.floor === curFloor).length;

  const fullPath = floorPts.length > 1
    ? floorPts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
    : "";
  const traveled = floorPts.slice(0, Math.max(2, traveledCount));
  const traveledPath = traveled.length > 1
    ? traveled.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
    : "";

  const startPt = floorPts[0];
  const endPt   = floorPts[floorPts.length - 1];
  const cur     = floorPts[Math.min(traveledCount - 1, floorPts.length - 1)] ?? startPt;

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

      <div className="route-summary-bar">
        <span className="rs-from">{startRoom?.name ?? "Start"}</span>
        <span className="rs-arrow">→</span>
        <span className="rs-to">{destRoom?.name ?? "Destination"}</span>
      </div>

      <div className="progress-card">
        <div className="progress-top">
          <div>
            <div className="l">PROGRESS</div>
            <div className="step">Step {safeStep} of {total}</div>
          </div>
          <div className="r">
            <div className="lab">Remaining</div>
            <div className="rem">{Math.max(0, total - safeStep)} step{total - safeStep === 1 ? "" : "s"}</div>
          </div>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
        <div className="fastest"><CheckCircle2 size={16} color="#22C55E" /> On the fastest route</div>
      </div>

      <div className="direction-card">
        <div className="floor-pill"><Layers size={14} /> Floor {curFloor === "1" ? "1" : "G"}</div>
        <div className="arrow-circle"><Arrow size={72} strokeWidth={2.5} /></div>
        <div className="dir-text">{current?.instruction}</div>
        {current?.landmark && <div className="dir-sub"><Landmark size={16} /> {current.landmark}</div>}
      </div>

      <div className="mini-map">
        <img src={floorImg} alt="Mini map" />
        <svg className="mini-route" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <marker id="miniArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#3D1D8A" />
            </marker>
          </defs>
          {fullPath && <path className="mini-route-bg" d={fullPath} />}
          {traveledPath && <path className="mini-route-traveled" d={traveledPath} markerEnd="url(#miniArrow)" />}
          {startPt && <circle cx={startPt.x} cy={startPt.y} r="2.6" className="mini-dot-start" />}
          {endPt   && <circle cx={endPt.x}   cy={endPt.y}   r="2.6" className="mini-dot-end" />}
          {cur     && <circle cx={cur.x}     cy={cur.y}     r="3.2" className="mini-dot-current" />}
        </svg>
        <div className="mini-badge"><MapPin size={12} /> LIVE ROUTE</div>
      </div>

      <div className="nav-actions">
        <button className="btn btn-primary" onClick={next}>
          {safeStep >= total ? "Finish" : "Next Step"} <ChevronRight size={18} />
        </button>
        <button className="text-link" onClick={() => { setStep(1); router.navigate({ to: "/" }); }}>
          × Cancel Navigation
        </button>
      </div>
    </div>
  );
}
