import { Injectable, signal } from '@angular/core';
import { timer } from 'rxjs';
import type { FlashMessage } from '../models/admin.models';

@Injectable({ providedIn: 'root' })
export class AdminFlashService {
  private nextId = 0;
  private readonly messagesSignal = signal<FlashMessage[]>([]);

  readonly messages = this.messagesSignal.asReadonly();

  show(type: FlashMessage['type'], text: string, autoDismissMs = 4500): void {
    const id = ++this.nextId;
    this.messagesSignal.update((list) => [...list, { id, type, text }]);

    if (autoDismissMs > 0) {
      timer(autoDismissMs).subscribe(() => this.dismiss(id));
    }
  }

  success(text: string): void {
    this.show('success', text);
  }

  error(text: string): void {
    this.show('error', text);
  }

  info(text: string): void {
    this.show('info', text);
  }

  dismiss(id: number): void {
    this.messagesSignal.update((list) => list.filter((item) => item.id !== id));
  }

  clear(): void {
    this.messagesSignal.set([]);
  }
}
