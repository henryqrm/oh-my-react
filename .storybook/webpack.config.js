const path = require('path')
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'
require('../configs/env')
// const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin")
const paths = require('../configs/paths')
const isDev = process.env.NODE_ENV === 'development'
const common = require('../configs/webpack/common')
const merge = require('webpack-merge')

const regexScript = /\.(js|jsx|mjs|ts|tsx)$/
const regexStyle = /\.(less|styl|scss|sass|sss)$/
const regexImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/
const staticAssetName = isDev ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]'

const minimizeCssOptions = {
  discardComments: {
    removeAll: true,
  },
}

const alias = {
  '@': paths.appSrcClient,
  '@state/*': `${paths.appSrcClient}/store/state/*`,
  '@state': `${paths.appSrcClient}/store/state`,
  '@constants/*': `${paths.appSrcClient}/constants/*`,
  '@constants': `${paths.appSrcClient}/constants`,
  '@components/*': `${paths.appSrcClient}/components/*`,
  '@components': `${paths.appSrcClient}/components`,
  '@containers/*': `${paths.appSrcClient}/containers/*`,
  '@containers': `${paths.appSrcClient}/containers`,
  '@images/*': `${paths.appSrcClient}/images/*`,
  '@images': `${paths.appSrcClient}/images`,
  '@lib/*': `${paths.appSrcClient}/lib/*`,
  '@lib': `${paths.appSrcClient}/lib`,
  '@Home/*': `${paths.appSrcClient}/routes/Home/*`,
  '@Home': `${paths.appSrcClient}/routes/Home`,
  '@Login/*': `${paths.appSrcClient}/routes/Login/*`,
  '@Login': `${paths.appSrcClient}/routes/Login`,
  '@redux': `${paths.appSrcClient}/redux`,
  '@styles': `${paths.appSrcClient}/styles`,
  styles: `${paths.appSrcClient}/styles`,
  '@translations': `${paths.appSrcClient}/translations`,
  '@vendors/*': `${paths.appSrcClient}/vendors/*`,
  '@vendors': `${paths.appSrcClient}/vendors`,
}

const rulesScript = {
  test: regexScript,
  loader: require.resolve('babel-loader'),
  rules: [
    {
      test: /\.(ts|tsx)$/,
      loader: require.resolve('ts-loader'),
    },
    {
      test: /\.(js)$/,
      loader: require.resolve('source-map-loader'),
    },
  ],
  exclude: /node_modules/,
  options: {
    cacheDirectory: isDev,
    babelrc: true,
  },
}
const ruleStyle = {
  test: /\.css$/,
  rules: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'resolve-url-loader',
    },
  ],
}

const rulesPreStyle = {
  test: regexStyle,
  rules: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'typings-for-css-modules-loader',
      options: {
        sourceMap: false,
        importLoaders: 2,
        modules: true,
        localIdentName: isDev
          ? '[name]_[local]_[hash:base64:5]'
          : '[hash:base64:5]',
        minimize: isDev ? false : minimizeCssOptions,
        camelCase: true,
        namedExport: true,
        sass: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: './configs/postcss.config.js',
        },
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
}

const rulesImage = {
  test: regexImage,
  // loader: "url-loader?limit=30000&name=[name]-[hash].[ext]"
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65,
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: '65-90',
          speed: 4,
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75,
        },
      },
    },
  ],
}

const rulesJson = {
  test: /\.json$/,
  type: 'javascript/auto',
  use: 'json-loader',
}

const rulesVideo = {
  test: /\.(mp4|webm)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000,
    },
  },
}

const rulesRaw = {
  test: /\.txt$/,
  loader: 'raw-loader',
}

module.exports = baseConfig => {
  baseConfig.module.rules.push(rulesScript)
  baseConfig.module.rules.push(rulesPreStyle)
  baseConfig.module.rules.push(ruleStyle)
  baseConfig.module.rules.push(rulesImage)
  baseConfig.module.rules.push(rulesJson)
  baseConfig.module.rules.push(rulesRaw)
  baseConfig.module.rules.push(rulesVideo)
  // baseConfig.plugins.push(new TSDocgenPlugin()) // optional
  baseConfig.resolve.extensions.push(
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.scss',
    '.sass',
    '.css',
    '.json',
    '.svg',
    '.jpeg',
    '.png',
  )
  baseConfig.resolve.alias = alias
  return baseConfig
  // return merge(baseConfig, common.config)
}
