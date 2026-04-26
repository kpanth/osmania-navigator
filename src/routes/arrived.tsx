import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Check, Navigation as NavIcon, Grid3x3, Share2, MapPin } from "lucide-react";
import floorGround from "../assets/floor-ground.png";
import floor1 from "../assets/floor-1.png";
import BottomNav from "../components/BottomNav";
import { useNav } from "../context/NavigationContext";
import { rooms } from "../data/rooms";

export const Route = createFileRoute("/arrived")({ component: Arrived });

function Arrived() {
  const router = useRouter();
  const { setStep, destination } = useNav();
  const destRoom = rooms.find(r => r.id === destination);
  const floorImg = destRoom?.floor === "1" ? floor1 : floorGround;
  const floorLabel = destRoom?.floor === "1" ? "First Floor" : "Ground Floor";

  const again = () => { setStep(1); router.navigate({ to: "/destination", search: {} }); };
  const home = () => { setStep(1); router.navigate({ to: "/" }); };

  return (
    <div className="screen">
      <div className="reached">
        <div className="success-circle">
          <div className="success-inner"><Check size={44} strokeWidth={3} /></div>
        </div>
        <h1>You have arrived!</h1>
        <p>{destRoom?.name ?? "Destination"} – {floorLabel}</p>
      </div>

      <div className="map-card reached-map" style={{ position: "relative" }}>
        <img src={floorImg} alt={`${destRoom?.name ?? "Destination"} floor plan`} />
        {destRoom && (
          <div
            className="map-pin end-pin"
            style={{ position: "absolute", left: `${destRoom.x}%`, top: `${destRoom.y}%` }}
          >
            <span className="pin-flag">📍</span>
            <span className="pin-label end">{destRoom.name}</span>
          </div>
        )}
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
