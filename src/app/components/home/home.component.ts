import { Component, OnInit } from "@angular/core";
import { IssueService } from "src/app/services/issue.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  constructor(private IssueService: IssueService) {}
  theme = localStorage.getItem("selectedValue") || "lightMode";
  displayedColumns: string[] = ["name", "score"];
  leaderboardArray: any;
  ngOnInit() {
    this.IssueService.getLeaderboard().subscribe((data) => {
      this.leaderboardArray = data;
    });
  }
}
