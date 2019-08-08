(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('js-marker-clusterer'), require('@agm/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs', 'js-marker-clusterer', '@agm/core'], factory) :
    (factory((global.ngmaps = global.ngmaps || {}, global.ngmaps.jsMarkerClusterer = {}),global.ng.core,null,global.MarkerClusterer,global.ngmaps.core));
}(this, (function (exports,core,rxjs,jsMarkerClusterer,core$1) { 'use strict';

    var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var MapsAPILoader = /** @class */ (function () {
        function MapsAPILoader() {
        }
        MapsAPILoader = __decorate([
            core.Injectable()
        ], MapsAPILoader);
        return MapsAPILoader;
    }());

    var __decorate$1 = (window && window.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (window && window.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    /**
     * Wrapper class that handles the communication with the Google Maps Javascript
     * API v3
     */
    var GoogleMapsAPIWrapper = /** @class */ (function () {
        function GoogleMapsAPIWrapper(_loader, _zone) {
            var _this = this;
            this._loader = _loader;
            this._zone = _zone;
            this._map = new Promise(function (resolve) {
                _this._mapResolver = resolve;
            });
        }
        GoogleMapsAPIWrapper.prototype.createMap = function (el, mapOptions) {
            var _this = this;
            return this._zone.runOutsideAngular(function () {
                return _this._loader.load().then(function () {
                    var map = new google.maps.Map(el, mapOptions);
                    _this._mapResolver(map);
                    return;
                });
            });
        };
        GoogleMapsAPIWrapper.prototype.setMapOptions = function (options) {
            this._map.then(function (m) {
                m.setOptions(options);
            });
        };
        /**
         * Creates a google map marker with the map context
         */
        GoogleMapsAPIWrapper.prototype.createMarker = function (options, addToMap) {
            if (options === void 0) { options = {}; }
            if (addToMap === void 0) { addToMap = true; }
            return this._map.then(function (map) {
                if (addToMap) {
                    options.map = map;
                }
                return new google.maps.Marker(options);
            });
        };
        GoogleMapsAPIWrapper.prototype.createInfoWindow = function (options) {
            return this._map.then(function () {
                return new google.maps.InfoWindow(options);
            });
        };
        /**
         * Creates a google.map.Circle for the current map.
         */
        GoogleMapsAPIWrapper.prototype.createCircle = function (options) {
            return this._map.then(function (map) {
                if (typeof options.strokePosition === 'string') {
                    options.strokePosition = google.maps.StrokePosition[options.strokePosition];
                }
                options.map = map;
                return new google.maps.Circle(options);
            });
        };
        /**
         * Creates a google.map.Rectangle for the current map.
         */
        GoogleMapsAPIWrapper.prototype.createRectangle = function (options) {
            return this._map.then(function (map) {
                options.map = map;
                return new google.maps.Rectangle(options);
            });
        };
        GoogleMapsAPIWrapper.prototype.createPolyline = function (options) {
            return this.getNativeMap().then(function (map) {
                var line = new google.maps.Polyline(options);
                line.setMap(map);
                return line;
            });
        };
        GoogleMapsAPIWrapper.prototype.createPolygon = function (options) {
            return this.getNativeMap().then(function (map) {
                var polygon = new google.maps.Polygon(options);
                polygon.setMap(map);
                return polygon;
            });
        };
        /**
         * Creates a new google.map.Data layer for the current map
         */
        GoogleMapsAPIWrapper.prototype.createDataLayer = function (options) {
            return this._map.then(function (m) {
                var data = new google.maps.Data(options);
                data.setMap(m);
                return data;
            });
        };
        /**
         * Creates a TransitLayer instance for a map
         * @param {TransitLayerOptions} options - used for setting layer options
         * @returns {Promise<TransitLayer>} a new transit layer object
         */
        GoogleMapsAPIWrapper.prototype.createTransitLayer = function (options) {
            return this._map.then(function (map) {
                var newLayer = new google.maps.TransitLayer();
                newLayer.setMap(options.visible ? map : null);
                return newLayer;
            });
        };
        /**
         * Creates a BicyclingLayer instance for a map
         * @param {BicyclingLayerOptions} options - used for setting layer options
         * @returns {Promise<BicyclingLayer>} a new bicycling layer object
         */
        GoogleMapsAPIWrapper.prototype.createBicyclingLayer = function (options) {
            return this._map.then(function (map) {
                var newLayer = new google.maps.BicyclingLayer();
                newLayer.setMap(options.visible ? map : null);
                return newLayer;
            });
        };
        /**
         * Determines if given coordinates are insite a Polygon path.
         */
        GoogleMapsAPIWrapper.prototype.containsLocation = function (latLng, polygon) {
            return google.maps.geometry.poly.containsLocation(latLng, polygon);
        };
        GoogleMapsAPIWrapper.prototype.subscribeToMapEvent = function (eventName) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this._map.then(function (m) {
                    m.addListener(eventName, function (arg) {
                        _this._zone.run(function () { return observer.next(arg); });
                    });
                });
            });
        };
        GoogleMapsAPIWrapper.prototype.clearInstanceListeners = function () {
            this._map.then(function (map) {
                google.maps.event.clearInstanceListeners(map);
            });
        };
        GoogleMapsAPIWrapper.prototype.setCenter = function (latLng) {
            return this._map.then(function (map) { return map.setCenter(latLng); });
        };
        GoogleMapsAPIWrapper.prototype.getZoom = function () {
            return this._map.then(function (map) { return map.getZoom(); });
        };
        GoogleMapsAPIWrapper.prototype.getBounds = function () {
            return this._map.then(function (map) { return map.getBounds(); });
        };
        GoogleMapsAPIWrapper.prototype.getMapTypeId = function () {
            return this._map.then(function (map) { return map.getMapTypeId(); });
        };
        GoogleMapsAPIWrapper.prototype.setZoom = function (zoom) {
            return this._map.then(function (map) { return map.setZoom(zoom); });
        };
        GoogleMapsAPIWrapper.prototype.getCenter = function () {
            return this._map.then(function (map) { return map.getCenter(); });
        };
        GoogleMapsAPIWrapper.prototype.panTo = function (latLng) {
            return this._map.then(function (map) { return map.panTo(latLng); });
        };
        GoogleMapsAPIWrapper.prototype.panBy = function (x, y) {
            return this._map.then(function (map) { return map.panBy(x, y); });
        };
        GoogleMapsAPIWrapper.prototype.fitBounds = function (latLng) {
            return this._map.then(function (map) { return map.fitBounds(latLng); });
        };
        GoogleMapsAPIWrapper.prototype.panToBounds = function (latLng) {
            return this._map.then(function (map) { return map.panToBounds(latLng); });
        };
        /**
         * Returns the native Google Maps Map instance. Be careful when using this instance directly.
         */
        GoogleMapsAPIWrapper.prototype.getNativeMap = function () {
            return this._map;
        };
        /**
         * Triggers the given event name on the map instance.
         */
        GoogleMapsAPIWrapper.prototype.triggerMapEvent = function (eventName) {
            return this._map.then(function (m) { return google.maps.event.trigger(m, eventName); });
        };
        GoogleMapsAPIWrapper = __decorate$1([
            core.Injectable(),
            __metadata("design:paramtypes", [MapsAPILoader, core.NgZone])
        ], GoogleMapsAPIWrapper);
        return GoogleMapsAPIWrapper;
    }());

    var __decorate$2 = (window && window.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (window && window.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __awaiter = (window && window.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (window && window.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var MarkerManager = /** @class */ (function () {
        function MarkerManager(_mapsWrapper, _zone) {
            this._mapsWrapper = _mapsWrapper;
            this._zone = _zone;
            this._markers = new Map();
        }
        MarkerManager.prototype.convertAnimation = function (uiAnim) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (uiAnim === null) {
                        return [2 /*return*/, null];
                    }
                    else {
                        return [2 /*return*/, this._mapsWrapper.getNativeMap().then(function () { return google.maps.Animation[uiAnim]; })];
                    }
                    return [2 /*return*/];
                });
            });
        };
        MarkerManager.prototype.deleteMarker = function (marker) {
            var _this = this;
            var m = this._markers.get(marker);
            if (m == null) {
                // marker already deleted
                return Promise.resolve();
            }
            return m.then(function (m) {
                return _this._zone.run(function () {
                    m.setMap(null);
                    _this._markers.delete(marker);
                });
            });
        };
        MarkerManager.prototype.updateMarkerPosition = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setPosition({ lat: marker.latitude, lng: marker.longitude }); });
        };
        MarkerManager.prototype.updateTitle = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setTitle(marker.title); });
        };
        MarkerManager.prototype.updateLabel = function (marker) {
            return this._markers.get(marker).then(function (m) {
                m.setLabel(marker.label);
            });
        };
        MarkerManager.prototype.updateDraggable = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setDraggable(marker.draggable); });
        };
        MarkerManager.prototype.updateIcon = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setIcon(marker.iconUrl); });
        };
        MarkerManager.prototype.updateOpacity = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setOpacity(marker.opacity); });
        };
        MarkerManager.prototype.updateVisible = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setVisible(marker.visible); });
        };
        MarkerManager.prototype.updateZIndex = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setZIndex(marker.zIndex); });
        };
        MarkerManager.prototype.updateClickable = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setClickable(marker.clickable); });
        };
        MarkerManager.prototype.updateAnimation = function (marker) {
            return __awaiter(this, void 0, void 0, function () {
                var m, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this._markers.get(marker)];
                        case 1:
                            m = _c.sent();
                            _b = (_a = m).setAnimation;
                            return [4 /*yield*/, this.convertAnimation(marker.animation)];
                        case 2:
                            _b.apply(_a, [_c.sent()]);
                            return [2 /*return*/];
                    }
                });
            });
        };
        MarkerManager.prototype.addMarker = function (marker) {
            var _this = this;
            var markerPromise = new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = this._mapsWrapper).createMarker;
                            _c = {
                                position: { lat: marker.latitude, lng: marker.longitude },
                                label: marker.label,
                                draggable: marker.draggable,
                                icon: marker.iconUrl,
                                opacity: marker.opacity,
                                visible: marker.visible,
                                zIndex: marker.zIndex,
                                title: marker.title,
                                clickable: marker.clickable
                            };
                            return [4 /*yield*/, this.convertAnimation(marker.animation)];
                        case 1: return [2 /*return*/, _b.apply(_a, [(_c.animation = _d.sent(),
                                    _c)])
                                .then(resolve)];
                    }
                });
            }); });
            this._markers.set(marker, markerPromise);
        };
        MarkerManager.prototype.getNativeMarker = function (marker) {
            return this._markers.get(marker);
        };
        MarkerManager.prototype.createEventObservable = function (eventName, marker) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this._markers.get(marker).then(function (m) {
                    m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        };
        MarkerManager = __decorate$2([
            core.Injectable(),
            __metadata$1("design:paramtypes", [GoogleMapsAPIWrapper, core.NgZone])
        ], MarkerManager);
        return MarkerManager;
    }());

    var __extends = (window && window.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __decorate$3 = (window && window.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$2 = (window && window.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var ClusterManager = /** @class */ (function (_super) {
        __extends(ClusterManager, _super);
        function ClusterManager(_mapsWrapper, _zone) {
            var _this = _super.call(this, _mapsWrapper, _zone) || this;
            _this._mapsWrapper = _mapsWrapper;
            _this._zone = _zone;
            _this._clustererInstance = new Promise(function (resolver) {
                _this._resolver = resolver;
            });
            return _this;
        }
        ClusterManager.prototype.init = function (options) {
            var _this = this;
            this._mapsWrapper.getNativeMap().then(function (map) {
                var clusterer = new MarkerClusterer(map, [], options);
                _this._resolver(clusterer);
            });
        };
        ClusterManager.prototype.getClustererInstance = function () {
            return this._clustererInstance;
        };
        ClusterManager.prototype.addMarker = function (marker) {
            var clusterPromise = this.getClustererInstance();
            var markerPromise = this._mapsWrapper.createMarker({
                position: { lat: marker.latitude, lng: marker.longitude },
                label: marker.label,
                draggable: marker.draggable,
                icon: marker.iconUrl,
                opacity: marker.opacity,
                visible: marker.visible,
                zIndex: marker.zIndex,
                title: marker.title,
                clickable: marker.clickable,
            }, false);
            Promise.all([clusterPromise, markerPromise]).then(function (_a) {
                var cluster = _a[0], marker = _a[1];
                return cluster.addMarker(marker);
            });
            this._markers.set(marker, markerPromise);
        };
        ClusterManager.prototype.deleteMarker = function (marker) {
            var _this = this;
            var m = this._markers.get(marker);
            if (m == null) {
                // marker already deleted
                return Promise.resolve();
            }
            return m.then(function (m) {
                _this._zone.run(function () {
                    m.setMap(null);
                    _this.getClustererInstance().then(function (cluster) {
                        cluster.removeMarker(m);
                        _this._markers.delete(marker);
                    });
                });
            });
        };
        ClusterManager.prototype.clearMarkers = function () {
            return this.getClustererInstance().then(function (cluster) {
                cluster.clearMarkers();
            });
        };
        ClusterManager.prototype.setGridSize = function (c) {
            this.getClustererInstance().then(function (cluster) {
                cluster.setGridSize(c.gridSize);
            });
        };
        ClusterManager.prototype.setMaxZoom = function (c) {
            this.getClustererInstance().then(function (cluster) {
                cluster.setMaxZoom(c.maxZoom);
            });
        };
        ClusterManager.prototype.setStyles = function (c) {
            this.getClustererInstance().then(function (cluster) {
                cluster.setStyles(c.styles);
            });
        };
        ClusterManager.prototype.setZoomOnClick = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.zoomOnClick !== undefined) {
                    cluster.zoomOnClick_ = c.zoomOnClick;
                }
            });
        };
        ClusterManager.prototype.setAverageCenter = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.averageCenter !== undefined) {
                    cluster.averageCenter_ = c.averageCenter;
                }
            });
        };
        ClusterManager.prototype.setImagePath = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.imagePath !== undefined) {
                    cluster.imagePath_ = c.imagePath;
                }
            });
        };
        ClusterManager.prototype.setMinimumClusterSize = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.minimumClusterSize !== undefined) {
                    cluster.minimumClusterSize_ = c.minimumClusterSize;
                }
            });
        };
        ClusterManager.prototype.setImageExtension = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.imageExtension !== undefined) {
                    cluster.imageExtension_ = c.imageExtension;
                }
            });
        };
        ClusterManager.prototype.setCalculator = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (typeof c.calculator === 'function') {
                    cluster.setCalculator(c.calculator);
                }
            });
        };
        ClusterManager = __decorate$3([
            core.Injectable(),
            __metadata$2("design:paramtypes", [GoogleMapsAPIWrapper, core.NgZone])
        ], ClusterManager);
        return ClusterManager;
    }(MarkerManager));

    var __decorate$4 = (window && window.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$3 = (window && window.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    /**
     * AgmMarkerCluster clusters map marker if they are near together
     *
     * ### Example
     * ```typescript
     * import { Component } from '@angular/core';
     *
     * @Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *    agm-map {
     *      height: 300px;
     *    }
     * `],
     *  template: `
     *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     *      <agm-marker-cluster>
     *        <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
     *        </agm-marker>
     *        <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
     *        </agm-marker>
     *      </agm-marker-cluster>
     *    </agm-map>
     *  `
     * })
     * ```
     */
    var AgmMarkerCluster = /** @class */ (function () {
        function AgmMarkerCluster(_clusterManager) {
            this._clusterManager = _clusterManager;
        }
        /** @internal */
        AgmMarkerCluster.prototype.ngOnDestroy = function () {
            this._clusterManager.clearMarkers();
        };
        /** @internal */
        AgmMarkerCluster.prototype.ngOnChanges = function (changes) {
            if (changes['gridSize']) {
                this._clusterManager.setGridSize(this);
            }
            if (changes['maxZoom']) {
                this._clusterManager.setMaxZoom(this);
            }
            if (changes['zoomOnClick']) {
                this._clusterManager.setZoomOnClick(this);
            }
            if (changes['averageCenter']) {
                this._clusterManager.setAverageCenter(this);
            }
            if (changes['minimumClusterSize']) {
                this._clusterManager.setMinimumClusterSize(this);
            }
            if (changes['imagePath']) {
                this._clusterManager.setImagePath(this);
            }
            if (changes['imageExtension']) {
                this._clusterManager.setImageExtension(this);
            }
            if (changes['calculator']) {
                this._clusterManager.setCalculator(this);
            }
            if (changes['styles']) {
                this._clusterManager.setStyles(this);
            }
        };
        /** @internal */
        AgmMarkerCluster.prototype.ngOnInit = function () {
            this._clusterManager.init({
                gridSize: this.gridSize,
                maxZoom: this.maxZoom,
                zoomOnClick: this.zoomOnClick,
                averageCenter: this.averageCenter,
                minimumClusterSize: this.minimumClusterSize,
                styles: this.styles,
                imagePath: this.imagePath,
                imageExtension: this.imageExtension,
                calculator: this.calculator
            });
        };
        __decorate$4([
            core.Input(),
            __metadata$3("design:type", Number)
        ], AgmMarkerCluster.prototype, "gridSize", void 0);
        __decorate$4([
            core.Input(),
            __metadata$3("design:type", Number)
        ], AgmMarkerCluster.prototype, "maxZoom", void 0);
        __decorate$4([
            core.Input(),
            __metadata$3("design:type", Boolean)
        ], AgmMarkerCluster.prototype, "zoomOnClick", void 0);
        __decorate$4([
            core.Input(),
            __metadata$3("design:type", Boolean)
        ], AgmMarkerCluster.prototype, "averageCenter", void 0);
        __decorate$4([
            core.Input(),
            __metadata$3("design:type", Number)
        ], AgmMarkerCluster.prototype, "minimumClusterSize", void 0);
        __decorate$4([
            core.Input(),
            __metadata$3("design:type", Array)
        ], AgmMarkerCluster.prototype, "styles", void 0);
        __decorate$4([
            core.Input(),
            __metadata$3("design:type", Function)
        ], AgmMarkerCluster.prototype, "calculator", void 0);
        __decorate$4([
            core.Input(),
            __metadata$3("design:type", String)
        ], AgmMarkerCluster.prototype, "imagePath", void 0);
        __decorate$4([
            core.Input(),
            __metadata$3("design:type", String)
        ], AgmMarkerCluster.prototype, "imageExtension", void 0);
        AgmMarkerCluster = __decorate$4([
            core.Directive({
                selector: 'agm-marker-cluster',
                providers: [
                    ClusterManager,
                    { provide: core$1.MarkerManager, useExisting: ClusterManager },
                    core$1.InfoWindowManager,
                ]
            }),
            __metadata$3("design:paramtypes", [ClusterManager])
        ], AgmMarkerCluster);
        return AgmMarkerCluster;
    }());

    var __decorate$5 = (window && window.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var AgmJsMarkerClustererModule = /** @class */ (function () {
        function AgmJsMarkerClustererModule() {
        }
        AgmJsMarkerClustererModule = __decorate$5([
            core.NgModule({ imports: [core$1.AgmCoreModule], declarations: [AgmMarkerCluster], exports: [AgmMarkerCluster] })
        ], AgmJsMarkerClustererModule);
        return AgmJsMarkerClustererModule;
    }());

    // main modules

    exports.AgmJsMarkerClustererModule = AgmJsMarkerClustererModule;
    exports.AgmMarkerCluster = AgmMarkerCluster;
    exports.ClusterManager = ClusterManager;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
