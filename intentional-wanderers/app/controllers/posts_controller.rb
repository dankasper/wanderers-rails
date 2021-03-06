class PostsController < ApplicationController
  before_action :require_authentication, except: [:index, :show]
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    location = Location.new name: 'Location'
    @post = Post.new title: 'Title', body: 'Say something cool here', location: location, tags: []
    @callback_method = 'POST'
    @callback_url = posts_path
  end

  # GET /posts/1/edit
  def edit
    @callback_method = 'PUT'
    @callback_url = post_path @post 
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)
    update_location

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, status: 201 }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    update_location
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, status: 200 }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :body, :published, :tags, photo_layouts_attributes: [:id, :photo_id, :top, :align, :height, :width])
    end

    def location_params
      params.require(:location).permit(:name, :latitude, :longitude)
    end

    def update_location
      if location = Location.find_by(name: params[:location][:name])
        @post.location = location
      else
        @post.location = Location.create(location_params)
      end
    end
end
