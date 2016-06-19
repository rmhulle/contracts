class Vendor
  include Mongoid::Document


  field :name, type: String
  field :cnpj, type: String
  field :warning, type: Boolean

# Pode ter vários contratos
  has_many :contracts, inverse_of: :vendor
  has_many :invoices

  rails_admin do

      navigation_label 'NECC'

      list do
        exclude_fields :_id, :created_at, :updated_at
        field :warning, :toggle
      end

      edit do
        field :name
        field :cnpj, :string
        field :warning
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
    "#{self.name}"
  end

end
