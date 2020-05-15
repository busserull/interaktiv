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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../deps/phoenix_html/priv/static/phoenix_html.js":
/*!********************************************************!*\
  !*** ../deps/phoenix_html/priv/static/phoenix_html.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n(function () {\n  var PolyfillEvent = eventConstructor();\n\n  function eventConstructor() {\n    if (typeof window.CustomEvent === \"function\") return window.CustomEvent; // IE<=9 Support\n\n    function CustomEvent(event, params) {\n      params = params || {\n        bubbles: false,\n        cancelable: false,\n        detail: undefined\n      };\n      var evt = document.createEvent('CustomEvent');\n      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);\n      return evt;\n    }\n\n    CustomEvent.prototype = window.Event.prototype;\n    return CustomEvent;\n  }\n\n  function buildHiddenInput(name, value) {\n    var input = document.createElement(\"input\");\n    input.type = \"hidden\";\n    input.name = name;\n    input.value = value;\n    return input;\n  }\n\n  function handleClick(element) {\n    var to = element.getAttribute(\"data-to\"),\n        method = buildHiddenInput(\"_method\", element.getAttribute(\"data-method\")),\n        csrf = buildHiddenInput(\"_csrf_token\", element.getAttribute(\"data-csrf\")),\n        form = document.createElement(\"form\"),\n        target = element.getAttribute(\"target\");\n    form.method = element.getAttribute(\"data-method\") === \"get\" ? \"get\" : \"post\";\n    form.action = to;\n    form.style.display = \"hidden\";\n    if (target) form.target = target;\n    form.appendChild(csrf);\n    form.appendChild(method);\n    document.body.appendChild(form);\n    form.submit();\n  }\n\n  window.addEventListener(\"click\", function (e) {\n    var element = e.target;\n\n    while (element && element.getAttribute) {\n      var phoenixLinkEvent = new PolyfillEvent('phoenix.link.click', {\n        \"bubbles\": true,\n        \"cancelable\": true\n      });\n\n      if (!element.dispatchEvent(phoenixLinkEvent)) {\n        e.preventDefault();\n        e.stopImmediatePropagation();\n        return false;\n      }\n\n      if (element.getAttribute(\"data-method\")) {\n        handleClick(element);\n        e.preventDefault();\n        return false;\n      } else {\n        element = element.parentNode;\n      }\n    }\n  }, false);\n  window.addEventListener('phoenix.link.click', function (e) {\n    var message = e.target.getAttribute(\"data-confirm\");\n\n    if (message && !window.confirm(message)) {\n      e.preventDefault();\n    }\n  }, false);\n})();\n\n//# sourceURL=webpack:///../deps/phoenix_html/priv/static/phoenix_html.js?");

/***/ }),

/***/ "./css/app.css":
/*!*********************!*\
  !*** ./css/app.css ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./css/app.css?");

/***/ }),

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/app.css */ \"./css/app.css\");\n/* harmony import */ var _css_app_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_app_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var phoenix_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! phoenix_html */ \"../deps/phoenix_html/priv/static/phoenix_html.js\");\n/* harmony import */ var phoenix_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(phoenix_html__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _plant_mass_damper_spring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plant/mass_damper_spring */ \"./js/plant/mass_damper_spring.js\");\n/* harmony import */ var _plant_level_tank__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plant/level_tank */ \"./js/plant/level_tank.js\");\n/* harmony import */ var _interactive_mass_damper_spring__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interactive/mass_damper_spring */ \"./js/interactive/mass_damper_spring.js\");\n/* harmony import */ var _interactive_utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./interactive_utilities */ \"./js/interactive_utilities.js\");\n/* Phoenix */\n\n\n/* Plants */\n\n\n\n/* Draw functions */\n\n\n/* Interactive utilities */\n\n\nvar mds = new _plant_mass_damper_spring__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n  'mass': 1.0,\n  'damper': 0.1,\n  'spring': 1.0,\n  'position': 0.0,\n  'velocity': 0.0\n});\nvar simulationStepTime = 50;\nObject(_interactive_utilities__WEBPACK_IMPORTED_MODULE_5__[\"getParametersPanel\"])('SampleSystem', mds); ///\n\nvar tank = new _plant_level_tank__WEBPACK_IMPORTED_MODULE_3__[\"default\"](1000, 1, 4, 2);\n\nwindow.onload = function () {\n  var drawMDS = Object(_interactive_mass_damper_spring__WEBPACK_IMPORTED_MODULE_4__[\"getMassDamperSpringDraw\"])('SampleSystem', 2.0);\n  var forceSlider = Object(_interactive_utilities__WEBPACK_IMPORTED_MODULE_5__[\"getSlider\"])('SampleSystem', 'force', -2.0, 2.0, 'N');\n  window.setInterval(function () {\n    var force = forceSlider();\n    mds.step(simulationStepTime / 1000, force);\n    drawMDS(mds.getPosition());\n  }, simulationStepTime); ///\n\n  var valveSlider = document.querySelector('#levelSlider');\n  var valveLabel = document.querySelector('#levelSliderLabel');\n  tank.interactiveLink('#_window_levelTank', 4.0);\n  window.setInterval(function () {\n    var valve = parseFloat(valveSlider.value);\n    valveLabel.innerText = \"\".concat(valve, \" %\");\n    tank.step(simulationStepTime / 1000, valve * 5.0);\n    tank.interactiveDraw();\n  }, simulationStepTime);\n};\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ }),

/***/ "./js/interactive/mass_damper_spring.js":
/*!**********************************************!*\
  !*** ./js/interactive/mass_damper_spring.js ***!
  \**********************************************/
/*! exports provided: getMassDamperSpringDraw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMassDamperSpringDraw\", function() { return getMassDamperSpringDraw; });\nfunction getMassDamperSpringDraw(id, maxPosition) {\n  var svg = document.querySelector(\"#_window_\".concat(id)).contentDocument;\n  var svgWidth = parseFloat(svg.rootElement.getAttribute('width').replace(/[^.0-9]/g, ''));\n  var massWidth = parseFloat(svg.querySelector('#massRect').getAttribute('width'));\n  var oobL = svg.querySelector('#oobL');\n  var oobR = svg.querySelector('#oobR');\n  var oobTextL = svg.querySelector('#oobTextL');\n  var oobTextR = svg.querySelector('#oobTextR');\n  var mass = svg.querySelector('#massWhole');\n  var domainToRange = (svgWidth + massWidth) / (2 * maxPosition);\n  return function (position) {\n    mass.setAttribute('transform', \"translate(\".concat(position * domainToRange, \")\"));\n    var overshoot = (Math.abs(position) - maxPosition).toFixed(2);\n    oobTextR.innerHTML = \"\".concat(overshoot);\n    oobTextL.innerHTML = \"\".concat(overshoot);\n\n    if (position > maxPosition) {\n      oobR.setAttribute('visibility', 'visible');\n    } else if (position < -maxPosition) {\n      oobL.setAttribute('visibility', 'visible');\n    } else {\n      oobR.setAttribute('visibility', 'hidden');\n      oobL.setAttribute('visibility', 'hidden');\n    }\n  };\n}\n\n//# sourceURL=webpack:///./js/interactive/mass_damper_spring.js?");

/***/ }),

/***/ "./js/interactive_utilities.js":
/*!*************************************!*\
  !*** ./js/interactive_utilities.js ***!
  \*************************************/
/*! exports provided: getSlider, getParametersPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSlider\", function() { return getSlider; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getParametersPanel\", function() { return getParametersPanel; });\nfunction getSlider(id, tag, min, max, unit) {\n  var slider = document.querySelector(\"#_slider_\".concat(id).concat(tag));\n  var label = document.querySelector(\"#_label_\".concat(id).concat(tag));\n  var sMin = parseFloat(slider.min);\n  var sMax = parseFloat(slider.max);\n  return function () {\n    var x = parseFloat(slider.value);\n    var y = min + (x - sMin) * (max - min) / (sMax - sMin);\n    label.innerText = \"\".concat(y.toFixed(2), \" \").concat(unit);\n    return y;\n  };\n}\nfunction getParametersPanel(id, plant) {\n  var form = document.querySelector(\"#_parameters_\".concat(id));\n  form.addEventListener('submit', function (event) {\n    var data = new FormData(form);\n    var entries = Array.from(data.entries());\n    var fields = {};\n    entries.forEach(function (entry) {\n      fields[entry[0]] = parseFloat(entry[1]);\n    });\n    plant.updateParameters(fields);\n  });\n}\n\n//# sourceURL=webpack:///./js/interactive_utilities.js?");

/***/ }),

/***/ "./js/plant/level_tank.js":
/*!********************************!*\
  !*** ./js/plant/level_tank.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar LevelTank =\n/*#__PURE__*/\nfunction () {\n  function LevelTank(density, tankArea, tankHeight, initLevel) {\n    var _this = this;\n\n    _classCallCheck(this, LevelTank);\n\n    WebAssembly.instantiateStreaming(fetch('wasm/level_tank.wasm')).then(function (res) {\n      var exp = res.instance.exports;\n      _this.getTime = exp.get_t;\n\n      _this.getLevel = function () {\n        return exp.get_x(0);\n      };\n\n      _this.setOutValve = function (valveOut) {\n        exp.set_u(0, valveOut);\n      };\n\n      _this.step = function (time, valveIn) {\n        exp.step_relative_with_force(time, valveIn);\n      };\n\n      res.instance.exports.init(density, tankArea, tankHeight, initLevel);\n\n      _this.setOutValve(100);\n    });\n  }\n\n  _createClass(LevelTank, [{\n    key: \"interactiveLink\",\n    value: function interactiveLink(svgID, maxScale) {\n      this.intMaxScale = maxScale;\n      var svg = document.querySelector(svgID).contentDocument;\n      var rule = svg.querySelector('#tankRule');\n      var ruleHeight = parseFloat(rule.getAttribute('height'));\n      var ruleBase = parseFloat(rule.getAttribute('y'));\n      this.intOverspillWarning = svg.querySelector('#overflowWarning');\n      this.intTankHeight = ruleHeight;\n      this.intBasePosition = ruleBase + ruleHeight;\n      this.intLevel = svg.querySelector('#tankLevel');\n    }\n  }, {\n    key: \"interactiveDraw\",\n    value: function interactiveDraw() {\n      var level = this.getLevel();\n      var height = level * this.intTankHeight / this.intMaxScale;\n\n      if (level >= this.intMaxScale) {\n        height = this.intTankHeight;\n        this.intOverspillWarning.setAttribute('visibility', 'visible');\n      } else {\n        this.intOverspillWarning.setAttribute('visibility', 'hidden');\n      }\n\n      this.intLevel.setAttribute('y', \"\".concat(this.intBasePosition - height));\n      this.intLevel.setAttribute('height', \"\".concat(height));\n    }\n  }]);\n\n  return LevelTank;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LevelTank);\n\n//# sourceURL=webpack:///./js/plant/level_tank.js?");

/***/ }),

/***/ "./js/plant/mass_damper_spring.js":
/*!****************************************!*\
  !*** ./js/plant/mass_damper_spring.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar MassDamperSpring =\n/*#__PURE__*/\nfunction () {\n  function MassDamperSpring(initParameters) {\n    var _this = this;\n\n    _classCallCheck(this, MassDamperSpring);\n\n    this.initParams = initParameters;\n    WebAssembly.instantiateStreaming(fetch('wasm/mass_damper_spring.wasm')).then(function (res) {\n      var exp = res.instance.exports;\n      _this.getTime = exp.get_t;\n\n      _this.getPosition = function () {\n        return exp.get_x(0);\n      };\n\n      _this.getVelocity = function () {\n        return exp.get_x(1);\n      };\n\n      _this.step = function (time, force) {\n        exp.step_relative_with_force(time, force);\n      };\n\n      _this.init = res.instance.exports.init;\n\n      _this.init(_this.initParams.mass, _this.initParams.damper, _this.initParams.spring, _this.initParams.position, _this.initParams.velocity);\n    });\n  }\n\n  _createClass(MassDamperSpring, [{\n    key: \"updateParameters\",\n    value: function updateParameters(params) {\n      var pOrDef = function pOrDef(p, def) {\n        if (p == undefined) {\n          return def;\n        }\n\n        return p;\n      };\n\n      this.init(pOrDef(params.mass, this.initParams.mass), pOrDef(params.damper, this.initParams.damper), pOrDef(params.spring, this.initParams.spring), pOrDef(params.position, this.getPosition()), pOrDef(params.velocity, this.getVelocity()));\n    }\n  }]);\n\n  return MassDamperSpring;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MassDamperSpring);\n\n//# sourceURL=webpack:///./js/plant/mass_damper_spring.js?");

/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./js/app.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./js/app.js */\"./js/app.js\");\n\n\n//# sourceURL=webpack:///multi_./js/app.js?");

/***/ })

/******/ });