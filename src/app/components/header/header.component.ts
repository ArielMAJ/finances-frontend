import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FinancialTransactionService } from '../../services/financialTransaction.service';
import { UserService } from '../../services/user.service';
import { User } from '../../Models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentUser!: User;
  totalTransactionValue!: Number;

  constructor(
    private router: Router,

    private userService: UserService,
    private financialTransactionService: FinancialTransactionService
  ) {}

  ngOnInit(): void {
    this.currentUser = {
      id: 0,
      name: '',
      accountNumber: 0,
      email: '',
      createdAt: new Date(),
      age: 0,
    } as User;
    this.userService.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
    this.financialTransactionService
      .getTotalTransactionValue()
      .subscribe(
        (value) =>
          (this.totalTransactionValue = value)
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
