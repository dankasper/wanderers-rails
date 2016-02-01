class LocationsController < ApplicationController
  def index
    @locations = Location.published
  end    
end
