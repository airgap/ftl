import { Point2D } from "./Point2D";

export type Point3D = Point2D & {
  d: number; // Inverse confidence of prediction (lower is better)
};
