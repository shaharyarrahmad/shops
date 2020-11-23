import {Component, ElementRef, OnInit} from '@angular/core';
import {Globals} from './constants';
import {Router, RoutesRecognized} from '@angular/router';

/**
 * Jquery var
 */
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  static channelId: string;
  title = 'storefront';

  constructor(el: ElementRef, private router: Router) {
    Globals.channelId = el.nativeElement.getAttribute('channelId');
  }

  ngOnInit(): void {
    // Init Zurb Foundation
    $(document).foundation();
  }
}
