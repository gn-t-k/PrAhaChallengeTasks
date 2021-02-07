(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1083:function(module,exports,__webpack_require__){"use strict";var _clientApi=__webpack_require__(56),_clientLogger=__webpack_require__(36),_configFilename=__webpack_require__(1084);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}(_configFilename.args||_configFilename.argTypes)&&_clientLogger.logger.warn("Invalid args/argTypes in config, ignoring.",JSON.stringify({args:_configFilename.args,argTypes:_configFilename.argTypes})),_configFilename.decorators&&_configFilename.decorators.forEach((function(decorator){return(0,_clientApi.addDecorator)(decorator,!1)})),_configFilename.loaders&&_configFilename.loaders.forEach((function(loader){return(0,_clientApi.addLoader)(loader,!1)})),(_configFilename.parameters||_configFilename.globals||_configFilename.globalTypes)&&(0,_clientApi.addParameters)(_objectSpread(_objectSpread({},_configFilename.parameters),{},{globals:_configFilename.globals,globalTypes:_configFilename.globalTypes}),!1),_configFilename.argTypesEnhancers&&_configFilename.argTypesEnhancers.forEach((function(enhancer){return(0,_clientApi.addArgTypesEnhancer)(enhancer)}))},1084:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"parameters",(function(){return parameters}));var parameters={actions:{argTypesRegex:"^on[A-Z].*"}}},1085:function(module,exports,__webpack_require__){"use strict";(function(module){(0,__webpack_require__(360).configure)([__webpack_require__(1086),__webpack_require__(1087)],module,!1)}).call(this,__webpack_require__(105)(module))},1086:function(module,exports){function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=function(){return[]},webpackEmptyContext.resolve=webpackEmptyContext,module.exports=webpackEmptyContext,webpackEmptyContext.id=1086},1087:function(module,exports,__webpack_require__){var map={"./components/board/board.stories.tsx":1088,"./components/game/game.stories.tsx":1099,"./components/info/info.stories.tsx":1093,"./components/square/square.stories.tsx":1094};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=1087},1088:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Default",(function(){return Default})),__webpack_require__.d(__webpack_exports__,"fillX",(function(){return fillX})),__webpack_require__.d(__webpack_exports__,"fillO",(function(){return fillO})),__webpack_require__.d(__webpack_exports__,"fillTryangle",(function(){return fillTryangle}));var _Users_gntk_repositories_PrAhaChallengeTasks_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(47),_board__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(157),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__(209),__webpack_require__(28));__webpack_exports__.default={title:"Board",component:_board__WEBPACK_IMPORTED_MODULE_1__.a};var Template=function Template(_ref){var status=_ref.status,changeStatus=_ref.changeStatus,_ref$isGameEnd=_ref.isGameEnd,isGameEnd=void 0!==_ref$isGameEnd&&_ref$isGameEnd;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_board__WEBPACK_IMPORTED_MODULE_1__.a,{status:status,changeStatus:changeStatus,isGameEnd:isGameEnd})},changeStatus=function changeStatus(){return console.log("Change status.")},Default=Template.bind({});Default.args={status:Array(9).fill(null),changeStatus:changeStatus};var fillX=Template.bind({});fillX.args={status:Array(9).fill("X"),changeStatus:changeStatus};var fillO=Template.bind({});fillO.args={status:Array(9).fill("O"),changeStatus:changeStatus};var fillTryangle=Template.bind({});fillTryangle.args={status:Array(9).fill("△"),changeStatus:changeStatus},Default.parameters=Object(_Users_gntk_repositories_PrAhaChallengeTasks_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({storySource:{source:"({\n  status,\n  changeStatus,\n  isGameEnd = false,\n}) => <Board {...{ status, changeStatus, isGameEnd }} />"}},Default.parameters),fillX.parameters=Object(_Users_gntk_repositories_PrAhaChallengeTasks_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({storySource:{source:"({\n  status,\n  changeStatus,\n  isGameEnd = false,\n}) => <Board {...{ status, changeStatus, isGameEnd }} />"}},fillX.parameters),fillO.parameters=Object(_Users_gntk_repositories_PrAhaChallengeTasks_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({storySource:{source:"({\n  status,\n  changeStatus,\n  isGameEnd = false,\n}) => <Board {...{ status, changeStatus, isGameEnd }} />"}},fillO.parameters),fillTryangle.parameters=Object(_Users_gntk_repositories_PrAhaChallengeTasks_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({storySource:{source:"({\n  status,\n  changeStatus,\n  isGameEnd = false,\n}) => <Board {...{ status, changeStatus, isGameEnd }} />"}},fillTryangle.parameters)},1089:function(module,exports,__webpack_require__){},1091:function(module,exports,__webpack_require__){},1092:function(module,exports,__webpack_require__){},1093:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Default",(function(){return Default})),__webpack_require__.d(__webpack_exports__,"OWin",(function(){return OWin})),__webpack_require__.d(__webpack_exports__,"Draw",(function(){return Draw}));var _Users_gntk_repositories_PrAhaChallengeTasks_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(47),_info__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(0),__webpack_require__(159)),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__(209),__webpack_require__(28));__webpack_exports__.default={title:"Info",component:_info__WEBPACK_IMPORTED_MODULE_2__.a};var Template=function Template(_ref){var history=_ref.history,changeHistory=_ref.changeHistory,_ref$isXNext=_ref.isXNext,isXNext=void 0===_ref$isXNext||_ref$isXNext,_ref$winner=_ref.winner,winner=void 0===_ref$winner?null:_ref$winner,_ref$isGameEnd=_ref.isGameEnd,isGameEnd=void 0!==_ref$isGameEnd&&_ref$isGameEnd;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_info__WEBPACK_IMPORTED_MODULE_2__.a,{history:history,changeHistory:changeHistory,isXNext:isXNext,winner:winner,isGameEnd:isGameEnd})},changeHistory=function changeHistory(){return console.log("Change history.")},Default=Template.bind({});Default.args={history:[[null,null,null,null,null,null,null,null,null],["O",null,null,null,null,null,null,null,null]],changeHistory:changeHistory};var OWin=Template.bind({});OWin.args={history:[[null,null,null,null,null,null,null,null,null],["O",null,null,null,null,null,null,null,null],["O","X",null,null,null,null,null,null,null],["O","X",null,"O",null,null,null,null,null],["O","X",null,"O","X",null,null,null,null],["O","X",null,"O","X",null,"O",null,null]],changeHistory:changeHistory,winner:"O",isGameEnd:!0};var Draw=Template.bind({});Draw.args={history:[[null,null,null,null,null,null,null,null,null],["O",null,null,null,null,null,null,null,null],["O","X",null,null,null,null,null,null,null],["O","X",null,"O",null,null,null,null,null],["O","X",null,"O",null,null,"X",null,null],["O","X",null,"O","O",null,"X",null,null],["O","X",null,"O","O",null,"X",null,"X"],["O","X",null,"O","O",null,"X","O","X"],["O","X",null,"O","O","X","X","O","X"],["O","X","O","O","O","X","X","O","X"]],changeHistory:changeHistory,winner:null,isGameEnd:!0},Default.parameters=Object(_Users_gntk_repositories_PrAhaChallengeTasks_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({storySource:{source:"({\n  history,\n  changeHistory,\n  isXNext = true,\n  winner = null,\n  isGameEnd = false,\n}) => (\n  <Info\n    {...{\n      history,\n      changeHistory,\n      isXNext,\n      winner,\n      isGameEnd,\n    }}\n  />\n)"}},Default.parameters),OWin.parameters=Object(_Users_gntk_repositories_PrAhaChallengeTasks_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({storySource:{source:"({\n  history,\n  changeHistory,\n  isXNext = true,\n  winner = null,\n  isGameEnd = false,\n}) => (\n  <Info\n    {...{\n      history,\n      changeHistory,\n      isXNext,\n      winner,\n      isGameEnd,\n    }}\n  />\n)"}},OWin.parameters),Draw.parameters=Object(_Users_gntk_repositories_PrAhaChallengeTasks_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({storySource:{source:"({\n  history,\n  changeHistory,\n  isXNext = true,\n  winner = null,\n  isGameEnd = false,\n}) => (\n  <Info\n    {...{\n      history,\n      changeHistory,\n      isXNext,\n      winner,\n      isGameEnd,\n    }}\n  />\n)"}},Draw.parameters)},1094:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Default",(function(){return Default})),__webpack_require__.d(__webpack_exports__,"X",(function(){return X})),__webpack_require__.d(__webpack_exports__,"O",(function(){return O}));var _Users_gntk_repositories_PrAhaChallengeTasks_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(47),_square__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(0),__webpack_require__(158)),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__(209),__webpack_require__(28));__webpack_exports__.default={title:"Square",component:_square__WEBPACK_IMPORTED_MODULE_2__.a};var Template=function Template(_ref){var value=_ref.value,onClick=_ref.onClick,isGameEnd=_ref.isGameEnd;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_square__WEBPACK_IMPORTED_MODULE_2__.a,{value:value,onClick:onClick,isGameEnd:isGameEnd})},onClick=function onClick(){return console.log("onClick")},Default=Template.bind({});Default.args={value:null,onClick:onClick,isGameEnd:!1};var X=Template.bind({});X.args={value:"X",onClick:onClick,isGameEnd:!1};var O=Template.bind({});O.args={value:"O",onClick:onClick,isGameEnd:!1},Default.parameters=Object(_Users_gntk_repositories_PrAhaChallengeTasks_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({storySource:{source:"({ value, onClick, isGameEnd }) => (\n  <Square {...{ value, onClick, isGameEnd }} />\n)"}},Default.parameters),X.parameters=Object(_Users_gntk_repositories_PrAhaChallengeTasks_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({storySource:{source:"({ value, onClick, isGameEnd }) => (\n  <Square {...{ value, onClick, isGameEnd }} />\n)"}},X.parameters),O.parameters=Object(_Users_gntk_repositories_PrAhaChallengeTasks_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({storySource:{source:"({ value, onClick, isGameEnd }) => (\n  <Square {...{ value, onClick, isGameEnd }} />\n)"}},O.parameters)},1099:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Default",(function(){return Default})),__webpack_require__.d(__webpack_exports__,"InProgress",(function(){return InProgress})),__webpack_require__.d(__webpack_exports__,"XWin",(function(){return XWin})),__webpack_require__.d(__webpack_exports__,"Draw",(function(){return Draw}));var objectSpread2=__webpack_require__(47),board=(__webpack_require__(0),__webpack_require__(157)),info=__webpack_require__(159),slicedToArray=__webpack_require__(477),jsx_runtime=(__webpack_require__(1092),__webpack_require__(28)),game_Game=function Game(_ref){var isXNext=_ref.isXNext,status=_ref.status,changeStatus=_ref.changeStatus,history=_ref.history,changeHistory=_ref.changeHistory,winner=function useCalculateWinner(status){var winPattern=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].find((function(_ref){var _ref2=Object(slicedToArray.a)(_ref,3),first=_ref2[0],second=_ref2[1],third=_ref2[2];return status[first]===status[second]&&status[second]===status[third]&&status[first]===status[third]}));return winPattern?status[winPattern[0]]:null}(status),isGameEnd=!!winner||status.every((function(s){return!!s}));return Object(jsx_runtime.jsxs)("div",{className:"game",children:[Object(jsx_runtime.jsx)("div",{className:"game-board",children:Object(jsx_runtime.jsx)(board.a,{status:status,changeStatus:changeStatus,isGameEnd:isGameEnd})}),Object(jsx_runtime.jsx)("div",{className:"game-info",children:Object(jsx_runtime.jsx)(info.a,{history:history,changeHistory:changeHistory,isXNext:isXNext,winner:winner,isGameEnd:isGameEnd})})]})};try{game_Game.displayName="Game",game_Game.__docgenInfo={description:"",displayName:"Game",props:{isXNext:{defaultValue:null,description:"",name:"isXNext",required:!0,type:{name:"boolean"}},status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:"squareStatus[]"}},changeStatus:{defaultValue:null,description:"",name:"changeStatus",required:!0,type:{name:"(index: number) => void"}},history:{defaultValue:null,description:"",name:"history",required:!0,type:{name:"squareStatus[][]"}},changeHistory:{defaultValue:null,description:"",name:"changeHistory",required:!0,type:{name:"(index: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/game/game.tsx#Game"]={docgenInfo:game_Game.__docgenInfo,name:"Game",path:"src/components/game/game.tsx#Game"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__(209),__webpack_exports__.default={title:"Game",component:game_Game};var game_stories_Template=function Template(_ref){var _ref$isXNext=_ref.isXNext,isXNext=void 0===_ref$isXNext||_ref$isXNext,status=_ref.status,changeStatus=_ref.changeStatus,_ref$history=_ref.history,history=void 0===_ref$history?[Array(9).fill(null)]:_ref$history,changeHistory=_ref.changeHistory;return Object(jsx_runtime.jsx)(game_Game,{isXNext:isXNext,status:status,changeStatus:changeStatus,history:history,changeHistory:changeHistory})},game_stories_changeStatus=function changeStatus(){return console.log("Change status.")},game_stories_changeHistory=function changeHistory(){return console.log("Change history.")},Default=game_stories_Template.bind({});Default.args={status:Array(9).fill(null),changeStatus:game_stories_changeStatus,changeHistory:game_stories_changeHistory};var InProgress=game_stories_Template.bind({});InProgress.args={status:["X",null,"O","X","X",null,null,"O","O"],changeStatus:game_stories_changeStatus,history:[[null,null,null,null,null,null,null,null,null],["X",null,null,null,null,null,null,null,null],["X",null,"O",null,null,null,null,null,null],["X",null,"O","X",null,null,null,null,null],["X",null,"O","X",null,null,null,null,"O"],["X",null,"O","X","X",null,null,null,"O"],["X",null,"O","X","X",null,null,"O","O"]],changeHistory:game_stories_changeHistory};var XWin=game_stories_Template.bind({});XWin.args={status:["X",null,"O","X","X",null,"X","O","O"],changeStatus:game_stories_changeStatus,history:[[null,null,null,null,null,null,null,null,null],["X",null,null,null,null,null,null,null,null],["X",null,"O",null,null,null,null,null,null],["X",null,"O","X",null,null,null,null,null],["X",null,"O","X",null,null,null,null,"O"],["X",null,"O","X","X",null,null,null,"O"],["X",null,"O","X","X",null,null,"O","O"],["X",null,"O","X","X",null,"X","O","O"]],changeHistory:game_stories_changeHistory};var Draw=game_stories_Template.bind({});Draw.args={status:["O","X","O","O","O","X","X","O","X"],changeStatus:game_stories_changeStatus,history:[[null,null,null,null,null,null,null,null,null],["O",null,null,null,null,null,null,null,null],["O","X",null,null,null,null,null,null,null],["O","X",null,"O",null,null,null,null,null],["O","X",null,"O",null,null,"X",null,null],["O","X",null,"O","O",null,"X",null,null],["O","X",null,"O","O",null,"X",null,"X"],["O","X",null,"O","O",null,"X","O","X"],["O","X",null,"O","O","X","X","O","X"],["O","X","O","O","O","X","X","O","X"]],changeHistory:game_stories_changeHistory},Default.parameters=Object(objectSpread2.a)({storySource:{source:"({\n  isXNext = true,\n  status,\n  changeStatus,\n  history = [Array(9).fill(null)],\n  changeHistory,\n}) => <Game {...{ isXNext, status, changeStatus, history, changeHistory }} />"}},Default.parameters),InProgress.parameters=Object(objectSpread2.a)({storySource:{source:"({\n  isXNext = true,\n  status,\n  changeStatus,\n  history = [Array(9).fill(null)],\n  changeHistory,\n}) => <Game {...{ isXNext, status, changeStatus, history, changeHistory }} />"}},InProgress.parameters),XWin.parameters=Object(objectSpread2.a)({storySource:{source:"({\n  isXNext = true,\n  status,\n  changeStatus,\n  history = [Array(9).fill(null)],\n  changeHistory,\n}) => <Game {...{ isXNext, status, changeStatus, history, changeHistory }} />"}},XWin.parameters),Draw.parameters=Object(objectSpread2.a)({storySource:{source:"({\n  isXNext = true,\n  status,\n  changeStatus,\n  history = [Array(9).fill(null)],\n  changeHistory,\n}) => <Game {...{ isXNext, status, changeStatus, history, changeHistory }} />"}},Draw.parameters)},157:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return Board}));var _square_square__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(158),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(1091),__webpack_require__(28)),Board=function Board(_ref){var status=_ref.status,changeStatus=_ref.changeStatus,isGameEnd=_ref.isGameEnd;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{children:[0,1,2].map((function(i){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"board-row",children:[0,1,2].map((function(j){var index=3*i+j;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_square_square__WEBPACK_IMPORTED_MODULE_0__.a,{value:status[index],onClick:function onClick(){return changeStatus(index)},isGameEnd:isGameEnd},index)}))},i)}))})};try{Board.displayName="Board",Board.__docgenInfo={description:"",displayName:"Board",props:{status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:"squareStatus[]"}},changeStatus:{defaultValue:null,description:"",name:"changeStatus",required:!0,type:{name:"(index: number) => void"}},isGameEnd:{defaultValue:null,description:"",name:"isGameEnd",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/board/board.tsx#Board"]={docgenInfo:Board.__docgenInfo,name:"Board",path:"src/components/board/board.tsx#Board"})}catch(__react_docgen_typescript_loader_error){}},158:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return Square}));__webpack_require__(1089);var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(28),Square=function Square(_ref){var value=_ref.value,onClick=_ref.onClick,isGameEnd=_ref.isGameEnd;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button",{className:"square",type:"button",onClick:onClick,disabled:isGameEnd,children:value})};try{Square.displayName="Square",Square.__docgenInfo={description:"",displayName:"Square",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"squareStatus"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"() => void"}},isGameEnd:{defaultValue:null,description:"",name:"isGameEnd",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/square/square.tsx#Square"]={docgenInfo:Square.__docgenInfo,name:"Square",path:"src/components/square/square.tsx#Square"})}catch(__react_docgen_typescript_loader_error){}},159:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return Info}));var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(28),Info=function Info(_ref){var history=_ref.history,changeHistory=_ref.changeHistory,isXNext=_ref.isXNext,winner=_ref.winner,isGameEnd=_ref.isGameEnd,nextPlayer=isXNext?"X":"O",gameStatus=winner?"Winner: ".concat(winner):isGameEnd?"Draw":"Next player: ".concat(nextPlayer);return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{children:gameStatus}),history.length>1&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ol",{children:history.map((function(board,index){return 0===index?null:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li",{children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button",{onClick:function onClick(){return changeHistory(index)},type:"button",children:1===index?"Go to game start":"Go to board #".concat(index-1)})},JSON.stringify(board))}))})]})};try{Info.displayName="Info",Info.__docgenInfo={description:"",displayName:"Info",props:{history:{defaultValue:null,description:"",name:"history",required:!0,type:{name:"squareStatus[][]"}},changeHistory:{defaultValue:null,description:"",name:"changeHistory",required:!0,type:{name:"(index: number) => void"}},isXNext:{defaultValue:null,description:"",name:"isXNext",required:!0,type:{name:"boolean"}},winner:{defaultValue:null,description:"",name:"winner",required:!0,type:{name:"squareStatus"}},isGameEnd:{defaultValue:null,description:"",name:"isGameEnd",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/info/info.tsx#Info"]={docgenInfo:Info.__docgenInfo,name:"Info",path:"src/components/info/info.tsx#Info"})}catch(__react_docgen_typescript_loader_error){}},209:function(module,exports,__webpack_require__){},480:function(module,exports,__webpack_require__){__webpack_require__(481),__webpack_require__(645),__webpack_require__(646),__webpack_require__(804),__webpack_require__(1024),__webpack_require__(1057),__webpack_require__(1062),__webpack_require__(1074),__webpack_require__(1076),__webpack_require__(1081),__webpack_require__(1083),module.exports=__webpack_require__(1085)},554:function(module,exports){},646:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(360)}},[[480,1,2]]]);
//# sourceMappingURL=main.31f3a6508bee1b51dcdb.bundle.js.map