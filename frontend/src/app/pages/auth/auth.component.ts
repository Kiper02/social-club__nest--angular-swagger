import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  url: string = '';
  currentFormGroup: FormGroup = new FormGroup({});
  registrationForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.registrationForm = this.formBuilder.group({
      surname: new FormControl(''),
      name: new FormControl(''),
      patronymic: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
    this.loginForm = this.formBuilder.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.url = this.router.url.split('/').pop() || '';
    this.setFormGroup();
  }

  setFormGroup(): void {
    this.currentFormGroup = this.url === 'registration' ? this.registrationForm : this.loginForm;
  }

  login() {
    this.authService.login(this.currentFormGroup.value)
  }

  registration() {
    this.authService.registration(this.currentFormGroup.value)
  }
}
