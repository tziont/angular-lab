import { TestBed } from '@angular/core/testing';

import { SettingTaskService } from './setting-task.service';

describe('SettingTaskService', () => {
  let service: SettingTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
