//= require jquery.inputmask
//= require jquery.inputmask.numeric.extensions

$(document).on('rails_admin.dom_ready', function(){

 $("#contract_name").inputmask("9999/9999");
 $("#contract_process_number").inputmask("99999999");
 $("#contract_activity").inputmask("99.999.9999.9999");
 $("#contract_expense_item").inputmask("9.9.99.99");

 $("#contract_federal_account_source").inputmask("9999999999");
 $("#contract_state_account_source").inputmask("9999999999");
 $("#contract_other_account_source").inputmask("9999999999");


 $("#contract_start_value").inputmask('R$ 999.999.999,99', { numericInput: true , autoUnmask: true });

 $("#amendment_name").inputmask("9 º");
 $("#amendment_process_number").inputmask("99999999");
 $("#amendment_activity").inputmask("99.999.9999.9999");
 $("#amendment_expense_item").inputmask("9.9.99.99");
 $("#amendment_federal_account_source").inputmask("9999999999");
 $("#amendment_state_account_source").inputmask("9999999999");
 $("#amendment_other_account_source").inputmask("9999999999");
 $("#amendment_amendment_value").inputmask('R$ 999.999.999,99', { numericInput: true , autoUnmask: true });


 $("#budget_name").inputmask("9999NE99999");
 $("#budget_value").inputmask('R$ 999.999.999,99', { numericInput: true , autoUnmask: true });

 //$("#invoice_name").inputmask("9999/99999");
 $("#invoice_competency_date").inputmask("99/9999");
 $("#invoice_process_number").inputmask("99999999");
 $("#invoice_value").inputmask('R$ 999.999.999,99', { numericInput: true , autoUnmask: true });


 $("#fine_name").inputmask("999/9999");
 $("#notification_name").inputmask("999/9999");
 $("#termination_process_number").inputmask("99999999");

 $("#invoice_invoice_type").change(function() {
   if ($(this).val() == "Ordem de Fornecimento") {
     $("#invoice_name").inputmask("999/9999");
    }
  });
  $("#vendor_register_type").change(function() {
    if ($(this).val() == "Pessoa Física") {
      $("#vendor_register").inputmask("999.999.999-99");
     }
     else {
       $("#vendor_register").inputmask("99.999.999/9999-99");
     }
   });
 });
