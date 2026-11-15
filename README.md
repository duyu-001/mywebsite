# 杜玉 · 个人网站

「深夜主场」—— 纯 HTML / CSS / 原生 JS 手工搭建，无框架、无构建、无追踪、无密钥、不花钱。

## 本地打开看效果

任选一种：

1. **直接双击** `index.html`，浏览器打开即可。
2. **起个本地服务器**（体验更接近真实部署）：

   ```bash
   # 在项目根目录执行
   python -m http.server 8000
   # 然后浏览器访问 http://localhost:8000
   ```

   或者 `npx serve .`。

## 目录结构

```
mywebsite/
├── index.html      首页（关于我 / 占位区 / 联系方式）
├── tennis.html     网球场（卡网高超技巧展示）
├── favicon.svg     站点图标
├── css/style.css   全部样式
└── js/main.js      全部交互（滚动渐显、复制邮箱、两个彩蛋）
```

## 页面里的「占位区」怎么填

网站里所有经历 / 作品 / 奖项 / 照片 / 技巧都是**空占位**，等真实内容：

- **首页「留给未来的我」**：把 `index.html` 里 `.slot` 的「［待填写］」文字换成真实内容；没有的卡片整张删掉。
- **网球场照片/视频**：素材放进 `assets/` 文件夹，把 `tennis.html` 里对应的 `.media-slot` 整块替换成 `<img src="assets/xxx.jpg" alt="说明">`。
- **技巧卡**：把「［待填写：技巧名称］」等换成真实技巧说明，没有的删掉。

> 原则：没有的就留空或删除，不要编造。

## 想上线（免费）

推到 GitHub 后：仓库 **Settings → Pages → Source 选 `main` 分支根目录**，几分钟后就有 `https://duyu-001.github.io/mywebsite/` 的网址。全程免费，不需要任何密钥。
