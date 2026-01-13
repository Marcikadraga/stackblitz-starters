function drawCanvas(canvas, twoDArray, pixelSize) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Canvas context not found!');
    return;
  }

  if (!twoDArray || twoDArray.length === 0 || twoDArray[0].length === 0) {
    console.warn('drawCanvas: Provided array is empty or malformed.');
    return;
  }

  canvas.width = pixelSize * twoDArray[0].length;
  canvas.height = pixelSize * twoDArray.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < twoDArray.length; y++) {
    for (let x = 0; x < twoDArray[y].length; x++) {
      const [r, g, b, a] = twoDArray[y][x];
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
}
