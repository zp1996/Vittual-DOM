/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__util__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Element = function () {
    function Element(tagName, props) {
        var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        _classCallCheck(this, Element);

        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["isArray"])(props)) {
            children = props;
            props = {};
        }
        this.tagName = tagName;
        this.props = props || {};
        this.children = children;
    }

    _createClass(Element, [{
        key: 'render',
        value: function render() {
            // 利用递归将内存中的树形结构渲染到页面上
            var ele = document.createElement(this.tagName);
            // 添加节点属性
            for (var prop in this.props) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["setAttr"])(ele, prop, this.props[prop]);
            }
            for (var i = 0, child; child = this.children[i++];) {
                var childEle = child instanceof Element ? child.render() : document.createTextNode(child);
                ele.appendChild(childEle);
            }
            return ele;
        }
    }]);

    return Element;
}();

/* harmony default export */ __webpack_exports__["a"] = (Element);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// 获取需要进行比对的键的值
var getItemKey = function getItemKey(item, key) {
    if (!item || !key) return void 0;
    return typeof key === 'string' ? item[key] : key(item);
};
/*
 * 提取数组
 * keyIndex 拥有该键的元素hash,键为key对应的值,值为在数组中的索引
 * free 无该键的元素集合
*/
var makeKeyIndexAndFree = function makeKeyIndexAndFree(list, key) {
    var keyIndex = {},
        free = [];
    for (var i = 0, item; item = list[i++];) {
        var itemKey = getItemKey(item, key);
        if (itemKey) {
            keyIndex[itemKey] = i - 1;
        } else {
            free.push(item);
        }
    }
    return { keyIndex: keyIndex, free: free };
};
/*
 * 更改老的数组使其与新的数组保持一致
 * type: 0 为删除, 1 为新增
 */
var remove = function remove(index) {
    return {
        index: index,
        type: 0
    };
};
var insert = function insert(index, item) {
    return {
        index: index,
        item: item,
        type: 1
    };
};
// diff比较,只比一层
module.exports = function (oldList, newList, key) {
    var oldMap = makeKeyIndexAndFree(oldList, key),
        newMap = makeKeyIndexAndFree(newList, key),
        newFree = newMap.free,
        oldKeyIndex = oldMap.keyIndex,
        newKeyIndex = newMap.keyIndex,
        moves = [],
        children = [];
    var freeIndex = 0,
        itemKey = void 0,
        item = void 0;
    // 遍历老的数组
    for (var _i = 0, _item; _item = oldList[_i++];) {
        itemKey = getItemKey(_item, key);
        if (itemKey) {
            if (!newKeyIndex.hasOwnProperty(itemKey)) {
                // 假如新的数组中没有,则这个元素应该被删除
                children.push(null);
            } else {
                children.push(newList[newKeyIndex[itemKey]]);
            }
        } else {
            // 假如元素没有key这个键,则把新的数组中没有这个键的元素加上去
            var freeItem = newFree[freeIndex++] || null;
            children.push(freeItem);
        }
    }
    var simulateList = children.slice(0);
    var i = 0;
    // 新的数组中不存在该元素,则删除
    while (i < simulateList.length) {
        if (simulateList[i] === null) {
            moves.push(remove(i));
            simulateList.splice(i, 1);
        } else {
            i++;
        }
    }
    var j = 0;
    var newLen = newList.length;
    for (var _i2 = 0; _i2 < newLen; _i2++) {
        item = newList[_i2];
        itemKey = getItemKey(item, key);
        var simulateItem = simulateList[j],
            simulateItemKey = getItemKey(simulateItem, key);
        if (simulateItem) {
            if (itemKey === simulateItemKey) {
                // 此处节点不需要移动
                j++;
            } else {
                if (!oldKeyIndex.hasOwnProperty(simulateItemKey)) {
                    moves.push(insert(_i2, item));
                } else {
                    var nextItemKey = getItemKey(simulateList[j + 1], key);
                    if (nextItemKey === itemKey) {
                        // 假设在老的数组中的下一个位置,则把该位置元素删除
                        moves.push(remove(_i2));
                        simulateList.splice(j++, 1);
                    } else {
                        moves.push(insert(_i2, item));
                    }
                }
            }
        } else {
            // 插入新增的元素
            moves.push(insert(_i2, item));
        }
    }
    // 删除老的数组中多余的元素
    var k = 0;
    while (k++ <= simulateList.length - 1 - j) {
        moves.push(remove(newLen));
    }
    return { moves: moves, children: children };
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_diff__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_diff___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__list_diff__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__element__ = __webpack_require__(0);



var target = ['a', 'b', 'c', 'd', 'e'],
    source = ['e', 'd', 'e'];

var root = new __WEBPACK_IMPORTED_MODULE_1__element__["a" /* default */]('ul', {
    class: 'test-ul'
}, [new __WEBPACK_IMPORTED_MODULE_1__element__["a" /* default */]('li', ['Text1']), new __WEBPACK_IMPORTED_MODULE_1__element__["a" /* default */]('li', ['Text2']), new __WEBPACK_IMPORTED_MODULE_1__element__["a" /* default */]('li', ['Text3'])]);

document.getElementById('root').appendChild(root.render());

console.log(__WEBPACK_IMPORTED_MODULE_0__list_diff___default()(source, target, function (_) {
    return _;
}));

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var RE = /\[object\s|\]/g,
    util = {};

var setStyle = function setStyle(obj) {
    var res = '';
    for (var key in obj) {
        res += key + ': ' + obj[key] + ';';
    }
};

util.type = function (obj) {
    return Object.prototype.toString.call(obj).replace(RE, "");
};

util.each = function (arr, fn) {
    for (var i = 0, len = arr.length; i < len; i++) {
        fn(arr[i], i);
    }
};

util.each(['String', 'Array'], function (val) {
    util['is' + val] = function (obj) {
        return util.type(obj) === val;
    };
});

util.setAttr = function (ele, attr, val) {
    switch (attr) {
        case 'style':
            ele.style.cssText = setStyle(val);
            break;
        case 'value':
            var tagName = ele.tagName;

            if (tagName === 'textarea') {
                ele.innerText = val;
            } else {
                ele.setAttribute(attr, val);
            }
            break;
        default:
            ele.setAttribute(attr, val);
    }
};

module.exports = util;

/***/ })
/******/ ]);