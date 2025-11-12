import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiRoutingModule } from './ai-routing.module';
import { AiHomeComponent } from './pages/ai-home/ai-home.component'
import { AiForDebuggingComponent } from './pages/ai-for-debugging/ai-for-debugging.component';
import { AiForDocumentationComponent } from './pages/ai-for-documentation/ai-for-documentation.component';
import { AiInWorkflowOptimizationComponent } from './pages/ai-in-workflow-optimization/ai-in-workflow-optimization.component';
import { AiCodeGenerationComponent } from './pages/ai-code-generation/ai-code-generation.component';
import { Demo1InteractiveAssistantComponent } from './pages/ai-for-debugging/demos/demo1-interactive-assistant.component';
import { Demo2RealLifeVersionComponent } from './pages/ai-for-debugging/demos/demo2-real-life-version.component';
import { Demo3SelfDebuggingAutomationComponent } from './pages/ai-for-debugging/demos/demo3-self-debugging-automation/demo3-self-debugging-automation.component';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    AiHomeComponent,
    AiForDebuggingComponent,
    AiForDocumentationComponent,
    AiInWorkflowOptimizationComponent,
    AiCodeGenerationComponent,
    Demo1InteractiveAssistantComponent,
    Demo2RealLifeVersionComponent,
    Demo3SelfDebuggingAutomationComponent
  ],
  imports: [
    CommonModule,
    AiRoutingModule,
    FormsModule 
   ]
})
export class AiModule { }
