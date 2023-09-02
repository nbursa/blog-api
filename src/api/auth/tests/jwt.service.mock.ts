export class JwtServiceMock {
  sign(payload: any): string {
    return 'mocked_jwt_token';
  }
}
