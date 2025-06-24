import React, { useState } from 'react';
import { ec as EC } from 'elliptic';
import bs58 from 'bs58';
import hash from 'hash.js';

const ec = new EC('secp256k1');

async function sha256(data: Uint8Array): Promise<Uint8Array> {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return new Uint8Array(hashBuffer);
}

function hexToUint8Array(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes;
}

function ripemd160(data: Uint8Array): Uint8Array {
    const hex = hash.ripemd160().update(data).digest('hex');
    return hexToUint8Array(hex);
}

async function generateBitcoinAddress(): Promise<string> {
    const key = ec.genKeyPair();
    const publicKey = key.getPublic();
    const pubKeyBytes = new Uint8Array(publicKey.encode('array', false));

    const sha256Hash = await sha256(pubKeyBytes);
    const ripemd160Hash = ripemd160(sha256Hash);

    const versionedPayload = new Uint8Array(1 + ripemd160Hash.length);
    versionedPayload[0] = 0x00;
    versionedPayload.set(ripemd160Hash, 1);

    const hash1 = await sha256(versionedPayload);
    const hash2 = await sha256(hash1);
    const checksum = hash2.slice(0, 4);

    const addressBytes = new Uint8Array(versionedPayload.length + 4);
    addressBytes.set(versionedPayload, 0);
    addressBytes.set(checksum, versionedPayload.length);

    return bs58.encode(addressBytes);
}

const BitcoinAddressGenerator: React.FC = () => {
    const [address, setAddress] = useState<string | null>(null);

    const handleGenerate = async () => {
        const addr = await generateBitcoinAddress();
        setAddress(addr);
    };

    return (
        <div className="p-4 rounded-xl shadow-md bg-white text-gray-800 w-full max-w-lg mx-auto mt-10 space-y-4">
            <h1 className="text-xl font-semibold">Bitcoin Address Generator</h1>
            <hr className="my-2 border-gray-300"/>
            <button
                onClick={handleGenerate}
                className="px-4 py-2 rounded-lg bg-gray-900 text-green-400 font-mono text-base hover:bg-gray-800 transition"
            >
                Generate Address
            </button>
            {address && (
                <pre className="bg-black text-white p-4 rounded mt-4 font-mono text-sm">
                    {`Generated Address: ${address}`}
                </pre>
            )}
        </div>
    );
};

export default BitcoinAddressGenerator;
