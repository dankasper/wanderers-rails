class WelcomeController < ApplicationController
  def index
    @current_location = Location.last
  end
end
