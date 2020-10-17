⚠️ **Please deploy Feednite to your own Heroku instance.**

> Too many people are frequently polling the Heroku url mentioned in this readme. If you get an "application error" (usually near the end of the month): no need to report it. It means the demo Heroku account ran out of free dynos and stopped running. It'll be back up the next month.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

---

# Feednite

An RSS feed generator for Fortnite news I wrote in 59 minutes, because much like [Psyonix with Rocket League](https://github.com/Qrivi/RLRSS), Epic Games is not providing an RSS feed to follow up on their news updates either.

The script generates a very complete and valid RSS feed on the fly and takes 3 optional parameters.

* * *

## Parameters

| Name   | Default | Description |
| ------ | ------- | ----------- |
| locale | `en`    | The language in which the fetched articles should be. Falls back to English if the language is not supported on Epic's website. |
| limit  | `25`    | The amount of recent news items to include in the feed. `-1` will include all items, and `0` will make the feed pretty useless. |
| detail | `true`  | Whether the entire news article should be parsed into the `<description>`, or just a short description when set to `false`, `no`, `nope`, `off` or `0`. |

Examples:

-   [https://feednite.herokuapp.com?limit=50&detail=no](https://feednite.herokuapp.com?limit=50&detail=no)
-   [https://feednite.herokuapp.com?limit=5&detail=1](https://feednite.herokuapp.com?limit=5&detail=1)
-   [https://feednite.herokuapp.com?limit=420&detail=off](https://feednite.herokuapp.com?limit=420&detail=off)
-   [https://feednite.herokuapp.com?limit=25&detail=true](https://feednite.herokuapp.com?limit=10&detail=true) (default)

## Output

Example feed output:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fortnite News</title>
    <description>RSS feed for Fortnite News</description>
    <link>https://www.epicgames.com/fortnite</link>
    <language>en</language>
    <copyright>2019 Epic Games, Inc. - All Rights Reserved</copyright>
    <generator>Feednite</generator>
    <docs>https://github.com/Qrivi/Feednite</docs>
    <image>
      <title>Fortnite News</title>
      <link>https://www.epicgames.com/fortnite</link>
      <url>https://pbs.twimg.com/profile_images/1017458813199372289/QtGv1tyn_400x400.jpg</url>
    </image>
    <atom:link type="application/rss+xml" rel="self" href="https://local.dev:3000/?limit=1&details=nope"/>
    <item>
      <title>Save the World Cosmetic Update #2</title>
      <guid>https://www.epicgames.com/fortnite/blog/save-the-world-cosmetic-update-2</guid>
      <link>https://www.epicgames.com/fortnite/blog/save-the-world-cosmetic-update-2</link>
      <description><![CDATA[<strong><span style="font-size:12pt;font-family:'Proxima Nova',sans-serif;white-space:pre;">Save the World Cosmetic Update #2</span></strong>]]></description>
      <author>support@epicgames.desk-mail.com (The Fortnite Team)</author>
      <pubDate>Fri, 23 Aug 2019 06:00:00 GMT</pubDate>
      <category>announcements</category>
    </item>
  </channel>
</rss>
```

And rendered in [Leaf](https://itunes.apple.com/app/id576338668), my preferred RSS client despite it not getting updates anymore (R.I.P.):
![](https://i.imgur.com/tVf385A.jpg)

## Disclaimer

I'm not affiliated with Epic Games or Fortnite in any way: I just wanted to be able to be kept up to date with their news via my feed reader (I am a simple man). If I did anything anyone's not ok with here, please slide in my DMs before taking legal action.
