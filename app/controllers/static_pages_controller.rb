class StaticPagesController < ApplicationController
  def home
    #code
  end

  def report

    Deadline.week_deadline_email(User.first).deliver

    map = %Q{
      function() {
        emit(this.object_type, 1 );
      }
    }

    reduce = %Q{
      function(key, values) {
        var result =  0 ;
        values.forEach(function(value) {
          result += value;
        });
        return result;
      }
    }
    contracts = Contract.map_reduce(map, reduce).out(replace: "teest")
    @chart = Hash[contracts.map do |item|
      [item['_id'], item['value']]
    end]
  end
end
