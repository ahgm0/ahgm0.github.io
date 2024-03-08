var container = document.getElementById('container');
var bordersArray = ['50%', '0'];
var blursArray = ['0', '5px'];
var colorsArray = ['#FF6B6B', '#FFE66D', '#4472CA' ];
var width = document.documentElement.clientWidth;
var hidth = document.documentElement.clientHeight;
var count = 40;

function createElementRandom(){
	for(var i = 0; i<=count; i++){
		var randomLeft = Math.floor(Math.random()*width);
		var randomTop = Math.floor(Math.random()*hidth);
		var color = Math.floor(Math.random()*3);
		var boder = Math.floor(Math.random()*2);
		var blur = Math.floor(Math.random()*2);
		var widthElement = Math.floor(Math.random()*5)+5;
		var timeAnimation = Math.floor(Math.random()*8)+5;

		var div = document.createElement("div");
		div.style.backgroundColor = colorsArray[color];
		div.style.position = 'absolute';
		div.style.width = widthElement+"px";
		div.style.height = widthElement+"px";
		div.style.marginLeft = randomLeft+"px";
		div.style.marginTop = randomTop+"px";
		div.style.borderRadius = bordersArray[boder];
		div.style.filler = 'blur('+blursArray[blur]+')';
		div.style.animation = 'move '+timeAnimation+'s ease-in infinite';
		container.appendChild(div);
	}
}
createElementRandom()
var audio = document.querySelector("audio");
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var audioContext;
var source;
var analyser;

function startAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        source = audioContext.createMediaElementSource(audio);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        draw(); // Chỉ gọi hàm draw() sau khi AudioContext đã được khởi tạo
    } else if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

document.body.addEventListener('click', startAudioContext);
document.body.addEventListener('touchstart', startAudioContext);

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight * 0.3; // Giới hạn chiều cao của canvas
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function draw() {
	var freqData = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(freqData);
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < freqData.length; i++) {
		var barHeight = freqData[i];
		var hue = i / freqData.length * 360;
		var lightness = Math.max(0, Math.min(80, barHeight / 255 * 100));
		context.fillStyle = 'hsl(' + hue + ', 100%, ' + lightness + '%)';
		context.fillRect(i * 3, canvas.height / 2 - barHeight / 4, 2, barHeight / 2);
	}
	requestAnimationFrame(draw);
}

audio.volume = 0.5
