const mix = require("laravel-mix")
require("laravel-mix-nunjucks")

// require("laravel-mix-replace-in-file")
const fs = require('fs')

// const CssoWebpackPlugin = require('csso-webpack-plugin').default
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const SVGSpritemapPlugin       = require( 'svg-spritemap-webpack-plugin' )
// const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' )
const manifestRemove = require('./utils/manifestRemove.cjs')
const replaceMatches = require('./utils/replaceMatches.cjs')
const htmlMinifier = require('./utils/htmlMinifier.cjs')

const PROD_DIR = './prod'
const SRC_DIR = './src'

mix.disableNotifications()

mix.njk(`${SRC_DIR}/`, './prod/', {
	path: `${SRC_DIR}/_njk/`,
})
mix.js(`${SRC_DIR}/js/index.js`, `${PROD_DIR}/assets/js/bundle.js`)
mix.sass(`${SRC_DIR}/scss/style.scss`, `${PROD_DIR}/assets/css/style.css`)
mix.options({
	processCssUrls: false
})
mix.after(() => {
	// replaceMatches({
	// 	path: [
	// 		`${PROD_DIR}/assets/css/style.css`
	// 	],
	// 	replace: [
	// 		['../img', '../assets/img']
	// 	]
	// })
})

mix.copy(`${SRC_DIR}/**/*.html`, './prod/')
mix.after(() => {
	// htmlMinifier()
})

mix.copy(`${SRC_DIR}/img/`, `${PROD_DIR}/assets/img/`)


// mix.options( { autoprefixer: {
// 	browsers: ['last 40 versions'],
// 	grid: true
// } } )

// mix.replaceInFile({
// 	files: `${PROD_DIR}/assets/css/style.css`,
// 	from: /margin/g,
// 	to: 'sardins',
// });

mix.browserSync({
	server: PROD_DIR,
	open: false,
	watch: true,
	notify: false,
})

// Удаляем файл mix-manifest.json
// mix.after(() => { manifestRemove() })
