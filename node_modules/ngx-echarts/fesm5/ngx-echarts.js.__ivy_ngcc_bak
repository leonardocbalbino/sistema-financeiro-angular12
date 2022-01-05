import { __decorate, __param } from 'tslib';
import { InjectionToken, EventEmitter, Inject, ElementRef, NgZone, Input, Output, Directive, NgModule } from '@angular/core';
import { of, EMPTY, fromEvent, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

var ChangeFilter = /** @class */ (function () {
    function ChangeFilter(changes) {
        this.changes = changes;
    }
    ChangeFilter.of = function (changes) {
        return new ChangeFilter(changes);
    };
    ChangeFilter.prototype.notEmpty = function (key) {
        if (this.changes[key]) {
            var value = this.changes[key].currentValue;
            if (value !== undefined && value !== null) {
                return of(value);
            }
        }
        return EMPTY;
    };
    ChangeFilter.prototype.has = function (key) {
        if (this.changes[key]) {
            var value = this.changes[key].currentValue;
            return of(value);
        }
        return EMPTY;
    };
    ChangeFilter.prototype.notFirst = function (key) {
        if (this.changes[key] && !this.changes[key].isFirstChange()) {
            var value = this.changes[key].currentValue;
            return of(value);
        }
        return EMPTY;
    };
    ChangeFilter.prototype.notFirstAndEmpty = function (key) {
        if (this.changes[key] && !this.changes[key].isFirstChange()) {
            var value = this.changes[key].currentValue;
            if (value !== undefined && value !== null) {
                return of(value);
            }
        }
        return EMPTY;
    };
    return ChangeFilter;
}());

var NGX_ECHARTS_CONFIG = new InjectionToken('NGX_ECHARTS_CONFIG');
var NgxEchartsDirective = /** @class */ (function () {
    function NgxEchartsDirective(config, el, ngZone) {
        this.el = el;
        this.ngZone = ngZone;
        this.autoResize = true;
        this.loadingType = 'default';
        // ngx-echarts events
        this.chartInit = new EventEmitter();
        // echarts mouse events
        this.chartClick = this.createLazyEvent('click');
        this.chartDblClick = this.createLazyEvent('dblclick');
        this.chartMouseDown = this.createLazyEvent('mousedown');
        this.chartMouseMove = this.createLazyEvent('mousemove');
        this.chartMouseUp = this.createLazyEvent('mouseup');
        this.chartMouseOver = this.createLazyEvent('mouseover');
        this.chartMouseOut = this.createLazyEvent('mouseout');
        this.chartGlobalOut = this.createLazyEvent('globalout');
        this.chartContextMenu = this.createLazyEvent('contextmenu');
        // echarts mouse events
        this.chartLegendSelectChanged = this.createLazyEvent('legendselectchanged');
        this.chartLegendSelected = this.createLazyEvent('legendselected');
        this.chartLegendUnselected = this.createLazyEvent('legendunselected');
        this.chartLegendScroll = this.createLazyEvent('legendscroll');
        this.chartDataZoom = this.createLazyEvent('datazoom');
        this.chartDataRangeSelected = this.createLazyEvent('datarangeselected');
        this.chartTimelineChanged = this.createLazyEvent('timelinechanged');
        this.chartTimelinePlayChanged = this.createLazyEvent('timelineplaychanged');
        this.chartRestore = this.createLazyEvent('restore');
        this.chartDataViewChanged = this.createLazyEvent('dataviewchanged');
        this.chartMagicTypeChanged = this.createLazyEvent('magictypechanged');
        this.chartPieSelectChanged = this.createLazyEvent('pieselectchanged');
        this.chartPieSelected = this.createLazyEvent('pieselected');
        this.chartPieUnselected = this.createLazyEvent('pieunselected');
        this.chartMapSelectChanged = this.createLazyEvent('mapselectchanged');
        this.chartMapSelected = this.createLazyEvent('mapselected');
        this.chartMapUnselected = this.createLazyEvent('mapunselected');
        this.chartAxisAreaSelected = this.createLazyEvent('axisareaselected');
        this.chartFocusNodeAdjacency = this.createLazyEvent('focusnodeadjacency');
        this.chartUnfocusNodeAdjacency = this.createLazyEvent('unfocusnodeadjacency');
        this.chartBrush = this.createLazyEvent('brush');
        this.chartBrushSelected = this.createLazyEvent('brushselected');
        this.chartRendered = this.createLazyEvent('rendered');
        this.chartFinished = this.createLazyEvent('finished');
        this.currentOffsetWidth = 0;
        this.currentOffsetHeight = 0;
        this.echarts = config.echarts;
    }
    NgxEchartsDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var filter = ChangeFilter.of(changes);
        filter.notFirstAndEmpty('options').subscribe(function (opt) { return _this.onOptionsChange(opt); });
        filter.notFirstAndEmpty('merge').subscribe(function (opt) { return _this.setOption(opt); });
        filter.has('loading').subscribe(function (v) { return _this.toggleLoading(!!v); });
        filter.notFirst('theme').subscribe(function () { return _this.refreshChart(); });
    };
    NgxEchartsDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.resizeSub = fromEvent(window, 'resize')
            .pipe(debounceTime(50))
            .subscribe(function () {
            if (_this.autoResize && window.innerWidth !== _this.currentWindowWidth) {
                _this.currentWindowWidth = window.innerWidth;
                _this.currentOffsetWidth = _this.el.nativeElement.offsetWidth;
                _this.currentOffsetHeight = _this.el.nativeElement.offsetHeight;
                _this.resize();
            }
        });
    };
    NgxEchartsDirective.prototype.ngOnDestroy = function () {
        if (this.resizeSub) {
            this.resizeSub.unsubscribe();
        }
        this.dispose();
    };
    NgxEchartsDirective.prototype.ngDoCheck = function () {
        // No heavy work in DoCheck!
        if (this.chart && this.autoResize) {
            var offsetWidth = this.el.nativeElement.offsetWidth;
            var offsetHeight = this.el.nativeElement.offsetHeight;
            if (this.currentOffsetWidth !== offsetWidth || this.currentOffsetHeight !== offsetHeight) {
                this.currentOffsetWidth = offsetWidth;
                this.currentOffsetHeight = offsetHeight;
                this.resize();
            }
        }
    };
    NgxEchartsDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.initChart(); });
    };
    NgxEchartsDirective.prototype.dispose = function () {
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    };
    NgxEchartsDirective.prototype.resize = function () {
        if (this.chart) {
            this.chart.resize();
        }
    };
    NgxEchartsDirective.prototype.toggleLoading = function (loading) {
        if (this.chart) {
            loading
                ? this.chart.showLoading(this.loadingType, this.loadingOpts)
                : this.chart.hideLoading();
        }
    };
    NgxEchartsDirective.prototype.setOption = function (option, opts) {
        if (this.chart) {
            this.chart.setOption(option, opts);
        }
    };
    NgxEchartsDirective.prototype.refreshChart = function () {
        this.dispose();
        this.initChart();
    };
    NgxEchartsDirective.prototype.createChart = function () {
        var _this = this;
        this.currentWindowWidth = window.innerWidth;
        this.currentOffsetWidth = this.el.nativeElement.offsetWidth;
        this.currentOffsetHeight = this.el.nativeElement.offsetHeight;
        var dom = this.el.nativeElement;
        if (window && window.getComputedStyle) {
            var prop = window.getComputedStyle(dom, null).getPropertyValue('height');
            if ((!prop || prop === '0px') && (!dom.style.height || dom.style.height === '0px')) {
                dom.style.height = '400px';
            }
        }
        return this.ngZone.runOutsideAngular(function () { return _this.echarts.init(dom, _this.theme, _this.initOpts); });
    };
    NgxEchartsDirective.prototype.initChart = function () {
        this.onOptionsChange(this.options);
        if (this.merge && this.chart) {
            this.setOption(this.merge);
        }
    };
    NgxEchartsDirective.prototype.onOptionsChange = function (opt) {
        if (opt) {
            if (!this.chart) {
                this.chart = this.createChart();
                this.chartInit.emit(this.chart);
            }
            this.chart.setOption(this.options, true);
        }
    };
    // allows to lazily bind to only those events that are requested through the `@Output` by parent components
    // see https://stackoverflow.com/questions/51787972/optimal-reentering-the-ngzone-from-eventemitter-event for more info
    NgxEchartsDirective.prototype.createLazyEvent = function (eventName) {
        var _this = this;
        return this.chartInit.pipe(switchMap(function (chart) {
            return new Observable(function (observer) {
                chart.on(eventName, function (data) { return _this.ngZone.run(function () { return observer.next(data); }); });
                return function () { return chart.off(eventName); };
            });
        }));
    };
    NgxEchartsDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [NGX_ECHARTS_CONFIG,] }] },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "options", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "theme", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "loading", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "initOpts", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "merge", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "autoResize", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "loadingType", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "loadingOpts", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartInit", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartClick", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartDblClick", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMouseDown", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMouseMove", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMouseUp", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMouseOver", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMouseOut", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartGlobalOut", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartContextMenu", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartLegendSelectChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartLegendSelected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartLegendUnselected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartLegendScroll", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartDataZoom", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartDataRangeSelected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartTimelineChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartTimelinePlayChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartRestore", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartDataViewChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMagicTypeChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartPieSelectChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartPieSelected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartPieUnselected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMapSelectChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMapSelected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMapUnselected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartAxisAreaSelected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartFocusNodeAdjacency", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartUnfocusNodeAdjacency", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartBrush", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartBrushSelected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartRendered", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartFinished", void 0);
    NgxEchartsDirective = __decorate([
        Directive({
            selector: 'echarts, [echarts]',
            exportAs: 'echarts',
        }),
        __param(0, Inject(NGX_ECHARTS_CONFIG))
    ], NgxEchartsDirective);
    return NgxEchartsDirective;
}());

var NgxEchartsModule = /** @class */ (function () {
    function NgxEchartsModule() {
    }
    NgxEchartsModule_1 = NgxEchartsModule;
    NgxEchartsModule.forRoot = function (config) {
        return {
            ngModule: NgxEchartsModule_1,
            providers: [{ provide: NGX_ECHARTS_CONFIG, useValue: config }],
        };
    };
    NgxEchartsModule.forChild = function () {
        return {
            ngModule: NgxEchartsModule_1,
        };
    };
    var NgxEchartsModule_1;
    NgxEchartsModule = NgxEchartsModule_1 = __decorate([
        NgModule({
            imports: [],
            declarations: [NgxEchartsDirective],
            exports: [NgxEchartsDirective],
        })
    ], NgxEchartsModule);
    return NgxEchartsModule;
}());

/*
 * Public API Surface of ngx-echarts
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxEchartsDirective, NgxEchartsModule, NGX_ECHARTS_CONFIG as ɵa };
//# sourceMappingURL=ngx-echarts.js.map
