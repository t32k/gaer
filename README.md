# GAER [![Build Status](https://travis-ci.org/t32k/gaer.svg?branch=master)](https://travis-ci.org/t32k/gaer)

> A CLI for Google Analytics Event Tracking Report.

Did you know Google Analytics has a report feature developers can use freely? It's a Event Tracking Report. GAER allows you to store your data object and monitor the data history using [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide).

## Getting Started

If you don't have [Google Analytics](http://www.google.com/analytics/) account, please create new account. And then, please create new property for using GAER Report in advance.

The JSON data you want to store must be simple object and all value must be numeric, because GARE use `key` of the object as [Event Label](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#el) and `value` of the object as [Event Value](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ev).

```json
// Good :)
{ "foo": 3, "bar": 9, "baz": 3.14 }

// Bad :(
{ "foo": "aaa", "bar": 1, "baz": "bbb" }

// Bad :(
{ "foo": 3, "bar": { "qux": 1 }, "baz": 3.14 }

// Bad :(
{ "foo": 3, "bar": 9, "baz": [0,1,3] }
```

## Install

With [npm](https://www.npmjs.com/) do:

```shell
npm install -g gaer
```

## Usage

```shell
  Usage: gaer [options] <JSON>

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -t, --tid <ID>       set your Google Analytics Tracking ID
    -r, --report <Name>  set your GA Action report name
```

## Example

Standard way:
```shell
gaer --tid UA-xxxxxxx-x --report ReportName path/to/json/file.json
```

Shortcut way:
```shell
gaer -t UA-xxxxxxx-x -r ReportName path/to/json/file.json
```

Using environment variables:
```shell
GA_TID=UA-xxxxxxx-x GA_REPORT=ReportName gaer path/to/json/file.json
```

Using pipe:
```shell
stylestats -f json -n path/to/css/file.css | gaer -t UA-xxxxxxx-x -r ReportName
```

See also: [t32k/stylestats](https://github.com/t32k/stylestats)

## Limits and Quotas

Please refer to as follows:

+ [Google Analytics Collection Limits and Quotas — Google Developers](https://developers.google.com/analytics/devguides/collection/other/limits-quotas)
