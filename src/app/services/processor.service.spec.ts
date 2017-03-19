import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Response, ResponseOptions, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { ProcessorService } from './processor.service';
import { Message } from '../datamodel/message';
import { BirthdayMessage } from '../datamodel/birthdaymessage';
import { BirthMessage } from '../datamodel/birthmessage';
import { Gift } from '../datamodel/gift';


describe('ProcessorService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProcessorService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        },
      ],
    });
  });

  let response = ["hello", "world"];

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    const baseResponse = new Response(new ResponseOptions({ body: JSON.stringify(response) }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
  }));

  it('should return response when subscribed to getUsers', inject([ProcessorService], (processorService: ProcessorService) => {
    processorService.getGiftsCatalogue().subscribe(res => {
      expect(res).toContain('hello');
      expect(res).toContain('world');
    });
  }));

  it('should return response when subscribed to getUsers', inject([ProcessorService], (processorService: ProcessorService) => {
    processorService.getSpecialGifts().subscribe(res => {
      expect(res).toContain('hello');
      expect(res).toContain('world');
    });
  }));

  it('should return response when subscribed to getUsers', inject([ProcessorService], (processorService: ProcessorService) => {
    processorService.getChildNameList().subscribe(res => {
      expect(res).toContain('hello');
      expect(res).toContain('world');
    });
  }));

  it('should set up initial message arrays', inject([ProcessorService], (processorService: ProcessorService) => {
        let initialResult = processorService.createInitialMessageList();
        expect(initialResult.length).toEqual(3);
        expect(initialResult[0].length).toEqual(7);
        expect(initialResult[1].length).toEqual(3);
        expect(initialResult[2].length).toEqual(5);
  }));

  it('should return unmatched elements of the longer array', inject([ProcessorService], (processorService: ProcessorService) => {
      let b = ['a', 'b', 'c'];
      let a = ['a', 'b', 'c', 'd', 'e'];
      let arrayResult = processorService.returnRemainingArray(a, b);
      expect(arrayResult).toEqual(['d', 'e']);
  }));

});