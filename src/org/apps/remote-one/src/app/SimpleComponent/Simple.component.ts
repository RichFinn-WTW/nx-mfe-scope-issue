import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simple',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Simple.component.html',
  styleUrl: './Simple.component.css',
})
export class SimpleComponent {}
