class Budget
  include Mongoid::Document


  field :name, type: String
  field :date, type: Date
  field :value, type: Float

  embedded_in :contract
  
  rails_admin do

      navigation_label 'Fiscal'

      list do
        exclude_fields :_id, :created_at, :updated_at
      end

      edit do
        exclude_fields :created_at, :updated_at
      end

      show do
        exclude_fields :id, :created_at, :updated_at
      end
      # object_label_method do
      #   :custom_label_method
      # end

  end
end
