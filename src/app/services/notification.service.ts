import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _showLogoutToast = false;

  setShowLogoutToast(value: boolean) {
    this._showLogoutToast = value;
  }

  getShowLogoutToast(): boolean {
    return this._showLogoutToast;
  }
}