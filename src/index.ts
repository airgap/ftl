import {generatePrediction} from './generatePrediction';

// Bind that event handler to the document's 'mousemove' event
document.addEventListener('mousemove', ({clientX, clientY}) => {
	generatePrediction(clientX, clientY);
});
