


##  系统
    mocOS

## 依赖安装

### 安装 graphicsmagick
<code>
    # brew install graphicsmagick
</code>

### 安装imagemagick
<code>
    # brew install 安装imagemagick
</code>

### 安装项目依赖
<code>
    npm install
</code>

## 运行
<code>
npm install
</code>

#### 安装问题
<pre>
jpeg.la file not found
解决办法：
brew uninstall jpeg
brew install jpeg
</pre>

### 运行问题
    * git 中的 gm 命令冲突
        解决：
            unalias gm
        当出现某些库文件不存在时，需要手动建立link
    * /usr/local/opt/ 目录下不存在相关的软连接，如 libtool等
        解决：
            ln -s directory linkName

