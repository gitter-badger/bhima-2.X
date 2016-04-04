/* jshint expr:true */
/* global element, by, browser */

var chai = require('chai');
var expect = chai.expect;

var FU = require('../shared/FormUtils');
var helpers = require('../shared/helpers');
var components = require('../shared/components');

helpers.configure(chai);

describe('Section Bilan Module', function () {
  'use strict';

  var path = '#/section_bilan';

  var sectionBilan = {
    text : 'A Special Section Result',
    position : 3,
    is_actif : 0
  };

  var sectionId = 2;

  // navigate to the SectionBilan module before each test
  beforeEach(function () {
    browser.get(path);
  });

  it('creates a new sectionbilan', function () {

    // switch to the create form
    FU.buttons.create();

    FU.input('sectionBilanCtrl.sectionBilan.text', sectionBilan.text);
    FU.radio('sectionBilanCtrl.sectionBilan.is_actif', sectionBilan.is_actif);
    FU.input('sectionBilanCtrl.sectionBilan.position', sectionBilan.position);

    // submit the page to the server
    FU.buttons.submit();

    // expect a nice validation message
    FU.exists(by.id('create_success'), true);
  });

  it('edits an sectionbilan', function () {
    element(by.id('sectionBilan-upd-' + sectionId )).click();
    // modify the sectionBilan text
    FU.input('sectionBilanCtrl.sectionBilan.text', 'Updated');
    // modify the sectionBilan Is Actif
    FU.radio('sectionBilanCtrl.sectionBilan.is_actif', 1);

    element(by.id('change_sectionBilan')).click();

    // make sure the success message appears
    FU.exists(by.id('update_success'), true);
  });

  it('blocks invalid form submission with relevant error classes', function () {
    // switch to the create form
    FU.buttons.create();

    // Verify form has not been successfully submitted
    expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + path);

    element(by.id('submit-sectionBilan')).click();

    // the following fields should be required
    FU.validation.error('sectionBilanCtrl.sectionBilan.text');
    FU.validation.error('sectionBilanCtrl.sectionBilan.position');
    FU.validation.error('sectionBilanCtrl.sectionBilan.is_actif');
  });

  it('delete a sectionbilan', function () {
    element(by.id('sectionBilan-del-' + sectionId)).click();

    // click the alert asking for permission
    browser.switchTo().alert().accept();

    // make sure that the delete message appears
    FU.exists(by.id('delete_success'), true);
  });
});