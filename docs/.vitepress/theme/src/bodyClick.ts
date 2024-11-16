export function bodyClick() {
	let a_idx = 0;
	function click(e: MouseEvent) {
		// console.log('bodyClick');
		const a = [
			'❤Go❤',
			'❤ヾ(^∀^)ﾉ ',
			'❤python❤',
			'❤٩(๑❛ᴗ❛๑)۶ ❤',
			'❤java❤',
			'❤( • ω• )✧ ❤',
			'❤C#❤',
			'❤┗(•ω•;)┛❤',
			'❤C++❤',
			'❤(＾＿－)❤',
			'❤SQL❤',
			'❤(^_−)☆❤',
			'❤javascrpit❤',
			'❤ヾ(@^▽^@)ノ❤',
		];
		const span = document.createElement('span');
		a_idx = (a_idx + 1) % a.length;
		span.textContent = a[a_idx];
		const x = e.pageX;
		const y = e.pageY;
		span.style.zIndex = '99999';
		span.style.top = `${y - 20}px`;
		span.style.left = `${x}px`;
		span.style.position = 'absolute';
		span.style.fontWeight = 'bold';
		span.style.color = `rgb(${~~(255 * Math.random())},${~~(255 * Math.random())},${~~(255 * Math.random())})`;

		document.body.appendChild(span);

		span.animate(
			[
				{ top: `${y - 20}px`, opacity: 1 },
				{ top: `${y - 180}px`, opacity: 0 },
			],
			{
				duration: 2500,
				easing: 'ease',
				fill: 'both',
			},
		).onfinish = () => {
			span.remove();
		};
	}

	document.body.addEventListener('click', click);
}
