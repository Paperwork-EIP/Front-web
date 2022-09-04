const config = {
    testEnvironment: "jsdom",
    transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\\/]+$"],
    coveragePathIgnorePatterns: ["src/components/index.ts"],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    }
};

module.exports = config;