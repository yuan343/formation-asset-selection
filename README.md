# Formation Asset Selection & Redesign Engine

Formation 资产海选、候选排序与再开发场景评估系统的交互式网页草版。

## 当前内容

- STEP 1：海选池与可救性判断
- STEP 2：候选分层、风险调整价值与资源优先级
- STEP 3：假设场景生成与优化
- 决策总览、结论、证据、未知项和审计线索

> 当前页面使用演示数据和模型假设，不能被视为投资、医学、监管或交易建议。

## 本地查看

直接打开 `index.html`，或者使用任意静态网页服务器打开本目录。

## 发布到 GitHub Pages

1. 在 GitHub 创建名为 `formation-asset-selection` 的仓库。
2. 将本目录中的全部文件上传到仓库的 `main` 分支。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment → Source** 中选择 **GitHub Actions**。
5. 打开 **Actions** 页面，等待 `Deploy Formation site to GitHub Pages` 完成。
6. 网站地址通常为：`https://<GitHub用户名>.github.io/formation-asset-selection/`。

以后只要修改代码并推送到 `main`，网站就会自动重新发布，网址不变。

## 文件说明

- `index.html`：页面结构与入口
- `styles.css`：视觉样式
- `app.js`：当前演示数据、筛选规则和交互逻辑
- `.github/workflows/pages.yml`：GitHub Pages 自动发布流程

## 自动采集的下一阶段

当前版本尚未连接外部实时数据源。后续建议按以下顺序增加：

1. ClinicalTrials.gov、PubMed、FDA 等官方 API 采集器
2. 资产名称与别名标准化、去重和变化检测
3. STEP 1–3 规则重新计算
4. 证据来源、采集时间、置信度与冲突记录
5. 人工审核队列
6. 更新公开数据文件并自动重新发布网页

真实或保密资产数据不应直接写入本仓库或前端 JavaScript；正式版应使用登录权限、后台服务和数据库。
