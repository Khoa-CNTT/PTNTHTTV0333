import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private render: Renderer2
  ) { }

  ngOnInit(): void {
    // const script = this.render.createElement('script');
    // script.src = 'assets/js/slide.js';
    // this.render.appendChild(document.body, script);
  }

}
