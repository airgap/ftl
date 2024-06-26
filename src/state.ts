import {type Point2D} from './Point2D';

type State = {
	// The element currently anticipated to be hovered over
	prehoveredElement?: Element;

	// The cursor's last position, defaults to 0,0
	lastPos: Point2D;
	lastTime?: number;
};
export const state: State = {
	lastPos: {
		x: 0,
		y: 0,
	},
};
