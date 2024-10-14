import { Component } from '@angular/core';
import { ErrorService } from 'src/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorMessage$ = this.errorService.errorMessage$;

  constructor(private errorService: ErrorService) {}

  dismiss() {
    this.errorService.clearError();
  }
}
