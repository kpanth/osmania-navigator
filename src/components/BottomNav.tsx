import { Link } from "@tanstack/react-router";
import { Home, Map, Calendar, User, Navigation } from "lucide-react";

export default function BottomNav({ active = "map", showFab = false }: { active?: string; showFab?: boolean }) {
  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${active === "home" ? "active" : ""}`}>
        <Home size={22} /><span>Home</span>
      </Link>
      <Link to="/map" className={`nav-item ${active === "map" ? "active" : ""}`}>
        <Map size={22} /><span>Map</span>
      </Link>
      {showFab && (
        <Link to="/destination" className="nav-fab" aria-label="Navigate">
          <Navigation size={24} />
        </Link>
      )}
      <Link to="/destination" className={`nav-item ${active === "schedule" ? "active" : ""}`}>
        <Calendar size={22} /><span>Schedule</span>
      </Link>
      <Link to="/" className={`nav-item ${active === "profile" ? "active" : ""}`}>
        <User size={22} /><span>Profile</span>
      </Link>
    </nav>
  );
}
