//= require jquery.inputmask
//= require jquery.inputmask.extensions
//= require jquery.inputmask.numeric.extensions
//= require jquery.inputmask.date.extensions
//= require_tree .

// //= require icheck
//
// $(document).on('ready pjax:success', function() {
//   $('input').iCheck({
//     checkboxClass: 'icheckbox_flat-grey selectable',
//     radioClass: 'iradio_flat-grey'
//   });
//
//   var checkBox = $('.table-striped > tbody > tr > td:first-child input[type="checkbox"]');
//   var togglerCheck = $('th.shrink input[type="checkbox"]');
//
//   checkBox.on('ifChecked', function(e) {
//     $(this).parent().parent().parent().addClass('row-highlight');
//   });
//   checkBox.on('ifUnchecked', function(e) {
//     $(this).parent().parent().parent().removeClass('row-highlight');
//   });
//
//   togglerCheck.on('ifChecked', function(e) {
//     checkBox.iCheck('check');
//     handleHighlight();
//   });
//   togglerCheck.on('ifUnchecked', function(e) {
//     checkBox.iCheck('uncheck');
//     $('.table-striped tbody tr').removeClass('row-highlight');
//   });
//   function handleHighlight() {
//     $('.table-striped tbody td').has('div.checked').each(function(index, item) {
//       $(item).parent().addClass('row-highlight');
//     });
//   }
//
//   handleActiveBase();
//   function handleActiveBase() {
//     $('.sub-menu').each(function () {
//       if ($(this).hasClass('active')) {
//         $(this).parent().prev().addClass('active');
//         $(this).parent().prev().addClass('open');
//         $(this).parent().slideDown();
//       }
//     });
//   }
// });
