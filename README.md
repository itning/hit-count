# hit count

[![GitHub stars](https://img.shields.io/github/stars/itning/hit-count.svg?style=social&label=Stars)](https://github.com/itning/hit-count/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/itning/hit-count.svg?style=social&label=Fork)](https://github.com/itning/hit-count/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/itning/hit-count.svg?style=social&label=Watch)](https://github.com/itning/hit-count/watchers)
[![GitHub followers](https://img.shields.io/github/followers/itning.svg?style=social&label=Follow)](https://github.com/itning?tab=followers)

[![GitHub issues](https://img.shields.io/github/issues/itning/hit-count.svg)](https://github.com/itning/hit-count/issues)
[![GitHub license](https://img.shields.io/github/license/itning/hit-count.svg)](https://github.com/itning/hit-count/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/itning/hit-count.svg)](https://github.com/itning/hit-count/commits)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/itning/hit-count.svg)](https://github.com/itning/hit-count)
[![language](https://img.shields.io/badge/language-JavaScript-green.svg)](https://github.com/itning/hit-count)

## 简介

仓库访问频次计数徽章

效果：
![hitCount](https://hitcount.itning.top?u=itning&r=hit-count)



使用[腾讯云函数](https://console.cloud.tencent.com/scf/)实现，后端采用redis计数

## 如何部署自己的计数器？

### 前提

1. 有能够使云函数访问的Redis服务器，点我查看如何白嫖Redis服务器
2. 腾讯云账号

或者你有服务器那直接部署在服务器上即可，不需要腾讯云函数。

### 步骤

1. 克隆仓库到本地

   `git clone https://github.com/itning/hit-count.git`

2. 进入目录中

   `cd ./hit-count/src`

3. 安装依赖

   `npm install`

4. 修改redis的访问路径

   修改`app.js`文件

   ```javascript
   const redisStore = new redis({
       port: 16320, // Redis instance port, redis实例端口
       host: "", // Redis instance host, redis实例host
       family: 4, // 4 (IPv4) or 6 (IPv6)
       password: "", // Redis instance password, redis实例密码
       db: 0
   });
   ```

5. 添加访问域名白名单

   修改`app.js`文件

   ```javascript
   const authorWhitelist = ["itning"];
   ```

   默认是作者自己，需要修改下

6. 安装腾讯云SLS

   `npm install -g serverless`

7. 上传

   `serverless deploy --debug`

8. 进入腾讯云控制台查看结果