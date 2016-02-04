class TagsController < ApplicationController
  def show
    @tagged_posts = Post.all.select { |post| post.tags.include? params[:tag] }
    photos_in_posts = @tagged_posts.map(&:photos).reduce(:+)
    @tagged_photos = Photo.all.select { |photo| photo.tags.include?(params[:tag]) && !photos_in_posts.include?(photo) }
    @tagged_content = (@tagged_photos + @tagged_posts).sort_by(&:created_at).reverse
  end
end
