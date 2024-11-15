# Docker 部署MySQL

## 拉取镜像

如果需要选择对应的 mysql 版本，需要在拉取时设置版本信息。

这里我们拉取的是官方 mysql 镜像，如果是非官方镜像部分启动参数可能不同，需要具体查看文档

```shell [bash]
# 默认拉取latest，也就是最新版本
docker pull mysql

# 拉取5.6
docker pull mysql: 5.6

#拉取8.0.27版本
docker pull mysql:8.0.27
```

## 运行mysql

```shell {2-3,6-7} [bash]
docker run --name mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=MySQL密码 \
  -v 宿主机目录:/var/lib/mysql \
  --net 网桥名称 \
  --restart=unless-stopped \
  -d mysql:8.0.27
```

* --name：容器名，此处命名为mysql
* -e：容器配置信息， MYSQL_ROOT_PASSWORD 参数为 mysql 的 root 用户的登陆密码
* -p：端口映射，此处映射 主机3306端口 到 容器的3306端口
* -d：后台运行容器，保证在退出终端后容器继续运行
* --restart=unless-stopped（可选）：重启策略，设置后重启服务器时会自动启动mysql镜像。
* --net（可选）：加入的网桥名称，需要提前使用`docker network create ...`命令创建网桥，加入网桥后，其他同网桥容器可以使用容器名来作为ip访问。如果单机部署多个镜像，并且这些镜像需要访问mysql需要设置，避免重启时ip改变。
* -v（可选）：目录映射，这里是将容器内的mysql数据文件映射到宿主机上，方便在宿主机上直接管理或备份mysql数据文件。如果没有直接操作数据文件的需求，最好不要映射目录，以防误操作。

## 访问mysql

### 命令行

需要进入docker容器后使用

```shell [bash]
# 查看容器id
docker ps

# 进入容器
docker exec 容器id /bin/bash

# 登录mysql
mysql -uroot -p
```

### Navicat / DataGrip

访问方式与一般数据库同理。

如果是远程服务器，使用公网ip。如果是本机，使用本机ip。端口为 `docker run` 时映射的宿主机端口。
