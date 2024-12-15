import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeletionConfirmationModalComponent } from '../../components/deletion-confirmation-modal/deletion-confirmation-modal.component';
import { User } from '../../Models/User';
import { UserUpdateRequest } from '../../Models/UserUpdateRequest';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  updateUserForm!: FormGroup;
  currentUser!: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.updateUserForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirmation: new FormControl('', [Validators.required]),
        age: [
          '',
          [Validators.required, Validators.min(18), Validators.max(120)],
        ],
        accountNumber: ['', [Validators.required]],
      },
      { validators: this.checkPasswordsMatch }
    );
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getCurrentUser().subscribe(
      (user: User) => {
        this.updateUserForm.patchValue({
          name: user.name,
          email: user.email,
          age: user.age,
          accountNumber: user.accountNumber,
          password: '',
          passwordConfirmation: '',
        });
        this.currentUser = user;
      },
      (error) => {
        this.toastr.error('Erro ao carregar dados do usuário');
      }
    );
  }

  checkPasswordsMatch(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('passwordConfirmation')?.value;
    return pass === confirmPass ? null : { passwordsDoNotMatch: true };
  }

  deleteUser(): void {
    const dialogRef = this.dialog.open(DeletionConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.userService.deleteCurrentUser().subscribe(
        (response) => {
          if (response === null) {
            this.toastr.success('Usuário excluído com sucesso!');
            localStorage.setItem('token', '');
            this.router.navigate(['/login']);
            return;
          }
          this.toastr.error('Erro ao excluir o Usuário!');
        },
        (error) => {
          this.toastr.error('Erro ao excluir o Usuário!');
        }
      );
    });
  }
  updateUser(): void {
    if (!this.updateUserForm.valid) return;

    const updatedUserPayload: UserUpdateRequest = {
      name: this.updateUserForm.get('name')?.value,
      email: this.updateUserForm.get('email')?.value,
      age: this.updateUserForm.get('age')?.value,
      accountNumber: this.updateUserForm.get('accountNumber')?.value,
      password: this.updateUserForm.get('password')?.value,
    };

    this.userService.updateCurrentUser(updatedUserPayload).subscribe(
      () => {
        this.toastr.success('Usuário editado com sucesso!');
        if (this.currentUser.email != updatedUserPayload.email) {
          localStorage.setItem('token', '');
          this.router.navigate(['/login']);
          return;
        }
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Erro da API:');
        this.toastr.error(error.error.detail, 'Erro ao editar usuário.');
      }
    );
  }
}
