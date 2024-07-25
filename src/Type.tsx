export type locationType = string | google.maps.LatLng | google.maps.Place | google.maps.LatLngLiteral;
export type LngLatPoint = [number, number]
export type originLocationType = google.maps.LatLngLiteral | null | undefined;
export type coordinatesArray = [[LngLatPoint[], LngLatPoint[]]]
export interface MultiPolygon {
  type: "MultiPolygon",
  coordinates: LngLatPoint[][][];
}
export enum LookUpTableType {
  Distance = 'distance',
  Time = "time",
}

export type WKBStringArray = [wkb: string, type: string];
type Lng = number;
type Lat = number;
export enum GeometryType {
  Point = "Point",
  MultiPolygon = "MultiPolygon"
}
export enum LandmarkType {
  KnobPull = "Knob - Pull",
  DoorDouble = "Door - Double",
  DoorSingle = "Door - Single",
  Stairs = "Stairs",
  FireHydrant = "Fire Hydrant",
  Sidewalk = "Sidewalk",
  Building = "Building",
  KnobNoSubtype = "Knob - No Subtype",
  Tree = "Tree",
  PedestrianRampwayConditionMissing = "Pedestrian Rampway - Condition Missing",
  PedestrianRampwayGoodCondition = "Pedestrian Rampway - Good Condition",
  PedestrianRampwayDefective = "Pedestrian Rampway - Defective"
}

export type Geometry = {
  type: GeometryType,
  landmarkType: LandmarkType,
  coordinates: [Lng, Lat] | LngLatPoint[][][],
}

