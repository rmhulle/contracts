class Accountability
  include Mongoid::Document


  field :ug,                   type: String
  #field :sector,               type: String
  field :document_type,        type: String
  field :lore_date,            type: Date
  field :accountability_type,  type: String
  field :supervisor_change,    type: String
  field :active,               type: Boolean

  belongs_to :user

  belongs_to :contract, dependent: :destroy, :inverse_of => :accountability


  before_save :update_contract

  rails_admin do

      navigation_label 'NECC'

      list do
        field :contract
        field :lore_date
        field :user
        field :ug
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
    "#{self.user.name} - #{self.contract.name}"
    else
      "criando"
    end
  end

  def update_contract

    contrato = Contract.where(id: self.contract_id).first
    contrato.user_id = self.user_id
    contrato.save!

  end


  def accountability_type_enum
    ['Fiscal' ,'Gestor' ,'Vizualizar']
  end

  def subsec_enum
    ['Gabinete Secretário','SSAFAS', 'SSAS' ,'SSAROAS', 'SUBGESTI']
  end

  def ug_enum # Completar a listas de ug
    ['SESA[FES]', 'HSMA' ,'HINSG' ,'CREFES','HDS', 'HIMABA', 'HABF', 'HRAS', 'UIJM', 'CAPAAC', 'HRC', 'HSJN']
  end


end
