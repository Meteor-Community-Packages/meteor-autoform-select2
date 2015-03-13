/* global AutoForm, _, $, Template */

AutoForm.addInputType("select2", {
  template: "afSelect2",
  valueConverters: {
    "stringArray": function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          return $.trim(item);
        });
      }
      return val;
    },
    "number": AutoForm.Utility.stringToNumber,
    "numberArray": function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToNumber(item);
        });
      }
      return val;
    },
    "boolean": AutoForm.Utility.stringToBool,
    "booleanArray": function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToBool(item);
        });
      }
      return val;
    },
    "date": AutoForm.Utility.stringToDate,
    "dateArray": function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToDate(item);
        });
      }
      return val;
    }
  },
  contextAdjust: function (context) {
    //can fix issues with some browsers selecting the firstOption instead of the selected option
    context.atts.autocomplete = "off";

    var itemAtts = _.omit(context.atts, 'firstOption');
    var firstOption = context.atts.firstOption;

    // build items list
    context.items = [];

    // If a firstOption was provided, add that to the items list first
    if (firstOption !== false) {
      context.items.push({
        name: context.name,
        label: (typeof firstOption === "string" ? firstOption : "(Select One)"),
        value: "",
        // _id must be included because it is a special property that
        // #each uses to track unique list items when adding and removing them
        // See https://github.com/meteor/meteor/issues/2174
        _id: "",
        selected: false,
        atts: itemAtts
      });
    }

    // Add all defined options
    _.each(context.selectOptions, function(opt) {
      if (opt.optgroup) {
        var subItems = _.map(opt.options, function(subOpt) {
          return {
            name: context.name,
            label: subOpt.label,
            value: subOpt.value,
            // _id must be included because it is a special property that
            // #each uses to track unique list items when adding and removing them
            // See https://github.com/meteor/meteor/issues/2174
            _id: subOpt.value,
            selected: (subOpt.value === context.value),
            atts: itemAtts
          };
        });
        context.items.push({
          optgroup: opt.optgroup,
          items: subItems
        });
      } else {
        context.items.push({
          name: context.name,
          label: opt.label,
          value: opt.value,
          // _id must be included because it is a special property that
          // #each uses to track unique list items when adding and removing them
          // See https://github.com/meteor/meteor/issues/2174
          _id: opt.value,
          selected: (_.isArray(context.value) ?
                     _.contains(context.value, opt.value) :
                     opt.value === context.value),
          atts: itemAtts
        });
      }
    });

    return context;
  }
});

Template.afSelect2.helpers({
  atts: function addFormControlAtts() {
    return _.omit(this.atts, 'select2Options');
  }
});

Template.afSelect2.events({
  'select2:select select': function (event, template) {
    // When select2 selection changes, we update the `selected` attr
    // on the real select element. This persists better when the DOM
    // changes, allowing us to retain selection properly by using this
    // in the template autorun.
    // Fixes #18
    var val = template.$('select').val();
    if (!_.isArray(val)) { val = [val]; }
    template.$('select option').each(function () {
      var $this = $(this);
      var selected = val.indexOf($this.attr('value')) !== -1;
      $this.prop('selected', selected).attr('selected', selected);
    });
  }
});

Template.afSelect2.rendered = function () {
  var template = this;
  var $s = template.$('select');

  // instanciate select2
  $s.select2(template.data.atts.select2Options || {});

  template.autorun(function () {
    var data = Template.currentData();

    var values = [];
    _.each(data.items, function (item) {
      if (item.selected) {
        values.push(item.value);
      }
    });

    if (values.length === 0) {
      template.$('select option').each(function () {
        var $this = $(this);
        if ($this.attr('selected')) {
          values.push($this.attr('value'));
        }
      });
    }

    var currentValues = $s.val();
    if ((!currentValues && values.length > 0) ||
        (currentValues && currentValues.toString() !== values.toString())) {
      // select2 requires that we trigger change event
      // for it to realize it needs to update the select2 list.
      // We do it only if values have actually changed,
      // which should help prevent autosave infinite looping.
      $s.val(values).trigger('change');
    }
  });
};

Template.afSelect2.destroyed = function () {
  if (this.view && this.view._domrange) {
    this.$('select').select2('destroy');
  }
};

/*
 *  BOOTSTRAP THEME
 */

Template.afSelect2.copyAs('afSelect2_bootstrap3');

// The only difference is that we need to add "form-control" class
Template.afSelect2_bootstrap3.helpers({
  atts: function addFormControlAtts() {
    var atts = _.omit(this.atts, 'select2Options');
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    return atts;
  }
});
