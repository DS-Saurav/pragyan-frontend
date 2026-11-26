import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import type { AdminUser } from '../models/admin.models';

const USER_STORAGE_KEY = 'pragyan_admin_session';
const TOKEN_STORAGE_KEY = 'pragyan_admin_token';

interface LoginResponse {
  token: string;
  user: AdminUser;
}

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly http = inject(HttpClient);
  private readonly userSignal = signal<AdminUser | null>(this.readStoredUser());
  private readonly tokenSignal = signal<string | null>(this.readStoredToken());

  readonly currentUser = this.userSignal.asReadonly();
  readonly token = this.tokenSignal.asReadonly();
  readonly isAuthenticated = computed(
    () => this.userSignal() !== null && this.tokenSignal() !== null,
  );

  login$(email: string, password: string, remember: boolean): Observable<AdminUser> {
    return this.http.post<LoginResponse>('/api/login', { email: email.trim(), password }).pipe(
      tap((res) => {
        this.userSignal.set(res.user);
        this.tokenSignal.set(res.token);
        this.persistSession(res.user, res.token, remember);
      }),
      map((res) => res.user),
    );
  }

  refreshMe$(): Observable<AdminUser> {
    return this.http.get<{ user: AdminUser }>('/api/me').pipe(
      tap((res) => this.userSignal.set(res.user)),
      map((res) => res.user),
    );
  }

  logout(): void {
    if (this.tokenSignal()) {
      this.http.post('/api/logout', {}).subscribe({ error: () => undefined });
    }
    this.clearSession();
  }

  clearSession(): void {
    this.userSignal.set(null);
    this.tokenSignal.set(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(USER_STORAGE_KEY);
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }

  private persistSession(user: AdminUser, token: string, remember: boolean): void {
    const primary = remember
      ? typeof localStorage !== 'undefined'
        ? localStorage
        : null
      : typeof sessionStorage !== 'undefined'
        ? sessionStorage
        : null;
    const secondary = remember
      ? typeof sessionStorage !== 'undefined'
        ? sessionStorage
        : null
      : typeof localStorage !== 'undefined'
        ? localStorage
        : null;

    secondary?.removeItem(USER_STORAGE_KEY);
    secondary?.removeItem(TOKEN_STORAGE_KEY);

    primary?.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    primary?.setItem(TOKEN_STORAGE_KEY, token);
  }

  private readStoredUser(): AdminUser | null {
    const raw =
      (typeof localStorage !== 'undefined' ? localStorage.getItem(USER_STORAGE_KEY) : null) ??
      (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(USER_STORAGE_KEY) : null);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AdminUser;
    } catch {
      return null;
    }
  }

  private readStoredToken(): string | null {
    return (
      (typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_STORAGE_KEY) : null) ??
      (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(TOKEN_STORAGE_KEY) : null)
    );
  }
}
