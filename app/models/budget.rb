class Budget
  include Mongoid::Document


  field :name, type: String
  field :date, type: Date
  field :value, type: Float
  field :user_id

  belongs_to :contract
  before_save :calc_total_budget

  rails_admin do

      navigation_label 'Fiscal'

      list do
        field :name
        field :date
        field :value
        field :contract
      end

      edit do
        exclude_fields :created_at, :updated_at
        field :user_id, :hidden do
          visible false
          default_value do
            bindings[:view]._current_user.id
          end
        end
        field :contract do
          associated_collection_scope do
            user_now = bindings[:controller].current_user.id

            Proc.new { |scope|
              scope = Contract.where(user_id: user_now)
              }

          end
        end
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
