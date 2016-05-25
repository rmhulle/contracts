class Budget
  include Mongoid::Document


  field :name, type: String
  field :date, type: Date
  field :value, type: Float

  belongs_to :contract
  before_save :calc_total_budget

  rails_admin do

      navigation_label 'Fiscal'

      list do
        exclude_fields :_id, :created_at, :updated_at
      end

      edit do
        exclude_fields :created_at, :updated_at
      end

      show do
        exclude_fields :id, :created_at, :updated_at
      end
      # object_label_method do
      #   :custom_label_method
      # end

  end

  def calc_total_budget
    idContrato = self.contract._id
    contrato = Contract.where(id: idContrato).first
    contrato.total_budget = contrato.budgets.sum(:value) + self.value
    contrato.save
  end

end
