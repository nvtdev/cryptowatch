import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { HttpClient } from "@angular/common/http";
import { log } from "util";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  coins: Object;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCoins(null);
    // this.getReddit(null);
  }

  getCoins(params): void {
    this.http
      .get("https://api.coinmarketcap.com/v1/ticker/?limit=1000")
      .subscribe(data => {
        this.coins = data;
        console.log(this.coins);
        console.log(this.coins.sort(this.sortCoins));
      });
  }

  sortCoins(coin1, coin2) {
    if (parseFloat(coin1.percent_change_1h) < parseFloat(coin2.percent_change_1h))
      return 1;
    if (parseFloat(coin1.percent_change_1h) > parseFloat(coin2.percent_change_1h))
      return -1;
    return 0;
  }

  sortTable() {
    console.log("test");
  }

  getReddit(params): void {
    this.http
      .get("http://www.reddit.com/search.json?q=bitcoin")
      .subscribe(data => {
        console.log(data);
      });
  }

  updateCoins(): void {
    this.getCoins(null);
    setTimeout(function() {
      this.updateCoins();
    }, 1000);
  }
}
