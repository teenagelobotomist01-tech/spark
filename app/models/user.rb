class User < ApplicationRecord
  has_credits
  after_create :assign_initial_credits 


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  private def 
   assign_initial_credits 
   give_credits(100, reason: "signup_bonus")
 end
end
