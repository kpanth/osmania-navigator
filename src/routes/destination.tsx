import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ShieldAlert, Search, FlaskConical, GraduationCap, Coffee, Building2, ChevronRight, MapPin, Circle, Flag, ArrowUpDown } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { useNav } from "../context/NavigationContext";
import { rooms, type Room, type Category } from "../data/rooms";

export const Route = createFileRoute("/destination")({
  component: SelectDestination,
  validateSearch: (s: Record<string, unknown>) => ({
    mode: s.mode === "start" ? ("start" as const) : ("dest" as const),
  }),
});

const catMeta: Record<Category, { icon: typeof FlaskConical; bg: string; fg: string }> = {
  Lab:       { icon: FlaskConical, bg: "#EDE9FF", fg: "#6B48D4" },
  Classroom: { icon: GraduationCap, bg: "#DBEAFE", fg: "#2563EB" },
  Facility:  { icon: Coffee,        bg: "#FFEDD5", fg: "#EA580C" },
  Admin:     { icon: Building2,     bg: "#F3F4F6", fg: "#4B5563" },
};

function SelectDestination() {
  const router = useRouter();
  const { mode } = Route.useSearch();
  const { start, setStart, destination, setDestination } = useNav();
  const [q, setQ] = useState("");
  const [picking, setPicking] = useState<"from" | "to">(mode === "start" ? "from" : "to");

  const startRoom = rooms.find(r => r.id === start);
  const destRoom  = rooms.find(r => r.id === destination);

  const pick = (r: Room) => {
    if (picking === "from") {
      setStart(r.id);
      setPicking("to");
    } else {
      setDestination(r.id);
      router.navigate({ to: "/map" });
    }
  };

  const swap = () => {
    const s = start;
    setStart(destination);
    setDestination(s);
  };

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? rooms.filter(r => r.name.toLowerCase().includes(t) || r.category.toLowerCase().includes(t)) : rooms;
  }, [q]);

  const ground = filtered.filter(r => r.floor === "G");
  const first  = filtered.filter(r => r.floor === "1");

  return (
    <div className="screen">
      <header className="page-header">
        <button className="icon-btn" onClick={() => router.history.back()}><ArrowLeft size={20} /></button>
        <div className="page-title">Plan Your Route</div>
        <button className="sos-btn"><ShieldAlert size={16} /> SOS</button>
      </header>

      <div className="breadcrumb">
        Home <span>›</span> <span className="current">Plan Route</span>
      </div>

      <div className="route-picker">
        <div className="rp-rail">
          <Circle size={14} fill="#22C55E" color="#22C55E" />
          <div className="rp-line" />
          <Flag size={14} color="#3D1D8A" fill="#3D1D8A" />
        </div>
        <div className="rp-fields">
          <button
            className={`rp-field ${picking === "from" ? "active" : ""}`}
            onClick={() => setPicking("from")}
          >
            <span className="rp-label">FROM</span>
            <span className="rp-value">{startRoom?.name ?? "Choose start"}</span>
          </button>
          <div className="rp-divider" />
          <button
            className={`rp-field ${picking === "to" ? "active" : ""}`}
            onClick={() => setPicking("to")}
          >
            <span className="rp-label">TO</span>
            <span className="rp-value">{destRoom?.name ?? "Choose destination"}</span>
          </button>
        </div>
        <button className="rp-swap" onClick={swap} aria-label="Swap">
          <ArrowUpDown size={16} />
        </button>
      </div>

      <div className="picking-hint">
        {picking === "from" ? "Tap a room to set as starting point" : "Tap a room to set as destination"}
      </div>

      <div className="search-wrap">
        <div className="search-field">
          <Search size={18} />
          <input
            className="search-input"
            placeholder="Search room, lab, classroom..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {ground.length > 0 && (
        <>
          <div className="floor-section-label">
            <span className="fs-badge">G</span>
            <span>GROUND FLOOR</span>
            <span className="fs-count">{ground.length} rooms</span>
          </div>
          <RoomList rooms={ground} onPick={pick} />
        </>
      )}

      {first.length > 0 && (
        <>
          <div className="floor-section-label">
            <span className="fs-badge alt">1</span>
            <span>FIRST FLOOR</span>
            <span className="fs-count">{first.length} rooms</span>
          </div>
          <RoomList rooms={first} onPick={pick} />
        </>
      )}

      {filtered.length === 0 && (
        <div className="empty-state">No rooms match "{q}"</div>
      )}

      <BottomNav active="map" showFab />
    </div>
  );
}

function RoomList({ rooms, onPick }: { rooms: Room[]; onPick: (r: Room) => void }) {
  return (
    <div className="room-list">
      {rooms.map(r => {
        const m = catMeta[r.category];
        const Icon = m.icon;
        return (
          <button key={r.id} className="room-item" onClick={() => onPick(r)}>
            <div className="room-icon" style={{ background: m.bg, color: m.fg }}>
              <Icon size={20} />
            </div>
            <div className="room-meta">
              <div className="room-name">{r.name}</div>
              <div className="room-sub">
                <span className="floor-pill-mini"><MapPin size={11} /> Floor {r.floor === "G" ? "Ground" : r.floor}</span>
                <span className="cat-tag" style={{ background: m.bg, color: m.fg }}>{r.category}</span>
              </div>
            </div>
            <ChevronRight size={18} color="#9CA3AF" />
          </button>
        );
      })}
    </div>
  );
}
