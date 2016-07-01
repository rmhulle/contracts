class ServiceOrder
  include Mongoid::Document
  field :invoice_type, type: String, default: 'Ordem de Fornecimento'  #Tipo: é medição ou OS?
  field :name, type: String # Número da Ordem de Fornecimento/Medição

  field :competency_date, type: String # Data de Competencia
  field :emission_date, type: Date # Data de Emissão
  field :process_number, type: String # Número do Processo

  field :execution_date, type: Date # Data de Entrega ou execução da Medição
  field :value, type: Money # Valor Global da Medição ou Ordem de Serviço

  field :status, type: Boolean
  field :comments, type: String
  field :user_id

  field :rating, type: String
  field :rating_justification, type: String

  before_create :update_total_executed
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
        field :value do
          pretty_value do # used in list view columns and show views, defaults to formatted_value for non-association fields
            humanized_money_with_symbol(value)
          end
        end
        field :contract
        field :vendor
      end

      edit do
        field :contract do
          associated_collection_scope do
            user_now = bindings[:controller].current_user.id
            #Só pode adicionar ordens de serviço em contratos do TIPO
            #Termo de adesão ou Ata e cujo o usuário ja foi setado como fiscal
            Proc.new { |scope|
              scope = Contract.where({ user_id: user_now }).or({ contract_type: 'Termo de Adesão' },
                                                               { contract_type: 'Ata de Registro' })
            }
          end
        end

        field :name
        field :competency_date, :string
        field :emission_date
        field :process_number, :string
        field :execution_date
        field :value, :string
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
        field :value do
          pretty_value do # used in list view columns and show views, defaults to formatted_value for non-association fields
            humanized_money_with_symbol(value)
          end
        end
      end
      # object_label_method do
      #   :custom_label_method
      # end

  end

  def set_owner
    self.user_id = bindings[:view]._current_user.id
  end

  #Issue: Can't sum classes, .sum(:value) -> .sum(&:value). issue solved by Karlinha S2!

  def update_total_executed
    idContrato = self.contract._id
    contrato = Contract.where(id: idContrato).first
    contrato.total_executed = contrato.invoices.sum(&:value) + self.value
    contrato.save
  end

  def rating_enum
    ['Satisfatória',
      'Inatisfatória']
  end
end
