const { DateTime } = require('luxon')
const slugify = require('slugify')

module.exports = {
	/**
	 * Filters
	 * @link https://www.11ty.dev/docs/filters/
	 */

	/**
	 * dateToFormat allows specifiying display format at point of use.
	 * Example in footer: {{ build.timestamp | dateToFormat('yyyy') }}
	 * uses .timestamp from the _data/build.js export and formats it via dateToFormat below
	 */
	dateToFormat: (date, format) => {
		return DateTime.fromJSDate(date, {
			zone: 'utc',
		}).toFormat(String(format))
	},

	htmlDateString: (dateObj) => {
		return DateTime.fromJSDate(dateObj, {
			zone: 'utc',
		}).toFormat('yyyy-LL-dd')
	},

	machineDate: (dateObj) => {
		return DateTime.fromJSDate(dateObj, {
			zone: 'utc',
		}).toFormat('yyyy-MM-dd')
	},

	readableDate: (dateObj) => {
		return DateTime.fromJSDate(dateObj, {
			zone: 'utc',
		}).toFormat('dd LLL yyyy')
	},

	/**
	 * Date for Permalinks when working with old /YYYY/MM/DD/slug format from Wordpress exports
	 * Used in building Permalinks in /src/posts/posts.json
	 * @link /src/posts/posts.json
	 */
	dateToPermalink: (dateObj) => {
		return DateTime.fromJSDate(dateObj, {
			zone: 'utc',
		}).toFormat('yyyy/MM/dd')
	},

	/**
   // Universal slug filter strips unsafe chars from URLs
   */
	slugify: (string) => {
		return slugify(string, {
			lower: true,
			replacement: '-',
			remove: /[*+~.·,()'"`´%!?¿:@]/g,
		})
	},

	/**
	 * Get Authors from _data/authors.json to use in Post Lists and Detail
	 */
	getAuthor: (authors, key) => {
		let author = authors.filter((a) => a.slug === key)[0]
		return author
	},
}
