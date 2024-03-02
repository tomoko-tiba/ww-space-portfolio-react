# 构建
npm run build
# 压缩 dist 目录到压缩文件
cd ./dist
zip -r dribbbleCloneFe.zip ./*
# 传输 zip 文件到服务器
scp dribbbleCloneFe.zip ali-hk:
# 删除本地压缩包
rm dribbbleCloneFe.zip
# 服务器中解压文件到网站的 / 目录
ssh ali-hk "unzip -o -d /var/www/html ~/dribbbleCloneFe.zip"
# 服务器中删除压缩包
ssh ali-hk "rm ~/dribbbleCloneFe.zip"