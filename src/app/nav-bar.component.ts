import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
	menus: any;
	isCollapsed = false;

	constructor(
		private router: Router
	) {}

	ngOnInit() {
		this.menus = [
			{
				'Title': 'Home',
				'Location': '/',
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
				'Title': 'New & Media',
				'Location': '/news',
				'IsActive': false
			},
			{
				'Title': 'Ticket Status',
				'Location': '/tickets',
				'IsActive': false
			},
			{
				'Title': 'Server Monitoring',
				'Location': '/server',
				'IsActive': false
			},
			{
				'Title': 'FAQs',
				'Location': '/faqs',
				'IsActive': false
			},
			{
				'Title': 'Contact Us',
				'Location': '/contact-us',
				'IsActive': false
			}
		];
	}

	redirectToHome() {
		this.router.navigateByUrl('');
	}

	navigate(menuTitle: string) {
		let menu = this.menus.find(menu => menu.Title === menuTitle);
		menu.IsActive = true;
		this.router.navigateByUrl(menu.Location);
	}
}
