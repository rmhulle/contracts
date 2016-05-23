class Contract
  include Mongoid::Document

  field :name, type: String
  field :started, type: Boolean
  


# Um contrato tem vário items, como não existe relacionamento externo,
# vamos colcar um item dentro do proprio Contrato.
  embeds_many :items, cascade_callbacks: true
  accepts_nested_attributes_for :items

# Um contrato tem um único fornecedor

  belongs_to :vendor, inverse_of: :contract

# pode ter mais de um empenho

  embeds_many :budgets
  accepts_nested_attributes_for :budgets

# Contrato pode ter vários responsaveis cada um com seu nível de vizualização
# NECL, Gestor, Fiscal
# TODO Fazer as bindings pra cada permissão de vizualização

  has_many :accountabilities, inverse_of: :contract, dependent: :destroy

# contrato é executado por meio de emissão de notas fiscais.

  has_many :invoices

rails_admin do

      navigation_label 'NECL'

      list do
        exclude_fields :_id, :created_at, :updated_at, :budgets, :items
        field :started, :toggle
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

private


end
