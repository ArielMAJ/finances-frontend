import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Models/User';
import { FinancialTransactionService } from '../../services/financialTransaction.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentUser: User = {
    id: 0,
    name: '',
    accountNumber: 0,
    email: '',
    createdAt: new Date(),
    age: 0,
  };
  totalTransactionValue: Number = 0;

  constructor(
    private router: Router,

    private userService: UserService,
    private financialTransactionService: FinancialTransactionService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
    this.financialTransactionService
      .getTotalTransactionValue()
      .subscribe((value) => (this.totalTransactionValue = value));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
