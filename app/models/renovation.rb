class Renovation
  include Mongoid::Document

  field :change_date, type: Date
  field :change_description, type: String
  field :formalization, type: String
  field :change_value, type: Float
  field :change_type, type: String

  belongs_to :contract

  rails_admin do

      navigation_label 'NECL'

      list do
        exclude_fields :_id, :created_at, :updated_at, :change_description

      end

      edit do
        exclude_fields :created_at, :updated_at
        field :contract do
          inline_add false
          inline_edit false
        end
      end

      show do
        exclude_fields :id, :created_at, :updated_at
      end
      # object_label_method do
      #   :custom_label_method
      # end

  end
  def formalization_enum
    [ 'Apostilamento','Aditivo']
  end
  def change_type_enum
    [ 'Vigência','Reajuste Positivo', 'Acrescimo', 'Supressão']
  end




end
