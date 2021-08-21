import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';
export interface AnimationOptions {
  name: string;
  time: number
}
export const bezierCurve = time => `${time}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;

export const tooltipAnimationFactory = (
  options: AnimationOptions,
): AnimationTriggerMetadata => {

  const { name, time } = options;

  const initial = { transform: 'translateY(30px)', opacity: 0.8 };
  const final = { transform: 'translateY(0)', opacity: 1 };

  return trigger(name, [
    transition(':enter', [
      style(initial),
      animate(bezierCurve(time), style(final))
    ]),
    transition(':leave', [
      style(final),
      animate(bezierCurve(time), style(initial))
    ])
  ]);
};

export const tooltipImageAnimationFactory = (
  options: AnimationOptions,
): AnimationTriggerMetadata => {
  const { name, time } = options;

  const initial = { transform: 'scale(0.6)', opacity: 0.8 };
  const final = { transform: 'scale(1)', opacity: 1 };

  return trigger(name, [
    transition(':enter', [
      style(initial),
      animate(bezierCurve(time), style(final))
    ]),
  ]);
};

export const tooltipTextAnimationFactory = (
  options: AnimationOptions,
): AnimationTriggerMetadata => {
  const { name, time } = options;

  const initial = { transform: 'translateX(30px)', opacity: 0.8 };
  const final = { transform: 'translateX(0)', opacity: 1 };

  return trigger(name, [
    transition(':enter', [
      style(initial),
      animate(bezierCurve(time), style(final))
    ]),
  ]);
};
