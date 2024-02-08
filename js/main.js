const config = {
    'lineSize': 5,
    'color': 'black',
	'color_range': ['blue', 'yellow']
}

window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
	const resetBtn = document.getElementById('resetBtn');
	const drawBtn = document.getElementById('drawBtn');

    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight - 80);

    ctx.lineWidth = config.lineSize;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = config.color;
    ctx.fillStyle = config.color;

    var posX = [],
        posY = []
	var pointNum = 1;
	
    canvas.addEventListener("mousedown", (e) => {
		if(pointNum > 4) return;
		recordMousePos(e.clientX, e.clientY);
		document.getElementById("point" + pointNum + "-X").value = e.clientX;
		document.getElementById("point" + pointNum + "-Y").value = e.clientY;
		if(pointNum == 2)
			drawCircle(posX[pointNum-2], posY[pointNum-2], 
				calcRad(posX[pointNum-2], posY[pointNum-2], e.clientX, e.clientY), config.color_range[0]);
		if(pointNum == 4)
			drawCircle(posX[pointNum-2], posY[pointNum-2], 
				calcRad(posX[pointNum-2], posY[pointNum-2], e.clientX, e.clientY), config.color_range[1]);
		drawPoint(e.clientX, e.clientY);
		pointNum += 1;
    });
	
	resetBtn.addEventListener("click", () => resetCanvas());
	drawBtn.addEventListener("click", () => drawImage());
	
	for (var i = 1; i <= 4; i++) {
		document.getElementById("point" + i + "-X").addEventListener("change", () => {
			clearCanvas();
			drawImage();
		})
	}
	
	function clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.beginPath();
		cposX = [];
		posY = [];
		pointNum = 1;
	}
	
    document.addEventListener("keydown", (e) => {
        if(e.code == "Space") {
			resetCanvas();
        }
    })
	
	function resetCanvas(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.beginPath();
		posX = [];
		posY = [];
		pointNum = 1;
		ctx.strokeStyle = config.color;
		document.getElementById("point1-X").value = "";
		document.getElementById("point1-Y").value = "";
		document.getElementById("point2-X").value = "";
		document.getElementById("point2-Y").value = "";
		document.getElementById("point3-X").value = "";
		document.getElementById("point3-Y").value = "";
		document.getElementById("point4-X").value = "";
		document.getElementById("point4-Y").value = "";
	}

    function recordMousePos(pointX, pointY) {
        posX.push(pointX);
        posY.push(pointY);
    }
	
	function calcRad(x1, y1, x2, y2){
		return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
	}
	
	function drawCircle(xCent, yCent, rad, color){
		ctx.beginPath();
		ctx.strokeStyle = color;
		//document.getElementById("point" + 1 + "-X").value = rad;
		ctx.arc(xCent, yCent, rad, 0, 2 * Math.PI);
		ctx.stroke();
	}
	
	function drawImage(){
		for (var i = 1; i <= 4; i++) { 
			var pointX = parseInt(document.getElementById("point" + i + "-X").value);
			var pointY = parseInt(document.getElementById("point" + i + "-Y").value);
		    recordMousePos(pointX, pointY);
			if(i%2 == 0)
				drawCircle(posX[i-2], posY[i-2], 
					calcRad(posX[i-2], posY[i-2], pointX, pointY), config.color_range[i/2-1]);
			drawPoint(pointX, pointY);
		}
		pointNum = 5;
		
	}

    function drawPoint(x, y) {
		ctx.beginPath();
		ctx.strokeStyle = config.color;
		ctx.moveTo(x-1, y-1);
        ctx.lineTo(x, y);
        ctx.stroke();
    }  
}