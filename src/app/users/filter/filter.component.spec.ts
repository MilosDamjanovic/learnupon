import { ButtonService } from './../../shared/button/button.service';
import { DialogService } from './../../shared/dialog/dialog.service';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { ButtonModule } from 'src/app/shared/button/button.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatCheckboxModule, ButtonModule],
      declarations: [FilterComponent],
      providers: [
        ButtonService,
        {
          provide: DialogService,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
