var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
var _this = this;
import { NgZone } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { AgmMarker } from '../../../core/directives/marker';
import { GoogleMapsAPIWrapper } from '../../../core/services/google-maps-api-wrapper';
import { ClusterManager } from './cluster-manager';
describe('ClusterManager', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [
                { provide: NgZone, useFactory: function () { return new NgZone({ enableLongStackTrace: true }); } },
                ClusterManager, { provide: GoogleMapsAPIWrapper, useValue: { createMarker: jest.fn() } }
            ]
        });
    });
    describe('Create a new marker', function () {
        it('should call the mapsApiWrapper when creating a new marker', inject([ClusterManager, GoogleMapsAPIWrapper], function (clusterManager, apiWrapper) {
            var newMarker = new AgmMarker(clusterManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            clusterManager.addMarker(newMarker);
            expect(apiWrapper.createMarker)
                .toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                opacity: 1,
                visible: true,
                zIndex: 1,
                title: undefined,
                clickable: true
            }, false);
        }));
    });
    describe('Delete a marker', function () {
        it('should set the map to null when deleting a existing marker', inject([ClusterManager, GoogleMapsAPIWrapper], function (clusterManager, apiWrapper) {
            var newMarker = new AgmMarker(clusterManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            var markerInstance = {
                setMap: jest.fn(),
            };
            apiWrapper.createMarker.mockReturnValue(Promise.resolve(markerInstance));
            clusterManager.addMarker(newMarker);
            clusterManager.deleteMarker(newMarker).then(function () {
                expect(markerInstance.setMap).toHaveBeenCalledWith(null);
            });
        }));
    });
    describe('set marker icon', function () {
        it('should update that marker via setIcon method when the markerUrl changes', async(inject([ClusterManager, GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new AgmMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            var markerInstance = { setMap: jest.fn(), setIcon: jest.fn() };
            apiWrapper.createMarker.mockReturnValue(Promise.resolve(markerInstance));
            markerManager.addMarker(newMarker);
            expect(apiWrapper.createMarker)
                .toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                opacity: 1,
                visible: true,
                zIndex: 1,
                title: undefined,
                clickable: true
            }, false);
            var iconUrl = 'http://angular-maps.com/icon.png';
            newMarker.iconUrl = iconUrl;
            return markerManager.updateIcon(newMarker).then(function () {
                expect(markerInstance.setIcon).toHaveBeenCalledWith(iconUrl);
            });
        })));
    });
    describe('set marker opacity', function () {
        it('should update that marker via setOpacity method when the markerOpacity changes', async(inject([ClusterManager, GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new AgmMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            var markerInstance = { setMap: jest.fn(), setOpacity: jest.fn() };
            apiWrapper.createMarker.mockReturnValue(Promise.resolve(markerInstance));
            markerManager.addMarker(newMarker);
            expect(apiWrapper.createMarker)
                .toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                visible: true,
                opacity: 1,
                zIndex: 1,
                title: undefined,
                clickable: true
            }, false);
            var opacity = 0.4;
            newMarker.opacity = opacity;
            return markerManager.updateOpacity(newMarker).then(function () {
                expect(markerInstance.setOpacity).toHaveBeenCalledWith(opacity);
            });
        })));
    });
    describe('set visible option', function () {
        it('should update that marker via setVisible method when the visible changes', async(inject([ClusterManager, GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new AgmMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            newMarker.visible = false;
            var markerInstance = { setMap: jest.fn(), setVisible: jest.fn() };
            apiWrapper.createMarker.mockReturnValue(Promise.resolve(markerInstance));
            markerManager.addMarker(newMarker);
            expect(apiWrapper.createMarker)
                .toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                visible: false,
                opacity: 1,
                zIndex: 1,
                title: undefined,
                clickable: true
            }, false);
            newMarker.visible = true;
            return markerManager.updateVisible(newMarker).then(function () {
                expect(markerInstance.setVisible).toHaveBeenCalledWith(true);
            });
        })));
    });
    describe('set zIndex option', function () {
        it('should update that marker via setZIndex method when the zIndex changes', async(inject([ClusterManager, GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new AgmMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            newMarker.visible = false;
            var markerInstance = { setMap: jest.fn(), setZIndex: jest.fn() };
            apiWrapper.createMarker.mockReturnValue(Promise.resolve(markerInstance));
            markerManager.addMarker(newMarker);
            expect(apiWrapper.createMarker)
                .toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                visible: false,
                opacity: 1,
                zIndex: 1,
                title: undefined,
                clickable: true
            }, false);
            var zIndex = 10;
            newMarker.zIndex = zIndex;
            return markerManager.updateZIndex(newMarker).then(function () {
                expect(markerInstance.setZIndex).toHaveBeenCalledWith(zIndex);
            });
        })));
    });
    describe('set calculator', function () {
        it('should call the setCalculator method when the calculator changes and is a function', inject([ClusterManager], function (markerManager) { return __awaiter(_this, void 0, void 0, function () {
            var mockClusterer, instancePromise, spy, markerCluster;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockClusterer = { setCalculator: jest.fn() };
                        instancePromise = Promise.resolve(mockClusterer);
                        spy = jest.spyOn(markerManager, 'getClustererInstance')
                            .mockImplementation(function () { return instancePromise; });
                        markerCluster = {};
                        // negative case
                        markerCluster.calculator = null;
                        markerManager.setCalculator(markerCluster);
                        return [4 /*yield*/, instancePromise];
                    case 1:
                        _a.sent();
                        expect(mockClusterer.setCalculator).not.toHaveBeenCalled();
                        // positive case
                        markerCluster.calculator = jest.fn();
                        markerManager.setCalculator(markerCluster);
                        return [4 /*yield*/, instancePromise];
                    case 2:
                        _a.sent();
                        expect(mockClusterer.setCalculator).toHaveBeenCalledTimes(1);
                        spy.mockReset();
                        return [2 /*return*/];
                }
            });
        }); }));
    });
});
//# sourceMappingURL=cluster-manager.spec.js.map