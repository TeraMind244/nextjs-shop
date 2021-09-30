module.exports = {
	async redirects() {
		return [
			{
				source: "/home",
				destination: "/",
				permanent: true
			}
		];
	}
};

const infiniteCurry = (fn, initial) => {
	return (function wrapperCurried(a) {
		let acc = a;
		function curried(b) {
			acc = fn(a, b);
			this.toString = () => acc;
			return wrapperCurried(acc);
		}
		curried.toString = () => acc;
		return curried;
	})(initial);
}

