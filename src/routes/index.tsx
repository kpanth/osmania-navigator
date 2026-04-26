import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MapPin, Search, Map as MapIcon, ShieldAlert, ExternalLink, Compass, Pencil } from "lucide-react";
import floorGround from "../assets/floor-ground.png";
import LangToggle from "../components/LangToggle";
import { useNav } from "../context/NavigationContext";
import { translations } from "../data/translations";
import { rooms } from "../data/rooms";

export const Route = createFileRoute("/")({ component: Welcome });

function Welcome() {
  const { lang, start } = useNav();
  const navigate = useNavigate();
  const t = translations[lang];
  const startRoom = rooms.find(r => r.id === start);

  return (
    <div className="screen no-nav">
      <header className="app-header">
        <div className="welcome-logo">OC</div>
        <div className="welcome-title">Osmania College</div>
        <LangToggle />
      </header>

      <section className="hero">
        <h1>{t.welcome}</h1>
        <span className="badge-pill"><Compass size={16} /> {t.smartNav}</span>
      </section>

      <button
        className="position-card position-card-btn"
        onClick={() => navigate({ to: "/destination", search: { mode: "start" } })}
        aria-label="Change starting point"
      >
        <div className="pos-icon">
          <MapPin size={26} />
          <span className="live-tag">LIVE</span>
        </div>
        <div className="pos-meta">
          <div className="label">{t.currentPosition}</div>
          <div className="name">{startRoom?.name ?? t.mainGate}</div>
          <div className="floor">
            <span className="dot" /> {startRoom?.floor === "1" ? "First Floor" : "Ground Floor"}
          </div>
        </div>
        <div className="pos-edit"><Pencil size={16} /></div>
      </button>

      <div className="map-card">
        <img src={floorGround} alt="Osmania ground floor plan" />
      </div>

      <div className="actions">
        <Link to="/destination" search={{}} className="btn btn-primary">
          <Search size={18} /> {t.findDept}
        </Link>
        <Link to="/map" className="btn btn-outline">
          <MapIcon size={18} /> {t.viewMap} <ExternalLink size={14} />
        </Link>
        <button className="btn btn-danger">
          <ShieldAlert size={18} /> {t.security}
        </button>
      </div>

      <div className="footer">{t.footer}</div>
    </div>
  );
}
