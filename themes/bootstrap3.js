/* global Template, AutoForm */

Template.afSelect2_bootstrap3.helpers({
  optionAtts: function afSelectOptionAtts() {
    var item = this;
    var atts = {
      value: item.value
    };
    if (item.selected) {
      atts.selected = "";
    }
    return atts;
  },
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    delete atts.select2Options;
    return atts;
  }
});

Template.afSelect2_bootstrap3.rendered = function () {
  var template = this;

  // instanciate select2
  template.$('select').select2(template.data.atts.select2Options || {});

  template.autorun(function () {
    var data = Template.currentData();

    var values = [];
    _.each(data.items, function (item) {
      if (item.selected) {
        values.push(item.value);
      }
    });

    template.$('select').select2("val", values);
  });
};
