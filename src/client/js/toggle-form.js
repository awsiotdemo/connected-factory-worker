/* global $ */
'use strict'

function toggleForm (event) {
  var formId = $(event.target).data('form')
  $('a.form-toggle[data-form="' + formId + '"]').toggleClass('hidden')
  $('#' + formId).slideToggle(400, function () {
    $('#' + formId + ' input:text').first().focus()
  })
}

function showLabel () {
  var inputId = $(this).attr('id')
  $('label[for="' + inputId + '"]').removeClass('transparent')
}

function hideLabel () {
  if (!$(this).val()) {
    var inputId = $(this).attr('id')
    $('label[for="' + inputId + '"]').addClass('transparent')
  }
}

$(document).ready(function () {
  $('.form-toggle').click(toggleForm)
  $('.fade-label').focus(showLabel)
  $('.fade-label').focusout(hideLabel)
})
