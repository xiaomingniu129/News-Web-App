export const animate = (
	{ frameRate, x, v, destX, k, b, precision, mass, key, el },
	fn
) => {
	// x start position
	// v velocity
	let newX = x,
		newV = v;

	const animationLoop = () => {
		// Spring stiffness, in kg / s^2

		// for animations, destX is really spring length (spring at rest). initial
		// position is considered as the stretched/compressed position of a spring
		let Fspring = -k * (newX - destX);

		// Damping, in kg / s
		let Fdamper = -b * newV;

		// Accelaration ((-k * (x-X)) + (-b * v))
		let a = (Fspring + Fdamper) / mass;

		// framRate of 1000/60 thats 60fps
		newV += a * (frameRate / 1000);

		newX += newV * (frameRate / 1000);

		// precision is when the animation should stop default is 0.01.
		if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
			newX = destX;
			newV = 0;
			el.style[key] = `${newX}px`;
			return typeof fn === 'function' ? fn.call() : false;
		}
		if (el) el.style[key] = `${newX}px`;
		requestAnimationFrame(animationLoop);
	};

	requestAnimationFrame(animationLoop);
};

export const preset = {
	noWobble: { stiffness: 170, damping: 26 },
	gentle: { stiffness: 120, damping: 14 },
	wobbly: { stiffness: 180, damping: 12 },
	stiff: { stiffness: 210, damping: 20 },
	slow: { stiffness: 280, damping: 60 },
	molasses: { stiffness: 280, damping: 120 }
};
