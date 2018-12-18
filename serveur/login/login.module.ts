import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUserComponent } from './login-user/login-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [LoginUserComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        LoginUserComponent
    ]
})
export class LoginModule { }
