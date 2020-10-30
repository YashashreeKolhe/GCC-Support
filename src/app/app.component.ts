import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/login/model';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menus: any;
  isCollapsed = false;
  selectedMenu: string;
  currentUser: User;
  selectiveMenu = [
    {
      'Title': 'Home',
      'Location': '/home',
      'IsActive': true
    },
    {
      'Title': 'Live Score',
      'Location': '/score',
      'IsActive': false
    },
    {
      'Title': 'Analytics',
      'Location': '/analytics',
      'IsActive': false
    },
    {
      'Title': 'Participants',
      'Location': '/participants',
      'IsActive': false
    },

    {
      'Title': 'Contact Us',
      'Location': '/contact',
      'IsActive': false
    },
    {
      'Title': 'News & Media',
      'Location': '/news',
      'IsActive': false
    },
    {
      'Title': 'Alerts & University',
      'Location': '/alerts',
      'IsActive': false
    },
    {
      'Title': 'Ticket Status',
      'Location': '/tickets',
      'IsActive': false
    },
    // {
    // 	'Title': 'Server and Log Monitoring',
    // 	'Location': '/server',
    // 	'IsActive': false
    // },
    {
      'Title': 'FAQs',
      'Location': '/faqs',
      'IsActive': false
    }
  ];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.menus = this.selectiveMenu;
    this.selectedMenu = this.menus[0].Title;
  }

  redirectToHome() {
    this.router.navigateByUrl('');
  }

  navigate(menuTitle: string) {
    let menu = this.menus.find(menu => menu.Title === menuTitle);
    this.router.navigateByUrl(menu.Location);
  }

  shouldBeVisible(menu:string) {
    if (this.currentUser.role === 'cs-internal') {
      if ((menu === 'Home' || menu === 'Live Score' 
      || menu === 'Analytics' || menu === 'Participants' || menu === 'Contact Us')) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
