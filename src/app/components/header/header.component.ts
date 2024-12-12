import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FinancialTransactionService } from '../../services/financialTransaction.service';
import { UserService } from '../../services/user.service';
import { User } from '../../Models/User';
import { applyCurrencyMask } from '../../common/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentUser!: User;
  totalTransactionValue!: String;

  constructor(
    private router: Router,

    private userService: UserService,
    private financialTransactionService: FinancialTransactionService
  ) {}

  ngOnInit(): void {
    this.currentUser = {
      id: 0,
      name: 'placeholder',
      accountNumber: 0,
      email: 'placeholder',
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
          (this.totalTransactionValue = applyCurrencyMask(value.toString()))
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
