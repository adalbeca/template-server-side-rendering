// Dependencies
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Package.json
import pkg from '../../package.json';

// Environment export default type => type === 'server' ? 'node' : 'web';
const isDevelopment = process.env.NODE_ENV !== 'production';

export default (type) => {
    const rules = [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                query: {
                    presets: [
                        [
                            'env', {
                                modules: false,
                                node: pkg.engines.node,
                                browsers: pkg.browserslist,
                            },
                        ],
                    ],
                },
            },
            exclude: /node_modules/,
        },
    ];

    if (!isDevelopment || type === 'server') {
        rules.push({
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]',
                    'sass-loader',
                ],
            }),
        });
    } else {
        rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]',
                'sass-loader',
            ],
        });
    }

    return rules;
};
