# code-server Dokcer部署方法及踩坑

如果还需要 Nginx 反向代理 code-server，看文本文后看这篇文章： [点我跳转](./code-server%20Dokcer+Nginx%20部署方法及踩坑)

## 简介

> code-server是一款服务端的vscode，可以在浏览器中使用vscode

[code-server官网](https://coder.com/docs/code-server/latest)

![](https://dxytoll-img-1304942391.cos.ap-nanjing.myqcloud.com/img/blog/image.png)

## 安装

官方提供的安装方法：[https://coder.com/docs/code-server/latest/install](https://coder.com/docs/code-server/latest/install)
![](https://dxytoll-img-1304942391.cos.ap-nanjing.myqcloud.com/img/blog/image-1654851442564.png)

官方提供了许多的安装方式，这里为了方便快捷，我们使用Docker部署，[Docker Hub](https://hub.docker.com/r/codercom/code-server)。官方镜像支持 amd64 和 arm64，如果需要arm32，可以使用社区版镜像[https://hub.docker.com/r/linuxserver/code-server](https://hub.docker.com/r/linuxserver/code-server)。这里我们使用官方镜像。

在官网中Docker安装的方法中，映射了以下两个目录：
1. `/home/coder/.config`：code-server的配置文件，里面包含了登录密码。容器第一次启动时如果`.config`文件夹为空，会自动创建配置文件，docker的启动日志中可以查看。具体配置文件为`/home/coder/.config/code-server/config.yaml`![](https://dxytoll-img-1304942391.cos.ap-nanjing.myqcloud.com/img/blog/image-1654852173730.png)
2. `/home/coder/project`：code-server默认提供的工程目录，映射在物理机方便用户修改查看，当然你也可以映射自己的目录。

自动创建的`config.yaml`文件会包含密码。密码是自动生成的，可以自己修改。

```shell [bash]
# 拉取镜像
docker pull codercom/code-server:latest

# 创建物理机所需要的映射目录
mkdir -p /www/wwwroot/coder-server/.config 
mkdir -p /www/wwwroot/coder-server/project 

# 创建容器
docker run -d -it --name code-server -p 8080:8080 \   
  -v "/www/wwwroot/coder-server/.config:$HOME/.config" \  
  -v "/www/wwwroot/coder-server/project:/home/coder/project" \ 
  -u "$(id -u):$(id -g)" \
  -e "DOCKER_USER=$USER" \ 
  codercom/code-server:latest
```

查看`config.yaml`中的密码，并访问8080端口就可以使用了！！！！

*如果无法使用可以看踩坑（本人调试了3小时😢）*

## 踩坑

### 访问提示401错误

这是由于配置文件`config.yaml`不存在，或者配置文件有误。我在第一次创建容器时，Docker日志提示创建了默认的配置文件，但是`.config`文件夹为空。

新建一个没有映射的容器，进入容器后执行`cat ~/.config/code-server/config.yaml`并复制文件内容，之后在物理机映射目录创建文件`.config/cod-server/config.yaml`粘贴内容。之后删除新建的容器，重启之前的容器。

也可以直接使用以下内容创建新文件（之后版本有可能配置文件有变，如果无效使用上面的方式）

```yaml [config.yaml]
bind-addr: 127.0.0.1:8080
auth: password
password: *****
cert: false
```

到这里重启容器后理论上是可以正常使用了，但我在尝试后还是有问题，可以在新建容器时填入密码参数，这样无论配置文件是否存在都可以使用。

```shell [bash]
docker run -d -it --name code-server -p 8080:8080 \
  -v "/www/wwwroot/coder-server/.config:$HOME/.config" \
  -v "/www/wwwroot/coder-server/project:/home/coder/project" \
  -u "$(id -u):$(id -g)" \
  -e "DOCKER_USER=$USER" \
  -e "PASSWORD"=***** \
  codercom/code-server:latest
```

还可以不映射配置文件到物理机，之后修改配置可以进入容器再修改。

```shell [bash]
docker run -d -it --name code-server -p 8080:8080 \
  -v "/www/wwwroot/coder-server/project:/home/coder/project" \
  -u "$(id -u):$(id -g)" \
  -e "DOCKER_USER=$USER" \
  codercom/code-server:latest
```

### 部分功能无法使用，部分插件失效

右下角应该有如下的提示：
> code-server is being accessed in an insecure context. Web views, the clipboard, and other functionality may not work as expected.

因为部分组件依赖于第三方的数据，这些数据请求时协议为https，如果部署时未使用https协议，浏览器因为安全问题无法获取数据。这时可以使用 Nginx + 证书配置反向代理才可以正常使用。[点我跳转](./code-server%20Dokcer+Nginx%20部署方法及踩坑)