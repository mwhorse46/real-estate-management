import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from './shared/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public appPages = [
    { title: 'Map', url: '/map', icon: 'map' },
    { title: 'Properties', url: '/properties', icon: 'home' },
    { title: 'Enquiries', url: '/enquiries', icon: 'reader' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Settings', url: '/settings', icon: 'cog' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private platform: Platform, private storage: StorageService) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.storage.init();
    const isDark = await this.storage.get('isDark');
    if (isDark) {
      document.body.classList.add('dark');
    }
  }
}
