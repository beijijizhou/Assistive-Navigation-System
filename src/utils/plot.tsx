/* eslint-disable @typescript-eslint/no-unused-vars */
import { LandmarkType, PedestrianRampwayType, LngLatPoint, ColorHexCodes } from "../Type";
import useStore from "../store";
import { AdvancedMarker } from '@vis.gl/react-google-maps';
// import { WKBArrayToMultiPolygon } from '../utils/readWKB';
import { landmarkURLMap } from "../assets/icon";
import { Geometry } from "../Type";
import { getPolygonPaths, isPointInMultiPolygon } from "./geometryUtil";
import { distanceInTurf } from "./navigationUtil/navigation";
export const plotMultiPolygonOnMap = (geometry: Geometry) => {
  const { map, mapsLib } = useStore.getState();
  const polygonPaths = getPolygonPaths(geometry)

  polygonPaths.forEach((paths) => {
    // Create the polygon
    const newPolygon = new mapsLib!.Polygon({
      paths,
      strokeColor: '#000000',
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillOpacity: 0.1,
    });

    // Add polygon to map
    newPolygon.setMap(map);
  });
}
export const plotMarker = (point: LngLatPoint, color?: string) => {
  const { map, markerLib } = useStore.getState();
  const pt = { lat: point[1], lng: point[0] };
  const pin = new markerLib!.PinElement({
    background: color || ColorHexCodes.Red,
    borderColor: color || ColorHexCodes.Red,
  });
  const marker = new markerLib!.AdvancedMarkerElement({
    map: map!,
    position: pt,
    content: pin.element
  })
}
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const plotSideWalkInMarkers = async (coordinates: LngLatPoint[]) => {

  for (let i = 0; i < coordinates.length; i++) {
    const coordinate = coordinates[i];
    if (i > 0) {
      const d = distanceInTurf(coordinates[i], coordinates[i - 1]);

    }
    plotMarker(coordinate)
    // await delay(100); 
  }
}
export const plotAllSideWalkInMarkers = async (segements: LngLatPoint[][]) => {
  for (const segement of segements) {
    plotSideWalkInMarkers(segement);

    await delay(1000);
  }
}
export const plotSideWalk = (lineSegment: LngLatPoint[]) => {
  const { map, mapsLib } = useStore.getState();
  const LineSegmentCoordinates = lineSegment.map(([lng, lat]) => ({ lat, lng }));
  const lineString = new mapsLib!.Polyline({
    path: LineSegmentCoordinates,
    geodesic: true,
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  lineString.setMap(map);
}

const createPoints = (geometry: Geometry) => {
  const url = landmarkURLMap[geometry.landmarkType];
  if (url == "") {
    // console.log(geometry.landmarkType)
  }
  return (
    <AdvancedMarker
      position={{ lat: geometry.coordinates[1] as number, lng: geometry.coordinates[0] as number }}
    >
      <img src={url} width={32} height={32} />
    </AdvancedMarker>
  );
};

export const getCurrentBlockLandmarks = (geometry: Geometry) => {
  const { origin } = useStore.getState()

  if (geometry.landmarkType == LandmarkType.Sidewalk) {

    if (isPointInMultiPolygon(origin, geometry)) {
      plotMultiPolygonOnMap(geometry)
    }

    return <div></div>
  }
  if (geometry.landmarkType == LandmarkType.Building) {
    // plotMultiPolygonOnMap(geometry)
  }
  if (Object.values(PedestrianRampwayType).includes(geometry.landmarkType as unknown as PedestrianRampwayType)) {


    return createPoints(geometry)
  }

  return <div></div>
}







