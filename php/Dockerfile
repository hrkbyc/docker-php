FROM php:7.2-apache
LABEL maintainer acco

COPY ./php.ini /usr/local/etc/php
COPY ./apache2.conf /etc/apache2/conf-enabled

RUN apt-get update \
  && apt-get install -y \
   gcc \
   make \
   libpng-dev \
   git \
   unzip \
   vim \
   libmcrypt-dev \
   mariadb-client \
   curl \
   gnupg \
   libjpeg62-turbo-dev \
   libfreetype6-dev \
   libicu-dev \
  && docker-php-ext-install mysqli pdo_mysql mbstring zip intl \
  && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
  && docker-php-ext-install -j$(nproc) gd

RUN apt-get update
RUN apt-get install -y locales
RUN locale-gen ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LC_CTYPE ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP.utf8

ENV LC_ALL ja_JP.UTF-8

RUN a2enmod rewrite
