import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProcessorService } from '../../services/processor.service';
import { Gift } from '../../datamodel/gift';
import { Message } from '../../datamodel/message';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

@Component({
    selector: 'panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.css'],
    providers: [ProcessorService]
})
export class PanelComponent {

    @Input() panelType: string;
    @Input() panelObject: Message;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    giftList: Gift[];
    specialsList: Gift[];
    babyNames: Array<any>;
    fullGiftList: Gift[];
    giftNameArray: Array<any>;

    selectedDropdown: boolean;
    selectedGift: Gift[];
    selectedBabyName: string = '[babyname]';
    selectedFormattedDob: string = '[birthdate]';

    private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd.mm.yyyy',
        selectionTxtFontSize: '15px',
        height: '30px',
        showClearDateBtn: false,
        editableDateField: false
    };

    constructor(private processorService: ProcessorService) {
        this.selectedGift = [{title: '', description: '', imageURL: ''}];
    }   

    ngOnInit() {
        if (this.panelType === 'Birthday Wish') {
            this.processorService.getGiftsCatalogue().subscribe(gifts => {
                this.giftList = JSON.parse(JSON.stringify(gifts.gifts));
            });
            this.processorService.getSpecialGifts().subscribe(specials => {
                this.specialsList = JSON.parse(JSON.stringify(specials.gifts));
                this.prepareGiftList();
            });
        } else {
            this.processorService.getChildNameList().subscribe(childNames => {
                let names = JSON.parse(JSON.stringify(childNames.babynames));
                this.babyNames = names.map((value, index) => {
                    return {
                        value: value,
                        label: value
                    }
                });
            });
        }
    }

    prepareGiftList() {
        this.fullGiftList = this.giftList.concat(this.specialsList);
        this.giftNameArray = this.fullGiftList.map((value, index) => {
            return {
                value: value.title,
                label: value.title
            }
        }); 
    }

    onSelected(event): void {
        this.selectedDropdown = true;
        if (this.panelType === 'Birthday Wish') {
            this.selectedGift = this.fullGiftList.filter((value, index) => {
                return value.title === event.value;
            });
            this.panelObject.renderStandardMessage(this.selectedGift[0].title);
        } else {
            this.selectedBabyName = event.value;
            this.panelObject.renderBirthMessage(this.selectedBabyName, this.selectedFormattedDob);
        }
    }

    onDateChanged(event: IMyDateModel): void {
       this.selectedDropdown = true;
       this.selectedFormattedDob = event.formatted;
       this.panelObject.renderBirthMessage(this.selectedBabyName, this.selectedFormattedDob);
    }

    sendMessage() {
        this.notify.emit('send message');
    }
}