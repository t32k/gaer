![](http://i.imgur.com/EFdSeYf.png)

> A CLI for Google Analytics Event Tracking Report.

[![Build Status](https://travis-ci.org/t32k/gaer.svg?branch=master)](https://travis-ci.org/t32k/gaer)

Did you know Google Analytics has a report feature developers can use freely? It's a Event Tracking Report. GAER allows you to store your data object and monitor the data history using [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide). In other words, you can send your data to Google Analytics server from CLI tool.

```shell
$ gear -t UA-xxxxx-xx -r reportName path/to/data.json
  Sending [||||||||||||||||||||||||] 100%
  Success: The data is sent to UA-xxxxx-xx
```

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

### Event Tracking Parameter 

Please see the details below. 

+ [Measurement Protocol Parameter Reference](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters?hl=en#events)

| Event  	  | Type     | in GARE      　   |
| ----------|----------| ------------------|
| Category  | String   | `GAER`            |
| Action    | String   | `--report` value  |
| Label     | String   | object.key        |
| Value     | Number   | object.value      |


## Report on Google Analytics

You can see the data report you sent from CLI on `Behavior` > `Events` menu.

![](http://i.imgur.com/WtZUpqj.png)


As shown below, you can also use [the Custom Report for GARE](http://goo.gl/KNxaiP).

![](http://i.imgur.com/YD18HVi.png)


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

## CLI Example

Standard way:
```shell
gaer --tid UA-xxxxxxx-x --report ReportName path/to/json/file.json
```

Shortcut way:
```shell
gaer -t UA-xxxxxxx-x -r ReportName path/to/json/file.json
```

Debug mode:
```shell
DEBUG=1 gaer -t UA-xxxxxxx-x -r ReportName path/to/json/file.json
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


## API Example

You can use the API directly too:

```javascript
var Gaer = require('gaer');
var gaer = new Gaer('UA-xxxxx-x');
gaer.record('Report Name', 'path/to/data.json');
```

## Limits and Quotas

Please refer to as follows:

+ [Google Analytics Collection Limits and Quotas — Google Developers](https://developers.google.com/analytics/devguides/collection/other/limits-quotas)
