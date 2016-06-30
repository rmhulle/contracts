class Vendor
  include Mongoid::Document


  field :name, type: String
  field :register, type: String
  field :register_type, type: String
  field :warning, type: Boolean

# Pode ter vários contratos
  has_many :contracts, inverse_of: :vendor
  has_many :invoices

  rails_admin do

      navigation_label 'NECC'

      list do
        field :name do
          column_width 500
        end
        field :register
        field :register_type
      end

      edit do
        field :name
        field :register_type
        field :register, :string
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

    def register_type_enum
      ['Pessoa Física', 'Pessoa Jurídica']
    end
end
