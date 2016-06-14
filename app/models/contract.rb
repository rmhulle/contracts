class Contract
  include Mongoid::Document

  field :contract_model, type: String # modalidade de licitação
  field :name, type: String # Numero do contratos
  field :sign_date, type: Date  # Data de Assinatura
  field :publication_date, type: Date  # Data de Assinatura

  # Dotação Orçamentárias

  field :activity, type: String # Atividade
  field :expense_item, type: String # Item de Despesa
  field :account_source, type: String # Fonte de Despesa

  field :object, type: String # Objeto do contrato

  field :requesting, type: String # Setor Solicitante, deverá ser uma lista padronizada

  field :process_number, type: String # Número do processo

  # Valores do Contrato
  field :start_value, type: Float # Valor Incial do contrato

  field :continuum_service, type: Boolean # é Serviço continuado?

  field :start_date, type: Date  #vigencia inicio
  field :finish_date, type: Date #vigencia fim

  field :observation, type: String # Observações


# Variáveis para uso do sistema

  field :total_value, type: Float # Valor global do contrato Será a Soma de Todos Aditivos, Apostilamentos e Valor inicial do Contrato
  field :total_budget, type: Float # Valor total do empenho
  field :total_executed , type: Float # Total executado (soma das notas já executadas)


  belongs_to :vendor, inverse_of: :contract


  has_many :budgets
  accepts_nested_attributes_for :budgets


  has_many :invoices

  has_many :additions
  has_many :amendment
  has_many :closures
  has_many :fines
  has_many :notifications
  has_many :reratifications
  has_many :terminations


# Validações


  # validates :contract_model, presence: true
  # validates :name, presence: true
  # validates :sign_date, presence: true
  # validates :publication_date, presence: true
  # validates :activity, presence: true
  # validates :expense_item, presence: true
  # validates :account_source, presence: true
  # validates :object, presence: true
  # validates :requesting, presence: true
  # validates :process_number, presence: true
  # validates :start_value, presence: true
  # validates :start_date, presence: true
  # validates :finish_date, presence: true
#  validates :observation, presence: true


rails_admin do

      navigation_label 'NECL'

      list do
        field :name
      end

      edit do
        field :contract_model
        field :name, :string
        field :sign_date
        field :publication_date

        field :activity, :string
        field :expense_item, :string
        field :account_source, :string

        field :object
        field :vendor do
           inline_edit false
        end

        field :requesting, :string # Trocar por um binding de uma lista

        field :process_number, :string

        field :start_value
        field :continuum_service

        field :start_date
        field :finish_date

        field :observation


      end

      show do
        exclude_fields :id, :created_at, :updated_at
      end
      # object_label_method do
      #   :custom_label_method
      # end

  end

  def contract_model_enum
    [ 'Concorrência',
      'Tomada de Preços',
      'Pregão',
      'Emergencial (art. 24, IV)',
      'Dispensa',
      'Inexigibilidade']
  end

  def calc_total_executed
    self.total_executed = self.invoices.sum(:value)
  end



end
