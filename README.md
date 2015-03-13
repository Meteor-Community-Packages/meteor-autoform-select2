aldeed:autoform-select2
=========================

An add-on Meteor package for [aldeed:autoform](https://github.com/aldeed/meteor-autoform). Provides a single custom input type, "select2", which renders an input using the [select2](https://select2.github.io/) plugin.

## Prerequisites

### Select2 Library

Starting with v2.0.0 of this package, you must use select2 4.0+. You can add this to `<head>`:

```html
<link href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0-rc.1/css/select2.min.css" rel="stylesheet" />
<script src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0-rc.1/js/select2.min.js"></script>
```

Or get the files from GitHub and add them directly in your app /client/lib folder.

### AutoForm

In a Meteor app directory, enter:

```bash
$ meteor add aldeed:autoform
```

### Select2 Bootstrap CSS (optional)

If using with bootstrap, you'll probably also want to:

```bash
$ meteor add zimme:select2-bootstrap3-css
```

Or add [the CSS](https://github.com/t0m/select2-bootstrap-css/blob/bootstrap3/select2-bootstrap.css) directly to your app /client folder.

## Installation

In a Meteor app directory, enter:

```bash
$ meteor add aldeed:autoform-select2
```

## Usage

Specify "select2" for the `type` attribute of any input. This can be done in a number of ways:

In the schema, which will then work with a `quickForm` or `afQuickFields`:

```js
{
  tags: {
    type: [String],
    autoform: {
      type: "select2",
      afFieldInput: {
        multiple: true
      }
    }
  }
}
```

Or on the `afFieldInput` component or any component that passes along attributes to `afFieldInput`:

```html
{{> afQuickField name="tags" type="select2" multiple=true}}

{{> afFormGroup name="tags" type="select2" multiple=true}}

{{> afFieldInput name="tags" type="select2" multiple=true}}
```

## Setting Select2 Options

To provide select2 options, set a `select2Options` attribute equal to a helper function that returns the options object. Most of the `data-` attributes that the plugin recognizes should also work.

Example:

```html
{{> afFieldInput name="tags" type="select2" multiple=true select2Options=s2Opts}}
```

```js
Template.example.helpers({
  s2Opts: function () {
    return {placeholder: 'foo', tags: true};
  }
});
```

## Demo

[Live](http://autoform.meteor.com/types)

## Contributing

Anyone is welcome to contribute. Fork, make your changes, and then submit a pull request.

[![Support via Gratipay](https://cdn.rawgit.com/gratipay/gratipay-badge/2.1.3/dist/gratipay.png)](https://gratipay.com/aldeed/)
