import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
    <footer class="bottom">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="copyright">
                        <p>©<span>2019</span> <a href="#" class="transition"> Region 20 code challenge </a> All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  `,
    styles: [``],
})
export class FooterComponent { }
