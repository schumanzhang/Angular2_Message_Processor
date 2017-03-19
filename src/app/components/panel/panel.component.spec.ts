import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PanelComponent } from './panel.component';
import { SelectModule } from 'ng-select';
import { MyDatePickerModule } from 'mydatepicker';
import { HttpModule } from '@angular/http';

import { ProcessorService } from './../../services/processor.service';
import { Message } from '../../datamodel/message';

describe('PanelComponent:', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [
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

    
    it('receives a panelObject and panelType from the parent component', () => {
        const fixture = TestBed.createComponent(PanelComponent);
        const app = fixture.debugElement.componentInstance;
        let panelObject = new Message('Message1', 'birthday message');
        let panelType = 'Birthday Wish';

        app.panelObject = panelObject;
        app.panelType = panelType;
        fixture.detectChanges(); 
        expect(app.panelObject).toBe(panelObject);
        expect(app.panelType).toEqual('Birthday Wish');
    });

    it('initialize the panel correctly if the panelType is Birthday Wish', () => {
        const fixture = TestBed.createComponent(PanelComponent);
        const app = fixture.debugElement.componentInstance;
        let panelType = 'Birthday Wish';
        let panelObject = new Message('Message1', 'birthday message');
        app.panelObject = panelObject;
        app.panelType = panelType;

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(app.giftList.length).toEqual(8);
            expect(app.specialsList.length).toEqual(2);
        });
    });

    it('initialize the panel correctly if the panelType is congrats message', () => {
        const fixture = TestBed.createComponent(PanelComponent);
        const app = fixture.debugElement.componentInstance;
        let panelType = 'Congrats Message';
        let panelObject = new Message('Message1', 'birthday message');
        app.panelObject = panelObject;
        app.panelType = panelType;

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(app.babyNames.length).toEqual(8);
        });
    });

    it('prepares the full gift list array', () => {
        const fixture = TestBed.createComponent(PanelComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            app.prepareGiftList();
            expect(app.fullGiftList.length).toEqual(10);
        });
    });

});