import { Component, OnInit, DoCheck } from '@angular/core';
import { ProcessorService } from '../../services/processor.service';
import { Message } from '../../datamodel/message';
import { Gift } from '../../datamodel/gift';

@Component({
    selector: 'processor',
    templateUrl: './processor.component.html',
    styleUrls: ['./processor.component.css'],
    providers: [ProcessorService]
})
export class ProcessorComponent {

    todoList: Message[];
    processedList: Message[];
    displayList: Message[];

    currentItem: number;
    currentMsgType: boolean;
    processingMsg: boolean;

    finishedProcessing: boolean = false;

    constructor(private processorService: ProcessorService) {

    }

    ngOnInit() {
        let initialList = this.processorService.createInitialMessageList();
        this.todoList = initialList[0];
        this.processedList = initialList[1];
        this.displayList = initialList[2];
        this.processingMsg = false;
    }

    ngDoCheck() {
        if (this.displayList.length === 0) {
            this.finishedProcessing = true;
        }
    }

    showDetails(itemIndex): void {
        this.processingMsg = false;
        this.currentItem = itemIndex;
        this.currentMsgType = this.displayList[itemIndex]._messageType === 'Birthday Wish' ? true: false;
    }

    finishMessage(event): void {
        this.processingMsg = true;
        let completedMessage = JSON.parse(JSON.stringify(this.displayList[this.currentItem]));
        this.processedList.push(completedMessage);
       
        this.todoList.splice(this.todoList.findIndex((object) => {
            return object._name === completedMessage._name;
        }), 1);
        this.displayList.splice(this.currentItem, 1);

        if (this.processorService.returnRemainingArray(this.todoList, this.displayList).length > 0) {
            this.displayList.push(this.processorService.returnRemainingArray(this.todoList, this.displayList)[0]);
        }
    }
    
}