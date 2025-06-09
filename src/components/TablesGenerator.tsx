import React, {useEffect, useState} from "react";

function modInverse(a: number, p: number): number | null {
    a = ((a % p) + p) % p;
    for (let x = 1; x < p; x++) {
        if ((a * x) % p === 1) return x;
    }
    return null;
}

function generateGroupTable(a: number, b: number, p: number): string {
    const points: (null | [number, number])[] = [];
    for (let x = 0; x < p; x++) {
        const rhs = (x ** 3 + a * x + b) % p;
        for (let y = 0; y < p; y++) {
            if ((y * y) % p === rhs) {
                points.push([x, y]);
            }
        }
    }
    points.unshift(null);

    function pointAdd(L: null | [number, number], M: null | [number, number]) {
        if (L === null) return M;
        if (M === null) return L;
        const [x1, y1] = L;
        const [x2, y2] = M;
        if (x1 === x2 && (y1 + y2) % p === 0) return null;
        let k: number | null;
        if (L[0] !== M[0] || L[1] !== M[1]) {
            k = modInverse(x2 - x1, p);
            if (k === null) return null;
            k = ((y2 - y1) * k) % p;
        } else {
            if (y1 === 0) return null;
            k = modInverse(2 * y1, p);
            if (k === null) return null;
            k = ((3 * x1 ** 2 + a) * k) % p;
        }
        k = ((k % p) + p) % p;
        const x3 = ((k ** 2 - x1 - x2) % p + p) % p;
        const y3 = ((k * (x1 - x3) - y1) % p + p) % p;
        return [x3, y3] as [number, number];
    }

    function pointName(L: null | [number, number]) {
        return L === null ? "∞  " : `(${L[0]},${L[1]})`;
    }

    const headers = points.map(pointName);
    const colWidth = Math.max(...headers.map(h => h.length), 1) + 2;

    let table = "+  ".padStart(colWidth, " ") + "|";
    for (const h of headers) table += h.padStart(colWidth, " ");
    table += "\n" + "-".repeat(colWidth) + "-".repeat(colWidth * headers.length + 1) + "\n";

    for (let i = 0; i < points.length; i++) {
        let row = headers[i].padStart(colWidth, " ") + "|";
        for (let j = 0; j < points.length; j++) {
            const result = pointAdd(points[i], points[j]);
            row += pointName(result).padStart(colWidth, " ");
        }
        table += row + "\n";
    }
    return table;
}

const TablesGenerator: React.FC = () => {
    const [p, setP] = useState(3);
    const [a, setA] = useState(1);
    const [b, setB] = useState(1);
    const [operation] = useState("+");
    const [table, setTable] = useState<string>("");
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

    useEffect(() => {
        setTable(generateGroupTable(a, b, p));
    }, [a, b, p]);

    return (
        <div style={{padding: 24}}>
            <h3 className="title">Generate Table</h3>
            <hr className="my-4"/>
            <div style={{marginBottom: 16, display: "flex", alignItems: "center", gap: 32}}>
                <label style={{fontWeight: 600, display: "flex", alignItems: "center", gap: 8}}>
                    <span>Prime number field&nbsp;Z<sub>p</sub>:</span>
                    <select value={p} onChange={e => setP(Number(e.target.value))}>
                        {primes.map(n => (
                            <option key={n} value={n}>
                                Z{n}
                            </option>
                        ))}
                    </select>
                </label>
                <label style={{fontWeight: 600, display: "flex", alignItems: "center", gap: 8}}>
                    <span>Group operation:</span>
                    <select value={operation} disabled>
                        <option value="+">+</option>
                    </select>
                </label>
                <label style={{fontWeight: 600, display: "flex", alignItems: "center", gap: 8}}>
                    <span>a:</span>
                    <input
                        type="number"
                        value={a}
                        onChange={e => setA(Number(e.target.value))}
                        style={{width: 80}}
                    />
                </label>
                <label style={{fontWeight: 600, display: "flex", alignItems: "center", gap: 8}}>
                    <span>b:</span>
                    <input
                        type="number"
                        value={b}
                        onChange={e => setB(Number(e.target.value))}
                        style={{width: 80}}
                    />
                </label>
            </div>
            <pre style={{background: "#222", color: "#fff", padding: 16, borderRadius: 8, overflowX: "auto"}}>
                {table}
            </pre>
        </div>
    );
};

export default TablesGenerator;
