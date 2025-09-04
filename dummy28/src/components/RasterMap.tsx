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
    if (!file || !mapRef.current) return; // Comprobar si file y mapRef.current son válidos

    const loadRasterMap = async () => {
      const L = await import("leaflet");
      const parseGeoraster = (await import("georaster")).default;
      const GeoRasterLayer = (await import("georaster-layer-for-leaflet")).default;

      // Limpiar el mapa anterior si existe
      if (mapInstance.current) {
        mapInstance.current.remove(); // Limpiar la instancia anterior
        mapInstance.current = null; // Asegurarse de que la instancia es nula
      }

      // Limpiar el contenedor del mapa antes de crear uno nuevo
      if (mapRef.current) {
        mapRef.current.innerHTML = ""; // Limpiar el contenedor para evitar el error
      }

      const response = await file.arrayBuffer();
      const georaster = await parseGeoraster(response);

      // Crear una nueva instancia del mapa si mapRef.current no es null
      mapInstance.current = L.map(mapRef.current as HTMLElement).setView([4.5709, -74.2973], 6);

      // Base OSM
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance.current);

      // Capa R
      const layerR = new GeoRasterLayer({
        georaster,
        bandIndex: [1], // Red band
        opacity: 0.2,
        resolution: 256,
        colorMode: "rgba",
        colorFunction: (value: 0) => [value, 0, 0, 100],
      });
      layerR.addTo(mapInstance.current);

      // Capa G
      const layerG = new GeoRasterLayer({
        georaster,
        bandIndex: [2], // Green band
        opacity: 0.2,
        resolution: 256,
        colorMode: "rgba",
        colorFunction: (value: 0) => [0, value, 0, 100],
      });
      layerG.addTo(mapInstance.current);

      // Capa B
      const layerB = new GeoRasterLayer({
        georaster,
        bandIndex: [3], // Blue band
        opacity: 0.2,
        resolution: 256,
        colorMode: "rgba",
        colorFunction: (value: 0) => [0, 0, value, 100],
      });
      layerB.addTo(mapInstance.current);

      // Capa A
      const layerA = new GeoRasterLayer({
        georaster,
        bandIndex: [4], // Alpha band
        opacity: 0,
        resolution: 256,
        colorMode: "rgba",
        colorFunction: (value: 0) => [0, 0, 0, value],
      });
      layerA.addTo(mapInstance.current);

      // Ajustar vista al raster
      const allBounds = L.latLngBounds([
        layerR.getBounds().getSouthWest(),
        layerR.getBounds().getNorthEast(),
      ]);
      mapInstance.current.fitBounds(allBounds);
    };

    loadRasterMap();

    // Cleanup: Remover el mapa cuando el componente se desmonte o cuando el archivo cambie
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove(); // Limpiar el mapa anterior
        mapInstance.current = null; // Asegurarse de que la instancia es nula
      }
    };
  }, [file]); // Solo se ejecuta cuando cambia el archivo

  return (
    <div
      ref={mapRef} // Refiere al div donde se inicializa el mapa
      style={{ height: "500px", width: "100%" }}
    ></div>
  );
};

export default RasterMap;
