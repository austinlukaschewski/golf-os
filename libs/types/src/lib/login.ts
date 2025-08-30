export type RefreshTokenResponse = { accessToken: string };
export type LoginResponse = RefreshTokenResponse & { refreshToken: string };
export type LoginRequest = { username: string; password: string };
