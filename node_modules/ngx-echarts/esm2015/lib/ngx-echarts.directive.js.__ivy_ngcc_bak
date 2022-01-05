import { __decorate, __param } from "tslib";
import { AfterViewInit, Directive, DoCheck, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, InjectionToken, Inject, } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ChangeFilter } from './change-filter';
export const NGX_ECHARTS_CONFIG = new InjectionToken('NGX_ECHARTS_CONFIG');
let NgxEchartsDirective = class NgxEchartsDirective {
    constructor(config, el, ngZone) {
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
    ngOnChanges(changes) {
        const filter = ChangeFilter.of(changes);
        filter.notFirstAndEmpty('options').subscribe((opt) => this.onOptionsChange(opt));
        filter.notFirstAndEmpty('merge').subscribe((opt) => this.setOption(opt));
        filter.has('loading').subscribe((v) => this.toggleLoading(!!v));
        filter.notFirst('theme').subscribe(() => this.refreshChart());
    }
    ngOnInit() {
        this.resizeSub = fromEvent(window, 'resize')
            .pipe(debounceTime(50))
            .subscribe(() => {
            if (this.autoResize && window.innerWidth !== this.currentWindowWidth) {
                this.currentWindowWidth = window.innerWidth;
                this.currentOffsetWidth = this.el.nativeElement.offsetWidth;
                this.currentOffsetHeight = this.el.nativeElement.offsetHeight;
                this.resize();
            }
        });
    }
    ngOnDestroy() {
        if (this.resizeSub) {
            this.resizeSub.unsubscribe();
        }
        this.dispose();
    }
    ngDoCheck() {
        // No heavy work in DoCheck!
        if (this.chart && this.autoResize) {
            const offsetWidth = this.el.nativeElement.offsetWidth;
            const offsetHeight = this.el.nativeElement.offsetHeight;
            if (this.currentOffsetWidth !== offsetWidth || this.currentOffsetHeight !== offsetHeight) {
                this.currentOffsetWidth = offsetWidth;
                this.currentOffsetHeight = offsetHeight;
                this.resize();
            }
        }
    }
    ngAfterViewInit() {
        setTimeout(() => this.initChart());
    }
    dispose() {
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    }
    resize() {
        if (this.chart) {
            this.chart.resize();
        }
    }
    toggleLoading(loading) {
        if (this.chart) {
            loading
                ? this.chart.showLoading(this.loadingType, this.loadingOpts)
                : this.chart.hideLoading();
        }
    }
    setOption(option, opts) {
        if (this.chart) {
            this.chart.setOption(option, opts);
        }
    }
    refreshChart() {
        this.dispose();
        this.initChart();
    }
    createChart() {
        this.currentWindowWidth = window.innerWidth;
        this.currentOffsetWidth = this.el.nativeElement.offsetWidth;
        this.currentOffsetHeight = this.el.nativeElement.offsetHeight;
        const dom = this.el.nativeElement;
        if (window && window.getComputedStyle) {
            const prop = window.getComputedStyle(dom, null).getPropertyValue('height');
            if ((!prop || prop === '0px') && (!dom.style.height || dom.style.height === '0px')) {
                dom.style.height = '400px';
            }
        }
        return this.ngZone.runOutsideAngular(() => this.echarts.init(dom, this.theme, this.initOpts));
    }
    initChart() {
        this.onOptionsChange(this.options);
        if (this.merge && this.chart) {
            this.setOption(this.merge);
        }
    }
    onOptionsChange(opt) {
        if (opt) {
            if (!this.chart) {
                this.chart = this.createChart();
                this.chartInit.emit(this.chart);
            }
            this.chart.setOption(this.options, true);
        }
    }
    // allows to lazily bind to only those events that are requested through the `@Output` by parent components
    // see https://stackoverflow.com/questions/51787972/optimal-reentering-the-ngzone-from-eventemitter-event for more info
    createLazyEvent(eventName) {
        return this.chartInit.pipe(switchMap((chart) => new Observable((observer) => {
            chart.on(eventName, (data) => this.ngZone.run(() => observer.next(data)));
            return () => chart.off(eventName);
        })));
    }
};
NgxEchartsDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NGX_ECHARTS_CONFIG,] }] },
    { type: ElementRef },
    { type: NgZone }
];
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
export { NgxEchartsDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWVjaGFydHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWVjaGFydHMvIiwic291cmNlcyI6WyJsaWIvbmd4LWVjaGFydHMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2IsY0FBYyxFQUNkLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFLL0MsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxjQUFjLENBQW1CLG9CQUFvQixDQUFDLENBQUM7QUFNN0YsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUE4RDlCLFlBQzhCLE1BQXdCLEVBQzVDLEVBQWMsRUFDZCxNQUFjO1FBRGQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQVE7UUF0RGYsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUdqQyxxQkFBcUI7UUFDWCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU5Qyx1QkFBdUI7UUFDYixlQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxrQkFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsbUJBQWMsR0FBRyxJQUFJLENBQUMs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OzhEQUEwRDtBQUN6RDtJQUFULE1BQU0sRUFBRTswREFBa0Q7QUFDakQ7SUFBVCxNQUFNLEVBQUU7bUVBQW9FO0FBQ25FO0lBQVQsTUFBTSxFQUFFO2lFQUFnRTtBQUMvRDtJQUFULE1BQU0sRUFBRTtxRUFBd0U7QUFDdkU7SUFBVCxNQUFNLEVBQUU7eURBQWdEO0FBQy9DO0lBQVQsTUFBTSxFQUFFO2lFQUFnRTtBQUMvRDtJQUFULE1BQU0sRUFBRTtrRUFBa0U7QUFDakU7SUFBVCxNQUFNLEVBQUU7a0VBQWtFO0FBQ2pFO0lBQVQsTUFBTSxFQUFFOzZEQUF3RDtBQUN2RDtJQUFULE1BQU0sRUFBRTsrREFBNEQ7QUFDM0Q7SUFBVCxNQUFNLEVBQUU7a0VBQWtFO0FBQ2pFO0lBQVQsTUFBTSxFQUFFOzZEQUF3RDtBQUN2RDtJQUFULE1BQU0sRUFBRTsrREFBNEQ7QUFDM0Q7SUFBVCxNQUFNLEVBQUU7a0VBQWtFO0FBQ2pFO0lBQVQsTUFBTSxFQUFFO29FQUFzRTtBQUNyRTtJQUFULE1BQU0sRUFBRTtzRUFBMEU7QUFDekU7SUFBVCxNQUFNLEVBQUU7dURBQTRDO0FBQzNDO0lBQVQsTUFBTSxFQUFFOytEQUE0RDtBQUMzRDtJQUFULE1BQU0sRUFBRTswREFBa0Q7QUFDakQ7SUFBVCxNQUFNLEVBQUU7MERBQWtEO0FBckRoRCxtQkFBbUI7SUFKL0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixRQUFRLEVBQUUsU0FBUztLQUNwQixDQUFDO0lBZ0VHLFdBQUEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7R0EvRGxCLG1CQUFtQixDQW9NL0I7U0FwTVksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaGFuZ2VGaWx0ZXIgfSBmcm9tICcuL2NoYW5nZS1maWx0ZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5neEVjaGFydHNDb25maWcge1xuICBlY2hhcnRzOiBhbnk7XG59XG5leHBvcnQgY29uc3QgTkdYX0VDSEFSVFNfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPE5neEVjaGFydHNDb25maWc+KCdOR1hfRUNIQVJUU19DT05GSUcnKTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZWNoYXJ0cywgW2VjaGFydHNdJyxcbiAgZXhwb3J0QXM6ICdlY2hhcnRzJyxcbn0pXG5leHBvcnQgY2xhc3MgTmd4RWNoYXJ0c0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIERvQ2hlY2ssIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxvYWRpbmc6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGluaXRPcHRzOiB7XG4gICAgZGV2aWNlUGl4ZWxSYXRpbz86IG51bWJlcjtcbiAgICByZW5kZXJlcj86IHN0cmluZztcbiAgICB3aWR0aD86IG51bWJlciB8IHN0cmluZztcbiAgICBoZWlnaHQ/OiBudW1iZXIgfCBzdHJpbmc7XG4gIH07XG4gIEBJbnB1dCgpIG1lcmdlOiBhbnk7XG4gIEBJbnB1dCgpIGF1dG9SZXNpemUgPSB0cnVlO1xuICBASW5wdXQoKSBsb2FkaW5nVHlwZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgbG9hZGluZ09wdHM6IG9iamVjdDtcblxuICAvLyBuZ3gtZWNoYXJ0cyBldmVudHNcbiAgQE91dHB1dCgpIGNoYXJ0SW5pdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8vIGVjaGFydHMgbW91c2UgZXZlbnRzXG4gIEBPdXRwdXQoKSBjaGFydENsaWNrID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NsaWNrJyk7XG4gIEBPdXRwdXQoKSBjaGFydERibENsaWNrID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2RibGNsaWNrJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1vdXNlRG93biA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtb3VzZWRvd24nKTtcbiAgQE91dHB1dCgpIGNoYXJ0TW91c2VNb3ZlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNlbW92ZScpO1xuICBAT3V0cHV0KCkgY2hhcnRNb3VzZVVwID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNldXAnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TW91c2VPdmVyID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNlb3ZlcicpO1xuICBAT3V0cHV0KCkgY2hhcnRNb3VzZU91dCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtb3VzZW91dCcpO1xuICBAT3V0cHV0KCkgY2hhcnRHbG9iYWxPdXQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZ2xvYmFsb3V0Jyk7XG4gIEBPdXRwdXQoKSBjaGFydENvbnRleHRNZW51ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NvbnRleHRtZW51Jyk7XG5cbiAgLy8gZWNoYXJ0cyBtb3VzZSBldmVudHNcbiAgQE91dHB1dCgpIGNoYXJ0TGVnZW5kU2VsZWN0Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsZWdlbmRzZWxlY3RjaGFuZ2VkJyk7XG4gIEBPdXRwdXQoKSBjaGFydExlZ2VuZFNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2xlZ2VuZHNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydExlZ2VuZFVuc2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbGVnZW5kdW5zZWxlY3RlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRMZWdlbmRTY3JvbGwgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbGVnZW5kc2Nyb2xsJyk7XG4gIEBPdXRwdXQoKSBjaGFydERhdGFab29tID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2RhdGF6b29tJyk7XG4gIEBPdXRwdXQoKSBjaGFydERhdGFSYW5nZVNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2RhdGFyYW5nZXNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydFRpbWVsaW5lQ2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd0aW1lbGluZWNoYW5nZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0VGltZWxpbmVQbGF5Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd0aW1lbGluZXBsYXljaGFuZ2VkJyk7XG4gIEBPdXRwdXQoKSBjaGFydFJlc3RvcmUgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncmVzdG9yZScpO1xuICBAT3V0cHV0KCkgY2hhcnREYXRhVmlld0NoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGF0YXZpZXdjaGFuZ2VkJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1hZ2ljVHlwZUNoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbWFnaWN0eXBlY2hhbmdlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRQaWVTZWxlY3RDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3BpZXNlbGVjdGNoYW5nZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0UGllU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncGllc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0UGllVW5zZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwaWV1bnNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1hcFNlbGVjdENoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbWFwc2VsZWN0Y2hhbmdlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRNYXBTZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtYXBzZWxlY3RlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRNYXBVbnNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21hcHVuc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0QXhpc0FyZWFTZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdheGlzYXJlYXNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydEZvY3VzTm9kZUFkamFjZW5jeSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdmb2N1c25vZGVhZGphY2VuY3knKTtcbiAgQE91dHB1dCgpIGNoYXJ0VW5mb2N1c05vZGVBZGphY2VuY3kgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgndW5mb2N1c25vZGVhZGphY2VuY3knKTtcbiAgQE91dHB1dCgpIGNoYXJ0QnJ1c2ggPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnYnJ1c2gnKTtcbiAgQE91dHB1dCgpIGNoYXJ0QnJ1c2hTZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdicnVzaHNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydFJlbmRlcmVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3JlbmRlcmVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydEZpbmlzaGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2ZpbmlzaGVkJyk7XG5cbiAgcHJpdmF0ZSBjaGFydDogYW55O1xuICBwcml2YXRlIGVjaGFydHM6IGFueTtcbiAgcHJpdmF0ZSBjdXJyZW50T2Zmc2V0V2lkdGggPSAwO1xuICBwcml2YXRlIGN1cnJlbnRPZmZzZXRIZWlnaHQgPSAwO1xuICBwcml2YXRlIGN1cnJlbnRXaW5kb3dXaWR0aDogbnVtYmVyO1xuICBwcml2YXRlIHJlc2l6ZVN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoTkdYX0VDSEFSVFNfQ09ORklHKSBjb25maWc6IE5neEVjaGFydHNDb25maWcsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICApIHtcbiAgICB0aGlzLmVjaGFydHMgPSBjb25maWcuZWNoYXJ0cztcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBmaWx0ZXIgPSBDaGFuZ2VGaWx0ZXIub2YoY2hhbmdlcyk7XG4gICAgZmlsdGVyLm5vdEZpcnN0QW5kRW1wdHk8YW55Pignb3B0aW9ucycpLnN1YnNjcmliZSgob3B0KSA9PiB0aGlzLm9uT3B0aW9uc0NoYW5nZShvcHQpKTtcbiAgICBmaWx0ZXIubm90Rmlyc3RBbmRFbXB0eTxhbnk+KCdtZXJnZScpLnN1YnNjcmliZSgob3B0KSA9PiB0aGlzLnNldE9wdGlvbihvcHQpKTtcbiAgICBmaWx0ZXIuaGFzPGJvb2xlYW4+KCdsb2FkaW5nJykuc3Vic2NyaWJlKCh2KSA9PiB0aGlzLnRvZ2dsZUxvYWRpbmcoISF2KSk7XG4gICAgZmlsdGVyLm5vdEZpcnN0PHN0cmluZz4oJ3RoZW1lJykuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVmcmVzaENoYXJ0KCkpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZXNpemVTdWIgPSBmcm9tRXZlbnQod2luZG93LCAncmVzaXplJylcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1Jlc2l6ZSAmJiB3aW5kb3cuaW5uZXJXaWR0aCAhPT0gdGhpcy5jdXJyZW50V2luZG93V2lkdGgpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRXaW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgIHRoaXMuY3VycmVudE9mZnNldFdpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgIHRoaXMuY3VycmVudE9mZnNldEhlaWdodCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5yZXNpemVTdWIpIHtcbiAgICAgIHRoaXMucmVzaXplU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHRoaXMuZGlzcG9zZSgpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIC8vIE5vIGhlYXZ5IHdvcmsgaW4gRG9DaGVjayFcbiAgICBpZiAodGhpcy5jaGFydCAmJiB0aGlzLmF1dG9SZXNpemUpIHtcbiAgICAgIGNvbnN0IG9mZnNldFdpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgY29uc3Qgb2Zmc2V0SGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudE9mZnNldFdpZHRoICE9PSBvZmZzZXRXaWR0aCB8fCB0aGlzLmN1cnJlbnRPZmZzZXRIZWlnaHQgIT09IG9mZnNldEhlaWdodCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRPZmZzZXRXaWR0aCA9IG9mZnNldFdpZHRoO1xuICAgICAgICB0aGlzLmN1cnJlbnRPZmZzZXRIZWlnaHQgPSBvZmZzZXRIZWlnaHQ7XG4gICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbml0Q2hhcnQoKSk7XG4gIH1cblxuICBwcml2YXRlIGRpc3Bvc2UoKSB7XG4gICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgIHRoaXMuY2hhcnQuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5jaGFydCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNpemUoKSB7XG4gICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgIHRoaXMuY2hhcnQucmVzaXplKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVMb2FkaW5nKGxvYWRpbmc6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgbG9hZGluZ1xuICAgICAgICA/IHRoaXMuY2hhcnQuc2hvd0xvYWRpbmcodGhpcy5sb2FkaW5nVHlwZSwgdGhpcy5sb2FkaW5nT3B0cylcbiAgICAgICAgOiB0aGlzLmNoYXJ0LmhpZGVMb2FkaW5nKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRPcHRpb24ob3B0aW9uOiBhbnksIG9wdHM/OiBhbnkpIHtcbiAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgdGhpcy5jaGFydC5zZXRPcHRpb24ob3B0aW9uLCBvcHRzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hDaGFydCgpIHtcbiAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICB0aGlzLmluaXRDaGFydCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDaGFydCgpIHtcbiAgICB0aGlzLmN1cnJlbnRXaW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMuY3VycmVudE9mZnNldFdpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIHRoaXMuY3VycmVudE9mZnNldEhlaWdodCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgZG9tID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgY29uc3QgcHJvcCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvbSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0Jyk7XG4gICAgICBpZiAoKCFwcm9wIHx8IHByb3AgPT09ICcwcHgnKSAmJiAoIWRvbS5zdHlsZS5oZWlnaHQgfHwgZG9tLnN0eWxlLmhlaWdodCA9PT0gJzBweCcpKSB7XG4gICAgICAgIGRvbS5zdHlsZS5oZWlnaHQgPSAnNDAwcHgnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB0aGlzLmVjaGFydHMuaW5pdChkb20sIHRoaXMudGhlbWUsIHRoaXMuaW5pdE9wdHMpKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdENoYXJ0KCkge1xuICAgIHRoaXMub25PcHRpb25zQ2hhbmdlKHRoaXMub3B0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5tZXJnZSAmJiB0aGlzLmNoYXJ0KSB7XG4gICAgICB0aGlzLnNldE9wdGlvbih0aGlzLm1lcmdlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uT3B0aW9uc0NoYW5nZShvcHQ6IGFueSkge1xuICAgIGlmIChvcHQpIHtcbiAgICAgIGlmICghdGhpcy5jaGFydCkge1xuICAgICAgICB0aGlzLmNoYXJ0ID0gdGhpcy5jcmVhdGVDaGFydCgpO1xuICAgICAgICB0aGlzLmNoYXJ0SW5pdC5lbWl0KHRoaXMuY2hhcnQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNoYXJ0LnNldE9wdGlvbih0aGlzLm9wdGlvbnMsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGFsbG93cyB0byBsYXppbHkgYmluZCB0byBvbmx5IHRob3NlIGV2ZW50cyB0aGF0IGFyZSByZXF1ZXN0ZWQgdGhyb3VnaCB0aGUgYEBPdXRwdXRgIGJ5IHBhcmVudCBjb21wb25lbnRzXG4gIC8vIHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MTc4Nzk3Mi9vcHRpbWFsLXJlZW50ZXJpbmctdGhlLW5nem9uZS1mcm9tLWV2ZW50ZW1pdHRlci1ldmVudCBmb3IgbW9yZSBpbmZvXG4gIHByaXZhdGUgY3JlYXRlTGF6eUV2ZW50PFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogRXZlbnRFbWl0dGVyPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5jaGFydEluaXQucGlwZShcbiAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgKGNoYXJ0OiBhbnkpID0+XG4gICAgICAgICAgbmV3IE9ic2VydmFibGUoKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICBjaGFydC5vbihldmVudE5hbWUsIChkYXRhOiBUKSA9PiB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChkYXRhKSkpO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IGNoYXJ0Lm9mZihldmVudE5hbWUpO1xuICAgICAgICAgIH0pLFxuICAgICAgKSxcbiAgICApIGFzIEV2ZW50RW1pdHRlcjxUPjtcbiAgfVxufVxuIl19