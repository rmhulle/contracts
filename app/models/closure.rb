class Closure
  include Mongoid::Document

  field :name, type: String
  field :closure_type, type: String
  field :closure_date, type: Date
  field :contractual_balance, type: Float

  belongs_to :contract


  rails_admin do

      navigation_label 'Eventos'

      list do
        field :name
        field :closure_type
        field :closure_date
        field :contractual_balance
      end

      edit do
        field :contract do
          inline_add false
          inline_edit false
        end
        field :name
        field :closure_type
        field :closure_date
        field :contractual_balance

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


  def closure_type_enum
    ['Cumprimento do Objeto',
     'Exaurimento dos Recursos Financeiros',
     'Exaurimento do Limite Legal de Duração']
  end


end
