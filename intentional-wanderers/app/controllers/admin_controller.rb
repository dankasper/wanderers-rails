class AdminController < ApplicationController
  before_filter :require_authentication

  def index
  end
end
