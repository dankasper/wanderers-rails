class AuthenticationController < ApplicationController
  def login
  end

  def verify_login
    user = User.find_by name: params[:name]
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to new_post_path
    end
  end
end
