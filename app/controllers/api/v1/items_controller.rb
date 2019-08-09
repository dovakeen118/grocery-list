class Api::V1::ItemsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  before_action :authorize_user

  def create
    item = Item.new(item_params)

    list_for_item = List.find(params[:list_id])
    item.list = list_for_item

    if item.quantity == nil || item.quantity == ""
      item.quantity = 1
    end

    if item.measurement == "Optional"
      item.measurement = ""
    end

    if item.aisle == "Optional"
      item.aisle = ""
    end

    if item.save
      render json: item
    else
      render json: { error: item.errors.full_messages }
    end
  end

  def update
    item = Item.find(params["id"])
    item.update(item_params)

    if item.measurement == "Optional"
      item.measurement = ""
    end

    if item.aisle == "Optional"
      item.aisle = ""
    end

    if item.save
      render json: item
    else
      render json: { error: item.errors.full_messages }
    end
  end

  def destroy
    item = Item.find(params["id"])
    list = List.find(params["list_id"])

    if current_user.id == item.list.user_id
      item.destroy
      list_items = list.items
      render json: list_items
    else
      render json: { error: item.errors.full_messages }
    end
  end

  private

  def item_params
    params.require(:item).permit(:item_name, :category, :quantity, :measurement, :aisle)
  end

  def authorize_user
    if !user_signed_in?
      flash[:notice] = "You do not have access to this page."
      redirect_to new_user_registration_path
    end
  end

end
