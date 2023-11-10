"use client"

import * as React from 'react';
import "@/assets/css/goongjs.css";
import { useState } from 'react';
import MapGL from '@goongmaps/goong-map-react';
const GOONG_MAPTILES_KEY = 'NADV4fh80lHQdzy2l4QHrffZMJKuzxPPsFtR4Ro9';

export function Map() {
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 21.037616485421726,
        longitude: 105.78346445470073,
        zoom: 15
    });

    return (
        <MapGL
            {...viewport}
            height="100vh"
            width="auto"
            onViewportChange={setViewport}
            goongApiAccessToken={GOONG_MAPTILES_KEY}
        />
    );
}