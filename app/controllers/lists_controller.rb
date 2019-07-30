class ListsController < ApplicationController
  before_action :authorize_user

  def index
    @current_user = current_user
    @lists = List.all
  end

  private

  def authorize_user
    if !user_signed_in?
      flash[:notice] = "You do not have access to this page."
      redirect_to new_user_registration_path
    end
  end

end
