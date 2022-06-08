import { Status } from '@googlemaps/react-wrapper';
import { Title } from '@mantine/core';
import React, { useRef, useState, useEffect } from 'react';

export const render = (status: Status) => <Title order={2}>{status}</Title>;

export function MyMapComponent({
  center,
  zoom,
  children,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
        })
      );
    }
  }, [ref, map]);
  return (
    <>
      <div
        ref={ref}
        id="map"
        style={{
          height: '100%',
          width: '100%',
          flexGrow: 1,
          minWidth: '288px',
          minHeight: '296px',
        }}
      />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
        return null;
      })}
    </>
  );
}
export const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};
