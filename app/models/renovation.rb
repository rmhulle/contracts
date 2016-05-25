class Renovation
  include Mongoid::Document

  field :owner, type: String
  field :solicition_date, type: Date
  field :publication_date, type: Date
  field :observation, type: String
  
  belongs_to :contract

  rails_admin do

      navigation_label 'Fiscal'

      list do
        exclude_fields :_id, :created_at, :updated_at, :observation

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
