import { lock200 } from "./lock200";
import { state } from "./state";
import { dispatchEventOnElement } from "./dispatchEventOnElement";
import { Point3D } from "./Point3D";
import { analyzePrediction } from "./analyzePrediction";

// Generate a predicted hover location based on the mouse's current and last positions
export const generatePrediction = (x: number, y: number) => {
  const // Subtract the old X and Y coords from the new X and Y coords and multiply the result by 4
    // to get the relative position of the foreseen location from the current cursor location
    dx = lock200((x - state.lastPos.x) * 4),
    dy = lock200((y - state.lastPos.y) * 4),
    // Add the relative foreseen location to the current absolute location to get the absolute
    // foreseen mouse location
    predictionPos = {
      x: x + dx, // X location
      y: y + dy, // Y location
      d: Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5), // Inverse confidence
    } satisfies Point3D;

  // Dispatch the 'precursormove' event on the document, including the x, y, and confidence values
  dispatchEventOnElement(document, "precursormove", predictionPos);

  // Analyze the prediction to trigger the appropriate 'prehover' and 'erphover' events and assign
  // the 'prehover' class to the appropriate elements
  analyzePrediction(predictionPos);

  // Store the current mouse location for later use (it is now the 'last' location)
  state.lastPos = { x, y };
};
