import { Component } from '@angular/core';
import { trigger,style, animate, transition} from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 })),
      ]),
    ])
  ]
})
export class HomeComponent {
  slides = [
    {
      image: './assets/discover.png',
      description: 'Discover a New Way to Manage Your Farm',
    },
    {
      image: './assets/operate.png',
      description: 'Effortlessly Streamline Farm Operations',
    },
    {
      image: './assets/team.png',
      description: 'Empower Your Team and Boost Productivity',
    },
    {
      image: './assets/unlock.png',
      description: "Unlock Insights and Optimize Your Farm's Performance",
    },
  ];

  constructor() {}
  menu_icon_variable: boolean = false;
  menuVariable: boolean = false;
  ngOnInit(): void {}
  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }
}
