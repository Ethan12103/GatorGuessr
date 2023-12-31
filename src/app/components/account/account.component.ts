import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { IssueService } from "src/app/services/issue.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent {
  currentPassword: string;
  newPassword: string;
  newUsername: string;
  public showPassword: boolean = false;
  public showSubmit: boolean = false;
  public invalidUser: boolean = false;

  updateForm = new FormGroup({
    newUsername: new FormControl(""),
    newPassword: new FormControl(""),
  });
  usernameRequirements = new FormControl("", [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),
  ]);
  passwordRequirements = new FormControl("", [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(25),
    Validators.pattern(
      "^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$"
    ),
  ]);
  constructor(
    private IssueService: IssueService,
    private dialogRef: MatDialogRef<AccountComponent>
  ) {}
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  updateUser(newUsername: string, newPassword: string) {
    this.IssueService.updateUser(newUsername, newPassword).subscribe((res) => {
      console.log(res);
    });
    this.closeDialog();
  }
  verifySubmit(): boolean {
    if (this.usernameRequirements.valid && this.passwordRequirements.valid) {
      return false; //means it will display
    } else return true;
  }
  public showUserError(): boolean {
    return this.invalidUser;
  }
}
