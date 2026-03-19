import { Component } from '@angular/core';

@Component({
  selector: 'app-feature-flaged-demo',
  standalone: false,
  templateUrl: './feature-flaged-demo.component.html',
  styleUrl: './feature-flaged-demo.component.scss'
})
export class FeatureFlagedDemoComponent {
title = 'Feature Flags: Dynamic Feature Control';
  description = `
Feature Flags are a technique that allows teams to enable or disable features dynamically without redeploying code.

They are useful for:
- Gradual rollouts: release features to a subset of users first
- A/B testing: experiment with different experiences
- Emergency rollback: disable a feature instantly if issues occur
- Role-based access: control which roles can access features in production

In this demo, we show how a feature can be toggled on/off, and how the app reacts when a feature is disabled for your role. This separation of feature availability from user authentication allows safer, more flexible deployments.
`;
}
