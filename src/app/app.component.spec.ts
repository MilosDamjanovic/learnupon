import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsersModule,
        HomeModule,
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
        SideNavComponent,
        ToolbarComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      return { fixture, app };
    }

    it('should create the app', waitForAsync(() => {
      const { app } = setup();
      expect(app).toBeTruthy();
    }));

    it(`should have as title 'LearnUpon'`, () => {
      const { app } = setup();
      expect(app.title).toEqual('LearnUpon');
    });
  });
});
