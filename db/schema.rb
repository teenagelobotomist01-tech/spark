# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2026_02_01_233952) do
  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.integer "resource_id"
    t.string "author_type"
    t.integer "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "usage_credits_allocations", force: :cascade do |t|
    t.bigint "transaction_id", null: false
    t.bigint "source_transaction_id", null: false
    t.integer "amount", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["source_transaction_id"], name: "index_allocations_on_source_transaction_id"
    t.index ["transaction_id", "source_transaction_id"], name: "index_allocations_on_tx_and_source_tx"
    t.index ["transaction_id"], name: "index_allocations_on_transaction_id"
  end

  create_table "usage_credits_fulfillments", force: :cascade do |t|
    t.bigint "wallet_id", null: false
    t.string "source_type"
    t.bigint "source_id"
    t.integer "credits_last_fulfillment", null: false
    t.string "fulfillment_type", null: false
    t.datetime "last_fulfilled_at"
    t.datetime "next_fulfillment_at"
    t.string "fulfillment_period"
    t.datetime "stops_at"
    t.json "metadata", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fulfillment_type"], name: "index_usage_credits_fulfillments_on_fulfillment_type"
    t.index ["next_fulfillment_at"], name: "index_usage_credits_fulfillments_on_next_fulfillment_at"
    t.index ["source_type", "source_id"], name: "index_usage_credits_fulfillments_on_source"
    t.index ["wallet_id"], name: "index_usage_credits_fulfillments_on_wallet_id"
  end

  create_table "usage_credits_transactions", force: :cascade do |t|
    t.bigint "wallet_id", null: false
    t.integer "amount", null: false
    t.string "category", null: false
    t.datetime "expires_at"
    t.bigint "fulfillment_id"
    t.json "metadata", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category"], name: "index_usage_credits_transactions_on_category"
    t.index ["expires_at", "id"], name: "index_transactions_on_expires_at_and_id"
    t.index ["expires_at"], name: "index_usage_credits_transactions_on_expires_at"
    t.index ["fulfillment_id"], name: "index_usage_credits_transactions_on_fulfillment_id"
    t.index ["wallet_id", "amount"], name: "index_transactions_on_wallet_id_and_amount"
    t.index ["wallet_id"], name: "index_usage_credits_transactions_on_wallet_id"
  end

  create_table "usage_credits_wallets", force: :cascade do |t|
    t.string "owner_type", null: false
    t.bigint "owner_id", null: false
    t.integer "balance", default: 0, null: false
    t.json "metadata", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_type", "owner_id"], name: "index_usage_credits_wallets_on_owner"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "usage_credits_allocations", "usage_credits_transactions", column: "source_transaction_id"
  add_foreign_key "usage_credits_allocations", "usage_credits_transactions", column: "transaction_id"
end
