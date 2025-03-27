declare const base: {
  preset: string;
  testEnvironment: string;
  extensionsToTreatAsEsm: string[];
  transform: Record<string, any>;
  moduleNameMapper: Record<string, string>;
  moduleFileExtensions: string[];
  globals: Record<string, any>;
};

export default base;
