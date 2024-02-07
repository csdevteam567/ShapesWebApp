const config = {
    'lineSize': 5,
    'color': 'black'
}

window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
	const resetBtn = document.getElementById('resetBtn');

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
		drawLine(e.clientX, e.clientY);
		document.getElementById("point" + pointNum + "-X").value = e.clientX;
		document.getElementById("point" + pointNum + "-Y").value = e.clientY;
		pointNum += 1;
    });
	
	resetBtn.addEventListener("click", () => resetCanvas());
	
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
		document.getElementById("point1-X").value = "";
		document.getElementById("point1-Y").value = "";
		document.getElementById("point2-X").value = "";
		document.getElementById("point2-Y").value = "";
		document.getElementById("point3-X").value = "";
		document.getElementById("point3-Y").value = "";
		document.getElementById("point4-X").value = "";
		document.getElementById("point4-Y").value = "";
	}

    function recordMousePos(e) {
        posX.push(e.clientX);
        posY.push(e.clientY);
        //drawLine(e.clientX, e.clientY);
    }

    function drawLine(x, y) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }  
}