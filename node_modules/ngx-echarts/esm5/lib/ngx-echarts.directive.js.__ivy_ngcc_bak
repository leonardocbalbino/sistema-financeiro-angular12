import { __decorate, __param } from "tslib";
import { AfterViewInit, Directive, DoCheck, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, InjectionToken, Inject, } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ChangeFilter } from './change-filter';
export var NGX_ECHARTS_CONFIG = new InjectionToken('NGX_ECHARTS_CONFIG');
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
export { NgxEchartsDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWVjaGFydHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWVjaGFydHMvIiwic291cmNlcyI6WyJsaWIvbmd4LWVjaGFydHMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2IsY0FBYyxFQUNkLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFLL0MsTUFBTSxDQUFDLElBQU0sa0JBQWtCLEdBQUcsSUFBSSxjQUFjLENBQW1CLG9CQUFvQixDQUFDLENBQUM7QUFNN0Y7SUE4REUsNkJBQzhCLE1BQXdCLEVBQzVDLEVBQWMsRUFDZCxNQUFjO1FBRGQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQVE7UUF0RGYsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUdqQyxxQkFBcUI7UUFDWCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU5Qyx1QkFBdUI7UUFDYixlQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxrQkFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsbUJBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25E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QXBNWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENoYW5nZUZpbHRlciB9IGZyb20gJy4vY2hhbmdlLWZpbHRlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmd4RWNoYXJ0c0NvbmZpZyB7XG4gIGVjaGFydHM6IGFueTtcbn1cbmV4cG9ydCBjb25zdCBOR1hfRUNIQVJUU19DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48Tmd4RWNoYXJ0c0NvbmZpZz4oJ05HWF9FQ0hBUlRTX0NPTkZJRycpO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdlY2hhcnRzLCBbZWNoYXJ0c10nLFxuICBleHBvcnRBczogJ2VjaGFydHMnLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hFY2hhcnRzRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcbiAgQElucHV0KCkgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbjtcbiAgQElucHV0KCkgaW5pdE9wdHM6IHtcbiAgICBkZXZpY2VQaXhlbFJhdGlvPzogbnVtYmVyO1xuICAgIHJlbmRlcmVyPzogc3RyaW5nO1xuICAgIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xuICAgIGhlaWdodD86IG51bWJlciB8IHN0cmluZztcbiAgfTtcbiAgQElucHV0KCkgbWVyZ2U6IGFueTtcbiAgQElucHV0KCkgYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIEBJbnB1dCgpIGxvYWRpbmdUeXBlID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBsb2FkaW5nT3B0czogb2JqZWN0O1xuXG4gIC8vIG5neC1lY2hhcnRzIGV2ZW50c1xuICBAT3V0cHV0KCkgY2hhcnRJbml0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLy8gZWNoYXJ0cyBtb3VzZSBldmVudHNcbiAgQE91dHB1dCgpIGNoYXJ0Q2xpY2sgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY2xpY2snKTtcbiAgQE91dHB1dCgpIGNoYXJ0RGJsQ2xpY2sgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGJsY2xpY2snKTtcbiAgQE91dHB1dCgpIGNoYXJ0TW91c2VEb3duID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNlZG93bicpO1xuICBAT3V0cHV0KCkgY2hhcnRNb3VzZU1vdmUgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbW91c2Vtb3ZlJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1vdXNlVXAgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbW91c2V1cCcpO1xuICBAT3V0cHV0KCkgY2hhcnRNb3VzZU92ZXIgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbW91c2VvdmVyJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1vdXNlT3V0ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNlb3V0Jyk7XG4gIEBPdXRwdXQoKSBjaGFydEdsb2JhbE91dCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdnbG9iYWxvdXQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0Q29udGV4dE1lbnUgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY29udGV4dG1lbnUnKTtcblxuICAvLyBlY2hhcnRzIG1vdXNlIGV2ZW50c1xuICBAT3V0cHV0KCkgY2hhcnRMZWdlbmRTZWxlY3RDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2xlZ2VuZHNlbGVjdGNoYW5nZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TGVnZW5kU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbGVnZW5kc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TGVnZW5kVW5zZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsZWdlbmR1bnNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydExlZ2VuZFNjcm9sbCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsZWdlbmRzY3JvbGwnKTtcbiAgQE91dHB1dCgpIGNoYXJ0RGF0YVpvb20gPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGF0YXpvb20nKTtcbiAgQE91dHB1dCgpIGNoYXJ0RGF0YVJhbmdlU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGF0YXJhbmdlc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0VGltZWxpbmVDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3RpbWVsaW5lY2hhbmdlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRUaW1lbGluZVBsYXlDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3RpbWVsaW5lcGxheWNoYW5nZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0UmVzdG9yZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdyZXN0b3JlJyk7XG4gIEBPdXRwdXQoKSBjaGFydERhdGFWaWV3Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdkYXRhdmlld2NoYW5nZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TWFnaWNUeXBlQ2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtYWdpY3R5cGVjaGFuZ2VkJyk7XG4gIEBPdXRwdXQoKSBjaGFydFBpZVNlbGVjdENoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncGllc2VsZWN0Y2hhbmdlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRQaWVTZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwaWVzZWxlY3RlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRQaWVVbnNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3BpZXVuc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TWFwU2VsZWN0Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtYXBzZWxlY3RjaGFuZ2VkJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1hcFNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21hcHNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1hcFVuc2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbWFwdW5zZWxlY3RlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRBeGlzQXJlYVNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2F4aXNhcmVhc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0Rm9jdXNOb2RlQWRqYWNlbmN5ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2ZvY3Vzbm9kZWFkamFjZW5jeScpO1xuICBAT3V0cHV0KCkgY2hhcnRVbmZvY3VzTm9kZUFkamFjZW5jeSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd1bmZvY3Vzbm9kZWFkamFjZW5jeScpO1xuICBAT3V0cHV0KCkgY2hhcnRCcnVzaCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdicnVzaCcpO1xuICBAT3V0cHV0KCkgY2hhcnRCcnVzaFNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2JydXNoc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0UmVuZGVyZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncmVuZGVyZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0RmluaXNoZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZmluaXNoZWQnKTtcblxuICBwcml2YXRlIGNoYXJ0OiBhbnk7XG4gIHByaXZhdGUgZWNoYXJ0czogYW55O1xuICBwcml2YXRlIGN1cnJlbnRPZmZzZXRXaWR0aCA9IDA7XG4gIHByaXZhdGUgY3VycmVudE9mZnNldEhlaWdodCA9IDA7XG4gIHByaXZhdGUgY3VycmVudFdpbmRvd1dpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgcmVzaXplU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChOR1hfRUNIQVJUU19DT05GSUcpIGNvbmZpZzogTmd4RWNoYXJ0c0NvbmZpZyxcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICkge1xuICAgIHRoaXMuZWNoYXJ0cyA9IGNvbmZpZy5lY2hhcnRzO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IGZpbHRlciA9IENoYW5nZUZpbHRlci5vZihjaGFuZ2VzKTtcbiAgICBmaWx0ZXIubm90Rmlyc3RBbmRFbXB0eTxhbnk+KCdvcHRpb25zJykuc3Vic2NyaWJlKChvcHQpID0+IHRoaXMub25PcHRpb25zQ2hhbmdlKG9wdCkpO1xuICAgIGZpbHRlci5ub3RGaXJzdEFuZEVtcHR5PGFueT4oJ21lcmdlJykuc3Vic2NyaWJlKChvcHQpID0+IHRoaXMuc2V0T3B0aW9uKG9wdCkpO1xuICAgIGZpbHRlci5oYXM8Ym9vbGVhbj4oJ2xvYWRpbmcnKS5zdWJzY3JpYmUoKHYpID0+IHRoaXMudG9nZ2xlTG9hZGluZyghIXYpKTtcbiAgICBmaWx0ZXIubm90Rmlyc3Q8c3RyaW5nPigndGhlbWUnKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWZyZXNoQ2hhcnQoKSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlc2l6ZVN1YiA9IGZyb21FdmVudCh3aW5kb3csICdyZXNpemUnKVxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDUwKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5hdXRvUmVzaXplICYmIHdpbmRvdy5pbm5lcldpZHRoICE9PSB0aGlzLmN1cnJlbnRXaW5kb3dXaWR0aCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgdGhpcy5jdXJyZW50T2Zmc2V0V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgdGhpcy5jdXJyZW50T2Zmc2V0SGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnJlc2l6ZVN1Yikge1xuICAgICAgdGhpcy5yZXNpemVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5kaXNwb3NlKCk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgLy8gTm8gaGVhdnkgd29yayBpbiBEb0NoZWNrIVxuICAgIGlmICh0aGlzLmNoYXJ0ICYmIHRoaXMuYXV0b1Jlc2l6ZSkge1xuICAgICAgY29uc3Qgb2Zmc2V0V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICBjb25zdCBvZmZzZXRIZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50T2Zmc2V0V2lkdGggIT09IG9mZnNldFdpZHRoIHx8IHRoaXMuY3VycmVudE9mZnNldEhlaWdodCAhPT0gb2Zmc2V0SGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY3VycmVudE9mZnNldFdpZHRoID0gb2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuY3VycmVudE9mZnNldEhlaWdodCA9IG9mZnNldEhlaWdodDtcbiAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmluaXRDaGFydCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgZGlzcG9zZSgpIHtcbiAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgdGhpcy5jaGFydC5kaXNwb3NlKCk7XG4gICAgICB0aGlzLmNoYXJ0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZSgpIHtcbiAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgdGhpcy5jaGFydC5yZXNpemUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZUxvYWRpbmcobG9hZGluZzogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICBsb2FkaW5nXG4gICAgICAgID8gdGhpcy5jaGFydC5zaG93TG9hZGluZyh0aGlzLmxvYWRpbmdUeXBlLCB0aGlzLmxvYWRpbmdPcHRzKVxuICAgICAgICA6IHRoaXMuY2hhcnQuaGlkZUxvYWRpbmcoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbihvcHRpb246IGFueSwgb3B0cz86IGFueSkge1xuICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICB0aGlzLmNoYXJ0LnNldE9wdGlvbihvcHRpb24sIG9wdHMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaENoYXJ0KCkge1xuICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIHRoaXMuaW5pdENoYXJ0KCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNoYXJ0KCkge1xuICAgIHRoaXMuY3VycmVudFdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy5jdXJyZW50T2Zmc2V0V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5jdXJyZW50T2Zmc2V0SGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBkb20gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAod2luZG93ICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgICBjb25zdCBwcm9wID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9tLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKTtcbiAgICAgIGlmICgoIXByb3AgfHwgcHJvcCA9PT0gJzBweCcpICYmICghZG9tLnN0eWxlLmhlaWdodCB8fCBkb20uc3R5bGUuaGVpZ2h0ID09PSAnMHB4JykpIHtcbiAgICAgICAgZG9tLnN0eWxlLmhlaWdodCA9ICc0MDBweCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMuZWNoYXJ0cy5pbml0KGRvbSwgdGhpcy50aGVtZSwgdGhpcy5pbml0T3B0cykpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0Q2hhcnQoKSB7XG4gICAgdGhpcy5vbk9wdGlvbnNDaGFuZ2UodGhpcy5vcHRpb25zKTtcblxuICAgIGlmICh0aGlzLm1lcmdlICYmIHRoaXMuY2hhcnQpIHtcbiAgICAgIHRoaXMuc2V0T3B0aW9uKHRoaXMubWVyZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25PcHRpb25zQ2hhbmdlKG9wdDogYW55KSB7XG4gICAgaWYgKG9wdCkge1xuICAgICAgaWYgKCF0aGlzLmNoYXJ0KSB7XG4gICAgICAgIHRoaXMuY2hhcnQgPSB0aGlzLmNyZWF0ZUNoYXJ0KCk7XG4gICAgICAgIHRoaXMuY2hhcnRJbml0LmVtaXQodGhpcy5jaGFydCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hhcnQuc2V0T3B0aW9uKHRoaXMub3B0aW9ucywgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gYWxsb3dzIHRvIGxhemlseSBiaW5kIHRvIG9ubHkgdGhvc2UgZXZlbnRzIHRoYXQgYXJlIHJlcXVlc3RlZCB0aHJvdWdoIHRoZSBgQE91dHB1dGAgYnkgcGFyZW50IGNvbXBvbmVudHNcbiAgLy8gc2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzUxNzg3OTcyL29wdGltYWwtcmVlbnRlcmluZy10aGUtbmd6b25lLWZyb20tZXZlbnRlbWl0dGVyLWV2ZW50IGZvciBtb3JlIGluZm9cbiAgcHJpdmF0ZSBjcmVhdGVMYXp5RXZlbnQ8VD4oZXZlbnROYW1lOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8VD4ge1xuICAgIHJldHVybiB0aGlzLmNoYXJ0SW5pdC5waXBlKFxuICAgICAgc3dpdGNoTWFwKFxuICAgICAgICAoY2hhcnQ6IGFueSkgPT5cbiAgICAgICAgICBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIGNoYXJ0Lm9uKGV2ZW50TmFtZSwgKGRhdGE6IFQpID0+IHRoaXMubmdab25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGRhdGEpKSk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gY2hhcnQub2ZmKGV2ZW50TmFtZSk7XG4gICAgICAgICAgfSksXG4gICAgICApLFxuICAgICkgYXMgRXZlbnRFbWl0dGVyPFQ+O1xuICB9XG59XG4iXX0=