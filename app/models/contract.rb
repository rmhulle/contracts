class Contract
  include Mongoid::Document

  field :name, type: String
  field :process_number, type: String
  field :object, type: String
  field :expense_item, type: String # Rubrica
  field :observation, type: String #renovações?

  field :start_date, type: Date  #vigencia inicio
  field :finish_date, type: Date #vigencia fim
  field :contract_type, type: String # tipo de contrato
  field :contract_model, type: String # Tipo de licitação



  field :total_value, type: Float # Valor global do contrato
  field :total_budget, type: Float # valor total do empenho
  field :total_executed, type: Float # Total executado (soma das notas já executadas)
  field :started, type: Boolean # Já iniciou o processo de renovação?
  field :situation, type: String # Situação atual


# Um contrato tem vário items, como não existe relacionamento externo,
# vamos colcar um item dentro do proprio Contrato.
  embeds_many :items, cascade_callbacks: true
  accepts_nested_attributes_for :items

# Um contrato tem um único fornecedor

  belongs_to :vendor, inverse_of: :contract


  belongs_to :requisition
  validates :requisition, :presence => true

# pode ter mais de um empenho

  has_many :budgets
  accepts_nested_attributes_for :budgets

# Contrato pode ter vários responsaveis cada um com seu nível de vizualização
# NECL, Gestor, Fiscal
# TODO Fazer as bindings pra cada permissão de vizualização

  has_many :accountabilities, inverse_of: :contract, dependent: :destroy

# contrato é executado por meio de emissão de notas fiscais.

  has_many :invoices
  has_many :renovations

  before_save :calc_total_value#, :calc_total_budget

rails_admin do

      navigation_label 'NECL'

      list do
        exclude_fields :_id,
                       :created_at,
                       :updated_at,
                       :budgets,
                       :items,
                       :accountabilities,
                       :invoices,
                       :started,
                       :contract_type,
                       :start_date,
                       :total_value,
                       :renovation,
                       :requisition,
                       :situation,
                       :observation,
                       :process_number,
                       :contract_model,
                       :expense_item,
                       :object,
                       :vendor,
                       :renovations
              field :total_value
              field :started, :toggle

      end

      edit do
        exclude_fields :created_at,
                       :updated_at,
                       :accountabilities,
                       :invoices,
                       :started,
                       :total_value,
                       :total_executed,
                       :total_budget,
                       :situation,
                       :renovations,
                       :budgets

          field :vendor do
             inline_edit false
           end
           field :requisition do
              inline_edit false
              inline_add false
            end
        end

      show do
        exclude_fields :id, :created_at, :updated_at
      end
      # object_label_method do
      #   :custom_label_method
      # end

  end

#TODO Pegar do Siga
  def contract_type_enum
    ['Normal','Aditivo Prazo','Aditivo Valor','Emergêncial']
  end
#TODO pegar do Siga
  def contract_model_enum
    ['Adesão de ATA','Inexigibilidade','Pregão Eletrônico','Pregão Presencial',
    'Dispensa de Licitação - ART 24 - IV']
  end
  def contract_model_enum
    ['Adesão de ATA','Inexigibilidade','Pregão Eletrônico','Pregão Presencial',
    'Dispensa de Licitação - ART 24 - IV']
  end


  def calc_total_executed
    self.total_executed = self.invoices.sum(:value)
  end
  def calc_total_value
    self.total_value = self.items.sum(:total_value)
  end


private


end
