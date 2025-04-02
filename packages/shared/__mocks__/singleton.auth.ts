import { PrismaClient } from "@prisma/core/generated/auth";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

const prismaAuthMock = mockDeep<PrismaClient>();
jest.mock("../../prisma/src/generated/auth", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));
beforeEach(() => {
  mockReset(prismaAuthMock);
});

export const prismaMock =
  prismaAuthMock as unknown as DeepMockProxy<PrismaClient>;
