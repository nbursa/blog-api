export class UserServiceMock {
  findOne(query: any): any {
    return null;
  }

  comparePasswords(password: string, hashedPassword: string): boolean {
    return false;
  }
}
