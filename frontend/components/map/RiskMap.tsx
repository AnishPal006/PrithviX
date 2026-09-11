"use client";

import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import * as L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons when used with Next.js
const markerIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const riskZones = [
  {
    id: 1,
    lat: 25.537,
    lng: 91.893,
    radius: 9000,
    score: 82,
    level: "CRITICAL",
  },
  {
    id: 2,
    lat: 25.575,
    lng: 91.86,
    radius: 5500,
    score: 67,
    level: "HIGH",
  },
  {
    id: 3,
    lat: 25.49,
    lng: 91.94,
    radius: 4500,
    score: 48,
    level: "MODERATE",
  },
];

function MapRecenter() {
  const map = useMap();

  useEffect(() => {
    map.setView([25.537, 91.893], 10);
  }, [map]);

  return null;
}

export default function RiskMap() {
  return (
    <div className="relative h-full min-h-[560px] overflow-hidden rounded-2xl border border-white/10 bg-[#081018]">
      <MapContainer
        center={[25.537, 91.893]}
        zoom={10}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapRecenter />

        {/* Risk zones */}
        {riskZones.map((zone) => (
          <Circle
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
            pathOptions={{
              color:
                zone.level === "CRITICAL"
                  ? "#ef4444"
                  : zone.level === "HIGH"
                    ? "#f97316"
                    : "#eab308",
              fillColor:
                zone.level === "CRITICAL"
                  ? "#ef4444"
                  : zone.level === "HIGH"
                    ? "#f97316"
                    : "#eab308",
              fillOpacity: 0.12,
              weight: 1,
            }}
          />
        ))}

        {/* Main location */}
        <Marker
          position={[25.537, 91.893]}
          icon={markerIcon}
        >
          <Popup>
            <strong>East Khasi Hills</strong>
            <br />
            Risk Score: 82%
            <br />
            Status: CRITICAL
          </Popup>
        </Marker>
      </MapContainer>

      {/* Map overlay */}
      <div className="pointer-events-none absolute inset-0 z-[400]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.25)_100%)]" />

        {/* Top map label */}
        <div className="absolute left-4 top-4">
          <div className="rounded-lg border border-white/10 bg-[#071019]/85 px-4 py-3 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400">
                Live Risk Layer
              </span>
            </div>

            <div className="mt-1 text-xs text-slate-400">
              Northeast India • Terrain Intelligence
            </div>
          </div>
        </div>

        {/* Coordinates */}
        <div className="absolute bottom-4 left-4">
          <div className="rounded-md border border-white/10 bg-[#071019]/80 px-3 py-2 font-mono text-[10px] text-slate-400 backdrop-blur-md">
            25.5370° N&nbsp;&nbsp;91.8930° E
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 rounded-lg border border-white/10 bg-[#071019]/90 p-3 backdrop-blur-md">
          <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Risk Zones
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-[10px] text-slate-400">
                Critical
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              <span className="text-[10px] text-slate-400">
                High
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              <span className="text-[10px] text-slate-400">
                Moderate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}