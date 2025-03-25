import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../auth/authRoles/roles.auth';
import { AuthGuard } from '../auth/authGuard/auth.guard';
import { RoleGuard } from '../auth/authGuard/role.guard';



describe('usersService', () => {
  let userService: UserService;
  let mockUser: Partial<Users> = {
    name: 'John Doe',
    email: 'bXJk6@example.com',
    password: 'Example123!',
    phone: 123456789,
    address: '123 Main St',
    country: 'USA',
    city: 'New York'
  }
  let mockUsersDb = [
    {
      id: "123e4567-e89b-12d3-a456-426655440000",
      name: 'John Doe',
      email: 'bXJk6@example.com',
      password: 'Example123!',
      phone: 123456789,
      address: '123 Main St',
      country: 'USA',
      city: 'New York',
      role: Role.Admin,
      orders: []
    }
  ]
  beforeEach(async () => {
    const mockUserRepository: Partial<UsersRepository> = {
      getUsers: () => Promise.resolve(undefined),
      createUser: (user): Promise<Users> => Promise.resolve({
        ...user,
        id: "123e4567-e89b-12d3-a456-426655440000",
        role: Role.Admin
      }),
      getUserByEmail: (email: string): Promise<Users> => {
        const user = mockUsersDb.find((user) => user.email === email);
        return Promise.resolve(user);
      },
      deleteUser: (id: string): Promise<Users | null> => {
        const index = mockUsersDb.findIndex((user) => user.id === id);

        if (index === -1) {
          return Promise.resolve(null);
        }

        const [deletedUser] = mockUsersDb.splice(index, 1);
        return Promise.resolve(deletedUser);
      },

    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        JwtService,
        {
          provide: UsersRepository,
          useValue: mockUserRepository
        }
      ]
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', async () => {
    expect(userService).toBeDefined();
  });

  it('"createUser" should create an users', async () => {
    const users = await userService.CreateUser(mockUser);
    expect(users).toBeDefined();
    expect(users.name).toBeTruthy();
  });

  it('"getUserByEmail" should get a user whit email and should return undefined if email is incorrect', async () => {
    const CorrectEmail = await userService.getUserByEmail("bXJk6@example.com");
    const IncorrectEmail = await userService.getUserByEmail("wrong@example.com");
    expect(CorrectEmail).toBeTruthy();
    expect(CorrectEmail.email).toBe("bXJk6@example.com");
    expect(IncorrectEmail).toBeFalsy();
  });
  it('"deleteUser" should delete a user whit id and should return null if id is incorrect', async () => {
    const CorrectId = await userService.deleteUser("123e4567-e89b-12d3-a456-426655440000");
    const IncorrectId = await userService.deleteUser("wrong-id");
    expect(CorrectId).toBeInstanceOf(Object);
    expect(IncorrectId).toBeNull();
  });

});
