class Invoice
  include Mongoid::Document

  field :invoice_type, type: String #Tipo: é medição ou OS?
  field :name, type: String # Número da Ordem de Fornecimento/Medição

  field :competency_date, type: String # Data de Competencia
  field :emission_date, type: Date # Data de Emissão
  field :process_number, type: String # Número do Processo

  field :execution_date, type: Date # Data de Entrega ou execução da Medição
  field :value, type: Float # Valor Global da Medição ou Ordem de Serviço

  field :status, type: Boolean
  field :comments, type: String
  field :user_id

  field :rating, type: String
  field :rating_justification, type: String

  before_save :update_total_executed
  #before_create :set_owner

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
        field :invoice_type
        field :name
        field :competency_date
        field :value
        field :contract
        field :vendor
      end

      edit do
        field :invoice_type
        field :contract do
          associated_collection_scope do
            user_now = bindings[:controller].current_user.id

            Proc.new { |scope|
              scope = Contract.where(user_id: user_now)
              }

          end
        end

        field :name
        field :competency_date, :string
        field :emission_date
        field :process_number, :string
        field :execution_date
        field :value
        field :comments
        field :rating
        field :rating_justification

        field :user_id, :hidden do
          visible false
          default_value do
            bindings[:view]._current_user.id
          end
        end
      end

      show do
        exclude_fields :id, :created_at, :updated_at, :user_id
      end
      # object_label_method do
      #   :custom_label_method
      # end

  end

  def associate_vendor

  end

  def set_owner
    self.user_id = bindings[:view]._current_user.id
  end

  def update_total_executed
    idContrato = self.contract._id
    contrato = Contract.where(id: idContrato).first
    contrato.total_executed = contrato.invoices.sum(:value) + self.value
    contrato.save
  end

  def invoice_type_enum
    [ 'Medicão',
      'Ordem de Fornecimento']
  end
  def rating_enum
    [ 'Boa',
      'Satisfatória',
      'Neutra',
      'Não Satisfatória',
      'Incompleta']
  end

end
