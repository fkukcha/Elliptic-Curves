import React, { useState } from 'react';
import { CHeader, CHeaderBrand, CContainer, CRow, CCol } from '@coreui/react';
import Sidebar from './components/Sidebar';
import TablesGenerator from './components/TablesGenerator';
import './App.css';
import EllipticCurvePoints from "./components/EllipticCurvePoints.tsx";

const App: React.FC = () => {
    const [view, setView] = useState<string>("");

    return (
        <div className="d-flex">
            <Sidebar onSelect={setView} />
            <div className="flex-grow-1">
                <CHeader>
                    <CContainer fluid>
                        <CHeaderBrand href="#">Home</CHeaderBrand>
                    </CContainer>
                </CHeader>

                <CContainer className="mt-4">
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
                </CContainer>
            </div>
        </div>
    );
}

export default App;
