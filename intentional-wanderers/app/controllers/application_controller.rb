class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :authenticate

  def authenticate
    if session[:user_id]
      @current_user = User.find session[:user_id]
    end
  end

  def require_authentication
    unless @current_user
      redirect_to login_path
    end
  end
end
