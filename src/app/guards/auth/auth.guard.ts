import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private Router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem("username") == null) {
      console.log("activate false");
      this.Router.navigate(["/home"]);
      return false;
    } else {
      console.log("activate true");
      return true;
    }
  }
}
