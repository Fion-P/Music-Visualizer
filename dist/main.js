/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let frequency_array, canvas, ctx, centerX, centerY, radius;\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n\n  let showFullscreenButton = true;\n  let fullscreenBtn = document.getElementById(\"fullscreen\");\n  fullscreenBtn.addEventListener(\"click\", () => {\n\n    if (showFullscreenButton) {\n      fullscreenBtn.style.display = \"none\";\n    } else {\n      fullscreenBtn.style.display = \"block\";\n    }\n    showFullscreenButton = !showFullscreenButton;\n\n    openFullscreen();\n\n\n  });\n  initialize();\n  \n}); \n\nwindow.addEventListener(\"resize\", () => {\n  createCanvas();\n});\n\nfunction createCanvas() {\n    // create visuals\n  canvas = document.querySelector(\"#audio-canvas\");\n\n  // set canvas to size of device\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n  ctx = canvas.getContext(\"2d\");\n\n  // resize canvas if needed\n\n  // style the background\n  var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);\n  gradient.addColorStop(0, \"rgba(35, 7, 77, 1)\");\n  gradient.addColorStop(1, \"rgba(204, 83, 51, 1)\");\n  ctx.fillStyle = gradient;\n  ctx.fillRect(0, 0, canvas.width, canvas.height);\n\n  // get center to screen and create radius\n  centerX = canvas.width / 2;\n  centerY = canvas.height / 2;\n  radius = 150;\n}\n\nfunction initialize() {\n  // initialize audio\n  createCanvas();\n  const audio = new Audio();\n  const context = new window.AudioContext() || new window.webkitAudioContext();\n  context.resume();\n\n  analyser = context.createAnalyser();\n\n  audio.src = \"../audio/Begin_Again.mp3\"; // the source path\n  const source = context.createMediaElementSource(audio);\n  source.connect(analyser);\n  analyser.connect(context.destination);\n\n  frequencyArray = new Uint8Array(analyser.frequencyBinCount);\n\n  let playing = false;\n  const audioBtn = document.querySelector(\"#audio-btn\");\n  \n  // audio toggle button\n  audioBtn.addEventListener(\"click\", () => {\n\n    if (!playing) {\n      audioBtn.innerHTML = \"Pause\";\n      audio.play();\n      createAnimation();\n    } else {\n      audioBtn.innerHTML = \"Play\";\n      audio.pause();\n    }\n\n    playing = !playing;\n\n  });\n}\n\nfunction createAnimation() {\n\n  // create a circle\n  // ctx.strokeStyle = \"white\";\n  // ctx.beginPath();\n  // ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);\n  // ctx.stroke();\n\n  // create bars \n  let bars = 200;\n  analyser.getByteFrequencyData(frequencyArray);\n  for (let i = 0; i < bars; i++) {\n    let rads = 2 * Math.PI / bars;\n    const barHeight = frequencyArray[i] * 0.7;\n    const barWidth = 2;\n\n    const x = centerX + Math.cos(rads * i) * radius;\n    const y = centerY + Math.sin(rads * i) * radius;\n    const xEnd = centerX + Math.cos(rads * i) * (radius + barHeight);\n    const yEnd = centerY + Math.sin(rads * i) * (radius + barHeight);\n\n    drawBar(x, y, xEnd, yEnd, barWidth, ctx, frequencyArray[i]);\n  }\n  window.requestAnimationFrame(createAnimation);\n\n}\n\n// create a draw bars function\nconst drawBar = (x1, y1, x2, y2, width, ctx, frequency) => {\n  const lineColor = \"rgb(\" + frequency + \", \" + frequency + \", \" + 205 + \")\";\n  ctx.strokeStyle = lineColor;\n  ctx.lineWidth = width;\n  ctx.beginPath();\n  ctx.moveTo(x1, y1);\n  ctx.lineTo(x2, y2);\n  ctx.stroke();\n};\n\nfunction openFullscreen() {\n  const body = document.querySelector(\"body\");\n  // body.onfullscreenchange(() => {\n  //   console.log(\"hit\");\n  // });\n\n  if (body.requestFullscreen) {\n    console.log(\"hit\");\n    body.requestFullscreen();\n  } else if (body.mozRequestFullScreen) {\n    /* Firefox */\n    body.mozRequestFullScreen();\n  } else if (body.webkitRequestFullscreen) {\n    /* Chrome, Safari & Opera */\n    body.webkitRequestFullscreen();\n  } else if (body.msRequestFullscreen) {\n    /* IE/Edge */\n    body.msRequestFullscreen();\n  }\n}\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });