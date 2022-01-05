import { __decorate, __metadata, __param } from "tslib";
import { Component, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, OnDestroy, LOCALE_ID, Inject, TemplateRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEventTimesChangedEventType, } from '../common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../common/calendar-utils.provider';
import { validateEvents } from '../common/util';
import { DateAdapter } from '../../date-adapters/date-adapter';
/**
 * Shows all events on a given month. Example usage:
 *
 * ```typescript
 * <mwl-calendar-month-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-month-view>
 * ```
 */
let CalendarMonthViewComponent = class CalendarMonthViewComponent {
    /**
     * @hidden
     */
    constructor(cdr, utils, locale, dateAdapter) {
        this.cdr = cdr;
        this.utils = utils;
        this.dateAdapter = dateAdapter;
        /**
         * An array of events to display on view.
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
        /**
         * Whether the events list for the day of the `viewDate` option is visible or not
         */
        this.activeDayIsOpen = false;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'auto';
        /**
         * Whether to append tooltips to the body or next to the trigger element
         */
        this.tooltipAppendToBody = true;
        /**
         * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
         * will be displayed immediately.
         */
        this.tooltipDelay = null;
        /**
         * An output that will be called before the view is rendered for the current month.
         * If you add the `cssClass` property to a day in the body it will add that class to the cell element in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * Called when the day cell is clicked
         */
        this.dayClicked = new EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when a header week day is clicked. Returns ISO day number.
         */
        this.columnHeaderClicked = new EventEmitter();
        /**
         * Called when an event is dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * @hidden
         */
        this.trackByRowOffset = (index, offset) => this.view.days
            .slice(offset, this.view.totalDaysVisibleInWeek)
            .map((day) => day.date.toISOString())
            .join('-');
        /**
         * @hidden
         */
        this.trackByDate = (index, day) => day.date.toISOString();
        this.locale = locale;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        const refreshHeader = changes.viewDate || changes.excludeDays || changes.weekendDays;
        const refreshBody = changes.viewDate ||
            changes.events ||
            changes.excludeDays ||
            changes.weekendDays;
        if (refreshHeader) {
            this.refreshHeader();
        }
        if (changes.events) {
            validateEvents(this.events);
        }
        if (refreshBody) {
            this.refreshBody();
        }
        if (refreshHeader || refreshBody) {
            this.emitBeforeViewRender();
        }
        if (changes.activeDayIsOpen ||
            changes.viewDate ||
            changes.events ||
            changes.excludeDays ||
            changes.activeDay) {
            this.checkActiveDayIsOpen();
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    toggleDayHighlight(event, isHighlighted) {
        this.view.days.forEach((day) => {
            if (isHighlighted && day.events.indexOf(event) > -1) {
                day.backgroundColor =
                    (event.color && event.color.secondary) || '#D1E8FF';
            }
            else {
                delete day.backgroundColor;
            }
        });
    }
    /**
     * @hidden
     */
    eventDropped(droppedOn, event, draggedFrom) {
        if (droppedOn !== draggedFrom) {
            const year = this.dateAdapter.getYear(droppedOn.date);
            const month = this.dateAdapter.getMonth(droppedOn.date);
            const date = this.dateAdapter.getDate(droppedOn.date);
            const newStart = this.dateAdapter.setDate(this.dateAdapter.setMonth(this.dateAdapter.setYear(event.start, year), month), date);
            let newEnd;
            if (event.end) {
                const secondsDiff = this.dateAdapter.differenceInSeconds(newStart, event.start);
                newEnd = this.dateAdapter.addSeconds(event.end, secondsDiff);
            }
            this.eventTimesChanged.emit({
                event,
                newStart,
                newEnd,
                day: droppedOn,
                type: CalendarEventTimesChangedEventType.Drop,
            });
        }
    }
    refreshHeader() {
        this.columnHeaders = this.utils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays,
        });
    }
    refreshBody() {
        this.view = this.utils.getMonthView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays,
        });
    }
    checkActiveDayIsOpen() {
        if (this.activeDayIsOpen === true) {
            const activeDay = this.activeDay || this.viewDate;
            this.openDay = this.view.days.find((day) => this.dateAdapter.isSameDay(day.date, activeDay));
            const index = this.view.days.indexOf(this.openDay);
            this.openRowIndex =
                Math.floor(index / this.view.totalDaysVisibleInWeek) *
                    this.view.totalDaysVisibleInWeek;
        }
        else {
            this.openRowIndex = null;
            this.openDay = null;
        }
    }
    refreshAll() {
        this.refreshHeader();
        this.refreshBody();
        this.emitBeforeViewRender();
        this.checkActiveDayIsOpen();
    }
    emitBeforeViewRender() {
        if (this.columnHeaders && this.view) {
            this.beforeViewRender.emit({
                header: this.columnHeaders,
                body: this.view.days,
                period: this.view.period,
            });
        }
    }
};
CalendarMonthViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: CalendarUtils },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] },
    { type: DateAdapter }
];
__decorate([
    Input(),
    __metadata("design:type", Date)
], CalendarMonthViewComponent.prototype, "viewDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], CalendarMonthViewComponent.prototype, "events", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], CalendarMonthViewComponent.prototype, "excludeDays", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], CalendarMonthViewComponent.prototype, "activeDayIsOpen", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], CalendarMonthViewComponent.prototype, "activeDay", void 0);
__decorate([
    Input(),
    __metadata("design:type", Subject)
], CalendarMonthViewComponent.prototype, "refresh", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], CalendarMonthViewComponent.prototype, "locale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CalendarMonthViewComponent.prototype, "tooltipPlacement", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarMonthViewComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], CalendarMonthViewComponent.prototype, "tooltipAppendToBody", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarMonthViewComponent.prototype, "tooltipDelay", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarMonthViewComponent.prototype, "weekStartsOn", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarMonthViewComponent.prototype, "headerTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarMonthViewComponent.prototype, "cellTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarMonthViewComponent.prototype, "openDayEventsTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarMonthViewComponent.prototype, "eventTitleTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarMonthViewComponent.prototype, "eventActionsTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], CalendarMonthViewComponent.prototype, "weekendDays", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarMonthViewComponent.prototype, "beforeViewRender", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarMonthViewComponent.prototype, "dayClicked", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarMonthViewComponent.prototype, "eventClicked", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarMonthViewComponent.prototype, "columnHeaderClicked", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarMonthViewComponent.prototype, "eventTimesChanged", void 0);
CalendarMonthViewComponent = __decorate([
    Component({
        selector: 'mwl-calendar-month-view',
        template: `
    <div class="cal-month-view" role="grid">
      <mwl-calendar-month-view-header
        [days]="columnHeaders"
        [locale]="locale"
        (columnHeaderClicked)="columnHeaderClicked.emit($event)"
        [customTemplate]="headerTemplate"
      >
      </mwl-calendar-month-view-header>
      <div class="cal-days">
        <div
          *ngFor="let rowIndex of view.rowOffsets; trackBy: trackByRowOffset"
        >
          <div class="cal-cell-row">
            <mwl-calendar-month-cell
              *ngFor="
                let day of view.days
                  | slice: rowIndex:rowIndex + view.totalDaysVisibleInWeek;
                trackBy: trackByDate
              "
              [ngClass]="day?.cssClass"
              [day]="day"
              [openDay]="openDay"
              [locale]="locale"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [tooltipTemplate]="tooltipTemplate"
              [tooltipDelay]="tooltipDelay"
              [customTemplate]="cellTemplate"
              [ngStyle]="{ backgroundColor: day.backgroundColor }"
              (mwlClick)="dayClicked.emit({ day: day, sourceEvent: $event })"
              [clickListenerDisabled]="dayClicked.observers.length === 0"
              (mwlKeydownEnter)="
                dayClicked.emit({ day: day, sourceEvent: $event })
              "
              (highlightDay)="toggleDayHighlight($event.event, true)"
              (unhighlightDay)="toggleDayHighlight($event.event, false)"
              mwlDroppable
              dragOverClass="cal-drag-over"
              (drop)="
                eventDropped(
                  day,
                  $event.dropData.event,
                  $event.dropData.draggedFrom
                )
              "
              (eventClicked)="
                eventClicked.emit({
                  event: $event.event,
                  sourceEvent: $event.sourceEvent
                })
              "
              [attr.tabindex]="{} | calendarA11y: 'monthCellTabIndex'"
            >
            </mwl-calendar-month-cell>
          </div>
          <mwl-calendar-open-day-events
            [locale]="locale"
            [isOpen]="openRowIndex === rowIndex"
            [events]="openDay?.events"
            [date]="openDay?.date"
            [customTemplate]="openDayEventsTemplate"
            [eventTitleTemplate]="eventTitleTemplate"
            [eventActionsTemplate]="eventActionsTemplate"
            (eventClicked)="
              eventClicked.emit({
                event: $event.event,
                sourceEvent: $event.sourceEvent
              })
            "
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="
              eventDropped(
                openDay,
                $event.dropData.event,
                $event.dropData.draggedFrom
              )
            "
          >
          </mwl-calendar-open-day-events>
        </div>
      </div>
    </div>
  `
    }),
    __param(2, Inject(LOCALE_ID)),
    __metadata("design:paramtypes", [ChangeDetectorRef,
        CalendarUtils, String, DateAdapter])
], CalendarMonthViewComponent);
export { CalendarMonthViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9tb250aC9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFRdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUVMLGtDQUFrQyxHQUNuQyxNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBZ0IvRDs7Ozs7Ozs7O0dBU0c7QUF5RkgsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUErSnJDOztPQUVHO0lBQ0gsWUFDWSxHQUFzQixFQUN0QixLQUFvQixFQUNYLE1BQWMsRUFDdkIsV0FBd0I7UUFIeEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQUVwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQS9KcEM7OztXQUdHO1FBQ00sV0FBTSxHQUFvQixFQUFFLENBQUM7UUFFdEM7O1dBRUc7UUFDTSxnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQUVwQzs7V0FFRztRQUNNLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBaUIxQzs7V0FFRztRQUNNLHFCQUFnQixHQUFtQixNQUFNLENBQUM7UUFPbkQ7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QUMsQ0FBQTtxQ0FGSCxpQkFBaUI7UUFDZixhQUFhLFVBRVAsV0FBVztHQXRLekIsMEJBQTBCLENBMlZ0QztTQTNWWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uQ2hhbmdlcyxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIExPQ0FMRV9JRCxcbiAgSW5qZWN0LFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICBXZWVrRGF5LFxuICBNb250aFZpZXcsXG4gIE1vbnRoVmlld0RheSxcbiAgVmlld1BlcmlvZCxcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQsXG4gIENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGUsXG59IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC10aW1lcy1jaGFuZ2VkLWV2ZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDYWxlbmRhclV0aWxzIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLXV0aWxzLnByb3ZpZGVyJztcbmltcG9ydCB7IHZhbGlkYXRlRXZlbnRzIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSB9IGZyb20gJ3Bvc2l0aW9uaW5nJztcblxuZXhwb3J0IGludGVyZmFjZSBDYWxlbmRhck1vbnRoVmlld0JlZm9yZVJlbmRlckV2ZW50IHtcbiAgaGVhZGVyOiBXZWVrRGF5W107XG4gIGJvZHk6IE1vbnRoVmlld0RheVtdO1xuICBwZXJpb2Q6IFZpZXdQZXJpb2Q7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FsZW5kYXJNb250aFZpZXdFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PFxuICBFdmVudE1ldGFUeXBlID0gYW55LFxuICBEYXlNZXRhVHlwZSA9IGFueVxuPiBleHRlbmRzIENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudDxFdmVudE1ldGFUeXBlPiB7XG4gIGRheTogTW9udGhWaWV3RGF5PERheU1ldGFUeXBlPjtcbn1cblxuLyoqXG4gKiBTaG93cyBhbGwgZXZlbnRzIG9uIGEgZ2l2ZW4gbW9udGguIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogPG13bC1jYWxlbmRhci1tb250aC12aWV3XG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiPlxuICogPC9td2wtY2FsZW5kYXItbW9udGgtdmlldz5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItbW9udGgtdmlldycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNhbC1tb250aC12aWV3XCIgcm9sZT1cImdyaWRcIj5cbiAgICAgIDxtd2wtY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXJcbiAgICAgICAgW2RheXNdPVwiY29sdW1uSGVhZGVyc1wiXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgKGNvbHVtbkhlYWRlckNsaWNrZWQpPVwiY29sdW1uSGVhZGVyQ2xpY2tlZC5lbWl0KCRldmVudClcIlxuICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaGVhZGVyVGVtcGxhdGVcIlxuICAgICAgPlxuICAgICAgPC9td2wtY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLWRheXNcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICpuZ0Zvcj1cImxldCByb3dJbmRleCBvZiB2aWV3LnJvd09mZnNldHM7IHRyYWNrQnk6IHRyYWNrQnlSb3dPZmZzZXRcIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1jZWxsLXJvd1wiPlxuICAgICAgICAgICAgPG13bC1jYWxlbmRhci1tb250aC1jZWxsXG4gICAgICAgICAgICAgICpuZ0Zvcj1cIlxuICAgICAgICAgICAgICAgIGxldCBkYXkgb2Ygdmlldy5kYXlzXG4gICAgICAgICAgICAgICAgICB8IHNsaWNlOiByb3dJbmRleDpyb3dJbmRleCArIHZpZXcudG90YWxEYXlzVmlzaWJsZUluV2VlaztcbiAgICAgICAgICAgICAgICB0cmFja0J5OiB0cmFja0J5RGF0ZVxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJkYXk/LmNzc0NsYXNzXCJcbiAgICAgICAgICAgICAgW2RheV09XCJkYXlcIlxuICAgICAgICAgICAgICBbb3BlbkRheV09XCJvcGVuRGF5XCJcbiAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBEZWxheV09XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiY2VsbFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW25nU3R5bGVdPVwieyBiYWNrZ3JvdW5kQ29sb3I6IGRheS5iYWNrZ3JvdW5kQ29sb3IgfVwiXG4gICAgICAgICAgICAgIChtd2xDbGljayk9XCJkYXlDbGlja2VkLmVtaXQoeyBkYXk6IGRheSwgc291cmNlRXZlbnQ6ICRldmVudCB9KVwiXG4gICAgICAgICAgICAgIFtjbGlja0xpc3RlbmVyRGlzYWJsZWRdPVwiZGF5Q2xpY2tlZC5vYnNlcnZlcnMubGVuZ3RoID09PSAwXCJcbiAgICAgICAgICAgICAgKG13bEtleWRvd25FbnRlcik9XCJcbiAgICAgICAgICAgICAgICBkYXlDbGlja2VkLmVtaXQoeyBkYXk6IGRheSwgc291cmNlRXZlbnQ6ICRldmVudCB9KVxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAoaGlnaGxpZ2h0RGF5KT1cInRvZ2dsZURheUhpZ2hsaWdodCgkZXZlbnQuZXZlbnQsIHRydWUpXCJcbiAgICAgICAgICAgICAgKHVuaGlnaGxpZ2h0RGF5KT1cInRvZ2dsZURheUhpZ2hsaWdodCgkZXZlbnQuZXZlbnQsIGZhbHNlKVwiXG4gICAgICAgICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICAgICAgICBkcmFnT3ZlckNsYXNzPVwiY2FsLWRyYWctb3ZlclwiXG4gICAgICAgICAgICAgIChkcm9wKT1cIlxuICAgICAgICAgICAgICAgIGV2ZW50RHJvcHBlZChcbiAgICAgICAgICAgICAgICAgIGRheSxcbiAgICAgICAgICAgICAgICAgICRldmVudC5kcm9wRGF0YS5ldmVudCxcbiAgICAgICAgICAgICAgICAgICRldmVudC5kcm9wRGF0YS5kcmFnZ2VkRnJvbVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJcbiAgICAgICAgICAgICAgICBldmVudENsaWNrZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICBldmVudDogJGV2ZW50LmV2ZW50LFxuICAgICAgICAgICAgICAgICAgc291cmNlRXZlbnQ6ICRldmVudC5zb3VyY2VFdmVudFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cInt9IHwgY2FsZW5kYXJBMTF5OiAnbW9udGhDZWxsVGFiSW5kZXgnXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLW1vbnRoLWNlbGw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPG13bC1jYWxlbmRhci1vcGVuLWRheS1ldmVudHNcbiAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgIFtpc09wZW5dPVwib3BlblJvd0luZGV4ID09PSByb3dJbmRleFwiXG4gICAgICAgICAgICBbZXZlbnRzXT1cIm9wZW5EYXk/LmV2ZW50c1wiXG4gICAgICAgICAgICBbZGF0ZV09XCJvcGVuRGF5Py5kYXRlXCJcbiAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJvcGVuRGF5RXZlbnRzVGVtcGxhdGVcIlxuICAgICAgICAgICAgW2V2ZW50VGl0bGVUZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgICAgICAgW2V2ZW50QWN0aW9uc1RlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcbiAgICAgICAgICAgIChldmVudENsaWNrZWQpPVwiXG4gICAgICAgICAgICAgIGV2ZW50Q2xpY2tlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICBldmVudDogJGV2ZW50LmV2ZW50LFxuICAgICAgICAgICAgICAgIHNvdXJjZUV2ZW50OiAkZXZlbnQuc291cmNlRXZlbnRcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICBtd2xEcm9wcGFibGVcbiAgICAgICAgICAgIGRyYWdPdmVyQ2xhc3M9XCJjYWwtZHJhZy1vdmVyXCJcbiAgICAgICAgICAgIChkcm9wKT1cIlxuICAgICAgICAgICAgICBldmVudERyb3BwZWQoXG4gICAgICAgICAgICAgICAgb3BlbkRheSxcbiAgICAgICAgICAgICAgICAkZXZlbnQuZHJvcERhdGEuZXZlbnQsXG4gICAgICAgICAgICAgICAgJGV2ZW50LmRyb3BEYXRhLmRyYWdnZWRGcm9tXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLW9wZW4tZGF5LWV2ZW50cz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXcuXG4gICAqIFRoZSBzY2hlbWEgaXMgYXZhaWxhYmxlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0bGV3aXM5Mi9jYWxlbmRhci11dGlscy9ibG9iL2M1MTY4OTk4NWY1OWEyNzE5NDBlMzBiYzRlMmM0ZTFmZWUzZmNiNWMvc3JjL2NhbGVuZGFyVXRpbHMudHMjTDQ5LUw2M1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10gPSBbXTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZGF5IGluZGV4ZXMgKDAgPSBzdW5kYXksIDEgPSBtb25kYXkgZXRjKSB0aGF0IHdpbGwgYmUgaGlkZGVuIG9uIHRoZSB2aWV3XG4gICAqL1xuICBASW5wdXQoKSBleGNsdWRlRGF5czogbnVtYmVyW10gPSBbXTtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZXZlbnRzIGxpc3QgZm9yIHRoZSBkYXkgb2YgdGhlIGB2aWV3RGF0ZWAgb3B0aW9uIGlzIHZpc2libGUgb3Igbm90XG4gICAqL1xuICBASW5wdXQoKSBhY3RpdmVEYXlJc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogSWYgc2V0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGRheSB0aGF0IHNob3VsZCBiZSBvcGVuLiBJZiBub3Qgc2V0LCB0aGUgYHZpZXdEYXRlYCBpcyB1c2VkXG4gICAqL1xuICBASW5wdXQoKSBhY3RpdmVEYXk6IERhdGU7XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB3aGVuIGVtaXR0ZWQgb24gd2lsbCByZS1yZW5kZXIgdGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KCkgcmVmcmVzaDogU3ViamVjdDxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgbG9jYWxlIHVzZWQgdG8gZm9ybWF0IGRhdGVzXG4gICAqL1xuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHBsYWNlbWVudCBvZiB0aGUgZXZlbnQgdG9vbHRpcFxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYXV0byc7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIGV2ZW50IHRvb2x0aXBzXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gYXBwZW5kIHRvb2x0aXBzIHRvIHRoZSBib2R5IG9yIG5leHQgdG8gdGhlIHRyaWdnZXIgZWxlbWVudFxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcEFwcGVuZFRvQm9keTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBkZWxheSBpbiBtaWxsaXNlY29uZHMgYmVmb3JlIHRoZSB0b29sdGlwIHNob3VsZCBiZSBkaXNwbGF5ZWQuIElmIG5vdCBwcm92aWRlZCB0aGUgdG9vbHRpcFxuICAgKiB3aWxsIGJlIGRpc3BsYXllZCBpbW1lZGlhdGVseS5cbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBEZWxheTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBzdGFydCBudW1iZXIgb2YgdGhlIHdlZWtcbiAgICovXG4gIEBJbnB1dCgpIHdlZWtTdGFydHNPbjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaGVhZGVyXG4gICAqL1xuICBASW5wdXQoKSBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGRheSBjZWxsXG4gICAqL1xuICBASW5wdXQoKSBjZWxsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIHNsaWRlIGRvd24gYm94IG9mIGV2ZW50cyBmb3IgdGhlIGFjdGl2ZSBkYXlcbiAgICovXG4gIEBJbnB1dCgpIG9wZW5EYXlFdmVudHNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCB0aXRsZXNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCBhY3Rpb25zXG4gICAqL1xuICBASW5wdXQoKSBldmVudEFjdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZGF5IGluZGV4ZXMgKDAgPSBzdW5kYXksIDEgPSBtb25kYXkgZXRjKSB0aGF0IGluZGljYXRlIHdoaWNoIGRheXMgYXJlIHdlZWtlbmRzXG4gICAqL1xuICBASW5wdXQoKSB3ZWVrZW5kRGF5czogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIEFuIG91dHB1dCB0aGF0IHdpbGwgYmUgY2FsbGVkIGJlZm9yZSB0aGUgdmlldyBpcyByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgbW9udGguXG4gICAqIElmIHlvdSBhZGQgdGhlIGBjc3NDbGFzc2AgcHJvcGVydHkgdG8gYSBkYXkgaW4gdGhlIGJvZHkgaXQgd2lsbCBhZGQgdGhhdCBjbGFzcyB0byB0aGUgY2VsbCBlbGVtZW50IGluIHRoZSB0ZW1wbGF0ZVxuICAgKi9cbiAgQE91dHB1dCgpIGJlZm9yZVZpZXdSZW5kZXIgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIENhbGVuZGFyTW9udGhWaWV3QmVmb3JlUmVuZGVyRXZlbnRcbiAgPigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZGF5IGNlbGwgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpIGRheUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBkYXk6IE1vbnRoVmlld0RheTtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudCB8IGFueTtcbiAgfT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGV2ZW50IHRpdGxlIGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKSBldmVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudDtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudCB8IGFueTtcbiAgfT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBoZWFkZXIgd2VlayBkYXkgaXMgY2xpY2tlZC4gUmV0dXJucyBJU08gZGF5IG51bWJlci5cbiAgICovXG4gIEBPdXRwdXQoKSBjb2x1bW5IZWFkZXJDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgaXNvRGF5TnVtYmVyOiBudW1iZXI7XG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQgfCBhbnk7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGV2ZW50IGlzIGRyYWdnZWQgYW5kIGRyb3BwZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBldmVudFRpbWVzQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgQ2FsZW5kYXJNb250aFZpZXdFdmVudFRpbWVzQ2hhbmdlZEV2ZW50XG4gID4oKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY29sdW1uSGVhZGVyczogV2Vla0RheVtdO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB2aWV3OiBNb250aFZpZXc7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG9wZW5Sb3dJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBvcGVuRGF5OiBNb250aFZpZXdEYXk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJlZnJlc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIHV0aWxzOiBDYWxlbmRhclV0aWxzLFxuICAgIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZyxcbiAgICBwcm90ZWN0ZWQgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyXG4gICkge1xuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlSb3dPZmZzZXQgPSAoaW5kZXg6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpID0+XG4gICAgdGhpcy52aWV3LmRheXNcbiAgICAgIC5zbGljZShvZmZzZXQsIHRoaXMudmlldy50b3RhbERheXNWaXNpYmxlSW5XZWVrKVxuICAgICAgLm1hcCgoZGF5KSA9PiBkYXkuZGF0ZS50b0lTT1N0cmluZygpKVxuICAgICAgLmpvaW4oJy0nKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeURhdGUgPSAoaW5kZXg6IG51bWJlciwgZGF5OiBNb250aFZpZXdEYXkpID0+IGRheS5kYXRlLnRvSVNPU3RyaW5nKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMucmVmcmVzaC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZnJlc2hBbGwoKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcmVmcmVzaEhlYWRlciA9XG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8IGNoYW5nZXMuZXhjbHVkZURheXMgfHwgY2hhbmdlcy53ZWVrZW5kRGF5cztcbiAgICBjb25zdCByZWZyZXNoQm9keSA9XG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XG4gICAgICBjaGFuZ2VzLmV2ZW50cyB8fFxuICAgICAgY2hhbmdlcy5leGNsdWRlRGF5cyB8fFxuICAgICAgY2hhbmdlcy53ZWVrZW5kRGF5cztcblxuICAgIGlmIChyZWZyZXNoSGVhZGVyKSB7XG4gICAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5ldmVudHMpIHtcbiAgICAgIHZhbGlkYXRlRXZlbnRzKHRoaXMuZXZlbnRzKTtcbiAgICB9XG5cbiAgICBpZiAocmVmcmVzaEJvZHkpIHtcbiAgICAgIHRoaXMucmVmcmVzaEJvZHkoKTtcbiAgICB9XG5cbiAgICBpZiAocmVmcmVzaEhlYWRlciB8fCByZWZyZXNoQm9keSkge1xuICAgICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGNoYW5nZXMuYWN0aXZlRGF5SXNPcGVuIHx8XG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XG4gICAgICBjaGFuZ2VzLmV2ZW50cyB8fFxuICAgICAgY2hhbmdlcy5leGNsdWRlRGF5cyB8fFxuICAgICAgY2hhbmdlcy5hY3RpdmVEYXlcbiAgICApIHtcbiAgICAgIHRoaXMuY2hlY2tBY3RpdmVEYXlJc09wZW4oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRvZ2dsZURheUhpZ2hsaWdodChldmVudDogQ2FsZW5kYXJFdmVudCwgaXNIaWdobGlnaHRlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMudmlldy5kYXlzLmZvckVhY2goKGRheSkgPT4ge1xuICAgICAgaWYgKGlzSGlnaGxpZ2h0ZWQgJiYgZGF5LmV2ZW50cy5pbmRleE9mKGV2ZW50KSA+IC0xKSB7XG4gICAgICAgIGRheS5iYWNrZ3JvdW5kQ29sb3IgPVxuICAgICAgICAgIChldmVudC5jb2xvciAmJiBldmVudC5jb2xvci5zZWNvbmRhcnkpIHx8ICcjRDFFOEZGJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBkYXkuYmFja2dyb3VuZENvbG9yO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGV2ZW50RHJvcHBlZChcbiAgICBkcm9wcGVkT246IE1vbnRoVmlld0RheSxcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudCxcbiAgICBkcmFnZ2VkRnJvbT86IE1vbnRoVmlld0RheVxuICApOiB2b2lkIHtcbiAgICBpZiAoZHJvcHBlZE9uICE9PSBkcmFnZ2VkRnJvbSkge1xuICAgICAgY29uc3QgeWVhcjogbnVtYmVyID0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGRyb3BwZWRPbi5kYXRlKTtcbiAgICAgIGNvbnN0IG1vbnRoOiBudW1iZXIgPSB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKGRyb3BwZWRPbi5kYXRlKTtcbiAgICAgIGNvbnN0IGRhdGU6IG51bWJlciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZShkcm9wcGVkT24uZGF0ZSk7XG4gICAgICBjb25zdCBuZXdTdGFydDogRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuc2V0RGF0ZShcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5zZXRNb250aChcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLnNldFllYXIoZXZlbnQuc3RhcnQsIHllYXIpLFxuICAgICAgICAgIG1vbnRoXG4gICAgICAgICksXG4gICAgICAgIGRhdGVcbiAgICAgICk7XG4gICAgICBsZXQgbmV3RW5kOiBEYXRlO1xuICAgICAgaWYgKGV2ZW50LmVuZCkge1xuICAgICAgICBjb25zdCBzZWNvbmRzRGlmZjogbnVtYmVyID0gdGhpcy5kYXRlQWRhcHRlci5kaWZmZXJlbmNlSW5TZWNvbmRzKFxuICAgICAgICAgIG5ld1N0YXJ0LFxuICAgICAgICAgIGV2ZW50LnN0YXJ0XG4gICAgICAgICk7XG4gICAgICAgIG5ld0VuZCA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkU2Vjb25kcyhldmVudC5lbmQsIHNlY29uZHNEaWZmKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7XG4gICAgICAgIGV2ZW50LFxuICAgICAgICBuZXdTdGFydCxcbiAgICAgICAgbmV3RW5kLFxuICAgICAgICBkYXk6IGRyb3BwZWRPbixcbiAgICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5Ecm9wLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHJlZnJlc2hIZWFkZXIoKTogdm9pZCB7XG4gICAgdGhpcy5jb2x1bW5IZWFkZXJzID0gdGhpcy51dGlscy5nZXRXZWVrVmlld0hlYWRlcih7XG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcbiAgICAgIHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnRzT24sXG4gICAgICBleGNsdWRlZDogdGhpcy5leGNsdWRlRGF5cyxcbiAgICAgIHdlZWtlbmREYXlzOiB0aGlzLndlZWtlbmREYXlzLFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZnJlc2hCb2R5KCk6IHZvaWQge1xuICAgIHRoaXMudmlldyA9IHRoaXMudXRpbHMuZ2V0TW9udGhWaWV3KHtcbiAgICAgIGV2ZW50czogdGhpcy5ldmVudHMsXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcbiAgICAgIHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnRzT24sXG4gICAgICBleGNsdWRlZDogdGhpcy5leGNsdWRlRGF5cyxcbiAgICAgIHdlZWtlbmREYXlzOiB0aGlzLndlZWtlbmREYXlzLFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNoZWNrQWN0aXZlRGF5SXNPcGVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdGl2ZURheUlzT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgYWN0aXZlRGF5ID0gdGhpcy5hY3RpdmVEYXkgfHwgdGhpcy52aWV3RGF0ZTtcbiAgICAgIHRoaXMub3BlbkRheSA9IHRoaXMudmlldy5kYXlzLmZpbmQoKGRheSkgPT5cbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5pc1NhbWVEYXkoZGF5LmRhdGUsIGFjdGl2ZURheSlcbiAgICAgICk7XG4gICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy52aWV3LmRheXMuaW5kZXhPZih0aGlzLm9wZW5EYXkpO1xuICAgICAgdGhpcy5vcGVuUm93SW5kZXggPVxuICAgICAgICBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy52aWV3LnRvdGFsRGF5c1Zpc2libGVJbldlZWspICpcbiAgICAgICAgdGhpcy52aWV3LnRvdGFsRGF5c1Zpc2libGVJbldlZWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlblJvd0luZGV4ID0gbnVsbDtcbiAgICAgIHRoaXMub3BlbkRheSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHJlZnJlc2hBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XG4gICAgdGhpcy5yZWZyZXNoQm9keSgpO1xuICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcbiAgICB0aGlzLmNoZWNrQWN0aXZlRGF5SXNPcGVuKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29sdW1uSGVhZGVycyAmJiB0aGlzLnZpZXcpIHtcbiAgICAgIHRoaXMuYmVmb3JlVmlld1JlbmRlci5lbWl0KHtcbiAgICAgICAgaGVhZGVyOiB0aGlzLmNvbHVtbkhlYWRlcnMsXG4gICAgICAgIGJvZHk6IHRoaXMudmlldy5kYXlzLFxuICAgICAgICBwZXJpb2Q6IHRoaXMudmlldy5wZXJpb2QsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==