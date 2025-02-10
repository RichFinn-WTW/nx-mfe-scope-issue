import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-nx-welcome',
    imports: [CommonModule],
  template: `
    remote-one works!
  `,
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class NxWelcomeComponent {}
