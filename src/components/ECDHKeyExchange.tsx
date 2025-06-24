import React, { useEffect, useState } from 'react';
import BN from 'bn.js';

const a = new BN(0);
const p = new BN('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F', 16);
const n = new BN('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141', 16);

const G: [BN, BN] = [
    new BN('79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798', 16),
    new BN('483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8', 16),
];

function inverseMod(k: BN, p: BN): BN {
    return k.invm(p);
}

function pointAddition(P: [BN, BN] | null, Q: [BN, BN] | null): [BN, BN] | null {
    if (!P) return Q;
    if (!Q) return P;
    if (P[0].eq(Q[0]) && !P[1].eq(Q[1])) return null;

    let m: BN;
    if (P[0].eq(Q[0]) && P[1].eq(Q[1])) {
        const numerator = P[0].pow(new BN(2)).muln(3).add(a);
        const denominator = P[1].muln(2);
        m = numerator.mul(inverseMod(denominator, p)).umod(p);
    } else {
        const numerator = Q[1].sub(P[1]);
        const denominator = Q[0].sub(P[0]);
        m = numerator.mul(inverseMod(denominator, p)).umod(p);
    }

    const xR = m.pow(new BN(2)).sub(P[0]).sub(Q[0]).umod(p);
    const yR = m.mul(P[0].sub(xR)).sub(P[1]).umod(p);

    return [xR, yR];
}

function scalarMultiplication(k: BN, P: [BN, BN]): [BN, BN] | null {
    let R: [BN, BN] | null = null;
    let N = P;
    while (!k.isZero()) {
        if (k.and(new BN(1)).toNumber()) {
            R = pointAddition(R, N);
        }
        N = pointAddition(N, N)!;
        k = k.shrn(1);
    }
    return R;
}

function generateKeyPair(): { privateKey: BN; publicKey: [BN, BN] } {
    const privateKey = new BN(Array.from(crypto.getRandomValues(new Uint8Array(32)))).umod(n);
    const publicKey = scalarMultiplication(privateKey, G)!;
    return { privateKey, publicKey };
}

function computeSharedSecret(privateKey: BN, publicKey: [BN, BN]): BN {
    const shared = scalarMultiplication(privateKey, publicKey)!;
    return shared[0];
}

const ECDHKeyExchange: React.FC = () => {
    const [output, setOutput] = useState<string | null>(null);

    const handleGenerate = () => {
        const alice = generateKeyPair();
        const bob = generateKeyPair();

        const aliceShared = computeSharedSecret(alice.privateKey, bob.publicKey);
        const bobShared = computeSharedSecret(bob.privateKey, alice.publicKey);

        let result = '';
        result += 'Alice Private Key: 0x' + alice.privateKey.toString(16) + '\n';
        result += 'Alice Public Key:\n';
        result += '  x: 0x' + alice.publicKey[0].toString(16) + '\n';
        result += '  y: 0x' + alice.publicKey[1].toString(16) + '\n\n';

        result += 'Bob Private Key: 0x' + bob.privateKey.toString(16) + '\n';
        result += 'Bob Public Key:\n';
        result += '  x: 0x' + bob.publicKey[0].toString(16) + '\n';
        result += '  y: 0x' + bob.publicKey[1].toString(16) + '\n\n';

        result += 'Alice computes shared secret with Bob\'s public key:\n';
        result += '  0x' + aliceShared.toString(16) + '\n';
        result += 'Bob computes shared secret with Alice\'s public key:\n';
        result += '  0x' + bobShared.toString(16) + '\n\n';

        if (aliceShared.eq(bobShared)) {
            result += '✅ Shared secrets match!';
        } else {
            result += '❌ Shared secrets do not match!';
        }

        setOutput(result);
    };

    useEffect(() => {
        handleGenerate();
    }, []);

    return (
        <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-xl font-bold">Elliptic Curve Diffie-Hellman (ECDH)</h1>
            <hr />
            <button
                onClick={handleGenerate}
                className="px-4 py-2 rounded-lg bg-gray-900 text-green-400 font-mono text-base hover:bg-gray-800 transition"
            >
                Generate Shared Secret
            </button>
            {output && (
                <pre className="bg-black text-white p-4 rounded mt-4 font-mono text-sm whitespace-pre-wrap">
                    {output}
                </pre>
            )}
        </div>
    );
};

export default ECDHKeyExchange;
