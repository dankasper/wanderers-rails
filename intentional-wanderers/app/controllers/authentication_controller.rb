class AuthenticationController < ApplicationController
  def login
  end

  def verify_login
    user = User.find_by name: params[:name]
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to admin_path
    else
      flash[:alert] = 'Login Failed'
      redirect_to login_path
    end
  end
end
