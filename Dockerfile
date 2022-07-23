# ベースイメージを指定
FROM node:16.2.0

# 環境変数設定
ENV NODE_ENV="development"

# 作業ディレクトリ作成&設定
WORKDIR /src

COPY ./app /src
RUN npm install
CMD npm run start