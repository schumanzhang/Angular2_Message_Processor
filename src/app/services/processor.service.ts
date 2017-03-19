import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Message } from '../datamodel/message';
import { BirthdayMessage } from '../datamodel/birthdaymessage';
import { BirthMessage } from '../datamodel/birthmessage';
import { Gift } from '../datamodel/gift';

@Injectable()
export class ProcessorService {

    constructor(private http: Http) {

    }

    getGiftsCatalogue() {
        return this.http.get('assets/gifts.json')
            .map(res => res.json());
    }

    getSpecialGifts() {
        //hit endpoint /api.specials
        return this.http.get('assets/specials.json')
            .map(res => res.json());
    }

    getChildNameList() {
         return this.http.get('assets/babynames.json')
            .map(res => res.json());
    }

    /* return todoList, processedList and displayList */
    createInitialMessageList() {
       let totalList: Message[] = [];
       let todoList: Message[] = [];
       let processedList: Message[] = [];
       let displayList: Message[] = [];

       for (let i = 0; i < 11; i++) {
           if (i % 2 === 0) {
               let message = new BirthdayMessage('Birthday Wish', 'This is a happy birthday wish message with id: ' + (i + 1).toString());
               totalList.push(message);
           } else {
               let message = new BirthMessage('Congrats on the birth of your child', 'This is a message of congratulations with id: ' + (i + 1).toString());
               totalList.push(message);
           }
       }

       todoList = totalList.slice(0, 7);
       processedList = totalList.slice(7, 10);
       displayList = totalList.slice(0, 5);

       return [todoList, processedList, displayList];
    }

    returnRemainingArray(a, b) {
        return a.filter(function(i) {
            if (b.indexOf(i) < 0) {
                return true;
            } else {
                return false;
            }
        });
    }

}