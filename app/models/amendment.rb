class Amendment
  include Mongoid::Document

  field :name, type: String
  field :amendment_type, type: String # Tipo de Aditivo
  field :publication_date, type: Date # Data de Publicação

  # Dotação Orçamentárias

  field :activity, type: String # Atividade
  field :expense_item, type: String # Item de Despesa
  field :account_source, type: String # Fonte de Despesa

  field :object, type: String # Objeto do Aditivo
  field :process_number, type: String # Número do processo de aditivo

  field :amendment_value, type: Money # Valor do Aditivo

  field :start_date, type: Date  #vigencia inicio
  field :finish_date, type: Date #vigencia fim

  field :observation, type: String # Observações

  belongs_to :contract

  # validates :name, presence: true
  # validates :amendment_type, presence: true
  # validates :publication_date, presence: true
  #
  # validates :activity, presence: true
  # validates :expense_item, presence: true
  # validates :account_source, presence: true
  #
  # validates :object, presence: true
  # validates :process_number, presence: true
  #
  # validates :amendment_value, presence: true
  #
  # validates :start_date, presence: true
  # validates :finish_date, presence: true

  # validates :observation, presence: true


  before_create :calc_total_value_amendment



  rails_admin do

      navigation_label 'Eventos'

      list do
        field :name, :string
        field :amendment_type
        field :publication_date
        field :process_number, :string
      end

      edit do
        field :contract do
          inline_add false
          inline_edit false
        end

        field :name, :string
        field :amendment_type
        field :publication_date

        # Dotação Orçamentárias

        field :activity, :string
        field :expense_item, :string
        field :account_source, :string

        field :object
        field :process_number, :string

        field :amendment_value, :string

        field :start_date
        field :finish_date

        field :observation

      end

      show do
        field :name
        field :amendment_type
        field :publication_date

        # Dotação Orçamentárias
        field :activity
        field :expense_item
        field :account_source

        field :object
        field :process_number

        field :amendment_value do
          pretty_value do # used in list view columns and show views, defaults to formatted_value for non-association fields
            humanized_money_with_symbol(value)
          end
        end
        field :start_date
        field :finish_date

        field :observation


      end

      object_label_method do
         :custom_label_method
      end


  end

  def custom_label_method
    "#{self.name}"
  end

  def amendment_type_enum
    [ 'Redução de valor',
      'Acréscimo de valor',
      'Prorrogação de Prazo',
      'Alteração de Cláusula']
  end

  def calc_total_value_amendment
      if (self.amendment_value)
        contrato = self.contract
        if (self.amendment_type == "Redução de valor")
        self.amendment_value= - self.amendment_value
        end
        contrato.total_value  = self.amendment_value + contrato.total_value
        contrato.save!
      end
  end





end
