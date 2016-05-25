class Item
  include Mongoid::Document


  field :name, type: String
  field :unity_value, type: Float
  field :unity, type: String
  field :quantity, type: Integer
  field :item_type, type: String
  field :total_value, type: Float

  embedded_in :contract
  before_save :calc_total_value

  rails_admin do

      navigation_label 'NECL'

      list do
        exclude_fields :_id, :created_at, :updated_at
      end

      edit do
        exclude_fields :created_at, :updated_at, :total_value
      end

      show do
        exclude_fields :id, :created_at, :updated_at
      end
      # object_label_method do
      #   :custom_label_method
      # end

    end
#
private

      def calc_total_value # Calcula o valor total do Item
        self.total_value = (self.unity_value * self.quantity)
      end

end
