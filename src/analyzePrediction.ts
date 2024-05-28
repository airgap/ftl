import { Point3D } from "./Point3D";
import { state } from "./state";
import { prehoverClass, unhoverClass } from "./classes";
import { dispatchEventOnElement } from "./dispatchEventOnElement";

// Analyze a prediction and trigger appropriate events on the predicted element
export const analyzePrediction = (prediction: Point3D) => {
  // Get the element at the foreseen position
  const elementAtPoint = document.elementFromPoint(prediction.x, prediction.y),
    // The ancestors of the foreseen element
    prehoveredAncestors = [],
    // The ancestors of the last forseen element
    lastAncestors = [];

  // The element each portion of this method is currently focusing on
  // Starts as the last foreseen element
  let currentElement: Element | ParentNode | undefined =
    state.prehoveredElement;

  // if (the last foreseen element exists) and either
  // ((the new foreseen element doesn't exist) or (is equal to the last foreseen element))
  if (
    state.prehoveredElement &&
    (!elementAtPoint || elementAtPoint !== state.prehoveredElement)
  ) {
    // Remove the last foreseen element's 'prehover' class
    state.prehoveredElement.classList.remove(prehoverClass);

    // Dispatch an event on the element saying it is no longer foreseen as being hovered over
    dispatchEventOnElement(state.prehoveredElement, unhoverClass);
  }

  // if (the new foreseen element exists) and is not equal to the last foreseen element
  if (
    elementAtPoint &&
    state.prehoveredElement !== elementAtPoint &&
    currentElement
  ) {
    // Push each ancestor of the last foreseen element to an array
    while (currentElement.parentNode)
      lastAncestors.push((currentElement = currentElement.parentNode));
  }
  if (!elementAtPoint) return;
  // Now focus on the new foreseen element
  currentElement = elementAtPoint;

  // Push each ancestor of the new foreseen element to an array
  while (currentElement.parentNode)
    prehoveredAncestors.push((currentElement = currentElement.parentNode));

  // Iterate over each of the old foreseen element's ancestors
  for (currentElement of lastAncestors) {
    // If the element exists and is not also an ancestor of the new prehovered element...
    if (
      currentElement instanceof Element &&
      prehoveredAncestors.includes(currentElement)
    ) {
      // ...remove its 'prehover' class
      currentElement.classList.remove(prehoverClass);
    }
  }

  // Iterate over each of the new foreseen element's ancestors
  for (const el of prehoveredAncestors) {
    // If the element exists and is not a member of the old element's ancestors...
    if (el instanceof Element && lastAncestors.indexOf(el) < 0) {
      // ...give it the 'prehover' class
      el.classList.add(prehoverClass);
    }
  }

  // Give the new foreseen element itself the 'prehover' class
  elementAtPoint.classList.add(prehoverClass);

  // Dispatch the 'prehover' event on the new foreseen element,
  // including the confidence level as the detail
  dispatchEventOnElement(elementAtPoint, prehoverClass, prediction);

  // Store the new foreseen element for future use (it is now the 'last' foreseen element)
  state.prehoveredElement = elementAtPoint;
};
