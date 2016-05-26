require 'test_helper'

class ReportControllerTest < ActionController::TestCase
  test "should get expiring" do
    get :expiring
    assert_response :success
  end

  test "should get overflow_budget" do
    get :overflow_budget
    assert_response :success
  end

  test "should get without_accountant" do
    get :without_accountant
    assert_response :success
  end

  test "should get without_invoice" do
    get :without_invoice
    assert_response :success
  end

  test "should get without_budget" do
    get :without_budget
    assert_response :success
  end

end
