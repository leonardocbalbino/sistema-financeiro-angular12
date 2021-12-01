import { Component, OnInit } from '@angular/core';
import { UILibIconService } from '../../../shared/services/ui-lib-icon.service';

@Component({
  selector: 'app-uilib-icons',
  templateUrl: './uilib-icons.component.html',
  styleUrls: ['./uilib-icons.component.scss']
})
export class UILibIconsComponent implements OnInit {

  constructor(
    public iconService: UILibIconService
  ) { }

  ngOnInit(): void {
  }

}
