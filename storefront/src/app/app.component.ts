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
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        console.log(data.url, Globals.channelId);
      }
    });
  }

  ngOnInit(): void {
    // Init Zurb Foundation
    $(document).foundation();
  }
}
