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
                <CNavTitle>ECC</CNavTitle>
                <CNavItem href="#" onClick={() => onSelect("table")}>
                    <CiViewTable style={{ marginRight: '8px' }} />
                    Tables Generator
                </CNavItem>
                <CNavItem href="#" onClick={() => onSelect("curvePoints")}>
                    <LuWaypoints style={{ marginRight: '8px' }} />
                    Elliptic Curve Points
                </CNavItem>
            </CSidebarNav>
        </CSidebar>
    );
};

export default Sidebar;
