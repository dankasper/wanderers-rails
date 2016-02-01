# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160201201012) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "locations", force: :cascade do |t|
    t.string   "name"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean  "published"
  end

  create_table "photo_layouts", force: :cascade do |t|
    t.integer  "post_id"
    t.integer  "photo_id"
    t.integer  "top"
    t.string   "align"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "height"
    t.integer  "width"
  end

  add_index "photo_layouts", ["photo_id"], name: "index_photo_layouts_on_photo_id", using: :btree
  add_index "photo_layouts", ["post_id"], name: "index_photo_layouts_on_post_id", using: :btree

  create_table "photos", force: :cascade do |t|
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "image_uid"
    t.string   "image_name"
    t.string   "caption"
    t.integer  "location_id"
    t.boolean  "published"
  end

  add_index "photos", ["location_id"], name: "index_photos_on_location_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "location_id"
    t.boolean  "published"
  end

  add_index "posts", ["location_id"], name: "index_posts_on_location_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "photo_layouts", "photos"
  add_foreign_key "photo_layouts", "posts"
  add_foreign_key "photos", "locations"
  add_foreign_key "posts", "locations"
end
