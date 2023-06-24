import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface ButtonOptions {
  title: string;
  route: string;
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() options!: ButtonOptions;

  constructor(private router: Router) { }

  handleClick() {
    this.router.navigateByUrl(this.options.route);
  }
}
