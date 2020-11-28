import { MatMenuModule } from '@angular/material/menu';
import { PaginatorComponent } from './paginator/paginator.component';
import { FilterComponent } from './filter/filter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user/user.component';
import { By } from '@angular/platform-browser';
import { UsersComponent } from './users.component';
import { HttpService } from 'src/services/http.service';
import { DialogService } from '../shared/dialog/dialog.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from '../shared/button/button.module';
import { DialogModule } from '../shared/dialog/dialog.module';
import { mockUsers } from 'src/services/http.service.spec';
import { of } from 'rxjs';

describe('UsersComponent', () => {
  let fixture: ComponentFixture<UsersComponent>;
  let mockHttpService: any;

  beforeEach(async () => {
    mockHttpService = jasmine.createSpyObj(['get']);

    await TestBed.configureTestingModule({
      declarations: [UsersComponent, UserComponent, FilterComponent, PaginatorComponent],
      imports: [HttpClientTestingModule, DialogModule, MatMenuModule, MatCheckboxModule, ButtonModule],
      providers: [
        { provide: HttpService, useValue: mockHttpService },
        DialogService,
      ],
    });
    fixture = TestBed.createComponent(UsersComponent);
  });

  describe(':', () => {

    it('should render each user as a UserComponent', () => {
      mockHttpService.get.and.returnValue(of(mockUsers));

      // run ngOnInit
      fixture.detectChanges();

      const userComponentDEs = fixture.debugElement.queryAll(By.directive(UserComponent));
      expect(userComponentDEs.length).toEqual(2);
      for (let i = 0; i < userComponentDEs.length; i++) {
        expect(userComponentDEs[i].componentInstance.user).toEqual(mockUsers.user[i]);
      }
    });
  });

});
