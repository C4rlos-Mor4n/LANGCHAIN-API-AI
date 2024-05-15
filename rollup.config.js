import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'esm',
    },
    plugins: [
        alias({
            entries: [
                { find: '~', replacement: './src' }  // Maps all imports starting with ~ to ./src
            ]
        }),
        typescript({
            useTsconfigDeclarationDir: true  // If you have specific declaration file settings
        })
    ],
    onwarn: (warning, warn) => {
        // It's better to call the default warning handler for other kinds of warnings
        if (warning.code === 'UNRESOLVED_IMPORT') return;
        warn(warning);  // This forwards all other warnings to the default handler
    }
};
