import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Search, Plus, Minus, Crosshair, Footprints, Layers, Share2, Navigation as NavIcon } from "lucide-react";
import floorGround from "../assets/floor-ground.png";
import floor1 from "../assets/floor-1.png";
import BottomNav from "../components/BottomNav";

export const Route = createFileRoute("/map")({ component: CampusMap });

function CampusMap() {
  const router = useRouter();
  const [floor, setFloor] = useState("2");
  const img = floor === "G" ? floorGround : floor1;

  return (
    <div className="screen map-screen">
      <div className="map-top">
        <button className="icon-btn" onClick={() => router.history.back()}><ArrowLeft size={20} /></button>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#6B7280" }} />
          <input className="map-search" defaultValue="Lab 204 - Digital Arts" />
        </div>
      </div>

      <div className="suggest-row">
        <div className="suggest-card">ROOM 201</div>
        <div className="suggest-card">LECTURE HA…</div>
        <div className="suggest-card">SEMINAR</div>
      </div>

      <div className="map-area">
        <img src={img} alt={`Floor ${floor} plan`} />
        <svg className="route-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <marker id="arrowHead" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#3D1D8A" />
            </marker>
          </defs>
          <path className="route-path-shadow" d="M14,86 L14,58 L46,58 L46,32 L82,32 L82,18" />
          <path className="route-path" d="M14,86 L14,58 L46,58 L46,32 L82,32 L82,18" markerEnd="url(#arrowHead)" />
        </svg>
        <div className="map-pin start-pin" title="You are here">
          <span className="pin-dot" />
          <span className="pin-label">START</span>
        </div>
        <div className="map-pin end-pin" title="Destination">
          <span className="pin-flag">📍</span>
          <span className="pin-label end">Lab 204</span>
        </div>
        <div className="zoom-controls">
          <button className="zoom-btn"><Plus size={18} /></button>
          <button className="zoom-btn"><Minus size={18} /></button>
          <button className="zoom-btn"><Crosshair size={18} /></button>
        </div>
      </div>

      <div className="floor-tabs">
        {["G","1","2","3"].map(f => (
          <button key={f} className={`floor-tab ${floor === f ? "active" : ""}`} onClick={() => setFloor(f)}>{f}</button>
        ))}
      </div>

      <div className="bottom-sheet">
        <div className="grab" />
        <div className="sheet-row">
          <div className="info">
            <h3>Navigation to Lab 204</h3>
            <div className="walk"><Footprints size={14} /> Approx. 3 minutes walk (180m)</div>
          </div>
          <button className="icon-square"><Layers size={20} /></button>
        </div>
        <div className="sheet-action-row">
          <Link to="/navigate" className="btn btn-primary"><NavIcon size={18} /> Start Navigation</Link>
          <button className="icon-square" style={{ flex: "0 0 52px" }}><Share2 size={18} /></button>
        </div>
      </div>

      <BottomNav active="map" />
    </div>
  );
}
