source "https://rubygems.org"

ruby "3.3.10"

gem "rails", "~> 7.1.6"
gem "activeadmin", "~> 3.2.0"
gem "devise", "~> 4.9"
gem "sassc-rails"
gem "sprockets-rails"
gem "puma", ">= 5.0"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "jbuilder"
gem "tzinfo-data", platforms: %i[ windows jruby ]
gem "bootsnap", require: false
gem 'usage_credits'

group :development, :test do
  gem "sqlite3", "~> 1.7"
  gem "debug", platforms: %i[ mri windows ]
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end

group :production do
  gem "pg", "~> 1.1"
end

