import React from "react";
import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CNavItem,
    CNavTitle,
} from '@coreui/react'
import { CiViewTable } from "react-icons/ci";
import { BiMath } from "react-icons/bi";
import { LuWaypoints } from "react-icons/lu";
import { VscGraphLine } from "react-icons/vsc";
import { FaBitcoinSign } from "react-icons/fa6";
import { TbExchange } from "react-icons/tb";


type SidebarProps = {
    onSelect: (view: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
    return (
        <CSidebar className="border-end sidebar" colorScheme="dark">
            <CSidebarHeader className="border-bottom">
                <CSidebarBrand>
                    <BiMath style={{ marginRight: '8px' }} />
                    Elliptic Curves
                </CSidebarBrand>
            </CSidebarHeader>
            <CSidebarNav>
                <CNavTitle>Dashboard</CNavTitle>
                <CNavItem href="#" onClick={() => onSelect("graph")}>
                    <VscGraphLine style={{ marginRight: '8px' }} />
                    Elliptic Curves Graph
                </CNavItem>
                <CNavTitle>EC</CNavTitle>
                <CNavItem href="#" onClick={() => onSelect("curvePoints")}>
                    <LuWaypoints style={{ marginRight: '8px' }} />
                    Elliptic Curve Points
                </CNavItem>
                <CNavItem href="#" onClick={() => onSelect("table")}>
                    <CiViewTable style={{ marginRight: '8px' }} />
                    Tables Generator
                </CNavItem>
                <CNavTitle>ECC</CNavTitle>
                <CNavItem href="#" onClick={() => onSelect("bitcoinAddress")}>
                    <FaBitcoinSign style={{ marginRight: '8px' }} />
                    Bitcoin Address
                </CNavItem>
                <CNavItem href="#" onClick={() => onSelect("ecdhKeyExchange")}>
                    <TbExchange style={{ marginRight: '8px' }} />
                    ECDH Key Exchange
                </CNavItem>
            </CSidebarNav>
        </CSidebar>
    );
};

export default Sidebar;
