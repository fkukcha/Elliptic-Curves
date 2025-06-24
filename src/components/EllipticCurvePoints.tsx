import React, { useState } from "react";

const primes = [2, 3, 5];

function findCurvePoints(p: number, a: number, b: number): (string | [number, number])[] {
    const points: (string | [number, number])[] = ["\u221E"];
    for (let x = 0; x < p; x++) {
        for (let y = 0; y < p; y++) {
            if ((y ** 2) % p === (x ** 3 + a * x + b) % p) {
                points.push([x, y]);
            }
        }
    }
    return points;
}

function find2Torsion(points: (string | [number, number])[]): [number, number][] {
    return points.filter(
        (L) => L !== "\u221E" && Array.isArray(L) && L[1] === 0
    ) as [number, number][];
}

const EllipticCurvePoints: React.FC = () => {
    const [p, setP] = useState(3);
    const [a, setA] = useState(1);
    const [b, setB] = useState(1);

    const points = findCurvePoints(p, a, b);
    const torsion2 = find2Torsion(points);

    return (
        <div style={{padding: 24}}>
            <h3 className="title">Points on the Elliptic Curve</h3>
            <hr className="my-4"/>
            <div style={{display: "flex", gap: 24, marginBottom: 16}}>
                <label>
                    Z<sub>p</sub>:
                    <select value={p} onChange={e => setP(Number(e.target.value))} style={{marginLeft: 8}}>
                        {primes.map(prime => (
                            <option key={prime} value={prime}>Z{prime}</option>
                        ))}
                    </select>
                </label>
                <label>
                    a:
                    <input
                        type="number"
                        value={a}
                        onChange={e => setA(Number(e.target.value))}
                        style={{width: 60, marginLeft: 8}}
                    />
                </label>
                <label>
                    b:
                    <input
                        type="number"
                        value={b}
                        onChange={e => setB(Number(e.target.value))}
                        style={{width: 60, marginLeft: 8}}
                    />
                </label>
            </div>
            <div>
                <strong>Alle Punkte auf E(Z<sub>{p}</sub>):</strong>
                <pre
                    style={{
                        background: "#222",
                        color: "#fff", // Weißer Text
                        padding: "16px 20px",
                        borderRadius: 10,
                        fontSize: 16,
                        marginTop: 8,
                        fontFamily: "Fira Mono, Consolas, monospace",
                        boxShadow: "0 2px 8px #0002"
                    }}
                >{`E(Z_${p}) = { ${points
                    .map(pt => (typeof pt === "string" ? pt : `(${pt[0]},${pt[1]})`))
                    .join(", ")} }`}
                </pre>
            </div>
            <div style={{marginTop: 12}}>
                <strong>2-Torsion points:</strong>
                <pre
                    style={{
                        background: "#222",
                        color: "#fff",
                        padding: "12px 18px",
                        borderRadius: 10,
                        fontSize: 15,
                        marginTop: 8,
                        fontFamily: "Fira Mono, Consolas, monospace",
                        boxShadow: "0 2px 8px #0002"
                    }}
                >{torsion2.length === 0
                    ? "Keine"
                    : `T₂ = { ${torsion2.map(pt => `(${pt[0]},${pt[1]})`).join(", ")} }`
                }</pre>
            </div>
        </div>
    );
};

export default EllipticCurvePoints;
