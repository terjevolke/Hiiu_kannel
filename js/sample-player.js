let online = true;

// define sample files
const files = [
  "pack-1/0 - A.wav", "pack-1/1 - D.wav", "pack-1/2 - E.wav", "pack-1/3 - F Sharp.wav", "pack-1/4 - G.wav", "pack-1/5 - A.wav", "pack-1/6 - B.wav", "pack-1/A7.wav", "pack-1/8 - D.wav", "pack-1/E Minor.wav", "pack-1/G.wav"
];
let sounds = Array(files.length);


// P5.js sound analyzer
// visualization uses this
let fft;
// visualization parameters
let spectrum, energy, size;


// playing with keyboard
document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  if(online == true){
    switch (keyName) {
      case 'a':
        socket.emit("send-data", {"sample": 0} );
        break;
      case 's':
        socket.emit("send-data", {"sample": 1} );
        break;
      case 'd':
        socket.emit("send-data", {"sample": 2} );
        break;
      case 'f':
        socket.emit("send-data", {"sample": 3} );
        break;
      case 'g':
        socket.emit("send-data", {"sample": 4} );
        break;
      case 'h':
        socket.emit("send-data", {"sample": 5} );
        break;
      case 'j':
        socket.emit("send-data", {"sample": 6} );
        break;
      case 'k':
        socket.emit("send-data", {"sample": 7} );
        break;
      case 'l':
        socket.emit("send-data", {"sample": 8} );
        break;
      case 'z':
        socket.emit("send-data", {"sample": 9} );
        break;
      case 'x':
        socket.emit("send-data", {"sample": 10} );
        break;
      case 'c':
        socket.emit("send-data", {"sample": 11} );
        break;
    }
  } else {
    // if connection to server is not established, we just play sounds locally
    switch (keyName) {
      case 'a':
          playSample(0);
          break;
      case 's':
          playSample(1);
          break;
      case 'd':
          playSample(2);
          break;
      case 'f':
          playSample(3);
          break;
      case 'g':
          playSample(4);
          break;
      case 'h':
          playSample(5);
          break;
      case 'j':
          playSample(6);
          break;
      case 'k':
          playSample(7);
          break;
      case 'l':
          playSample(8);
          break;
      case 'z':
          playSample(9);
          break;
      case 'x':
          playSample(10);
          break;
      case 'c':
          playSample(11);
          break;
    }
  }
});

// playing with touch

const keys = document.querySelectorAll(".key");

keys.forEach((key, idx) => {
  key.addEventListener('click', () => {
    socket.emit("send-data", {"sample": idx} );
  });
});



function recieveData(data){
  playSample(data.sample);
}


// play sample file
function playSample(s){
  sounds[s].play();
}


// preload music sample files and add them to sounds array
function preloadSampleFiles() {
  soundFormats('mp3', 'ogg', 'wav');
  for (let i = 0; i < files.length; ++i){
    sounds[i] = loadSound("./samples/" + files[i]);
  }
}



function setup() {
  createCanvas(windowWidth, windowHeight*0.62)

  // https://p5js.org/reference/#/p5.FFT
  fft = new p5.FFT();
  fft.smooth();

  preloadSampleFiles();
}


// Our visualization
function draw() {
	background(200, 0, 0, 30)
	stroke(200)
	noFill()
  //fill(200, 0, 0, 60)
	
	translate(width / 2, height / 2)
	
	var wave = fft.waveform()
	
	for (var t = -1; t <= 1; t += 2) {
		beginShape()
		for (var i = 0; i <= 180; i++) {
			var index = floor(map(i, 0, 180, 0, wave.length - 1))
			
			var r = map(wave[index], -1, 1, 120, 350)
			
			var x = r * sin(i) * t
			var y = r * cos(i)
			vertex(x, y)
		}
		endShape()
	}
}


// helper functions
// allows browser to play sounds
function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
// handles browser resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight*0.8, false);
}
