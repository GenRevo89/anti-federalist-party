"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// FIPS code to state abbreviation mapping
const FIPS_TO_STATE: Record<string, string> = {
  "01": "al", "02": "ak", "04": "az", "05": "ar", "06": "ca",
  "08": "co", "09": "ct", "10": "de", "12": "fl", "13": "ga",
  "15": "hi", "16": "id", "17": "il", "18": "in", "19": "ia",
  "20": "ks", "21": "ky", "22": "la", "23": "me", "24": "md",
  "25": "ma", "26": "mi", "27": "mn", "28": "ms", "29": "mo",
  "30": "mt", "31": "ne", "32": "nv", "33": "nh", "34": "nj",
  "35": "nm", "36": "ny", "37": "nc", "38": "nd", "39": "oh",
  "40": "ok", "41": "or", "42": "pa", "44": "ri", "45": "sc",
  "46": "sd", "47": "tn", "48": "tx", "49": "ut", "50": "vt",
  "51": "va", "53": "wa", "54": "wv", "55": "wi", "56": "wy",
  "11": "dc", "60": "as", "66": "gu", "69": "mp", "72": "pr", "78": "vi",
};

const STATE_NAMES: Record<string, string> = {
  al: "Alabama", ak: "Alaska", az: "Arizona", ar: "Arkansas", ca: "California",
  co: "Colorado", ct: "Connecticut", de: "Delaware", fl: "Florida", ga: "Georgia",
  hi: "Hawaii", id: "Idaho", il: "Illinois", in: "Indiana", ia: "Iowa",
  ks: "Kansas", ky: "Kentucky", la: "Louisiana", me: "Maine", md: "Maryland",
  ma: "Massachusetts", mi: "Michigan", mn: "Minnesota", ms: "Mississippi", mo: "Missouri",
  mt: "Montana", ne: "Nebraska", nv: "Nevada", nh: "New Hampshire", nj: "New Jersey",
  nm: "New Mexico", ny: "New York", nc: "North Carolina", nd: "North Dakota", oh: "Ohio",
  ok: "Oklahoma", or: "Oregon", pa: "Pennsylvania", ri: "Rhode Island", sc: "South Carolina",
  sd: "South Dakota", tn: "Tennessee", tx: "Texas", ut: "Utah", vt: "Vermont",
  va: "Virginia", wa: "Washington", wv: "West Virginia", wi: "Wisconsin", wy: "Wyoming",
};

// State centroids for zoom (lon, lat)
const STATE_CENTERS: Record<string, { center: [number, number]; zoom: number }> = {
  al: { center: [-86.9, 32.8], zoom: 5 }, ak: { center: [-153, 64], zoom: 2.5 },
  az: { center: [-111.9, 34.2], zoom: 5 }, ar: { center: [-92.4, 34.8], zoom: 5.5 },
  ca: { center: [-119.4, 37.2], zoom: 4 }, co: { center: [-105.5, 39], zoom: 5 },
  ct: { center: [-72.7, 41.6], zoom: 10 }, de: { center: [-75.5, 39], zoom: 10 },
  fl: { center: [-81.5, 28.5], zoom: 4.5 }, ga: { center: [-83.4, 32.7], zoom: 5 },
  hi: { center: [-157, 20.5], zoom: 5 }, id: { center: [-114.5, 44.4], zoom: 4.5 },
  il: { center: [-89.2, 40], zoom: 5 }, in: { center: [-86.3, 39.8], zoom: 5.5 },
  ia: { center: [-93.5, 42], zoom: 5 }, ks: { center: [-98.3, 38.5], zoom: 5 },
  ky: { center: [-85.3, 37.8], zoom: 5.5 }, la: { center: [-91.8, 31], zoom: 5.5 },
  me: { center: [-69.2, 45.4], zoom: 5 }, md: { center: [-76.7, 39], zoom: 8 },
  ma: { center: [-71.8, 42.3], zoom: 9 }, mi: { center: [-84.5, 44.3], zoom: 4.5 },
  mn: { center: [-94.3, 46.3], zoom: 4.5 }, ms: { center: [-89.7, 32.7], zoom: 5 },
  mo: { center: [-92.5, 38.3], zoom: 5 }, mt: { center: [-109.6, 47], zoom: 4.5 },
  ne: { center: [-99.8, 41.5], zoom: 5 }, nv: { center: [-117, 39.5], zoom: 4.5 },
  nh: { center: [-71.5, 43.7], zoom: 7 }, nj: { center: [-74.5, 40.1], zoom: 8 },
  nm: { center: [-106, 34.5], zoom: 4.5 }, ny: { center: [-75.5, 43], zoom: 5 },
  nc: { center: [-79.8, 35.5], zoom: 5 }, nd: { center: [-100.5, 47.5], zoom: 5 },
  oh: { center: [-82.8, 40.3], zoom: 5.5 }, ok: { center: [-97.5, 35.5], zoom: 5 },
  or: { center: [-120.5, 44], zoom: 4.5 }, pa: { center: [-77.6, 41], zoom: 5.5 },
  ri: { center: [-71.5, 41.7], zoom: 14 }, sc: { center: [-80.9, 34], zoom: 6 },
  sd: { center: [-100, 44.4], zoom: 5 }, tn: { center: [-86.3, 35.8], zoom: 5 },
  tx: { center: [-99, 31.5], zoom: 3.5 }, ut: { center: [-111.7, 39.3], zoom: 5 },
  vt: { center: [-72.6, 44], zoom: 8 }, va: { center: [-79.4, 37.5], zoom: 5.5 },
  wa: { center: [-120.5, 47.5], zoom: 5 }, wv: { center: [-80.6, 38.9], zoom: 6 },
  wi: { center: [-89.6, 44.5], zoom: 5 }, wy: { center: [-107.5, 43], zoom: 5 },
};

interface USMapProps {
  selectedState?: string;
  onStateClick?: (stateCode: string) => void;
  interactive?: boolean;
}

export default function USMap({ selectedState, onStateClick, interactive = true }: USMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const { center, zoom } = useMemo(() => {
    if (selectedState && STATE_CENTERS[selectedState]) {
      return STATE_CENTERS[selectedState];
    }
    return { center: [-96, 38] as [number, number], zoom: 1 };
  }, [selectedState]);

  const handleClick = useCallback((stateCode: string) => {
    if (interactive && onStateClick) onStateClick(stateCode);
  }, [interactive, onStateClick]);

  return (
    <div className="us-map-container">
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1000 }}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup center={center} zoom={zoom} minZoom={1} maxZoom={16}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const fips = geo.id;
                const stateCode = FIPS_TO_STATE[fips] || "";
                const isSelected = selectedState === stateCode;
                const isHovered = hoveredState === stateCode;
                const isHQ = stateCode === "nm";

                if (!stateCode || stateCode === "dc") return null;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleClick(stateCode)}
                    onMouseEnter={() => interactive && setHoveredState(stateCode)}
                    onMouseLeave={() => setHoveredState(null)}
                    style={{
                      default: {
                        fill: isSelected
                          ? "rgba(46, 196, 182, 0.5)"
                          : isHQ
                          ? "rgba(201, 169, 78, 0.2)"
                          : "rgba(46, 196, 182, 0.12)",
                        stroke: isSelected
                          ? "#2EC4B6"
                          : isHQ
                          ? "rgba(201, 169, 78, 0.4)"
                          : "rgba(46, 196, 182, 0.25)",
                        strokeWidth: isSelected ? 1.5 : 0.5,
                        outline: "none",
                        transition: "all 0.3s ease",
                        cursor: interactive ? "pointer" : "default",
                      },
                      hover: {
                        fill: isSelected
                          ? "rgba(46, 196, 182, 0.6)"
                          : "rgba(46, 196, 182, 0.3)",
                        stroke: "rgba(46, 196, 182, 0.7)",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "rgba(46, 196, 182, 0.7)",
                        stroke: "#2EC4B6",
                        strokeWidth: 1.5,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {hoveredState && STATE_NAMES[hoveredState] && (
        <div className="us-map-tooltip">
          <span className="us-map-tooltip-name">{STATE_NAMES[hoveredState]}</span>
          {interactive && <span className="us-map-tooltip-action">Click to explore</span>}
        </div>
      )}
    </div>
  );
}
