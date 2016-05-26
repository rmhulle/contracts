class ReportController < ApplicationController
  def expiring
    @contracts = Contract.where(:finish_date => { :$lte => Time.now + 120.days} )
  end

  def overflow_budget
  end

  def without_accountant
  end

  def without_invoice
  end

  def without_budget
  end
end
