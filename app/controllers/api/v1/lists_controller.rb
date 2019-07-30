class Api::V1::ListsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  before_action :authorize_user

  def show
    list = List.find(params["id"])

    render json: list
  end

  private

  def authorize_user
    if !user_signed_in?
      flash[:notice] = "You do not have access to this page."
      redirect_to new_user_registration_path
    end
  end

end
