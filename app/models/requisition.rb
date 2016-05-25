class Requisition
  include Mongoid::Document

  field :owner, type: String
  field :number, type: String
  field :requisition_date, type: Date
  field :approval_date, type: Date

  has_one :contract

  before_create :number_increment, :save_date


  rails_admin do

        navigation_label 'NECL'

        list do
          exclude_fields :_id,
                         :created_at,
                         :updated_at

        end

        edit do
          exclude_fields :created_at,
                         :updated_at,
                         :number,
                         :requisition_date
          field :owner, :hidden do
              default_value do
                 bindings[:view]._current_user.name
              end
          end

        end

        show do
          exclude_fields :id, :created_at, :updated_at
        end
        object_label_method do
           :custom_label_method
        end

    end

      def number_increment
        actual_value = Requisition.all.count
        time = Time.now.strftime("%Y%m%d")
        self.number = "#{time}#{actual_value + 1}"
      end

      def custom_label_method
        "#{self.number}"
      end


      def save_date
        self.requisition_date = Time.now
      end


end
