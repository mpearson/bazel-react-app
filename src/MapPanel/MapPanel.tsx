import React from 'react';
import { IDockviewPanelProps } from 'dockview';
import ReactMap, { useControl, MapRef, NavigationControl } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
import { PathLayer } from '@deck.gl/layers/typed';

import styles from "./MapPanel.module.scss";

import { hexToRgb } from '../utils';

import pathData from './pathData.json';

const DeckGLOverlay = (props: MapboxOverlayProps & {
  interleaved?: boolean;
}) => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

/**
 * Panel component for the moving map.
 */
const MapPanel = (props: IDockviewPanelProps) => {
  const mapRef = React.useRef<MapRef>(null);

  // Resize map if the dockview panel changes size
  React.useEffect(() => {
    props.api.onDidDimensionsChange(() => { mapRef.current?.getMap()?.resize(); });
  }, []);

  const optimizedWaypointPathLayer = new PathLayer({
    id: 'optimized-waypoint-path-layer',
    data: [pathData[1]],
    pickable: true,
    widthUnits: "pixels",
    billboard: true,
    getPath: d => d.path,
    getColor: d => hexToRgb("#01aee4"),
    getWidth: d => d.width,
    parameters: {
      depthTest: false,
    },
  });

  return (
    <div className={"generic-panel " + styles.mapPanel}>

      <ReactMap
        mapLib={maplibregl}
        initialViewState={{
          latitude: 34.65244521194879,
          longitude: -117.60287294765676,
          zoom: 13
        }}
        mapStyle='https://api.maptiler.com/maps/hybrid/style.json?key=XXXXXXXXXXXXXXX'
        ref={mapRef}
      >
        <NavigationControl position='top-right' />
        <DeckGLOverlay layers={[optimizedWaypointPathLayer]} />
      </ReactMap>
    </div>
  );
};

export default MapPanel;
