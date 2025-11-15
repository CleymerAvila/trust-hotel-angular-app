import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [Header, Sidebar, Footer, RouterOutlet],
  templateUrl: './layout.html',
})
export class Layout {

}
