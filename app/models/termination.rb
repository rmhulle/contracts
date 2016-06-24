class Termination
  include Mongoid::Document

  field :name, type: String
  field :justification, type: String
  field :process_number, type: String
  field :publication_date, type: Date

  belongs_to :contract
  rails_admin do

      navigation_label 'Eventos'

      list do
        field :name
        field :process_number
        field :publication_date
        field :contract
      end

      edit do
        field :contract do
          inline_add false
          inline_edit false
        end
        field :name
        field :justification
        field :process_number, :string
        field :publication_date
      end

      show do
      end

      object_label_method do
         :custom_label_method
      end


  end

  def custom_label_method
    "#{self.name} - #{self.contract.name}"
  end





end
