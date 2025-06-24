import React, { useState } from 'react';
import { CHeader, CHeaderBrand, CContainer, CRow, CCol } from '@coreui/react';
import Sidebar from './components/Sidebar';
import TablesGenerator from './components/TablesGenerator';
import './App.css';
import EllipticCurvePoints from "./components/EllipticCurvePoints.tsx";
import EllipticCurveGraph from "./components/EllipticCurveGraph.tsx";
import BitcoinAddressGenerator from "./components/BitcoinAddressGenerator.tsx";
import ECDHKeyExchange from "./components/ECDHKeyExchange.tsx";

const App: React.FC = () => {
    const [view, setView] = useState<string>("");

    return (
        <div className="d-flex">
            <Sidebar onSelect={setView} />
            <div className="flex-grow-1">
                <CHeader>
                    <CContainer fluid>
                        <CHeaderBrand
                            role="button"
                            style={{ cursor: "pointer" }}
                            onClick={() => setView("")}
                        >
                            Home
                        </CHeaderBrand>
                    </CContainer>
                </CHeader>

                <CContainer className="mt-4">
                    <CRow className="mb-4">
                        <CCol>
                            {view === "" && <EllipticCurveGraph />}
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            {view === "graph" && <EllipticCurveGraph />}
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            {view === "table" && <TablesGenerator />}
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            {view === "curvePoints" && <EllipticCurvePoints />}
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            {view === "bitcoinAddress" && <BitcoinAddressGenerator />}
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            {view === "ecdhKeyExchange" && <ECDHKeyExchange />}
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </div>
    );
}

export default App;
