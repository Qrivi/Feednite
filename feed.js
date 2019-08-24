#!/usr/bin/env node
const express = require('express')
const request = require('sync-request')
const convert = require('xml-js')
const format = require('dateformat')

const app = express()
const port = process.env.PORT || 3000

const feedTitle = 'Fortnite News'
const siteRoot = 'https://www.epicgames.com/fortnite'
const postsEndpoint = '/api/blog/getPosts'

const defaultLimit = 25
const defaultLocale = 'en'
const defaultDetails = true

// Fetch news articles from Fortnite's news API
function fetch (limit, locale, details) {
  if (!limit) {
    return []
  }

  const res = request('GET', `${siteRoot}${postsEndpoint}?postsPerPage=${limit}&locale=${locale}&offset=0`)
  return JSON.parse(res.body.toString()).blogList.map(post => ({
    title: {
      _text: post.title
    },
    guid: {
      _text: `${siteRoot}${post.urlPattern}`
    },
    link: {
      _text: `${siteRoot}${post.urlPattern}`
    },
    description: {
      _cdata: details && post.content ? post.content : post.short
    },
    author: {
      _text: `support@epicgames.desk-mail.com (${post.author})`
    },
    pubDate: {
      _text: `${format(new Date(post.date), 'ddd, dd mmm yyyy HH:MM:ss')} GMT`
    },
    category: post.category.map(c => ({ _text: c }))
  }))
}

// Parse news articles into an RSS 2.0 body
function parse (posts, locale, self) {
  return {
    _declaration: {
      _attributes: {
        version: '1.0',
        encoding: 'UTF-8'
      }
    },
    rss: {
      _attributes: {
        version: '2.0',
        'xmlns:atom': 'http://www.w3.org/2005/Atom'
      },
      channel: {
        title: {
          _text: feedTitle
        },
        description: {
          _text: `RSS feed for ${feedTitle}`
        },
        link: {
          _text: siteRoot
        },
        language: {
          _text: locale
        },
        copyright: {
          _text: `${format(new Date(), 'yyyy')} Epic Games, Inc. - All Rights Reserved`
        },
        generator: {
          _text: 'Feednite'
        },
        docs: {
          _text: 'https://github.com/Qrivi/Feednite'
        },
        image: {
          title: {
            _text: feedTitle
          },
          link: {
            _text: siteRoot
          },
          url: {
            _text: 'https://pbs.twimg.com/profile_images/1017458813199372289/QtGv1tyn_400x400.jpg'
          }
        },
        'atom:link': {
          _attributes: {
            type: 'application/rss+xml',
            rel: 'self',
            href: self
          }
        },
        item: posts
      }
    }
  }
}

// Set up Express.
app.use(express.urlencoded({ extended: true }))
app.get('/', function (req, res) {
  const limit = req.query.limit ? parseInt(req.query.limit) : defaultLimit
  const locale = req.query.locale ? req.query.locale : defaultLocale
  const details = req.query.details ? !/^(false|no(pe)?|off|0)$/i.test(req.query.details) : defaultDetails
  const self = req.protocol + '://' + req.get('host') + req.originalUrl

  console.log(`${format(new Date())}: Fetching ${limit} posts in ${locale} ${ details ? 'with' : 'without'} details.`)
  res.set('Content-Type', 'application/rss+xml; charset=UTF-8')
    .status(200)
    .send(convert.js2xml(parse(fetch(limit, locale, details), locale, self), { compact: true, spaces: 2 }))
})
app.listen(port, function () {
  console.log(`Started on port ${port}`)
})
