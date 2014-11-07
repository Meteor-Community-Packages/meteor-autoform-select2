Template["afSelect2_bootstrap3"].helpers({
  optionAtts: function afSelectOptionAtts() {
    var item = this
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

Template["afSelect2_bootstrap3"].rendered = function () {
  // instanciate select2
  this.$('select').select2(this.data.atts.select2Options || {});
};

Template["afSelect2_bootstrap3"].destroyed = function () {
  this.$('select').select2('destroy');
};
