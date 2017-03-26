aldeed:autoform-select2
=========================

An add-on Meteor package for [aldeed:autoform](https://github.com/aldeed/meteor-autoform). Provides a single custom input type, "select2", which renders an input using the [select2](https://select2.github.io/) plugin.

## Prerequisites

### Select2 Library

You must use select2 4.0+.

Option 1:

Add this to `<head>`:

```html
<link href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
<script src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>
```

Option 2:

Install the NPM package (and its jQuery dependency):

```js
$ meteor npm i --save jquery select2
```

Then in your `client/main.js`:

```js
import 'select2';
import 'select2/dist/css/select2.css';
```

Option 3:

Get the files from GitHub and add them directly in your app /client/lib folder.

### AutoForm

In a Meteor app directory, enter:

```bash
$ meteor add aldeed:autoform
```

### Select2 Bootstrap CSS (optional)

If using with Bootstrap, you can add the theme.

```bash
$ meteor npm i --save select2-bootstrap-theme
```

And add an additional import AFTER the other two in your `client/main.js`:

```js
import 'select2';
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';
```

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
    type: Array,
    autoform: {
      type: 'select2',
      afFieldInput: {
        multiple: true
      }
    }
  },
  'tags.$': String
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
  s2Opts() {
    return { placeholder: 'foo', tags: true };
  },
});
```

## Demo

[Live](http://autoform.meteor.com/types)

## Contributing

Anyone is welcome to contribute. Fork, make your changes, and then submit a pull request.
