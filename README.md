aldeed:autoform-select2
=========================

An add-on Meteor package for [aldeed:autoform](https://github.com/aldeed/meteor-autoform). Provides a single custom input type, "select2", which renders an input using the [select2](http://ivaynberg.github.io/select2/) plugin.

## Prerequisites

The plugin library must be installed separately.

In a Meteor app directory, enter:

```
$ meteor add natestrauser:select2
$ meteor add aldeed:autoform@4.0.0-rc9
```

## Installation

In a Meteor app directory, enter:

```
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

```js
{{> afQuickField name="tags" type="select2" multiple=true}}

{{> afFormGroup name="tags" type="select2" multiple=true}}

{{> afFieldInput name="tags" type="select2" multiple=true}}
```

To provide select2 options, set a `select2Options` attribute equal to a helper that returns the options object. Most of the `data-` attributes that the plugin recognizes should also work.

## Demo

[Live](http://autoform.meteor.com/types)

## Contributing

Anyone is welcome to contribute. Fork, make your changes, and then submit a pull request.

[![Support via Gratipay](https://cdn.rawgit.com/gratipay/gratipay-badge/2.1.3/dist/gratipay.png)](https://gratipay.com/aldeed/)
