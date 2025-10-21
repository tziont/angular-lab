import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiRoutingModule } from './ai-routing.module';
import { AiHomeComponent } from './pages/ai-home/ai-home.component'
import { AiForDebuggingComponent } from './pages/ai-for-debugging/ai-for-debugging.component';
import { AiForDocumentationComponent } from './pages/ai-for-documentation/ai-for-documentation.component';
import { AiInWorkflowOptimizationComponent } from './pages/ai-in-workflow-optimization/ai-in-workflow-optimization.component';
import { AiCodeGenerationComponent } from './pages/ai-code-generation/ai-code-generation.component';



@NgModule({
  declarations: [
    AiHomeComponent,
    AiForDebuggingComponent,
    AiForDocumentationComponent,
    AiInWorkflowOptimizationComponent,
    AiCodeGenerationComponent
  ],
  imports: [
    CommonModule,
    AiRoutingModule
  ]
})
export class AiModule { }
