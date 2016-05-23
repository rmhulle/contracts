class Invoice
  include Mongoid::Document


  field :name, type: String
  field :value, type: Float
  field :date, type: Date
  field :status, type: Boolean
  field :comments, type: String


# só quem pode emitir uma nota é um Fornecedor, e está será sempre vinculada
# a um contrato. Normalmente um contrato é executado por meio de várias notas
# Caso um contrato seja deletado, assim como fornecedor suas notas também serão,
# pois não haverá a quem vuncular e não será permitido notas soltas.

  belongs_to :vendor, dependent: :destroy
  belongs_to :contract, dependent: :destroy

# TODO binding contrato e já vincular automaticamente ao fornecedor.
# Sem que o usuário faça. Por enquanto esta manual.
# Tem que entender como funciona as referencias em mongo

  rails_admin do

      navigation_label 'Fiscal'

      list do
        exclude_fields :_id, :created_at, :updated_at, :comments
        field :status, :toggle
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
