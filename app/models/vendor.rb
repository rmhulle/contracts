class Vendor
  include Mongoid::Document


  field :name, type: String
  field :cnpj, type: String




# Pode ter vários contratos
  has_many :contracts, inverse_of: :vendor

#um Vendedor executa um contrato por meio de emissão de vária notas

  has_many :invoices

  rails_admin do

      navigation_label 'NECL'

      list do
        exclude_fields :_id, :created_at, :updated_at
      end

      edit do
        exclude_fields :created_at, :updated_at, :contracts, :invoices
      end

      show do
        exclude_fields :id, :created_at, :updated_at
      end

      object_label_method do
         :custom_label_method
      end


  end

  def custom_label_method
    "#{self.name} - #{self.cnpj}"
  end

end
