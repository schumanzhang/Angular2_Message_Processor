import { TestBed, async } from '@angular/core/testing';

import { ProcessorComponent } from './processor.component';
import { PanelComponent } from './../panel/panel.component';
import { SelectModule } from 'ng-select';
import { MyDatePickerModule } from 'mydatepicker';
import { HttpModule } from '@angular/http';

import { ProcessorService } from './../../services/processor.service';

describe('ProcessorComponent:', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [
            ProcessorComponent,
            PanelComponent
        ],
        providers: [ ProcessorService ],
        imports: [
            SelectModule,
            MyDatePickerModule,
            HttpModule
        ]
        }).compileComponents();
    }));

    it('finishedProcessing should init to false', () => {
        const fixture = TestBed.createComponent(ProcessorComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.finishedProcessing).toBe(false);
    });

    it('should set up initial todoList, processedList and displayList', ()=> {
        const fixture = TestBed.createComponent(ProcessorComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(app.displayList.length).toEqual(5);
            expect(app.processedList.length).toEqual(3);
            expect(app.todoList.length).toEqual(7);
        });
    });

    it('should respond correctly when method showDetails is fired', ()=> {
        const fixture = TestBed.createComponent(ProcessorComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            let itemIndex = 1;
            app.showDetails(itemIndex);
            expect(app.processingMsg).toBe(false);
            expect(app.currentMsgType).toBe(false);
            expect(app.currentItem).toBe(1);
        });
    });

    it('should process the sending of messages correctly', ()=> {
        const fixture = TestBed.createComponent(ProcessorComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            app.finishMessage();
            expect(app.processingMsg).toBe(true);
            expect(app.displayList.length).toEqual(5);
            expect(app.processedList.length).toEqual(4);
            expect(app.todoList.length).toEqual(6);
        });
    });

    it('should show completed message when all messages are processed', ()=> {
        const fixture = TestBed.createComponent(ProcessorComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            app.displayList.splice(0, app.displayList.length);
            app.ngDoCheck();
            expect(app.finishedProcessing).toBe(true);
        });
    });

    it('should render page elements correctly', () => {
        const fixture = TestBed.createComponent(ProcessorComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('h4').textContent).toContain('This is a happy birthday wish message with id: 1');
        });
    });
});