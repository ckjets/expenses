# ベースイメージを指定
FROM node:10.12

# 環境変数設定
ENV NODE_ENV="development"

# 作業ディレクトリ作成&設定
WORKDIR /src

COPY ./app /src

RUN npm install

CMD npm run start
# buildしなおさないといけない
# CMD npm run dev
