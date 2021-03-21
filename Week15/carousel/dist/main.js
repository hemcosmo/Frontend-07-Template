/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./animation.js":
/*!**********************!*\
  !*** ./animation.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Timeline\": () => (/* binding */ Timeline),\n/* harmony export */   \"Animation\": () => (/* binding */ Animation)\n/* harmony export */ });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar TICK = Symbol('tick');\nvar TICK_HANDLER = Symbol('tick-handler');\nvar ANIMATIONS = Symbol('animations');\nvar START_TIME = Symbol('start-time');\nvar PAUSE_START = Symbol('pause-start');\nvar PAUSE_TIME = Symbol('pause-time');\n\nvar Timeline = /*#__PURE__*/function () {\n  function Timeline() {\n    _classCallCheck(this, Timeline);\n\n    this.state = 'Inited';\n    this[ANIMATIONS] = new Set();\n    this[START_TIME] = new Map();\n  } // set rate() {}\n  // get rate() {}\n\n\n  _createClass(Timeline, [{\n    key: \"start\",\n    value: function start() {\n      var _this = this;\n\n      if (this.state !== 'Inited') return;\n      this.state = 'Started';\n      var startTime = Date.now();\n      this[PAUSE_TIME] = 0;\n\n      this[TICK] = function () {\n        var _iterator = _createForOfIteratorHelper(_this[ANIMATIONS]),\n            _step;\n\n        try {\n          for (_iterator.s(); !(_step = _iterator.n()).done;) {\n            var animation = _step.value;\n            var t = _this[START_TIME].get(animation) < startTime ? Date.now() - startTime - _this[PAUSE_TIME] - animation.delay : Date.now() - _this[START_TIME].get(animation) - _this[PAUSE_TIME] - animation.delay;\n\n            if (t > animation.duration) {\n              _this[ANIMATIONS][\"delete\"](animation);\n\n              t = animation.duration;\n            }\n\n            if (t > 0) animation.receive(t);\n          }\n        } catch (err) {\n          _iterator.e(err);\n        } finally {\n          _iterator.f();\n        }\n\n        _this[TICK_HANDLER] = requestAnimationFrame(_this[TICK]);\n      };\n\n      this[TICK]();\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      if (this.state !== 'Started') return;\n      this.state = 'Paused';\n      this[PAUSE_START] = Date.now();\n      cancelAnimationFrame(this[TICK_HANDLER]);\n    }\n  }, {\n    key: \"resume\",\n    value: function resume() {\n      if (this.state !== 'Paused') return;\n      this.state = 'Started';\n      this[PAUSE_TIME] += Date.now() - this[PAUSE_START];\n      this[TICK]();\n    }\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      this.state = 'Inited';\n      var startTime = Date.now();\n      this[ANIMATIONS] = new Set();\n      this[START_TIME] = new Map();\n    }\n  }, {\n    key: \"add\",\n    value: function add(animation) {\n      var startTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.now();\n      this[ANIMATIONS].add(animation);\n      this[START_TIME].set(animation, startTime);\n    }\n  }]);\n\n  return Timeline;\n}();\n\nvar Animation = /*#__PURE__*/function () {\n  function Animation(object, property, startValue, endValue, duration, delay) {\n    var timingFunction = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : function (x) {\n      return x;\n    };\n    var template = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : function (x) {\n      return x;\n    };\n\n    _classCallCheck(this, Animation);\n\n    this.object = object;\n    this.property = property;\n    this.startValue = startValue;\n    this.endValue = endValue;\n    this.duration = duration;\n    this.delay = delay;\n    this.timingFunction = timingFunction;\n    this.template = template;\n  }\n\n  _createClass(Animation, [{\n    key: \"receive\",\n    value: function receive(time) {\n      var range = this.endValue - this.startValue;\n      var progress = this.timingFunction(time / this.duration);\n      this.object[this.property] = this.template(this.startValue + range * progress);\n    }\n  }]);\n\n  return Animation;\n}();\n\n\n\n//# sourceURL=webpack://js/./animation.js?");

/***/ }),

/***/ "./demo.js":
/*!*****************!*\
  !*** ./demo.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation.js */ \"./animation.js\");\n/* harmony import */ var _ease_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ease.js */ \"./ease.js\");\n\n\nvar tl = new _animation_js__WEBPACK_IMPORTED_MODULE_0__.Timeline();\ntl.start();\ntl.add(new _animation_js__WEBPACK_IMPORTED_MODULE_0__.Animation(document.getElementById('el').style, 'transform', 0, 500, 2000, 0, _ease_js__WEBPACK_IMPORTED_MODULE_1__.ease, function (x) {\n  return \"translateX(\".concat(x, \"px)\");\n}));\ndocument.querySelector('#btn-pause').addEventListener('click', function () {\n  return tl.pause();\n});\ndocument.querySelector('#btn-resume').addEventListener('click', function () {\n  return tl.resume();\n});\ndocument.querySelector('#btn-reset').addEventListener('click', function () {\n  return tl.reset();\n});\n\n//# sourceURL=webpack://js/./demo.js?");

/***/ }),

/***/ "./ease.js":
/*!*****************!*\
  !*** ./ease.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"linear\": () => (/* binding */ linear),\n/* harmony export */   \"ease\": () => (/* binding */ ease),\n/* harmony export */   \"easeIn\": () => (/* binding */ easeIn),\n/* harmony export */   \"easeOut\": () => (/* binding */ easeOut),\n/* harmony export */   \"easeInOut\": () => (/* binding */ easeInOut)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar CubicBezier = /*#__PURE__*/function () {\n  function CubicBezier(p1x, p1y, p2x, p2y, functionName) {\n    var _this = this;\n\n    _classCallCheck(this, CubicBezier);\n\n    this.cx = 3.0 * p1x;\n    this.bx = 3.0 * (p2x - p1x) - this.cx;\n    this.ax = 1.0 - this.cx - this.bx;\n    this.cy = 3.0 * p1y;\n    this.by = 3.0 * (p2y - p1y) - this.cy;\n    this.ay = 1.0 - this.cy - this.by;\n\n    var BezierEasing = function BezierEasing(t) {\n      return _this.sampleCurveY(_this.solveCurveX(t));\n    };\n\n    Object.defineProperty(BezierEasing, 'name', {\n      writable: true\n    });\n    BezierEasing.name = functionName ? functionName : \"cubic-bezier(\".concat([p1x, p1y, p2x, p2y], \")\");\n    return BezierEasing;\n  }\n\n  _createClass(CubicBezier, [{\n    key: \"sampleCurveX\",\n    value: function sampleCurveX(t) {\n      return ((this.ax * t + this.bx) * t + this.cx) * t;\n    }\n  }, {\n    key: \"sampleCurveY\",\n    value: function sampleCurveY(t) {\n      return ((this.ay * t + this.by) * t + this.cy) * t;\n    }\n  }, {\n    key: \"sampleCurveDerivativeX\",\n    value: function sampleCurveDerivativeX(t) {\n      return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;\n    }\n  }, {\n    key: \"solveCurveX\",\n    value: function solveCurveX(x) {\n      var t0,\n          t1,\n          t2,\n          x2,\n          d2,\n          i,\n          epsilon = 1e-5;\n\n      for (t2 = x, i = 0; i < 32; i++) {\n        x2 = this.sampleCurveX(t2) - x;\n        if (Math.abs(x2) < epsilon) return t2;\n        d2 = this.sampleCurveDerivativeX(t2);\n        if (Math.abs(d2) < epsilon) break;\n        t2 = t2 - x2 / d2;\n      }\n\n      t0 = 0.0;\n      t1 = 1.0;\n      t2 = x;\n      if (t2 < t0) return t0;\n      if (t2 > t1) return t1;\n\n      while (t0 < t1) {\n        x2 = this.sampleCurveX(t2);\n        if (Math.abs(x2 - x) < epsilon) return t2;\n        if (x > x2) t0 = t2;else t1 = t2;\n        t2 = (t1 - t0) * 0.5 + t0;\n      }\n\n      return t2;\n    }\n  }]);\n\n  return CubicBezier;\n}();\n\nvar linear = function linear(x) {\n  return x;\n};\n\nvar ease = new CubicBezier(0.25, 0.1, 0.25, 1);\nvar easeIn = new CubicBezier(0.42, 0, 1, 1);\nvar easeOut = new CubicBezier(0, 0, 0.58, 1);\nvar easeInOut = new CubicBezier(0.42, 0, 0.58, 1);\n\n\n//# sourceURL=webpack://js/./ease.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./demo.js");
/******/ 	
/******/ })()
;