"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  async () => (await import("react-leaflet")).MapContainer,
  { ssr: false }
);

const TileLayer = dynamic(
  async () => (await import("react-leaflet")).TileLayer,
  { ssr: false }
);

const RasterMap = ({ file }: { file?: File | null }) => {
  const mapRef = useRef<HTMLDivElement | null>(null); // Referencia al contenedor del mapa
  const mapInstance = useRef<any>(null); // Referencia para la instancia de Leaflet

  useEffect(() => {

      //if (!file || !mapRef.current) return;

        const loadRasterMap = async () => {
            const L = await import("leaflet");
            const parseGeoraster = (await import("georaster")).default;
            const GeoRasterLayer = (await import("georaster-layer-for-leaflet")).default;

            //cargarr el archivo .tif
            const response = await fetch("/data/black.tif");
            const arrayBuffer = await response.arrayBuffer();
            const georaster = await parseGeoraster(arrayBuffer);

            const map = L.map("map").setView([4.5709, -74.2973], 6);

            //Base OSM
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors",
            }).addTo(map);

            //capa raster
            /*const rasterLayer = new GeoRasterLayer({
                georaster,
                opacity: 0.7,
                resolution: 256,
            });
            
            rasterLayer.addTo(map);
            map.fitBounds(rasterLayer.getBounds());*/
            

            //capa R
            const layerR = new GeoRasterLayer({
                georaster,
                bandIndex: [1],
                opacity: 0.2,
                resolution: 256,
                colorMode: "rgba",
                colorFunction: (value: 0) => [value, 0, 0, 100]
            });

            layerR.addTo(map);


            //capa G
            const layerG = new GeoRasterLayer({
                georaster,
                bandIndex: [2],
                opacity: 0.2,
                resolution: 256,
                colorMode: "rgba",
                colorFunction: (value: 0) => [0, value, 0, 100]
            });

            layerG.addTo(map);

            //capa B
            const layerB = new GeoRasterLayer({
                georaster,
                bandIndex: [3], 
                opacity: 0.2,
                resolution: 256,
                colorMode: "rgba",
                colorFunction: (value: 0) => [0, 0, value, 100]
            });
            layerB.addTo(map);

            //capa A
            const layerA = new GeoRasterLayer({
                georaster,
                bandIndex: [4], 
                opacity: 0,
                resolution: 256,
                colorMode: "rgba",
                colorFunction: (value: 0) => [0, 0, 0, value]
            });
            layerA.addTo(map);

            //ajustar vista al raster
            const allbounds = L.latLngBounds([
                layerR.getBounds().getSouthWest(),
                layerR.getBounds().getNorthEast()   
                ]
            );
            map.fitBounds(allbounds);
        };
        loadRasterMap();


    }, []); 
    return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
}

export default RasterMap;
