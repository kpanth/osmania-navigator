import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Check, Navigation as NavIcon, Grid3x3, Share2, MapPin } from "lucide-react";
import floor1 from "../assets/floor-1.png";
import BottomNav from "../components/BottomNav";
import { useNav } from "../context/NavigationContext";

export const Route = createFileRoute("/arrived")({ component: Arrived });

function Arrived() {
  const router = useRouter();
  const { setStep } = useNav();
  const again = () => { setStep(1); router.navigate({ to: "/destination", search: {} }); };
  const home = () => { setStep(1); router.navigate({ to: "/" }); };

  return (
    <div className="screen">
      <div className="reached">
        <div className="success-circle">
          <div className="success-inner"><Check size={44} strokeWidth={3} /></div>
        </div>
        <h1>You have arrived!</h1>
        <p>Computer Science Lab – 2nd Floor, Block B</p>
      </div>

      <div className="map-card reached-map" style={{ position: "relative" }}>
        <img src={floor1} alt="Destination floor plan" />
        <div className="mini-badge" style={{ position: "absolute", bottom: 12, left: 12 }}>
          <MapPin size={12} /> LIVE VIEW
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={again}><NavIcon size={18} /> Navigate Again</button>
        <button className="btn btn-outline" onClick={home}><Grid3x3 size={18} /> Go to Main Menu</button>
        <button className="text-link"><Share2 size={14} style={{ display: "inline", marginRight: 6 }} /> Share Location</button>
      </div>

      <BottomNav active="map" />
    </div>
  );
}
