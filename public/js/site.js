/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/frontend/projectRequestForm.js":
/*!*****************************************************!*\
  !*** ./resources/js/frontend/projectRequestForm.js ***!
  \*****************************************************/
/***/ (() => {

(function () {
  var containerForm = document.getElementById('projectRequestForm');
  if (containerForm == null) {
    return;
  }
  var budgetSlider = document.querySelector('[data-project-budget]'),
    budgetPreview = document.querySelector('[data-budget-preview]'),
    budgetStrokeSpans = document.querySelectorAll('[data-budget-stroke]'),
    projectTypeButtons = document.querySelectorAll('[data-project-type]'),
    projectTypeInput = document.querySelector('[name=project_type]'),
    projectBudgetInput = document.querySelector('[name=budget_range]');
  function updateProjectTypeButtons(curValue) {
    projectTypeButtons.forEach(function (btn) {
      var btnValue = btn.getAttribute('data-value');
      if (btnValue == curValue) {
        if (!btn.classList.contains('bg-gray-50')) {
          btn.classList.add('bg-gray-50');
        }
        if (!btn.classList.contains('shadow-subtle')) {
          btn.classList.add('shadow-subtle');
          btn.classList.remove('shadow-sm');
        }
      } else {
        btn.classList.remove('bg-gray-50');
        btn.classList.remove('shadow-subtle');
        if (!btn.classList.contains('shadow-sn')) {
          btn.classList.add('shadow-sm');
        }
      }
    });
  }
  projectTypeButtons.forEach(function (el) {
    el.addEventListener('click', function () {
      var curValue = el.getAttribute('data-value');
      projectTypeInput.value = curValue;
      updateProjectTypeButtons(curValue);
    });
  });
  projectTypeInput.addEventListener('input', function () {
    updateProjectTypeButtons(projectTypeInput.value);
  });
  function updateBudgetSlider(value) {
    var text = window._budgetRanges[value].label;
    budgetPreview.innerText = text;
    budgetStrokeSpans.forEach(function (el) {
      var strokeIndex = el.getAttribute('data-budget-stroke');
      if (strokeIndex <= value) {
        if (!el.classList.contains('text-pink-500')) {
          el.classList.add('text-pink-500');
          el.classList.remove('text-slate-500');
        }
      } else {
        el.classList.remove('text-pink-500');
        if (!el.classList.contains('text-slate-500')) {
          el.classList.add('text-slate-500');
        }
      }
    });
  }
  budgetSlider.addEventListener('input', function () {
    var value = budgetSlider.value - 1,
      selectValue = window._budgetRanges[value].value;
    projectBudgetInput.value = selectValue;
    updateBudgetSlider(value);
  });
  projectBudgetInput.addEventListener('input', function () {
    var selectedIndex = null;
    for (var i = 0; i < window._budgetRanges.length; i++) {
      var range = window._budgetRanges[i];
      if (range.value == projectBudgetInput.value) {
        selectedIndex = i;
        break;
      }
    }
    if (selectedIndex == null || selectedIndex < 0) {
      return;
    }
    budgetSlider.value = selectedIndex + 1;
    updateBudgetSlider(selectedIndex);
  });
})();

/***/ }),

/***/ "./resources/js/frontend/rainAnimation.js":
/*!************************************************!*\
  !*** ./resources/js/frontend/rainAnimation.js ***!
  \************************************************/
/***/ (() => {

(function () {
  var rainTrigger = document.getElementById('rain-trigger');
  if (rainTrigger == null || !rainTrigger.classList.contains('bg-pink-200')) {
    return;
  }
  var container = document.getElementById('rain-container');
  function spawnRain() {
    var rain = document.createElement('div');
    rain.classList.add('rain');
    rain.style.left = Math.random() * container.offsetWidth + 'px';
    container.appendChild(rain);
    setTimeout(function () {
      rain.remove();
    }, 3000);
  }
  setInterval(function () {
    spawnRain();
  }, 100);
})();

/***/ }),

/***/ "./resources/js/frontend/responsiveMenu.js":
/*!*************************************************!*\
  !*** ./resources/js/frontend/responsiveMenu.js ***!
  \*************************************************/
/***/ (() => {

(function () {
  var btn = document.getElementById('nav-toggle'),
    nav = document.getElementById('responsive-nav');
  btn.addEventListener("click", function () {
    nav.classList.toggle('hidden');
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      nav.classList.add('hidden');
    }
  });
})();

/***/ }),

/***/ "./resources/js/frontend/serviceList.js":
/*!**********************************************!*\
  !*** ./resources/js/frontend/serviceList.js ***!
  \**********************************************/
/***/ (() => {

(function () {
  var serviceList = document.querySelector('[data-service-list]'),
    serviceStatTarget = document.querySelector('[data-service-stat-target]'),
    serviceBlurbTarget = document.querySelector('[data-service-blurb-target]'),
    services = document.querySelectorAll('[data-service]');
  if (serviceList == null || serviceStatTarget == null || serviceBlurbTarget == null || services.length == 0) {
    return;
  }
  var startingValue = 50,
    targetValue = 0,
    duration = 800; // Animation delay, in milliseconds.

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
  function updateCounter(progress) {
    var value = startingValue + (targetValue - startingValue) * progress;
    serviceStatTarget.innerText = Math.round(value) + '%';
  }
  function startStatPercentCounter() {
    var startTime = performance.now();
    function animate(timestamp) {
      var elapsed = timestamp - startTime,
        progress = Math.min(elapsed / duration, 1),
        easedProgress = easeInOutQuad(progress);
      updateCounter(easedProgress);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }
  services.forEach(function (item) {
    item.addEventListener('mouseenter', function (e) {
      var serviceStat = e.target.getAttribute('data-service-stat'),
        serviceBlurb = e.target.getAttribute('data-service-blurb');
      targetValue = serviceStat;
      startStatPercentCounter();
      serviceBlurbTarget.innerText = serviceBlurb;
    });
  });
})();

/***/ }),

/***/ "./resources/js/site.js":
/*!******************************!*\
  !*** ./resources/js/site.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// This is all you.

__webpack_require__(/*! ./frontend/rainAnimation */ "./resources/js/frontend/rainAnimation.js");
__webpack_require__(/*! ./frontend/responsiveMenu */ "./resources/js/frontend/responsiveMenu.js");
__webpack_require__(/*! ./frontend/serviceList */ "./resources/js/frontend/serviceList.js");
__webpack_require__(/*! ./frontend/projectRequestForm */ "./resources/js/frontend/projectRequestForm.js");

/***/ }),

/***/ "./resources/css/tailwind.css":
/*!************************************!*\
  !*** ./resources/css/tailwind.css ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/css/cp.css":
/*!******************************!*\
  !*** ./resources/css/cp.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/site": 0,
/******/ 			"vendor/app/css/cp": 0,
/******/ 			"css/tailwind": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendor/app/css/cp","css/tailwind"], () => (__webpack_require__("./resources/js/site.js")))
/******/ 	__webpack_require__.O(undefined, ["vendor/app/css/cp","css/tailwind"], () => (__webpack_require__("./resources/css/tailwind.css")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor/app/css/cp","css/tailwind"], () => (__webpack_require__("./resources/css/cp.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;