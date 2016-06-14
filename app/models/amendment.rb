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

  field :amendment_value, type: Float # Valor do Aditivo

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

        field :amendment_value

        field :start_date
        field :finish_date

        field :observation

      end

      show do

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







end
