import React, { useState } from "react";

const WIDTH = 1250;
const HEIGHT = 600;
const SCALE = 80;

function getCurvePoints(a: number, b: number) {
    const points: {x: number, y: number}[] = [];
    for (let x = -2; x <= 2; x += 0.01) {
        const y2 = x ** 3 + a * x + b;
        if (y2 >= 0) {
            const y = Math.sqrt(y2);
            points.push({ x, y });
            if (y !== 0) points.push({ x, y: -y });
        }
    }
    return points;
}

const EllipticCurveGraph: React.FC = () => {
    const [a, setA] = useState(-1);
    const [b, setB] = useState(1);
    const points = getCurvePoints(a, b);

    return (
        <div>
            <div style={{ marginBottom: 16, display: "flex", gap: 16, alignItems: "center" }}>
                <label>
                    a:&nbsp;
                    <input
                        type="number"
                        value={a}
                        step="0.1"
                        onChange={e => setA(Number(e.target.value))}
                        style={{ width: 60 }}
                    />
                </label>
                <label>
                    b:&nbsp;
                    <input
                        type="number"
                        value={b}
                        step="0.1"
                        onChange={e => setB(Number(e.target.value))}
                        style={{ width: 60 }}
                    />
                </label>
            </div>
            <svg width={WIDTH} height={HEIGHT} style={{ background: "#f8f9fa", borderRadius: 8 }}>
                {/* Achsen */}
                <line x1={WIDTH/2} y1={0} x2={WIDTH/2} y2={HEIGHT} stroke="#bbb" />
                <line x1={0} y1={HEIGHT/2} x2={WIDTH} y2={HEIGHT/2} stroke="#bbb" />
                {/* Kurve */}
                {points.map((p, i) => (
                    <circle
                        key={i}
                        cx={WIDTH/2 + p.x * SCALE}
                        cy={HEIGHT/2 - p.y * SCALE}
                        r={1.2}
                        fill="#007bff"
                    />
                ))}
                {/* Titel */}
                <text x={WIDTH/2} y={30} textAnchor="middle" fontSize="18" fill="#333">
                    {`y² = x³ ${a >= 0 ? "+" : ""}${a}x ${b >= 0 ? "+" : ""}${b}`}
                </text>
            </svg>
        </div>
    );
};

export default EllipticCurveGraph;
