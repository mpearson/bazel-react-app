import React from 'react';
import '../../node_modules/dockview/dist/styles/dockview.css';
import './DockLayout.scss';

import {
  DockviewReact,
  DockviewReadyEvent,
  PanelCollection,
  IDockviewPanelProps,
} from 'dockview';

import MapPanel from '../MapPanel/MapPanel';


export const CounterDockPanel = (props: IDockviewPanelProps<{text: string}>) => {
  const [count, setCount] = React.useState(0);
  return <div className="generic-panel">
    {props.params.text}
    <br />
    <button onClick={() => setCount(count + 1)}>
      Clicked {count}x
    </button>
  </div>;
}

export const ImageDockPanel = (props: IDockviewPanelProps<{text: string}>) => {
  return <div className="generic-panel">
    <span>Example text</span>
    <img src="logo192.png" />
  </div>;
}

const PANEL_REGISTRY: PanelCollection<IDockviewPanelProps> = {
  counter: CounterDockPanel,
  image: ImageDockPanel,
  mapPanel: MapPanel,
};

const DockLayout = () => {
  const onReady = (event: DockviewReadyEvent) => {
    event.api.addPanel({
      id: 'mapPanel',
      title: 'Moving Map',
      component: 'mapPanel',
    });
    event.api.addPanel({
      id: 'counterPanel',
      title: 'Counter',
      component: 'counter',
      params: {
        text: 'Click here to increase the count',
      },
      position: { referencePanel: 'mapPanel', direction: 'left' },
    });
    event.api.addPanel({
      id: 'imagePanel',
      title: 'Random Image',
      component: 'image',
      position: { referencePanel: 'counterPanel', direction: 'below' },
    });
  };

  return (
    <DockviewReact
      components={PANEL_REGISTRY}
      onReady={onReady}
    />
  );
};

export default DockLayout;
