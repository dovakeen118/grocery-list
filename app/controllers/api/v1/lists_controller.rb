class Api::V1::ListsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  before_action :authorize_user

  def index
    lists = current_user.lists
    render json: { lists: lists, user: current_user }
  end

  def show
    list = List.find(params["id"])
    items = list.items
    render json: { list: list, items: items }
  end

  def create
    list = List.new(list_params)
    list.user = current_user

    if list.save
      render json: list
    else
      render json: { error: list.errors.full_messages }
    end
  end

  def update
    list_to_update = List.find(params["id"])
    list_to_update.update(list_params)

    if list_to_update.save
      render json: list_to_update
    else
      render json: { error: list_to_update.errors.full_messages }
    end
  end

  def destroy
    list = List.find(params["id"])

    if current_user.id == list.user_id
      list.destroy
      lists = current_user.lists
      render json: { lists: lists, user: current_user }
    else
      render json: { list: list, error: list.errors.full_messages }
    end
  end

  private

  def list_params
    params.require(:list).permit(:list_name)
  end

  def authorize_user
    if !user_signed_in?
      flash[:notice] = "You do not have access to this page."
      redirect_to new_user_registration_path
    end
  end

end
