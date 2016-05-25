class Renovation
  include Mongoid::Document

  field :observation, type: String

  belongs_to :contract

end
