import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavProfileComponent } from '../../components/nav-profile/nav-profile.component';

@Component({
  selector: 'app-freind',
  standalone: true,
  imports: [HeaderComponent, NavProfileComponent],
  templateUrl: './freind.component.html',
  styleUrl: './freind.component.scss'
})
export class FreindComponent {

}
