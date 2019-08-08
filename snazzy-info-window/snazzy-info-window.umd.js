(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@agm/core'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@agm/core', '@angular/core'], factory) :
    (factory((global.ngmaps = global.ngmaps || {}, global.ngmaps.snazzyInfoWindow = {}),global.ngmaps.core,global.ng.core));
}(this, (function (exports,core,core$1) { 'use strict';

    var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (window && window.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (window && window.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var AgmSnazzyInfoWindow = /** @class */ (function () {
        function AgmSnazzyInfoWindow(_marker, _wrapper, _manager, _loader) {
            this._marker = _marker;
            this._wrapper = _wrapper;
            this._manager = _manager;
            this._loader = _loader;
            /**
             * Changes the open status of the snazzy info window.
             */
            this.isOpen = false;
            /**
             * Emits when the open status changes.
             */
            this.isOpenChange = new core$1.EventEmitter();
            /**
             * Choose where you want the info window to be displayed, relative to the marker.
             */
            this.placement = 'top';
            /**
             * The max width in pixels of the info window.
             */
            this.maxWidth = 200;
            /**
             * The max height in pixels of the info window.
             */
            this.maxHeight = 200;
            /**
             * Determines if the info window will open when the marker is clicked.
             * An internal listener is added to the Google Maps click event which calls the open() method.
             */
            this.openOnMarkerClick = true;
            /**
             * Determines if the info window will close when the map is clicked. An internal listener is added
             * to the Google Maps click event which calls the close() method. This will not activate on the
             * Google Maps drag event when the user is panning the map.
             */
            this.closeOnMapClick = true;
            /**
             * Determines if the info window will close when any other Snazzy Info Window is opened.
             */
            this.closeWhenOthersOpen = false;
            /**
             * Determines if the info window will show a close button.
             */
            this.showCloseButton = true;
            /**
             * Determines if the info window will be panned into view when opened.
             */
            this.panOnOpen = true;
            /**
             * object of additional option to pass to the constructor of snazzy-info-window
             */
            this.additionalOptions = {};
            /**
             * Emits before the info window opens.
             */
            this.beforeOpen = new core$1.EventEmitter();
            /**
             * Emits before the info window closes.
             */
            this.afterClose = new core$1.EventEmitter();
            this._snazzyInfoWindowInitialized = null;
        }
        /**
         * @internal
         */
        AgmSnazzyInfoWindow.prototype.ngOnChanges = function (changes) {
            if (this._nativeSnazzyInfoWindow == null) {
                return;
            }
            if ('isOpen' in changes && this.isOpen) {
                this._openInfoWindow();
            }
            else if ('isOpen' in changes && !this.isOpen) {
                this._closeInfoWindow();
            }
            if (('latitude' in changes || 'longitude' in changes) && this._marker == null) {
                this._updatePosition();
            }
        };
        /**
         * @internal
         */
        AgmSnazzyInfoWindow.prototype.ngAfterViewInit = function () {
            var _this = this;
            var m = this._manager != null ? this._manager.getNativeMarker(this._marker) : null;
            this._snazzyInfoWindowInitialized =
                this._loader.load()
                    .then(function () { return require('snazzy-info-window'); })
                    .then(function (module) { return Promise.all([module, m, _this._wrapper.getNativeMap()]); })
                    .then(function (elems) {
                    var options = {
                        map: elems[2],
                        content: '',
                        placement: _this.placement,
                        maxWidth: _this.maxWidth,
                        maxHeight: _this.maxHeight,
                        backgroundColor: _this.backgroundColor,
                        padding: _this.padding,
                        border: _this.border,
                        borderRadius: _this.borderRadius,
                        fontColor: _this.fontColor,
                        pointer: _this.pointer,
                        shadow: _this.shadow,
                        closeOnMapClick: _this.closeOnMapClick,
                        openOnMarkerClick: _this.openOnMarkerClick,
                        closeWhenOthersOpen: _this.closeWhenOthersOpen,
                        showCloseButton: _this.showCloseButton,
                        panOnOpen: _this.panOnOpen,
                        wrapperClass: _this.wrapperClass,
                        callbacks: {
                            beforeOpen: function () {
                                _this._createViewContent();
                                _this.beforeOpen.emit();
                            },
                            afterOpen: function () {
                                _this.isOpenChange.emit(_this.openStatus());
                            },
                            afterClose: function () {
                                _this.afterClose.emit();
                                _this.isOpenChange.emit(_this.openStatus());
                            }
                        }
                    };
                    if (_this.additionalOptions) {
                        for (var property in _this.additionalOptions) {
                            if (_this.additionalOptions.hasOwnProperty(property)) {
                                options[property] = _this.additionalOptions[property];
                            }
                        }
                    }
                    if (elems[1] != null) {
                        options.marker = elems[1];
                    }
                    else {
                        options.position = { lat: _this.latitude, lng: _this.longitude };
                    }
                    _this._nativeSnazzyInfoWindow = new elems[0](options);
                });
            this._snazzyInfoWindowInitialized.then(function () {
                if (_this.isOpen) {
                    _this._openInfoWindow();
                }
            });
        };
        AgmSnazzyInfoWindow.prototype._openInfoWindow = function () {
            var _this = this;
            this._snazzyInfoWindowInitialized.then(function () {
                _this._createViewContent();
                _this._nativeSnazzyInfoWindow.open();
            });
        };
        AgmSnazzyInfoWindow.prototype._closeInfoWindow = function () {
            var _this = this;
            this._snazzyInfoWindowInitialized.then(function () {
                _this._nativeSnazzyInfoWindow.close();
            });
        };
        AgmSnazzyInfoWindow.prototype._createViewContent = function () {
            if (this._viewContainerRef.length === 1) {
                return;
            }
            var evr = this._viewContainerRef.createEmbeddedView(this._templateRef);
            this._nativeSnazzyInfoWindow.setContent(this._outerWrapper.nativeElement);
            // we have to run this in a separate cycle.
            setTimeout(function () {
                evr.detectChanges();
            });
        };
        AgmSnazzyInfoWindow.prototype._updatePosition = function () {
            this._nativeSnazzyInfoWindow.setPosition({ lat: this.latitude, lng: this.longitude });
        };
        /**
         * Returns true when the Snazzy Info Window is initialized and open.
         */
        AgmSnazzyInfoWindow.prototype.openStatus = function () {
            return this._nativeSnazzyInfoWindow && this._nativeSnazzyInfoWindow.isOpen();
        };
        /**
         * @internal
         */
        AgmSnazzyInfoWindow.prototype.ngOnDestroy = function () {
            if (this._nativeSnazzyInfoWindow) {
                this._nativeSnazzyInfoWindow.destroy();
            }
        };
        __decorate([
            core$1.Input(),
            __metadata("design:type", Number)
        ], AgmSnazzyInfoWindow.prototype, "latitude", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", Number)
        ], AgmSnazzyInfoWindow.prototype, "longitude", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", Boolean)
        ], AgmSnazzyInfoWindow.prototype, "isOpen", void 0);
        __decorate([
            core$1.Output(),
            __metadata("design:type", core$1.EventEmitter)
        ], AgmSnazzyInfoWindow.prototype, "isOpenChange", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", String)
        ], AgmSnazzyInfoWindow.prototype, "placement", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", Object)
        ], AgmSnazzyInfoWindow.prototype, "maxWidth", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", Object)
        ], AgmSnazzyInfoWindow.prototype, "maxHeight", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", String)
        ], AgmSnazzyInfoWindow.prototype, "backgroundColor", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", String)
        ], AgmSnazzyInfoWindow.prototype, "padding", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", Object)
        ], AgmSnazzyInfoWindow.prototype, "border", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", String)
        ], AgmSnazzyInfoWindow.prototype, "borderRadius", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", String)
        ], AgmSnazzyInfoWindow.prototype, "fontColor", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", String)
        ], AgmSnazzyInfoWindow.prototype, "fontSize", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", Object)
        ], AgmSnazzyInfoWindow.prototype, "pointer", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", Object)
        ], AgmSnazzyInfoWindow.prototype, "shadow", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", Boolean)
        ], AgmSnazzyInfoWindow.prototype, "openOnMarkerClick", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", Boolean)
        ], AgmSnazzyInfoWindow.prototype, "closeOnMapClick", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", String)
        ], AgmSnazzyInfoWindow.prototype, "wrapperClass", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", Boolean)
        ], AgmSnazzyInfoWindow.prototype, "closeWhenOthersOpen", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", Boolean)
        ], AgmSnazzyInfoWindow.prototype, "showCloseButton", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", Boolean)
        ], AgmSnazzyInfoWindow.prototype, "panOnOpen", void 0);
        __decorate([
            core$1.Input(),
            __metadata("design:type", Object)
        ], AgmSnazzyInfoWindow.prototype, "additionalOptions", void 0);
        __decorate([
            core$1.Output(),
            __metadata("design:type", core$1.EventEmitter)
        ], AgmSnazzyInfoWindow.prototype, "beforeOpen", void 0);
        __decorate([
            core$1.Output(),
            __metadata("design:type", core$1.EventEmitter)
        ], AgmSnazzyInfoWindow.prototype, "afterClose", void 0);
        __decorate([
            core$1.ViewChild('outerWrapper', { read: core$1.ElementRef }),
            __metadata("design:type", core$1.ElementRef)
        ], AgmSnazzyInfoWindow.prototype, "_outerWrapper", void 0);
        __decorate([
            core$1.ViewChild('viewContainer', { read: core$1.ViewContainerRef }),
            __metadata("design:type", core$1.ViewContainerRef)
        ], AgmSnazzyInfoWindow.prototype, "_viewContainerRef", void 0);
        __decorate([
            core$1.ContentChild(core$1.TemplateRef),
            __metadata("design:type", core$1.TemplateRef)
        ], AgmSnazzyInfoWindow.prototype, "_templateRef", void 0);
        AgmSnazzyInfoWindow = __decorate([
            core$1.Component({
                // tslint:disable-next-line:component-selector
                selector: 'agm-snazzy-info-window',
                template: '<div #outerWrapper><div #viewContainer></div></div><ng-content></ng-content>'
            }),
            __param(0, core$1.Optional()), __param(0, core$1.Host()), __param(0, core$1.SkipSelf()),
            __metadata("design:paramtypes", [core.AgmMarker,
                core.GoogleMapsAPIWrapper, core.MarkerManager,
                core.MapsAPILoader])
        ], AgmSnazzyInfoWindow);
        return AgmSnazzyInfoWindow;
    }());

    var __decorate$1 = (window && window.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var AgmSnazzyInfoWindowModule = /** @class */ (function () {
        function AgmSnazzyInfoWindowModule() {
        }
        AgmSnazzyInfoWindowModule = __decorate$1([
            core$1.NgModule({ declarations: [AgmSnazzyInfoWindow], exports: [AgmSnazzyInfoWindow] })
        ], AgmSnazzyInfoWindowModule);
        return AgmSnazzyInfoWindowModule;
    }());

    // public API

    exports.AgmSnazzyInfoWindow = AgmSnazzyInfoWindow;
    exports.AgmSnazzyInfoWindowModule = AgmSnazzyInfoWindowModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
