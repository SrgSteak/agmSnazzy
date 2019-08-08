import { NgZone } from '@angular/core';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { AgmBicyclingLayer } from '../../directives/bicycling-layer';
import { AgmTransitLayer } from '../../directives/transit-layer';
import { GoogleMapsAPIWrapper } from '../../services/google-maps-api-wrapper';
import { LayerManager } from './layer-manager';
describe('LayerManager', function () {
    beforeAll(function () {
        window.google = {
            maps: {
                TransitLayer: /** @class */ (function () {
                    function TransitLayer() {
                        this.setMap = jest.fn();
                        this.getMap = jest.fn();
                    }
                    return TransitLayer;
                }()),
                BicyclingLayer: /** @class */ (function () {
                    function BicyclingLayer() {
                        this.setMap = jest.fn();
                        this.getMap = jest.fn();
                    }
                    return BicyclingLayer;
                }()),
            }
        };
    });
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [
                { provide: NgZone, useFactory: function () { return new NgZone({ enableLongStackTrace: true }); } },
                {
                    provide: GoogleMapsAPIWrapper,
                    useValue: {
                        getNativeMap: function () { return Promise.resolve(); },
                        createTransitLayer: jest.fn(),
                        createBicyclingLayer: jest.fn()
                    }
                },
                LayerManager,
            ]
        });
    }); // end beforeEach
    describe('Create a new transit layer', function () {
        it('should call mapsApiWrapper when creating a new transit layer', fakeAsync(inject([LayerManager, GoogleMapsAPIWrapper], function (layerManager, apiWrapper) {
            var transitLayer = new AgmTransitLayer(layerManager);
            var opt = { visible: false };
            layerManager.addTransitLayer(transitLayer, opt);
            expect(apiWrapper.createTransitLayer).toHaveBeenCalledWith(opt);
        })));
    });
    describe('Create a new bicycling layer', function () {
        it('should call mapsApiWrapper when creating a new bicycling layer', fakeAsync(inject([LayerManager, GoogleMapsAPIWrapper], function (layerManager, apiWrapper) {
            var bicyclingLayer = new AgmBicyclingLayer(layerManager);
            var opt = { visible: true };
            layerManager.addBicyclingLayer(bicyclingLayer, opt);
            expect(apiWrapper.createBicyclingLayer).toHaveBeenCalledWith(opt);
        })));
    });
    describe('Toggling visibility of a MapLayer', function () {
        it('should update the visibility of a map layer when the visibility option changes', fakeAsync(inject([LayerManager, GoogleMapsAPIWrapper], function (layerManager, apiWrapper) {
            var newLayer = new AgmTransitLayer(layerManager);
            newLayer.visible = true;
            var transitLayerInstance = {
                setMap: jest.fn(),
                getMap: jest.fn(),
            };
            apiWrapper.createTransitLayer
                .mockReturnValue(Promise.resolve(transitLayerInstance));
            layerManager.addTransitLayer(newLayer, { visible: true });
            expect(apiWrapper.createTransitLayer).toHaveBeenCalledWith({ visible: true });
            newLayer.visible = false;
            layerManager.toggleLayerVisibility(newLayer, { visible: false }).then(function () {
                expect(transitLayerInstance.setMap).toHaveBeenCalledWith(null);
            });
        })));
    });
});
//# sourceMappingURL=layer-manager.spec.js.map