class Accountability
  include Mongoid::Document


  field :ug,                   type: String
  field :sector,               type: String
  field :document_type,        type: String
  field :lore_date,            type: Date
  field :accountability_type,  type: String
  field :supervisor_change,    type: String
  field :active,               type: Boolean

  belongs_to :user
  belongs_to :contract, dependent: :destroy

  rails_admin do

      navigation_label 'NECL'

      list do
        exclude_fields :_id, :created_at, :updated_at
      end

      edit do
        exclude_fields :created_at, :updated_at
        field :contract do
          inline_edit false
        end
        field :user do
          inline_edit false
        end
      end

      show do
        exclude_fields :id, :created_at, :updated_at
      end
      object_label_method do
        :custom_label_method
      end

  end

  def custom_label_method
    if (self.contract)
    "#{self.accountability_type} - #{self.contract.name}"
    else
      "criando"
    end
  end

  def accountability_type_enum
    ['Fiscal' ,'Gestor' ,'Vizualizar']
  end

  def subsec_enum
    ['Gabinete Secretário','SSAFAS', 'SSAS' ,'SSAROAS', 'SUBGESTI']
  end

  def sector_enum
    ['GTI', 'GETA' ,'GERA' ,'GEVS']
  end

  def ug_enum
    ['FES', 'HSMA' ,'HINSG' ,'CREFES']
  end


end
