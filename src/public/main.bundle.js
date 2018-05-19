webpackJsonp(["main"],{

/***/ "./.env.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// APPLICATION
const APP_NAME = 'Inarts';
/* harmony export (immutable) */ __webpack_exports__["d"] = APP_NAME;

const APP_SCHEMA = 'http';
/* harmony export (immutable) */ __webpack_exports__["f"] = APP_SCHEMA;

const APP_HOST = 'localhost';
/* harmony export (immutable) */ __webpack_exports__["c"] = APP_HOST;

const APP_PORT = '3000';
/* harmony export (immutable) */ __webpack_exports__["e"] = APP_PORT;

const APP_SOCKET_PATH = '/inartschat';
/* unused harmony export APP_SOCKET_PATH */

// APICODES
const API_ERROR = 401;
/* unused harmony export API_ERROR */

const API_SUCCESS = 200;
/* unused harmony export API_SUCCESS */

const API_VERSION = 'v1/';
/* harmony export (immutable) */ __webpack_exports__["b"] = API_VERSION;

const API_ROUTE = 'https://localhost:3333/api/';
/* harmony export (immutable) */ __webpack_exports__["a"] = API_ROUTE;



/***/ }),

/***/ "./package.json":
/***/ (function(module, exports) {

module.exports = {"name":"inarts","description":"awesome Angular frontend for Inarts","keywords":["Angular 2","TypeScript","socketio","SCSS","Inarts","ticquique"],"version":"0.0.0","license":"MIT","scripts":{"ng":"ng","start":"ng serve","build":"ng build --prod","test":"ng test","lint":"ng lint","e2e":"ng e2e"},"private":true,"dependencies":{"@angular/animations":"^5.2.0","@angular/common":"^5.2.0","@angular/compiler":"^5.2.0","@angular/core":"^5.2.0","@angular/forms":"^5.2.0","@angular/http":"^5.2.0","@angular/platform-browser":"^5.2.0","@angular/platform-browser-dynamic":"^5.2.0","@angular/router":"^5.2.0","@ngx-translate/core":"^9.1.1","@ngx-translate/http-loader":"^3.0.1","@types/socket.io-client":"^1.4.32","body-parser":"^1.18.2","bootstrap":"^4.1.0","cookie-parser":"^1.4.3","core-js":"^2.4.1","dotenv":"^5.0.1","express":"^4.16.3","font-awesome":"^4.7.0","jquery":"^3.3.1","jsonwebtoken":"^8.2.1","morgan":"^1.9.0","popper.js":"^1.14.3","rxjs":"^5.5.6","socket.io-client":"^2.1.0","tslint":"^5.9.1","zone.js":"^0.8.19"},"devDependencies":{"@angular/cli":"~1.7.4","@angular/compiler-cli":"^5.2.0","@angular/language-service":"^5.2.0","@types/jsonwebtoken":"^7.2.6","@types/node":"^9.6.6","typescript":"~2.5.3"}}

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__feed_feed_component__ = __webpack_require__("./src/app/feed/feed.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_3__feed_feed_component__["a" /* FeedComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */] },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\r\n<div class=\"cosa\" *ngIf=\"removeafter\">cosa</div>\r\n<router-outlet>\r\n    <inarts-loader *ngIf=\"showLoader\"></inarts-loader>\r\n</router-outlet>"

/***/ }),

/***/ "./src/app/app.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_services_socket_service__ = __webpack_require__("./src/app/shared/services/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_header_service__ = __webpack_require__("./src/app/shared/services/header.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_loader_loader_service__ = __webpack_require__("./src/app/shared/loader/loader.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_user_service__ = __webpack_require__("./src/app/shared/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let AppComponent = class AppComponent {
    constructor(loaderService, header, userService, socketService) {
        this.loaderService = loaderService;
        this.header = header;
        this.userService = userService;
        this.socketService = socketService;
        this.title = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].app.name;
        this.removeafter = this.socketService.thing;
        header.resetFavicon();
    }
    ngOnInit() {
        this.loaderService.status.subscribe((val) => {
            this.showLoader = val;
        });
    }
};
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("./src/app/app.component.html"),
        styles: [__webpack_require__("./src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__shared_loader_loader_service__["a" /* LoaderService */],
        __WEBPACK_IMPORTED_MODULE_1__shared_services_header_service__["b" /* HeaderService */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_0__shared_services_socket_service__["a" /* SocketService */]])
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__feed_feed_module__ = __webpack_require__("./src/app/feed/feed.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_module__ = __webpack_require__("./src/app/home/home.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm2015/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__("./src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_errors__ = __webpack_require__("./src/app/core/errors/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__home_home_module__["a" /* HomeModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_8__core_errors__["a" /* ErrorsModule */],
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_0__feed_feed_module__["a" /* FeedModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["b" /* Meta */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* Title */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/core/errors/errors-component/errors.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"error-container\">\r\n\r\n    <div class=\"container\" *ngIf=\"routeParams?.error\">\r\n        <div class=\"col-10 offset-2 error-container\">\r\n            <div class=\"card\">\r\n                <div class=\"card-header\">\r\n                    <h1>ERROR {{ routeParams?.error?.name }}</h1>\r\n                </div>\r\n                <div class=\"card-body\">\r\n                    <p class=\"card-text\">{{ routeParams?.error }}</p>\r\n                </div>\r\n                <div class=\"card-footer text-muted\">\r\n                    <a class=\"btn btn-secondary\" mat-raised-button [routerLink]=\"'/'\">\r\n                        <h5>Go to Home</h5>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>"

/***/ }),

/***/ "./src/app/core/errors/errors-component/errors.component.scss":
/***/ (function(module, exports) {

module.exports = ".error-container {\n  margin-top: 60px; }\n"

/***/ }),

/***/ "./src/app/core/errors/errors-component/errors.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ErrorsComponent = class ErrorsComponent {
    constructor(activatedRoute) {
        this.activatedRoute = activatedRoute;
        this.routeParams = this.activatedRoute.snapshot.queryParams;
    }
};
ErrorsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'inarts-error',
        template: __webpack_require__("./src/app/core/errors/errors-component/errors.component.html"),
        styles: [__webpack_require__("./src/app/core/errors/errors-component/errors.component.scss")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]])
], ErrorsComponent);



/***/ }),

/***/ "./src/app/core/errors/errors-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errors_component_errors_component__ = __webpack_require__("./src/app/core/errors/errors-component/errors.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const routes = [
    { path: 'error', component: __WEBPACK_IMPORTED_MODULE_2__errors_component_errors_component__["a" /* ErrorsComponent */] },
];
let ErrorRoutingModule = class ErrorRoutingModule {
};
ErrorRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], ErrorRoutingModule);



/***/ }),

/***/ "./src/app/core/errors/errors.interceptor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServerErrorsInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do__ = __webpack_require__("./node_modules/rxjs/_esm2015/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_delay__ = __webpack_require__("./node_modules/rxjs/_esm2015/add/operator/delay.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_retry__ = __webpack_require__("./node_modules/rxjs/_esm2015/add/operator/retry.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let ServerErrorsInterceptor = class ServerErrorsInterceptor {
    constructor(router) {
        this.router = router;
    }
    intercept(request, next) {
        return next.handle(request).retry(2);
    }
};
ServerErrorsInterceptor = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
], ServerErrorsInterceptor);



/***/ }),

/***/ "./src/app/core/errors/errors.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm2015/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errors_service__ = __webpack_require__("./src/app/core/errors/errors.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__errors_interceptor__ = __webpack_require__("./src/app/core/errors/errors.interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__errors_routing_module__ = __webpack_require__("./src/app/core/errors/errors-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__errors_component_errors_component__ = __webpack_require__("./src/app/core/errors/errors-component/errors.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let ErrorsModule = class ErrorsModule {
};
ErrorsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_6__errors_routing_module__["a" /* ErrorRoutingModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__errors_component_errors_component__["a" /* ErrorsComponent */]
        ],
        providers: [
            {
                provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */],
                useClass: __WEBPACK_IMPORTED_MODULE_4__errors_service__["a" /* ErrorsHandler */],
            },
            {
                provide: __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                useClass: __WEBPACK_IMPORTED_MODULE_5__errors_interceptor__["a" /* ServerErrorsInterceptor */],
                multi: true
            },
        ]
    })
], ErrorsModule);



/***/ }),

/***/ "./src/app/core/errors/errors.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorsHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ErrorsHandler = class ErrorsHandler {
    constructor(injector) {
        this.injector = injector;
        this.handleError = (error) => {
            const router = this.injector.get(__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]);
            let errorString = '';
            if (error instanceof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpErrorResponse */]) {
                if (!navigator.onLine) {
                    errorString = `No internet connection`;
                }
                if (error.error.message) {
                    errorString = `${error.error.message}`;
                }
                console.error(errorString);
            }
            else {
                router.navigate(['/error'], { queryParams: { error } });
            }
        };
    }
};
ErrorsHandler = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_core__["C" /* Injector */]])
], ErrorsHandler);



/***/ }),

/***/ "./src/app/core/errors/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__errors_module__ = __webpack_require__("./src/app/core/errors/errors.module.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__errors_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_service__ = __webpack_require__("./src/app/core/errors/errors.service.ts");
/* unused harmony reexport ErrorsHandler */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errors_component_errors_component__ = __webpack_require__("./src/app/core/errors/errors-component/errors.component.ts");
/* unused harmony reexport ErrorsComponent */





/***/ }),

/***/ "./src/app/feed/feed-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feed_component__ = __webpack_require__("./src/app/feed/feed.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__feed_component__["a" /* FeedComponent */] },
];
let FeedRoutingModule = class FeedRoutingModule {
};
FeedRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], FeedRoutingModule);



/***/ }),

/***/ "./src/app/feed/feed.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/feed/feed.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/feed/feed.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let FeedComponent = class FeedComponent {
};
FeedComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-feed',
        template: __webpack_require__("./src/app/feed/feed.component.html"),
        styles: [__webpack_require__("./src/app/feed/feed.component.scss")],
    })
], FeedComponent);



/***/ }),

/***/ "./src/app/feed/feed.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm2015/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feed_component__ = __webpack_require__("./src/app/feed/feed.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__feed_routing_module__ = __webpack_require__("./src/app/feed/feed-routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let FeedModule = class FeedModule {
};
FeedModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_5__feed_routing_module__["a" /* FeedRoutingModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__feed_component__["a" /* FeedComponent */]
        ],
        providers: []
    })
], FeedModule);



/***/ }),

/***/ "./src/app/home/home-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


const routes = [];
let HomeRoutingModule = class HomeRoutingModule {
};
HomeRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], HomeRoutingModule);



/***/ }),

/***/ "./src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<main>\r\n    <div class=\"row no-gutters\">\r\n        <div class=\"col-12 o-video-container justify-content-center\">\r\n            <div class=\"o-video-home\">\r\n                <video *ngIf=\"currentWindowWidth >= 992\" poster='assets/video/home/homeart-orig.png' autoplay loop playsinline class=\"c-video-home w-100\"\r\n                    id=\"bgvid\">\r\n                    <source src=\"assets/video/home/homeart.webm\" type=\"video/webm\" />{{ 'actualice el navegador' | translate }}\r\n                    <source src=\"assets/video/home/homeart.mp4\" type=\"video/mp4\" />{{ 'actualice el navegador' | translate }}\r\n                </video>\r\n                <img *ngIf=\"currentWindowWidth < 992 && currentWindowWidth > 760\" src=\"assets/video/home/homeart992.jpg\" class=\"c-image-home\"\r\n                    alt=\"Homeart image\">\r\n                <img *ngIf=\"currentWindowWidth <= 760 && currentWindowWidth > 360\" src=\"assets/video/home/homeart760.jpg\" class=\"c-image-home\"\r\n                    alt=\"Homeart image\">\r\n                <img *ngIf=\"currentWindowWidth <= 360\" src=\"assets/video/home/homeart360.jpg\" class=\"c-image-home\" alt=\"Homeart image\">\r\n                <div class=\"c-video-filter\"></div>\r\n            </div>\r\n            <div class=\"row align-items-center h-100\">\r\n                <div class=\"col-12 col-sm-8 col-md-7 col-lg-6 container-jumbo-video mx-auto\">\r\n                    <div class=\"jumbotron o-video-description\">\r\n                        <h1 class=\"text-center text-lg-left c-title-description\">{{title}}</h1>\r\n                        <hr class=\"my-4\">\r\n                        <p class=\"lead text-center text-lg-left c-video-description\">{{'bienvenido' | translate}}</p>\r\n                        <hr class=\"my-4\">\r\n                        <div class=\"row justify-content-between flex-column flex-lg-row\">\r\n                            <p class=\"lead col-8 col-lg-4 mx-auto\">\r\n                                <button class=\"btn btn-video-home btn-block p-2\" data-toggle=\"modal\" data-target=\"#registerModal\" role=\"button\">{{'registrarse' | translate}}</button>\r\n                            </p>\r\n                            <p class=\"lead col-8 col-lg-4 mx-auto\">\r\n                                <button class=\"btn btn-video-home btn-block p-2\" data-toggle=\"modal\" data-target=\"#loginModal\" role=\"button\">{{'login' | translate}}</button>\r\n                            </p>\r\n                            <p class=\"lead col-8 col-lg-4 mx-auto\">\r\n                                <button class=\"btn btn-video-home btn-block p-2\" role=\"button\">{{'entrar' | translate}}</button>\r\n                            </p>\r\n                        </div>\r\n                        <div class=\"row justify-content-around\">\r\n                            <div class=\"col-8 col-lg-12\">\r\n                                <a class=\"recover-link\" href=\"a\">\r\n                                    <small>{{'recover password' | translate}}</small>\r\n                                </a>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <register-form></register-form>\r\n    <login-form></login-form>\r\n</main>"

/***/ }),

/***/ "./src/app/home/home.component.scss":
/***/ (function(module, exports) {

module.exports = ".o-video-container {\n  position: relative;\n  min-height: 70vh;\n  overflow: hidden; }\n\n.o-video-home {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: -1; }\n\n.c-video-home,\n.c-image-home {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  min-width: 100%;\n  min-height: 100%;\n  max-width: initial;\n  width: auto;\n  height: auto;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n          transform: translateX(-50%) translateY(-50%); }\n\n.c-video-filter {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  background-color: var(--gray-dark);\n  opacity: .05; }\n\n.container-jumbo-video {\n  max-width: 700px; }\n\n.o-video-description {\n  color: white;\n  margin: 0;\n  background-color: rgba(0, 0, 0, 0.7); }\n\n.c-title-description {\n  font-family: Brushed, Arial, Helvetica, sans-serif; }\n\n.c-video-description {\n  font-family: Open Sans, Arial, Helvetica, sans-serif; }\n\n.recover-link {\n  display: block;\n  padding-top: 10px;\n  color: rgba(255, 255, 255, 0.7);\n  text-decoration: none; }\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let HomeComponent = class HomeComponent {
    constructor() {
        this.title = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].app.name;
    }
    ngOnInit() {
        this.currentWindowWidth = window.innerWidth;
    }
    onResize() {
        this.currentWindowWidth = window.innerWidth;
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeComponent.prototype, "onResize", null);
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__("./src/app/home/home.component.html"),
        styles: [__webpack_require__("./src/app/home/home.component.scss")],
    })
], HomeComponent);



/***/ }),

/***/ "./src/app/home/home.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_routing_module__ = __webpack_require__("./src/app/home/home-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__register_register_component__ = __webpack_require__("./src/app/home/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm2015/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_component__ = __webpack_require__("./src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login_component__ = __webpack_require__("./src/app/home/login/login.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let HomeModule = class HomeModule {
};
HomeModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_0__home_routing_module__["a" /* HomeRoutingModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_1__register_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_7__login_login_component__["a" /* LoginComponent */]
        ],
        providers: []
    })
], HomeModule);



/***/ }),

/***/ "./src/app/home/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- Modal -->\r\n<div class=\"modal fade\" id=\"loginModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"login\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h4 class=\"modal-title\" id=\"login\">{{'login' | translate}}</h4>\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n            </div>\r\n            <form #loginForm=\"ngForm\" (submit)='submit($event)'>\r\n                <div class=\"modal-body\">\r\n                    <div class=\"container-fluid\">\r\n                        <div class=\"form-group\">\r\n                            <label for=\"email\">{{'email or username' | translate}}</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"email\" name=\"email\" aria-describedby=\"emailHelp\" [(ngModel)]=\"model.username\" [placeholder]=\"translatePipe.transform('enter email or username')\"\r\n                                required #email=\"ngModel\">\r\n                            <div [hidden]=\"email.valid || email.pristine\" class=\"p-2 alert-danger\">\r\n                                <small> {{'invalid email' | translate}} </small>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"password\">{{'password' | translate}}</label>\r\n                            <input type=\"password\" [(ngModel)]=\"model.password\" name=\"password\" class=\"form-control\" id=\"password\" [placeholder]=\"translatePipe.transform('password')\"\r\n                                required #password=\"ngModel\">\r\n                        </div>\r\n                        <div class=\"formAlert alert alert-danger alert-dismissible fade show\" role=\"alert\">\r\n                            {{formResult?.message}}\r\n                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\r\n                                <span aria-hidden=\"true\">&times;</span>\r\n                            </button>\r\n                        </div>\r\n                        <div class=\"custom-control custom-checkbox\">\r\n                            <input type=\"checkbox\" [(ngModel)]=\"rememberLog\" name=\"rememberLog\" id=\"rememberLog\"  class=\"custom-control-input\">\r\n                            <label class=\"custom-control-label\" for=\"rememberLog\">{{'remember' | translate}}</label>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">{{'close' | translate}}</button>\r\n                    <button type=\"submit\" [disabled]=\"!loginForm.form.valid\" class=\"btn btn-video-home\">{{'login' | translate}}</button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/home/login/login.component.scss":
/***/ (function(module, exports) {

module.exports = ".formAlert {\n  display: none; }\n"

/***/ }),

/***/ "./src/app/home/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_services_auth_service__ = __webpack_require__("./src/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_translation_translate_pipe__ = __webpack_require__("./src/app/shared/translation/translate.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let LoginComponent = class LoginComponent {
    constructor(translatePipe, authService, router) {
        this.translatePipe = translatePipe;
        this.authService = authService;
        this.router = router;
        this.model = { username: '', password: '' };
        this.rememberLog = false;
    }
    ngOnInit() {
        $('#loginModal').on('show.bs.modal', event => {
            const button = $(event.relatedTarget);
            const modal = $(this);
        });
    }
    submit(event) {
        this.authService.loggIn(this.model.username, this.model.password).subscribe(val => {
            this.authService.storeUserData(val, this.rememberLog);
            this.formResult = { error: false, message: this.translatePipe.transform('login success') };
            $('#loginModal').modal('hide');
            this.router.navigate(['/']);
        }, err => {
            this.formResult = { error: true, message: this.translatePipe.transform('incorrect password') };
            $('.formAlert').fadeIn(() => {
                setTimeout(() => {
                    $('.formAlert').fadeOut(() => { this.formResult = { error: false, message: '' }; });
                }, 2000);
            });
        });
    }
};
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'login-form',
        template: __webpack_require__("./src/app/home/login/login.component.html"),
        styles: [__webpack_require__("./src/app/home/login/login.component.scss")],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__shared_translation_translate_pipe__["a" /* TranslatePipe */], __WEBPACK_IMPORTED_MODULE_0__shared_services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]])
], LoginComponent);



/***/ }),

/***/ "./src/app/home/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- Modal -->\r\n<div class=\"modal fade\" id=\"registerModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"register\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h4 class=\"modal-title\" id=\"register\">{{'registrarse' | translate}}</h4>\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n            </div>\r\n            <form #registerForm=\"ngForm\" (submit)='submit($event)'>\r\n                <div class=\"modal-body\">\r\n                    <div class=\"container-fluid\">\r\n                        <div class=\"form-group\">\r\n                            <label for=\"regMail\">{{'email address' | translate}}</label>\r\n                            <input type=\"email\" class=\"form-control\" id=\"regMail\" name=\"regMail\" aria-describedby=\"emailHelp\" [(ngModel)]=\"model.email\"\r\n                                [placeholder]=\"translatePipe.transform('enter email')\" required #regMail=\"ngModel\" email>\r\n                            <div [hidden]=\"regMail.valid || regMail.pristine\" class=\"p-2 alert-danger\">\r\n                                <small> {{'invalid email' | translate}} </small>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"username\">{{'username' | translate}}</label>\r\n                            <input type=\"text\" [(ngModel)]=\"model.username\" name=\"username\" class=\"form-control\" id=\"username\" [placeholder]=\"translatePipe.transform('username')\"\r\n                                required #username=\"ngModel\" minlength=\"3\" maxlength=\"80\">\r\n                            <div [hidden]=\"username.valid || username.pristine\" class=\"alert-danger p-2\">\r\n                                <small> {{'username must contain between 3 and 80 characters' | translate}} </small>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group pt-1\">\r\n                            <div class=\"custom-control custom-radio custom-control-inline\">\r\n                                <input type=\"radio\" id=\"artistRole\" name=\"role\" [(ngModel)]=\"model.role\" class=\"custom-control-input\" value=\"artist\">\r\n                                <label class=\"custom-control-label\" for=\"artistRole\">{{'artist' | translate}}</label>\r\n                            </div>\r\n                            <div class=\"custom-control custom-radio custom-control-inline\">\r\n                                <input type=\"radio\" id=\"editorRole\" name=\"role\" [(ngModel)]=\"model.role\" class=\"custom-control-input\" value=\"editor\">\r\n                                <label class=\"custom-control-label\" for=\"editorRole\">{{'editor' | translate}}</label>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"formAlert alert alert-success alert-dismissible fade show\" role=\"alert\">\r\n                            {{formResult?.message}}\r\n                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\r\n                                <span aria-hidden=\"true\">&times;</span>\r\n                            </button>\r\n                        </div>\r\n                        <div class=\"formAlert alert alert-danger alert-dismissible fade show\" role=\"alert\">\r\n                            {{formResult?.message}}\r\n                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\r\n                                <span aria-hidden=\"true\">&times;</span>\r\n                            </button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">{{'close' | translate}}</button>\r\n                    <button type=\"submit\" [disabled]=\"!registerForm.form.valid\" class=\"btn btn-video-home\">{{'registrarse' | translate}}</button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/home/register/register.component.scss":
/***/ (function(module, exports) {

module.exports = ".formAlert {\n  display: none; }\n"

/***/ }),

/***/ "./src/app/home/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_translation_translate_pipe__ = __webpack_require__("./src/app/shared/translation/translate.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__ = __webpack_require__("./src/app/shared/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let RegisterComponent = class RegisterComponent {
    constructor(translatePipe, authService) {
        this.translatePipe = translatePipe;
        this.authService = authService;
        this.model = { username: '', email: '', role: 'artist' };
    }
    submit(event) {
        this.authService.register(this.model.username, this.model.role, this.model.email).subscribe(val => {
            this.formResult = { error: false, message: this.translatePipe.transform('Go to your email to confirm') };
            $('.formAlert.alert-success').fadeIn(() => {
                setTimeout(() => {
                    $('.formAlert.alert-success').fadeOut(() => {
                        $('#registerModal').modal('hide');
                    });
                }, 2000);
            });
        }, err => {
            console.log(err);
            this.formResult = { error: true, message: err.error.message };
            $('.formAlert.alert-danger').fadeIn(() => {
                setTimeout(() => { $('.formAlert.alert-danger').fadeOut(); }, 2000);
            });
        });
        // this.authService.loggIn(this.model.username, this.model.password)
    }
    ngOnInit() {
        $('#registerModal').on('show.bs.modal', event => {
            const button = $(event.relatedTarget);
            const modal = $(this);
        });
    }
};
RegisterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'register-form',
        template: __webpack_require__("./src/app/home/register/register.component.html"),
        styles: [__webpack_require__("./src/app/home/register/register.component.scss")],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_translation_translate_pipe__["a" /* TranslatePipe */], __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__["a" /* AuthService */]])
], RegisterComponent);



/***/ }),

/***/ "./src/app/shared/chat/chat.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm2015/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__ = __webpack_require__("./node_modules/rxjs/_esm2015/ReplaySubject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const status = { offline: 'offline', online: 'online', away: 'away', busy: 'busy' };
let ChatService = class ChatService {
    constructor() {
        this.status = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](status.offline);
        this.conversation = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
        // constructor(private socketService: SocketService) {
        //     this.socketService.socket.subscribe(socket => {
        //         if (socket) {
        //             this.socket = socket;
        //             socket.on('connect', () => {
        //                 const sessionid = socket.id;
        //                 console.log(sessionid);
        //             });
        //             this.socket.on('notif', (data) => { console.log(data); });
        //             this.socket.on('newMessage', (data) => {
        //                 console.log(data);
        //             });
        //             this.socket.on('disconnect', (data) => { console.log('a'); });
        //         }
        //     });
        // }
    }
};
ChatService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
], ChatService);



/***/ }),

/***/ "./src/app/shared/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<header>\r\n    <nav class=\"navbar navbar-expand navbar-light bg-light\">\r\n        <div class=\"nav navbar-nav\">\r\n            <a class=\"nav-item nav-link nav-logo active\" [routerLink]=\"[ '/' ]\">\r\n                <img class=\"c-header-logo\" alt=\"(logo de inarts | translate)\" src=\"assets/img/logo/definitivo.png\">\r\n                <h1 class=\"sr-only\">{{title}}</h1>\r\n            </a>\r\n        </div>\r\n    </nav>\r\n</header>"

/***/ }),

/***/ "./src/app/shared/header/header.component.scss":
/***/ (function(module, exports) {

module.exports = ".c-header-logo {\n  max-width: 150px; }\n"

/***/ }),

/***/ "./src/app/shared/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chat_chat_service__ = __webpack_require__("./src/app/shared/chat/chat.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let HeaderComponent = class HeaderComponent {
    constructor(chatService) {
        this.chatService = chatService;
        this.title = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].app.name;
    }
};
HeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'app-header',
        template: __webpack_require__("./src/app/shared/header/header.component.html"),
        styles: [__webpack_require__("./src/app/shared/header/header.component.scss")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__chat_chat_service__["a" /* ChatService */]])
], HeaderComponent);



/***/ }),

/***/ "./src/app/shared/loader/loader-component/loader.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" ng-if=\"show\">\r\n    <div class=\"row\">\r\n        <div id=\"loader\">\r\n            <div class=\"dot\"></div>\r\n            <div class=\"dot\"></div>\r\n            <div class=\"dot\"></div>\r\n            <div class=\"dot\"></div>\r\n            <div class=\"dot\"></div>\r\n            <div class=\"dot\"></div>\r\n            <div class=\"dot\"></div>\r\n            <div class=\"dot\"></div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/shared/loader/loader-component/loader.component.scss":
/***/ (function(module, exports) {

module.exports = "#loader {\n  bottom: 0;\n  height: 175px;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 175px; }\n\n#loader {\n  bottom: 0;\n  height: 175px;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 175px; }\n\n#loader .dot {\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 87.5px; }\n\n#loader .dot::before {\n  border-radius: 100%;\n  content: \"\";\n  height: 87.5px;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  width: 87.5px; }\n\n#loader .dot:nth-child(7n+1) {\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg); }\n\n#loader .dot:nth-child(7n+1)::before {\n  -webkit-animation: 0.8s linear 0.1s normal none infinite running load;\n          animation: 0.8s linear 0.1s normal none infinite running load;\n  background: #00ff80 none repeat scroll 0 0; }\n\n#loader .dot:nth-child(7n+2) {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg); }\n\n#loader .dot:nth-child(7n+2)::before {\n  -webkit-animation: 0.8s linear 0.2s normal none infinite running load;\n          animation: 0.8s linear 0.2s normal none infinite running load;\n  background: #00ffea none repeat scroll 0 0; }\n\n#loader .dot:nth-child(7n+3) {\n  -webkit-transform: rotate(135deg);\n          transform: rotate(135deg); }\n\n#loader .dot:nth-child(7n+3)::before {\n  -webkit-animation: 0.8s linear 0.3s normal none infinite running load;\n          animation: 0.8s linear 0.3s normal none infinite running load;\n  background: #00aaff none repeat scroll 0 0; }\n\n#loader .dot:nth-child(7n+4) {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg); }\n\n#loader .dot:nth-child(7n+4)::before {\n  -webkit-animation: 0.8s linear 0.4s normal none infinite running load;\n          animation: 0.8s linear 0.4s normal none infinite running load;\n  background: #0040ff none repeat scroll 0 0; }\n\n#loader .dot:nth-child(7n+5) {\n  -webkit-transform: rotate(225deg);\n          transform: rotate(225deg); }\n\n#loader .dot:nth-child(7n+5)::before {\n  -webkit-animation: 0.8s linear 0.5s normal none infinite running load;\n          animation: 0.8s linear 0.5s normal none infinite running load;\n  background: #2a00ff none repeat scroll 0 0; }\n\n#loader .dot:nth-child(7n+6) {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg); }\n\n#loader .dot:nth-child(7n+6)::before {\n  -webkit-animation: 0.8s linear 0.6s normal none infinite running load;\n          animation: 0.8s linear 0.6s normal none infinite running load;\n  background: #9500ff none repeat scroll 0 0; }\n\n#loader .dot:nth-child(7n+7) {\n  -webkit-transform: rotate(315deg);\n          transform: rotate(315deg); }\n\n#loader .dot:nth-child(7n+7)::before {\n  -webkit-animation: 0.8s linear 0.7s normal none infinite running load;\n          animation: 0.8s linear 0.7s normal none infinite running load;\n  background: magenta none repeat scroll 0 0; }\n\n#loader .dot:nth-child(7n+8) {\n  -webkit-transform: rotate(360deg);\n          transform: rotate(360deg); }\n\n#loader .dot:nth-child(7n+8)::before {\n  -webkit-animation: 0.8s linear 0.8s normal none infinite running load;\n          animation: 0.8s linear 0.8s normal none infinite running load;\n  background: #ff0095 none repeat scroll 0 0; }\n\n@-webkit-keyframes load {\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes load {\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes load {\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n"

/***/ }),

/***/ "./src/app/shared/loader/loader-component/loader.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let LoaderComponent = class LoaderComponent {
    constructor(activatedRoute) {
        this.activatedRoute = activatedRoute;
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", Boolean)
], LoaderComponent.prototype, "show", void 0);
LoaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'inarts-loader',
        template: __webpack_require__("./src/app/shared/loader/loader-component/loader.component.html"),
        styles: [__webpack_require__("./src/app/shared/loader/loader-component/loader.component.scss")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]])
], LoaderComponent);



/***/ }),

/***/ "./src/app/shared/loader/loader.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoaderService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm2015/BehaviorSubject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let LoaderService = class LoaderService {
    constructor() {
        this.status = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](false);
    }
    display(value) {
        this.status.next(value);
    }
};
LoaderService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
], LoaderService);



/***/ }),

/***/ "./src/app/shared/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__ = __webpack_require__("./node_modules/jsonwebtoken/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm2015/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let AuthService = class AuthService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.authToken = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["e" /* HttpHeaders */]({ 'Content-Type': 'application/json' });
        this.loggIn = (username, password) => {
            return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].api.user.authenticate, { username, password }, { headers: this.headers });
        };
        // await to boolean
        this.loggedIn = () => {
            return new Promise((resolve, reject) => {
                const encryptedToken = this.loadToken();
                if (encryptedToken) {
                    const token = this.decodeToken(encryptedToken);
                    if (token && Math.floor(Date.now() / 1000) < token.exp) {
                        this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].api.user.tokenValidation, { headers: this.headers })
                            .toPromise().then(val => resolve(true)).catch(val => resolve(false));
                    }
                    else {
                        resolve(false);
                    }
                }
                else {
                    resolve(false);
                }
            });
        };
        this.register = (username, role, email) => {
            return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].api.user.registerUser, { username, role, email }, { headers: this.headers });
        };
        // remove credentials
        this.logout = () => {
            this.authToken.next(null);
            localStorage.clear();
            sessionStorage.clear();
            window.location.assign(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].app.url);
        };
        // return token or null
        this.decodeToken = (token) => {
            const decoded = __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__["decode"](token);
            return decoded;
        };
        this.storeUserData = (token, remember) => {
            if (remember) {
                localStorage.setItem('id_token', token);
            }
            else {
                sessionStorage.setItem('id_token', token);
            }
            this.authToken.next(token);
        };
        this.loadToken = () => {
            const token = localStorage.getItem('id_token') || sessionStorage.getItem('id_token') || null;
            if (token) {
                this.authToken.next(token);
            }
            return token;
        };
        this.loadToken();
    }
};
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */]])
], AuthService);



/***/ }),

/***/ "./src/app/shared/services/header.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HeaderService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm2015/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



class Headers {
}
/* unused harmony export Headers */

const BROWSER_FAVICONS_CONFIG = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* InjectionToken */]('Favicons Configuration');
/* harmony export (immutable) */ __webpack_exports__["a"] = BROWSER_FAVICONS_CONFIG;

let HeaderService = 
// tslint:disable-next-line:max-classes-per-file
class HeaderService {
    // I initialize the Favicons service.
    constructor(faviconConfig, meta, title) {
        this.meta = meta;
        this.title = title;
        this.setTitle(__WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].app.name);
        this.setMeta(__WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].app.meta);
        this.faviconId = 'favicons-service-injected-node';
        this.icons = Object.assign(Object.create(null), faviconConfig.icons);
        this.useCacheBusting = (faviconConfig.cacheBusting || false);
        this.removeExternalLinkElements();
    }
    setTitle(name) {
        this.title.setTitle(name);
    }
    // I create the metadata tags
    setMeta(meta) {
        if (meta instanceof Array) {
            meta.map(val => { this.meta.updateTag(val); });
        }
        else {
            this.meta.updateTag(meta);
        }
    }
    // I activate the favicon with the given name / identifier.
    activateFavicon(name) {
        if (!this.icons[name]) {
            throw (new Error(`Favicon for [ ${name} ] not found.`));
        }
        this.setNode(this.icons[name].type, this.icons[name].href);
    }
    // I activate the default favicon (with isDefault set to True).
    resetFavicon() {
        for (const name of Object.keys(this.icons)) {
            const icon = this.icons[name];
            if (icon.isDefault) {
                this.setNode(icon.type, icon.href);
                return;
            }
        }
        this.removeNode();
    }
    addNode(type, href) {
        const linkElement = document.createElement('link');
        linkElement.setAttribute('id', this.faviconId);
        linkElement.setAttribute('rel', 'icon');
        linkElement.setAttribute('type', type);
        linkElement.setAttribute('href', href);
        document.head.appendChild(linkElement);
    }
    // I return an augmented HREF value with a cache-busting query-string parameter.
    cacheBustHref(href) {
        const augmentedHref = (href.indexOf('?') === -1)
            ? `${href}?faviconCacheBust=${Date.now()}`
            : `${href}&faviconCacheBust=${Date.now()}`;
        return (augmentedHref);
    }
    // I remove any favicon nodes that are not controlled by this service.
    removeExternalLinkElements() {
        const linkElements = document.querySelectorAll("link[ rel ~= 'icon' i]");
        for (const linkElement of Array.from(linkElements)) {
            linkElement.parentNode.removeChild(linkElement);
        }
    }
    // I remove the favicon node from the document header.
    removeNode() {
        const linkElement = document.head.querySelector('#' + this.faviconId);
        if (linkElement) {
            document.head.removeChild(linkElement);
        }
    }
    // I remove the existing favicon node and inject a new favicon node with the given
    // element settings.
    setNode(type, href) {
        const augmentedHref = this.useCacheBusting
            ? this.cacheBustHref(href)
            : href;
        this.removeNode();
        this.addNode(type, augmentedHref);
    }
};
HeaderService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])()
    // tslint:disable-next-line:max-classes-per-file
    ,
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["z" /* Inject */])(BROWSER_FAVICONS_CONFIG)),
    __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["b" /* Meta */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* Title */]])
], HeaderService);



/***/ }),

/***/ "./src/app/shared/services/socket.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_service__ = __webpack_require__("./src/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client__ = __webpack_require__("./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm2015/BehaviorSubject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let SocketService = class SocketService {
    constructor(authService) {
        this.authService = authService;
        this.socket = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        this.authService.authToken.subscribe(token => {
            if (this.socket.getValue() !== null) {
                this.socket.getValue().close();
                this.socket.next(null);
            }
            if (token) {
                const sock = __WEBPACK_IMPORTED_MODULE_3_socket_io_client__(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].api.url, { query: `token=${token}`, transports: ['polling', 'websocket'] });
                console.log(sock.id); // undefined
                sock.on('connect', (socket) => {
                    alert('cosa');
                });
                sock.on('connect_error', () => {
                    this.thing = true;
                });
                sock.on('connect_timeout', () => {
                    this.thing = true;
                });
                sock.on('reconnect_attempt', () => {
                    this.thing = true;
                });
                sock.on('reconnecting', () => {
                    this.thing = true;
                });
                sock.on('reconnect_error', () => {
                    this.thing = true;
                });
                sock.on('reconnect_failed', () => {
                    this.thing = true;
                });
                sock.on('ping', () => {
                    this.thing = true;
                });
                sock.on('pong', () => {
                    this.thing = true;
                });
                this.socket.next(sock);
            }
        });
    }
};
SocketService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__auth_service__["a" /* AuthService */]])
], SocketService);



/***/ }),

/***/ "./src/app/shared/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_service__ = __webpack_require__("./src/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm2015/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let UserService = class UserService {
    constructor(authService, httpClient, router) {
        this.authService = authService;
        this.httpClient = httpClient;
        this.router = router;
        this.user = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        this.countTry = 0;
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["e" /* HttpHeaders */]({ 'Content-Type': 'application/json' });
        this.getUser = (find) => {
            let searchString = '';
            const searchArray = [];
            if (find) {
                if (find.resource) {
                    searchArray.push(`resource=${find.resource}`);
                }
                if (find.filter) {
                    searchArray.push(`filter=${find.filter}`);
                }
                if (find.page) {
                    searchArray.push(`page=${find.page}`);
                }
                if (find.perPage) {
                    searchArray.push(`perPage=${find.perPage}`);
                }
                if (find.partial) {
                    searchArray.push(`partial=${find.partial}`);
                }
                if (find.sort) {
                    searchArray.push(`sort=${find.sort}`);
                }
                if (find.populate) {
                    searchArray.push(`populate=${find.populate}`);
                }
                searchString = `?${searchArray.join('&')}`;
            }
            return this.httpClient.get(`${__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].api.user.getUser}${searchString}`);
        };
        this.authService.authToken.subscribe(tokenVal => {
            if (tokenVal) {
                const token = this.authService.decodeToken(tokenVal);
                if (token) {
                    const find = { resource: `_id-${token.sub}` };
                    this.getUser(find).subscribe(val => {
                        if (val.length) {
                            this.user.next(val[0]);
                        }
                        else {
                            this.router.navigate(['home']);
                            this.user.next(null);
                        }
                    });
                }
            }
            else if (this.countTry === 0) {
                this.countTry = this.countTry + 1;
                this.router.navigate(['home']);
            }
        });
    }
};
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]])
], UserService);



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loader_loader_component_loader_component__ = __webpack_require__("./src/app/shared/loader/loader-component/loader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loader_loader_service__ = __webpack_require__("./src/app/shared/loader/loader.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("./src/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__("./src/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__header_header_component__ = __webpack_require__("./src/app/shared/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__translation_translation_service__ = __webpack_require__("./src/app/shared/translation/translation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__translation_translate_pipe__ = __webpack_require__("./src/app/shared/translation/translate.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm2015/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_header_service__ = __webpack_require__("./src/app/shared/services/header.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_socket_service__ = __webpack_require__("./src/app/shared/services/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__chat_chat_service__ = __webpack_require__("./src/app/shared/chat/chat.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













let SharedModule = SharedModule_1 = class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule_1,
            providers: [
                __WEBPACK_IMPORTED_MODULE_1__loader_loader_service__["a" /* LoaderService */],
                __WEBPACK_IMPORTED_MODULE_9__services_header_service__["b" /* HeaderService */],
                __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_7__translation_translate_pipe__["a" /* TranslatePipe */],
                __WEBPACK_IMPORTED_MODULE_5__translation_translation_service__["a" /* TranslationService */],
                __WEBPACK_IMPORTED_MODULE_11__services_socket_service__["a" /* SocketService */],
                __WEBPACK_IMPORTED_MODULE_12__chat_chat_service__["a" /* ChatService */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_9__services_header_service__["a" /* BROWSER_FAVICONS_CONFIG */],
                    useValue: {
                        icons: {
                            default: {
                                type: 'image/png',
                                href: './assets/favicon/favicon24.png',
                                isDefault: true
                            }
                        },
                        cacheBusting: true
                    }
                }
            ],
        };
    }
};
SharedModule = SharedModule_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["I" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_router__["c" /* RouterModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__translation_translate_pipe__["a" /* TranslatePipe */],
            __WEBPACK_IMPORTED_MODULE_4__header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_0__loader_loader_component_loader_component__["a" /* LoaderComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__loader_loader_component_loader_component__["a" /* LoaderComponent */],
            __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_7__translation_translate_pipe__["a" /* TranslatePipe */],
            __WEBPACK_IMPORTED_MODULE_4__header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_10__angular_router__["c" /* RouterModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__translation_translation_service__["a" /* TranslationService */],
            __WEBPACK_IMPORTED_MODULE_9__services_header_service__["b" /* HeaderService */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1__loader_loader_service__["a" /* LoaderService */],
            __WEBPACK_IMPORTED_MODULE_7__translation_translate_pipe__["a" /* TranslatePipe */],
            __WEBPACK_IMPORTED_MODULE_11__services_socket_service__["a" /* SocketService */],
            __WEBPACK_IMPORTED_MODULE_12__chat_chat_service__["a" /* ChatService */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_9__services_header_service__["a" /* BROWSER_FAVICONS_CONFIG */],
                useValue: {
                    icons: {
                        default: {
                            type: 'image/png',
                            href: './assets/favicon/favicon24.png',
                            isDefault: true
                        }
                    },
                    cacheBusting: true
                }
            }
        ],
    })
], SharedModule);

var SharedModule_1;


/***/ }),

/***/ "./src/app/shared/translation/translate.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__translation_service__ = __webpack_require__("./src/app/shared/translation/translation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let TranslatePipe = class TranslatePipe {
    constructor(translationService) {
        this.translationService = translationService;
    }
    transform(value, args) {
        return this.translationService.translate(value);
    }
};
TranslatePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["T" /* Pipe */])({
        name: 'translate',
        pure: false
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__translation_service__["a" /* TranslationService */]])
], TranslatePipe);



/***/ }),

/***/ "./src/app/shared/translation/translation.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

const en = __webpack_require__("./src/environments/i18n/en.json");
const es = __webpack_require__("./src/environments/i18n/es.json");
const de = __webpack_require__("./src/environments/i18n/de.json");
class TranslationSet {
    constructor() {
        this.values = {};
    }
}
/* unused harmony export TranslationSet */

// tslint:disable-next-line:max-classes-per-file
let TranslationService = class TranslationService {
    constructor() {
        this.languages = ['de', 'en', 'es'];
        this.language = 'es';
        this.dictionary = {
            de: {
                languange: 'de',
                values: de
            },
            en: {
                languange: 'en',
                values: en
            },
            es: {
                languange: 'es',
                values: es
            }
        };
        const lang = navigator.language;
        if (this.languages.indexOf(lang) !== -1) {
            this.language = lang;
        }
    }
    translate(value) {
        if (this.dictionary[this.language] != null) {
            const val = this.dictionary[this.language].values[value];
            if (val) {
                return val;
            }
            else {
                return value;
            }
        }
    }
};
TranslationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], TranslationService);



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env__ = __webpack_require__("./.env.ts");

const pkg = __webpack_require__("./package.json");
const environment = {
    production: false,
    app: {
        name: __WEBPACK_IMPORTED_MODULE_0__env__["d" /* APP_NAME */],
        version: pkg.version,
        description: pkg.description,
        url: `${__WEBPACK_IMPORTED_MODULE_0__env__["f" /* APP_SCHEMA */]}://${__WEBPACK_IMPORTED_MODULE_0__env__["c" /* APP_HOST */]}:${__WEBPACK_IMPORTED_MODULE_0__env__["e" /* APP_PORT */]}`,
        meta: [
            { charset: 'utf-8' },
            { name: 'description', content: 'Si deseas promociarte como artista o apoyar futuras promesas como editor, tenemos lo que necesitas. Somos la red social de contacto entre artistas y editores.' },
            { name: 'keywords', content: 'diseño, ilustración, red social artistas, red social editores, contacto artistas, red contactos, donativos, escritura' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            { property: 'og:title', content: 'Contacto artistas y editores | Inarts' },
            { property: 'og:locale', content: 'es_ES' },
            { property: 'og:description', content: 'Si deseas promociarte como artista o apoyar futuras promesas como editor, tenemos lo que necesitas. Somos la red social de contacto entre artistas y editores.' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: `${__WEBPACK_IMPORTED_MODULE_0__env__["f" /* APP_SCHEMA */]}://${__WEBPACK_IMPORTED_MODULE_0__env__["c" /* APP_HOST */]}` },
            { property: 'og:image', content: `assets/img/og/1200x630.png` },
        ]
    },
    api: {
        url: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}`,
        user: {
            getUser: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}user/`,
            registerUser: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}user/registry/`,
            validateUser: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}user/validation/`,
            authenticate: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}user/auth/`,
            tokenValidation: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}user/auth/`,
            deleteUser: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}user/`,
            updateUser: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}user/`,
            admin: {
                getValids: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}user/validation/`,
                createUser: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}user/`,
            }
        },
        chat: {
            getChats: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}chat/`,
            getMessages: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}chat/message/`,
            createChat: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}chat/`,
            deleteChat: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}chat/`,
            admin: {
                deleteMessage: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}chat/message/`,
            }
        },
        subscription: {
            getSubscription: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}subscription/`,
            getMessages: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}subscription/`,
            createChat: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}subscription/`,
        },
        post: {
            createPost: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}post/`,
            getPosts: `${__WEBPACK_IMPORTED_MODULE_0__env__["a" /* API_ROUTE */]}${__WEBPACK_IMPORTED_MODULE_0__env__["b" /* API_VERSION */]}post/`,
        }
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = environment;



/***/ }),

/***/ "./src/environments/i18n/de.json":
/***/ (function(module, exports) {

module.exports = {"ejemplo":"Beispiel","actualice el navegador":"update your browser","logo de inarts":"Inarts logo","bienvenido":"Welcome to the social network of contact between artists and editors, start with us registering or visit our artists","registrarse":"Register","login":"Login","entrar":"Enter","recover password":"Recover password"}

/***/ }),

/***/ "./src/environments/i18n/en.json":
/***/ (function(module, exports) {

module.exports = {"ejemplo":"Example","actualice el navegador":"update your browser","logo de inarts":"Inarts logo","bienvenido":"Welcome to the social network of contact between artists and editors, start with us registering or visit our artists","registrarse":"Register","login":"Login","entrar":"Enter","recover password":"Recover password"}

/***/ }),

/***/ "./src/environments/i18n/es.json":
/***/ (function(module, exports) {

module.exports = {"ejemplo":"ejemplo","actualice el navegador":"actualice el navegador","logo de inarts":"logo de inarts","bienvenido":"Bienvenido a la red social de contacto entre artistas y editores, inicia tu experiencia con nosotros registrándote o visita nuestros artistas","registrarse":"Registrarse","login":"Iniciar sesión","entrar":"Entrar","recover password":"Recuperar contraseña","email address":"Correo electrónico","enter email":"Introduzca su email","invalid email":"Dirección de email no valida","username":"Nombre de usuario","username must contain between 3 and 80 characters":"El nombre de usuario debe contener entre 3 y 80 caracteres","artist":"Artista","editor":"Editor","close":"Cerrar","password":"Constraseña","email or username":"Email o nombre de usuario","enter email or username":"Introduzca su email o nombre de usuario","remember":"Recordar","incorrect password":"contraseña incorrecta"}

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm2015/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(err => console.log(err));


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map