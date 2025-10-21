import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiHomeComponent } from './pages/ai-home/ai-home.component';
import { AiCodeGenerationComponent } from './pages/ai-code-generation/ai-code-generation.component';
import { AiForDebuggingComponent } from './pages/ai-for-debugging/ai-for-debugging.component';
import { AiForDocumentationComponent } from './pages/ai-for-documentation/ai-for-documentation.component';
import { AiInWorkflowOptimizationComponent } from './pages/ai-in-workflow-optimization/ai-in-workflow-optimization.component';

const routes: Routes = [
  {
    path: '',
    component: AiHomeComponent
  },
  {
    path: 'ai-assisted-code-generation',
    component: AiCodeGenerationComponent
  },
  {
    path: 'ai-for-debugging',
    component: AiForDebuggingComponent
  },
  {
    path: 'ai-for-documentation',
    component: AiForDocumentationComponent
  },
  {
    path: 'ai-in-workflow-optimizatin',
    component: AiInWorkflowOptimizationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AiRoutingModule { }
