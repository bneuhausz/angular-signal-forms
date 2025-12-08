import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  template: `
    <article style="margin-left: 20px">
      <h1>Angular Signal Forms</h1>
      <p><b>This repo has been upgraded to the released version of Angular 21.</b></p>
      <a href="https://github.com/bneuhausz/angular-signal-forms" target="_blank">GitHub repo</a>
      <p>This is a demo app demonstrating what we've talked about in theese articles:</p>
      <ul style="list-style: none;">
        <li><a href="https://bneuhausz.dev/blog/angular-signal-forms-are-out" target="_blank">Angular signal forms are out! (Experimentally)</a></li>
        <li><a href="https://bneuhausz.dev/blog/angular-signal-forms-applying-server-errors" target="_blank">Angular signal forms - Server side error handling</a></li>
        <li><a href="https://bneuhausz.dev/blog/angular-signal-forms-advanced" target="_blank">Angular signal forms - Advanced features</a></li>
      </ul>
    </article>
  `,
})
export default class Home { }