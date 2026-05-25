
import {
  Directive,
  input,
  computed,
  effect,
  ElementRef,
  Renderer2,
  inject,
  OnInit,
} from '@angular/core';
import { BADGE_CONFIG } from '@core/models/status-badge.model';
@Directive({
  selector: '[appStatusBadge]',
  standalone: true,
  host: {
    class: 'status-badge',
  },
})
export class StatusBadgeDirective implements OnInit {
  appStatusBadge = input.required<string>();
  iconOnly = input<boolean>(false);

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  private config = computed(() => {
    const key = this.appStatusBadge() as keyof typeof BADGE_CONFIG;
    return BADGE_CONFIG[key] ?? BADGE_CONFIG['Pendiente'];
  });

  constructor() {
    effect(() => {
      this.applyStyles();
      this.renderContent();
    });
  }

  ngOnInit(): void {
    this.applyBaseStyles();
  }

  private applyBaseStyles(): void {
    const el = this.el.nativeElement as HTMLElement;
    Object.assign(el.style, {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '5px 12px',
      borderRadius: '999px',
      border: '1.5px solid transparent',
      fontSize: '13px',
      fontWeight: '600',
      lineHeight: '1',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      transition: 'opacity 0.2s',
    });
  }

  private applyStyles(): void {
    const cfg = this.config();
    if (!cfg) return;
    const el = this.el.nativeElement as HTMLElement;
    Object.assign(el.style, {
      backgroundColor: cfg.bgColor,
      color: cfg.textColor,
      borderColor: cfg.borderColor,
    });
  }

  private renderContent(): void {
    const cfg = this.config();
    if (!cfg) return;
    const el = this.el.nativeElement as HTMLElement;

    el.innerHTML = '';

    const icon = this.renderer.createElement('i') as HTMLElement;
    this.renderer.addClass(icon, 'ti');
    this.renderer.addClass(icon, cfg.icon);
    icon.style.fontSize = '14px';
    icon.style.lineHeight = '1';
    icon.setAttribute('aria-hidden', 'true');
    this.renderer.appendChild(el, icon);

    if (!this.iconOnly()) {
      const span = this.renderer.createElement('span') as HTMLElement;
      this.renderer.setProperty(span, 'textContent', cfg.label);
      this.renderer.appendChild(el, span);
    }

    el.setAttribute('aria-label', `Estado: ${cfg.label}`);
  }
}
