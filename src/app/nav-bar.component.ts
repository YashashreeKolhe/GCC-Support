import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/login/model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
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
    }
  ];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    if (this.currentUser.username === 'campus') {
      this.menus = this.selectiveMenu;
    } else if (this.currentUser.username === 'admin') {
      this.menus = this.selectiveMenu.concat([{
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
      }]);
    }
    this.selectedMenu = this.menus[0].Title;
  }

  redirectToHome() {
    this.router.navigateByUrl('');
  }

  navigate(menuTitle: string) {
    let menu = this.menus.find(menu => menu.Title === menuTitle);
    this.router.navigateByUrl(menu.Location);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
