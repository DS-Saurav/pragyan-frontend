import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { SchoolContentService } from '../core/services/school-content.service';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-school-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './school-layout.component.html',
})
export class SchoolLayoutComponent {
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly content = inject(SchoolContentService);
  private readonly mainContentRef = viewChild<ElementRef<HTMLElement>>('mainContent');

  private previousPath = '';

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map((event) => event.urlAfterRedirects.split('?')[0].split('#')[0]),
        switchMap((pathname) => {
          if (this.previousPath && this.previousPath !== pathname) {
            this.mainContentRef()?.nativeElement.focus({ preventScroll: true });
          }
          this.previousPath = pathname;
          return this.content.getPageTitle$(pathname);
        }),
        takeUntilDestroyed(),
      )
      .subscribe((title) => {
        this.titleService.setTitle(title);
      });
  }
}
