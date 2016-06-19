class Contract
  include Mongoid::Document

  field :contract_model, type: String # modalidade de licitação
  field :contract_type,  type: String # Tipo de Instrumento
  field :name, type: String # Numero do contratos
  field :sign_date, type: Date  # Data de Assinatura
  field :publication_date, type: Date  # Data de Assinatura

  # Dotação Orçamentárias

  field :activity, type: String # Atividade
  field :expense_item, type: String # Item de Despesa
  field :federal_account_source, type: String # Fonte de Despesa Federal
  field :state_account_source, type: String # Fonte de Despesa Estadual
  field :other_account_source, type: String # Fonte de Despesa

  field :object_type, type: String
  field :object, type: String # Objeto do contrato

  field :requesting, type: String # Setor Solicitante, deverá ser uma lista padronizada

  field :process_number, type: String # Número do processo

  # Valores do Contrato
  field :start_value, type: Money #default: 0, fixed_currency: 'BRL' # Valor Incial do contrato

  field :continuum_service, type: Boolean # é Serviço continuado?

  field :start_date, type: Date  #vigencia inicio
  field :finish_date, type: Date #vigencia fim

  field :observation, type: String # Observações
  field :user_id

# Variáveis para uso do sistema

  field :total_value, type: Money #default: 0, fixed_currency: 'BRL'  # Valor global do contrato Será a Soma de Todos Aditivos, Apostilamentos e Valor inicial do Contrato
  field :total_budget, type: Float # Valor total do empenho
  field :total_executed, type: Float # Total executado (soma das notas já executadas)


  belongs_to :vendor, inverse_of: :contract
  has_many :budgets
  has_many :invoices
  has_many :additions
  has_many :amendment
  has_many :closures
  has_many :fines
  has_many :notifications
  has_many :reratifications
  has_many :terminations
  has_one :accountability, :inverse_of => :contract #Fiscal responsáel


# # Validações
#   def accountability_id
#     self.accountability.try :id
#   end
#   def accountability_id=(id)
#     self.accountability = Accountability.find_by_id(id)
#   end


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

  before_create :calc_total_value


rails_admin do

      navigation_label 'NECC'

      list do
        scopes [nil, :Emergencial, :Prazo]
        field :name
        field :contract_model
        field :object_type
        field :finish_date
        field :total_value do
          pretty_value do # used in list view columns and show views, defaults to formatted_value for non-association fields
            humanized_money_with_symbol(value)
          end
        end
        field :accountability
      end

      edit do

        field :contract_model
        field :contract_type
        field :name, :string
        field :sign_date
        field :publication_date
        field :object_type
        field :object
        group :dotacao do
          label "Dotação Orçamentária"
          help "Preencha as Informações de Acordo com a Dotação Orçamentária"
          active false
          field :expense_item, :string
          field :federal_account_source, :string
          field :state_account_source, :string
          field :other_account_source, :string
        end
        field :vendor do
           inline_edit false
        end
        field :requesting
        field :process_number, :string
        field :start_value, :string
        field :continuum_service
        field :start_date
        field :finish_date
        field :observation



      end

      show do
        exclude_fields :id, :created_at, :updated_at, :user_id
        field :total_value do
          pretty_value do # used in list view columns and show views, defaults to formatted_value for non-association fields
            humanized_money_with_symbol(value)
          end
        end
        field :start_value do
          pretty_value do # used in list view columns and show views, defaults to formatted_value for non-association fields
            humanized_money_with_symbol(value)
          end
        end
      end
      # object_label_method do
      #   :custom_label_method
      # end
      export do
        field :sign_date, :date do

        end
      end



  end

  def contract_model_enum
    [ 'Concorrência',
      'Convite',
      'Tomada de Preços',
      'Pregão',
      'Emergencial (art. 24, IV)',
      'Dispensa',
      'Inexigibilidade']
  end
  def contract_type_enum
    [ 'Contrato',
      'Termo de Adesão',
      'Ata de Registro']
  end
  def object_type_enum
    [ 'Serviços',
      'Aquisições',
      'Locações']
  end

  def requesting_enum
     valor = Site.pluck(:name)
  end

  def calc_total_executed
    self.total_executed = self.invoices.sum(:value)
  end

  def calc_total_value
    self.total_value = self.start_value
  end

  scope :Emergencial, -> { where(contract_model: 'Emergencial (art. 24, IV)') }
  scope :Prazo, -> { where( :finish_date => { :$lte => Time.now + 120.days}) }
  # scope :by_sector, -> (sector) { where(requesting: sector) }



  def self.by_sector(sector)
      where(requesting: sector)
  end



end
