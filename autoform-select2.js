/* global AutoForm, $, Template */

AutoForm.addInputType('select2', {
  template: 'afSelect2',
  valueConverters: {
    stringArray: function (val) {
      if (Array.isArray(val)) {
        return val.map(item => String(item).trim())
      }
      return val
    },
    number: AutoForm.Utility.stringToNumber,
    numberArray: function (val) {
      if (Array.isArray(val)) {
        return val.map(item => AutoForm.Utility.stringToNumber(item.trim()))
      }
      return val
    },
    boolean: AutoForm.Utility.stringToBool,
    booleanArray: function (val) {
      if (Array.isArray(val)) {
        return val.map(item => AutoForm.Utility.stringToBool(item.trim()))
      }
      return val
    },
    date: AutoForm.Utility.stringToDate,
    dateArray: function (val) {
      if (Array.isArray(val)) {
        return val.map(item => AutoForm.Utility.stringToDate(item.trim()))
      }
      return val
    }
  },
  contextAdjust: function (context) {
    const { firstOption, ...itemAtts } = context.atts

    // NOTE: We don't add firstOption to select2 input because
    // it doesn't make sense with the way select2 works.

    // build items list
    context.items = []

    // When single-select and placeholder is passed,
    // the first option should be an empty option.
    const multiple = itemAtts.multiple
    const select2Options = itemAtts.select2Options || {}

    if (!multiple && select2Options.placeholder) {
      context.items.push('')
    }

    // Check if option is selected
    const isSelected = function (conVal, optVal) {
      return Array.isArray(conVal)
        ? conVal.includes(optVal)
        : optVal === conVal
    }

    // Add all defined options
    context.selectOptions.forEach(opt => {
      if (opt.optgroup) {
        const subItems = opt.options.map(subOpt => {
          return {
            name: context.name,
            label: subOpt.label,
            value: subOpt.value,
            // _id must be included because it is a special property that
            // #each uses to track unique list items when adding and removing them
            // See https://github.com/meteor/meteor/issues/2174
            _id: subOpt.value,
            selected: isSelected(context.value, subOpt.value),
            atts: itemAtts
          }
        })
        context.items.push({
          optgroup: opt.optgroup,
          items: subItems
        })
      } else {
        context.items.push({
          name: context.name,
          label: opt.label,
          value: opt.value,
          // _id must be included because it is a special property that
          // #each uses to track unique list items when adding and removing them
          // See https://github.com/meteor/meteor/issues/2174
          _id: opt.value,
          selected: isSelected(context.value, opt.value),
          atts: itemAtts
        })
      }
    })

    return context
  }
})

Template.afSelect2.helpers({
  atts: function addFormControlAtts () {
    const { select2Options, ...rest } = this.atts
    return rest
  }
})

Template.afSelect2.events({
  'select2:select select': function (event, template) {
    // When select2 selection changes, we update the `selected` attr
    // on the real select element. This persists better when the DOM
    // changes, allowing us to retain selection properly by using this
    // in the template autorun.
    // Fixes #18
    let val = template.$('select').val()

    if (!Array.isArray(val)) {
      val = [val]
    }

    template.$('select option').each(function () {
      const $this = $(this)
      const selected = val.indexOf($this.attr('value')) !== -1
      $this.prop('selected', selected).attr('selected', selected)
    })
  }
})

Template.afSelect2.onRendered(function () {
  const template = this
  const $s = template.$('select')
  $s.select2(template.data.atts.select2Options || {})

  template.autorun(function () {
    const data = Template.currentData()
    const values = []

    data.items.forEach(item => {
      if (Object.hasOwnProperty.call(item, 'items')) {
        item.items.forEach(subItem => {
          if (subItem.selected) {
            values.push(subItem.value)
          }
        })
      } else {
        if (item.selected) {
          values.push(item.value)
        }
      }
    })

    let $selects
    if (values.length === 0) {
      $selects = template.$('select option')
    } else {
      // Include any that were previously added as new tags
      $selects = template.$('select option[data-select2-tag]')
    }

    $selects.each(function () {
      const $this = $(this)
      if ($this.attr('selected')) {
        values.push($this.attr('value'))
      }
    })
    const currentValues = $s.val()

    if ((!currentValues && values.length > 0) ||
      (currentValues && currentValues.toString() !== values.toString())) {
      // select2 requires that we trigger change event
      // for it to realize it needs to update the select2 list.
      // We do it only if values have actually changed,
      // which should help prevent autosave infinite looping.
      $s.val(values)

      // sometimes the change event is not captured immediately, so we use
      // a short timeout to ensure it, otherwise selected values may not show up
      setTimeout(() => $s.trigger('change'), 50)
    }
  })
})

Template.afSelect2.onDestroyed(function () {
  try {
    if (this.view && this.view._domrange && this.$('select').data('select2')) {
      this.$('select').select2('destroy')
    }
  } catch (error) {}
})

/*
 *  BOOTSTRAP THEME
 */

Template.afSelect2.copyAs('afSelect2_bootstrap4')

// The only difference is that we need to add "form-control" class
Template.afSelect2_bootstrap4.helpers({
  atts: function addFormControlAtts () {
    const { select2Options, ...rest } = this.atts
    // Add bootstrap class
    return AutoForm.Utility.addClass(rest, 'form-control')
  }
})
