const defaultConfig = require('@wordpress/scripts/config/webpack.config');

const rules = [
    ...defaultConfig.module.rules,
].map(r => ({ ...r }));
const css = require.resolve('css-loader');
const scss = rules.find(r => '.scss'.match(r.test));
scss.use = [...scss.use].map(l => typeof l === 'object' ? { ...l } : l);
const cssLoader = scss.use?.find(l => l.loader === css);
cssLoader.options = {
    ...cssLoader.options,
    // importLoaders: 1,
    modules: {
        auto: true,
    }
};

module.exports = {
    ...defaultConfig,
    module: {
        ...defaultConfig.module,
        rules,
    },
    optimization: {
        ...defaultConfig.optimization,
        splitChunks: {
            ...defaultConfig.optimization.splitChunks,
            cacheGroups: {
                ...defaultConfig.optimization.splitChunks.cacheGroups,
                style: {
                    ...defaultConfig.optimization.splitChunks.cacheGroups.style,
                    test: /[\\/]style(\.module)?\.(sc|sa|c)ss$/
                }
            }
        }
    }
};