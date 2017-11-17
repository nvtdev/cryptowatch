import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { HttpClient } from "@angular/common/http";
import { log } from "util";
// import { Moment } from "moment";
// import { RelativeDate } from "relative-date";
// import { MomentModule } from 'angular2-moment';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  coins: Object;
  originalCoins: Object;
  sortKey: "";
  news: Object;
  currentCoin: Object;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCoins(null);
    // this.getReddit(null);
  }

  getCoins(params): void {
    this.http
      .get("https://api.coinmarketcap.com/v1/ticker/?limit=1000")
      .subscribe(data => {
        this.originalCoins = data;
        this.coins = data;
        console.log(this.coins);
        console.log(this.coins.sort(this.sortCoins));
      });
  }

  sortCoins(coin1, coin2) {
    // switch (this.sortKey) {
    //   case: ''
    // }
    if (
      parseFloat(coin1.percent_change_1h) < parseFloat(coin2.percent_change_1h)
    )
      return 1;
    if (
      parseFloat(coin1.percent_change_1h) > parseFloat(coin2.percent_change_1h)
    )
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

  updateContent(coin): void {
    this.currentCoin = coin;
    this.getNews(coin.name);
  }

  getNews(coinName): void {
    this.http
      .get(
        "https://newsapi.org/v2/everything?language=en&q=" +
          coinName +
          "&sortBy=publishedAt&apiKey=3ec940fd3870472ab3728801d7cb1fde"
      )
      .subscribe(data => {
        if (data.articles) {
          this.news = data.articles;
          console.log(this.news);
        }
      });
  }

  updateSearch(query) {
    let updatedCoins = [];
    // this.stories = this.originalStories;

    var query = query.toLowerCase();

    if (query.length == 0) this.coins = this.originalCoins;
    if (query.length < 3) return;

    for (let coin of this.coins) {
      if (
        coin["name"].toLowerCase().indexOf(query) > -1 ||
        coin["symbol"].toLowerCase().indexOf(query) > -1
      )
        updatedCoins.push(coin);
    }

    this.coins = updatedCoins;
  }
}
