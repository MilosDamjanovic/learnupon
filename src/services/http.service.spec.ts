import { TestBed, } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';

export const mockUsers = {
  user: [
    {
      id: 1,
      first_name: 'Lili',
      last_name: 'Marlen',
      email: 'angular1@luptest.com',
      number_of_enrollments_accessed: 5,
      number_of_enrollments: 7,
      sign_in_count: 77,
      isSelected: false
    },
    {
      id: 2,
      first_name: 'John2',
      last_name: 'Doe2',
      email: 'angular2@luptest.com',
      number_of_enrollments_accessed: 5,
      number_of_enrollments: 7,
      sign_in_count: 8,
      isSelected: false
    },
  ]
};


describe('Service: Http', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService],
      imports: [HttpClientTestingModule]
    });
  });
  describe(':', () => {

    function setup(): { httpService: HttpService, httpTestingController: HttpTestingController } {
      const httpService = TestBed.inject(HttpService);
      const httpTestingController = TestBed.inject(HttpTestingController);
      return { httpService, httpTestingController };
    }

    it('should call get users', () => {
      const { httpService, httpTestingController } = setup();
      httpService.get().subscribe(data => {
        expect(data.user).toEqual(mockUsers.user, 'should return the users');
      });

      const req = httpTestingController.expectOne('/api/v1/users');
      expect(req.request.method).toBe('GET');

      req.flush(mockUsers);
    }
    );


    it('should create a new user with a new id response from the server', () => {
      const { httpService, httpTestingController } = setup();
      const mockUser = {
        User: {
          first_name: 'Lili',
          username: 'test',
          password: 'password.123',
          last_name: 'Marlen',
          email: 'MILOS@luptest.com',
          language: 'en'
        }
      };
      httpService.post(mockUser).subscribe(data => {
        expect(data.id).toBeTruthy();
      });

      const req = httpTestingController.expectOne('/api/v1/users');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(mockUser);

      req.flush({ id: '654654' });
    }
    );

    afterEach(() => {
      const { httpTestingController } = setup();
      httpTestingController.verify();
    });
  });

});
