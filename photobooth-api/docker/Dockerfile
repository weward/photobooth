FROM php:8.1 as php

RUN apt-get update -y
RUN apt-get install -y unzip libpq-dev libcurl4-gnutls-dev libxml2-dev ssh
RUN docker-php-ext-install pdo pdo_mysql bcmath

RUN pecl install -o -f redis \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable redis

RUN docker-php-ext-install soap curl

WORKDIR /var/www
COPY . .


# Copy & Move Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
COPY --from=composer:2.4.4 /usr/bin/composer /usr/local/bin/composer

# Install Laravel Envoy
RUN composer global require "laravel/envoy=^2.8"

ENV PORT=8000
ENTRYPOINT [ "docker/entrypoint.sh" ]

# ==============================================================================
#  node
FROM node:14-alpine as node

WORKDIR /var/www
COPY . .

RUN npm install --global cross-env
RUN npm install

VOLUME /var/www/node_modules