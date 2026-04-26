import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ShieldAlert, Search, GraduationCap, FlaskConical, BookOpen, Building2, DoorOpen, Coffee, Clock, ChevronRight } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { useNav } from "../context/NavigationContext";

export const Route = createFileRoute("/destination")({ component: SelectDestination });

const cats = [
  { icon: GraduationCap, name: "Academic Depts", sub: "Block A & B • 12 Depts", bg: "#DBEAFE", fg: "#2563EB" },
  { icon: FlaskConical, name: "Laboratories", sub: "Block C • Floor 1-3", bg: "#EDE9FF", fg: "#6B48D4" },
  { icon: BookOpen, name: "Library", sub: "Block B • 3 Floors", bg: "#DCFCE7", fg: "#16A34A" },
  { icon: Building2, name: "Administrative", sub: "Main Hub • Ground Flr", bg: "#F3F4F6", fg: "#4B5563" },
  { icon: DoorOpen, name: "Faculty Rooms", sub: "Block D • Floor 2-4", bg: "#CCFBF1", fg: "#0D9488" },
  { icon: Coffee, name: "Facilities", sub: "Various • Ground Floor", bg: "#FFEDD5", fg: "#EA580C" },
];

const recents = [
  { name: "CS Computer Lab 4", loc: "Block A • Floor 3" },
  { name: "Student Affairs Office", loc: "Admin Block • Floor 1" },
];

function SelectDestination() {
  const router = useRouter();
  const { setDestination } = useNav();
  const pick = (name: string) => { setDestination(name); router.navigate({ to: "/map" }); };

  return (
    <div className="screen">
      <header className="page-header">
        <button className="icon-btn" onClick={() => router.history.back()}><ArrowLeft size={20} /></button>
        <div className="page-title">Select Destination</div>
        <button className="sos-btn"><ShieldAlert size={16} /> SOS</button>
      </header>

      <div className="breadcrumb">
        Home <span>›</span> Campus Map <span>›</span> <span className="current">Select Destination</span>
      </div>

      <div className="search-wrap">
        <div className="search-field">
          <Search size={18} />
          <input className="search-input" placeholder="Search classroom, lab, office..." />
        </div>
      </div>

      <div className="section-label">CATEGORIES</div>
      <div className="cat-grid">
        {cats.map(c => (
          <button key={c.name} className="cat-card" onClick={() => pick(c.name)}>
            <div className="cat-icon" style={{ background: c.bg, color: c.fg }}><c.icon size={22} /></div>
            <div>
              <div className="name">{c.name}</div>
              <div className="sub">{c.sub}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="section-label" style={{ marginTop: 16 }}>RECENT LOCATIONS</div>
      <div className="recent-list">
        {recents.map(r => (
          <button key={r.name} className="recent-item" onClick={() => pick(r.name)}>
            <div className="recent-icon"><Clock size={18} /></div>
            <div className="meta"><div className="n">{r.name}</div><div className="l">{r.loc}</div></div>
            <ChevronRight size={18} color="#9CA3AF" />
          </button>
        ))}
      </div>

      <BottomNav active="map" showFab />
      {/* hidden link to ensure type */}
      <Link to="/map" style={{ display: "none" }} />
    </div>
  );
}
