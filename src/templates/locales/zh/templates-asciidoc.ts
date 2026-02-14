/**
 * Chinese Templates - AsciiDoc Format
 *
 * Contains all arc42 section templates in Chinese using AsciiDoc syntax.
 * Based on the official arc42 templates from vendor/arc42-template.
 *
 * @module templates/locales/zh/templates-asciidoc
 */

import type { Arc42Section } from '../../../types.js';

/**
 * Get the Chinese AsciiDoc template for a specific section
 */
export function getTemplate(section: Arc42Section): string {
  const templates: Record<Arc42Section, () => string> = {
    '01_introduction_and_goals': getIntroductionAndGoalsTemplate,
    '02_architecture_constraints': getArchitectureConstraintsTemplate,
    '03_context_and_scope': getContextAndScopeTemplate,
    '04_solution_strategy': getSolutionStrategyTemplate,
    '05_building_block_view': getBuildingBlockViewTemplate,
    '06_runtime_view': getRuntimeViewTemplate,
    '07_deployment_view': getDeploymentViewTemplate,
    '08_concepts': getConceptsTemplate,
    '09_architecture_decisions': getArchitectureDecisionsTemplate,
    '10_quality_requirements': getQualityRequirementsTemplate,
    '11_technical_risks': getTechnicalRisksTemplate,
    '12_glossary': getGlossaryTemplate
  };

  return templates[section]();
}

function getIntroductionAndGoalsTemplate(): string {
  return `= 1. 引言与目标

== 需求概述

*目的*：描述软件架构师和开发团队必须考虑的相关需求和驱动因素。

=== 关键需求

// 列出前 3-5 个功能需求

[options="header",cols="1,3,1"]
|===
|编号 |需求 |优先级
|REQ-1 |[简要描述] |高
|REQ-2 |[简要描述] |中
|===

=== 特性

// 系统的基本特性

* 特性 1：[描述]
* 特性 2：[描述]

== 质量目标

*目的*：定义对干系人最重要的前 3-5 个质量目标。

// 基于 ISO 25010，优先考虑以下质量属性：
// 性能、安全性、可靠性、可维护性、可用性等。

[options="header",cols="1,2,3"]
|===
|优先级 |质量目标 |动机
|1 |[例如：性能] |[为什么这很关键]
|2 |[例如：安全性] |[为什么这很关键]
|3 |[例如：可维护性] |[为什么这很关键]
|===

== 干系人

*目的*：识别所有应该了解架构的人员。

[options="header",cols="2,2,3"]
|===
|角色/姓名 |联系方式 |期望
|产品负责人 |[姓名/邮箱] |[他们对架构的期望]
|开发团队 |[团队名称] |[他们需要了解什么]
|运维团队 |[团队/人员] |[部署和运维关注点]
|最终用户 |[类型] |[用户体验期望]
|===

.更多信息
参见 arc42 文档中的 link:https://docs.arc42.org/section-1/[引言与目标]。
`;
}

function getArchitectureConstraintsTemplate(): string {
  return `= 2. 架构约束

*目的*：记录任何约束架构师在设计和实现决策自由度的需求。

== 技术约束

[options="header",cols="1,3"]
|===
|约束 |说明
|[例如：必须运行在 Linux 上] |[为什么存在此约束]
|[例如：最低 Java 17] |[组织要求]
|===

== 组织约束

[options="header",cols="1,3"]
|===
|约束 |说明
|[例如：团队规模：5 名开发人员] |[对架构的影响]
|[例如：时间线：6 个月] |[交付约束]
|===

== 约定

[options="header",cols="1,3"]
|===
|约定 |说明
|[例如：代码风格：Google Java Style] |[风格指南链接]
|[例如：文档：arc42] |[文档要求]
|===

.更多信息
参见 arc42 文档中的 link:https://docs.arc42.org/section-2/[架构约束]。
`;
}

function getContextAndScopeTemplate(): string {
  return `= 3. 上下文和边界

*目的*：将您的系统（即边界范围）与其所有通信方（周边系统和用户，即您系统的上下文）界定清晰。

== 业务上下文

*目的*：指定所有通信方（用户、IT 系统等）并解释特定领域的输入和输出。

// 在此处添加上下文图（PlantUML、Mermaid 或图片）

[plantuml, business-context, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

Person(user, "用户", "系统用户")
System(system, "您的系统", "描述")
System_Ext(external, "外部系统", "描述")

Rel(user, system, "使用")
Rel(system, external, "调用")
@enduml
----

[options="header",cols="1,2,2"]
|===
|通信方 |输入 |输出
|[用户/系统名称] |[他们发送的内容] |[他们接收的内容]
|===

== 技术上下文

*目的*：指定系统与其上下文之间的技术信道和协议。

// 带有协议的技术基础设施

[options="header",cols="1,1,2"]
|===
|通信方 |信道 |协议
|[系统名称] |[例如：REST API] |[例如：HTTPS、JSON]
|[系统名称] |[例如：消息队列] |[例如：AMQP]
|===

.更多信息
参见 arc42 文档中的 link:https://docs.arc42.org/section-3/[上下文和边界]。
`;
}

function getSolutionStrategyTemplate(): string {
  return `= 4. 解决方案策略

*目的*：塑造系统架构的基本决策和解决方案策略的简短总结。

== 技术决策

[options="header",cols="1,2,2"]
|===
|决策 |选择 |理由
|编程语言 |[例如：TypeScript] |[为什么选择这个]
|框架 |[例如：NestJS] |[为什么选择这个]
|数据库 |[例如：PostgreSQL] |[为什么选择这个]
|===

== 顶层分解

描述高层结构：

* [例如：分层架构]
* [例如：微服务]
* [例如：事件驱动]

== 质量实现策略

[options="header",cols="1,2"]
|===
|质量目标 |实现策略
|[性能] |[例如：缓存、异步处理]
|[安全性] |[例如：OAuth2、静态加密]
|[可维护性] |[例如：整洁架构、全面测试]
|===

.更多信息
参见 arc42 文档中的 link:https://docs.arc42.org/section-4/[解决方案策略]。
`;
}

function getBuildingBlockViewTemplate(): string {
  return `= 5. 构建块视图

*目的*：系统静态分解为构建块及其依赖关系。

== 级别 1：整体系统

*目的*：白盒描述显示整体系统的内部结构。

=== 白盒描述

// 在此处添加组件图

[plantuml, building-blocks-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Container(web, "Web 应用", "React", "用户界面")
Container(api, "API 服务器", "Node.js", "业务逻辑")
ContainerDb(db, "数据库", "PostgreSQL", "数据存储")

Rel(web, api, "调用", "REST/JSON")
Rel(api, db, "读取/写入", "SQL")
@enduml
----

=== 包含的构建块

[options="header",cols="1,3"]
|===
|构建块 |描述
|[组件 A] |[职责和目的]
|[组件 B] |[职责和目的]
|===

== 级别 2：[子系统名称]

*目的*：将主要组件分解为更小的构建块。

=== 白盒 [组件 A]

// 描述组件 A 的内部结构

[options="header",cols="1,3"]
|===
|构建块 |描述
|[子组件 A.1] |[职责]
|[子组件 A.2] |[职责]
|===

.更多信息
参见 arc42 文档中的 link:https://docs.arc42.org/section-5/[构建块视图]。
`;
}

function getRuntimeViewTemplate(): string {
  return `= 6. 运行时视图

*目的*：记录构建块在运行时的行为和交互。

== 场景 1：[例如：用户登录]

// 描述关键场景的运行时行为

[plantuml, runtime-login, svg]
----
@startuml
actor 用户
participant "Web 应用" as Web
participant "API 服务器" as API
participant "认证服务" as Auth
database "用户数据库" as DB

用户 -> Web: 输入凭证
Web -> API: POST /auth/login
API -> Auth: 验证凭证
Auth -> DB: 查询用户
DB --> Auth: 用户数据
Auth --> API: JWT 令牌
API --> Web: 成功 + 令牌
Web --> 用户: 仪表板
@enduml
----

=== 描述

. 用户在 Web 应用中输入凭证
. Web 应用向 API 服务器发送登录请求
. API 通过认证服务验证凭证
. 成功后返回 JWT 令牌

== 场景 2：[例如：数据处理]

// 记录另一个重要的运行时场景

=== 描述

[描述步骤和交互]

.更多信息
参见 arc42 文档中的 link:https://docs.arc42.org/section-6/[运行时视图]。
`;
}

function getDeploymentViewTemplate(): string {
  return `= 7. 部署视图

*目的*：技术基础设施，包括环境、计算机、处理器、拓扑结构。

== 基础设施级别 1

*目的*：部署基础设施概览。

[plantuml, deployment-l1, svg]
----
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Deployment.puml

Deployment_Node(cloud, "云服务提供商", "AWS/Azure/GCP") {
    Deployment_Node(web_tier, "Web 层") {
        Container(web, "Web 服务器", "nginx", "静态文件 + 反向代理")
    }
    Deployment_Node(app_tier, "应用层") {
        Container(api, "API 服务器", "Node.js", "业务逻辑")
    }
    Deployment_Node(data_tier, "数据层") {
        ContainerDb(db, "数据库", "PostgreSQL", "主存储")
    }
}
@enduml
----

=== 动机

[为什么选择这种部署架构]

=== 质量和性能特征

[此部署如何支持质量目标]

== 基础设施级别 2

*目的*：特定部署节点的详细视图。

=== [节点名称]

[options="header",cols="1,3"]
|===
|方面 |描述
|硬件 |[例如：4 vCPU，16GB RAM]
|软件 |[例如：Ubuntu 22.04，Docker 24.x]
|网络 |[例如：VPC，安全组]
|===

.更多信息
参见 arc42 文档中的 link:https://docs.arc42.org/section-7/[部署视图]。
`;
}

function getConceptsTemplate(): string {
  return `= 8. 跨领域概念

*目的*：与多个构建块相关的整体规则和解决方案思路。

== 领域模型

// 核心领域概念及其关系

[plantuml, domain-model, svg]
----
@startuml
class 用户 {
  +id: UUID
  +email: String
  +name: String
}
class 订单 {
  +id: UUID
  +status: OrderStatus
  +createdAt: DateTime
}
用户 "1" -- "*" 订单 : 下单
@enduml
----

== 安全概念

=== 认证

[描述认证方法：JWT、OAuth2 等]

=== 授权

[描述授权方法：RBAC、ABAC 等]

== 错误处理

[描述系统如何处理错误]

* [例如：全局错误处理器]
* [例如：结构化错误响应]
* [例如：错误日志策略]

== 日志和监控

[options="header",cols="1,2"]
|===
|方面 |方法
|日志 |[例如：结构化 JSON 日志，ELK 栈]
|指标 |[例如：Prometheus，Grafana]
|追踪 |[例如：OpenTelemetry，Jaeger]
|===

== 测试策略

[options="header",cols="1,2,1"]
|===
|类型 |范围 |覆盖率目标
|单元测试 |单个函数/类 |80%
|集成测试 |组件交互 |关键路径
|端到端测试 |完整用户流程 |关键流程
|===

.更多信息
参见 arc42 文档中的 link:https://docs.arc42.org/section-8/[跨领域概念]。
`;
}

function getArchitectureDecisionsTemplate(): string {
  return `= 9. 架构决策

*目的*：记录重要的、高成本的、大规模的或有风险的架构决策。

== ADR-001：[决策标题]

=== 状态

[提议 | 已接受 | 已弃用 | 已取代]

=== 上下文

[描述促使做出此决策的问题]

=== 决策

[描述做出的决策]

=== 后果

*正面：*

* [好处 1]
* [好处 2]

*负面：*

* [缺点 1]
* [缺点 2]

=== 考虑的替代方案

[options="header",cols="1,2,2"]
|===
|替代方案 |优点 |缺点
|[选项 A] |[好处] |[缺点]
|[选项 B] |[好处] |[缺点]
|===

'''

== ADR-002：[决策标题]

// 对于其他决策使用相同的模板

.更多信息
参见 arc42 文档中的 link:https://docs.arc42.org/section-9/[架构决策]。
`;
}

function getQualityRequirementsTemplate(): string {
  return `= 10. 质量需求

*目的*：具体的质量需求及用于评估的场景。

== 质量树

// 质量目标及其细化的可视化表示

[plantuml, quality-tree, svg]
----
@startmindmap
* 质量
** 性能
*** 响应时间
*** 吞吐量
** 安全性
*** 认证
*** 授权
** 可维护性
*** 模块化
*** 可测试性
@endmindmap
----

== 质量场景

=== 性能场景

[options="header",cols="1,2,1,1"]
|===
|编号 |场景 |预期响应 |优先级
|PERF-1 |用户在正常负载下请求仪表板 |< 200ms |高
|PERF-2 |系统处理 1000 个并发用户 |无降级 |中
|===

=== 安全场景

[options="header",cols="1,2,1,1"]
|===
|编号 |场景 |预期行为 |优先级
|SEC-1 |无效登录尝试 |5 次尝试后锁定账户 |高
|SEC-2 |未授权的 API 访问 |返回 401，记录审计日志 |高
|===

=== 可维护性场景

[options="header",cols="1,2,1,1"]
|===
|编号 |场景 |预期工作量 |优先级
|MAINT-1 |添加新实体类型 |< 2 天开发 |中
|MAINT-2 |更新依赖版本 |< 4 小时（包括测试） |中
|===

.更多信息
参见 arc42 文档中的 link:https://docs.arc42.org/section-10/[质量需求]。
`;
}

function getTechnicalRisksTemplate(): string {
  return `= 11. 风险和技术债务

*目的*：识别和跟踪已知的技术风险和累积的技术债务。

== 技术风险

[options="header",cols="1,2,1,2"]
|===
|风险 |描述 |概率 |缓解措施
|[例如：第三方 API 故障] |[我们依赖的外部服务] |中 |[熔断器、降级方案]
|[例如：数据丢失] |[数据库损坏] |低 |[备份、复制]
|===

== 技术债务

[options="header",cols="1,2,1,1"]
|===
|项目 |描述 |影响 |优先级
|[例如：遗留认证] |[旧认证系统需要替换] |高 |中
|[例如：缺少测试] |[模块 X 的覆盖率低于目标] |中 |低
|===

== 风险监控

[描述如何监控和审查风险]

* [例如：每周风险审查会议]
* [例如：自动监控告警]

.更多信息
参见 arc42 文档中的 link:https://docs.arc42.org/section-11/[风险和技术债务]。
`;
}

function getGlossaryTemplate(): string {
  return `= 12. 术语表

*目的*：定义架构文档中使用的重要领域和技术术语。

== 领域术语

[options="header",cols="1,3"]
|===
|术语 |定义
|[领域术语 1] |[清晰、简洁的定义]
|[领域术语 2] |[清晰、简洁的定义]
|===

== 技术术语

[options="header",cols="1,3"]
|===
|术语 |定义
|[技术术语 1] |[清晰、简洁的定义]
|[技术术语 2] |[清晰、简洁的定义]
|===

== 缩写

[options="header",cols="1,3"]
|===
|缩写 |含义
|API |应用程序编程接口
|JWT |JSON Web 令牌
|REST |表述性状态转移
|===

.更多信息
参见 arc42 文档中的 link:https://docs.arc42.org/section-12/[术语表]。
`;
}

/**
 * Get the Chinese workflow guide in AsciiDoc format
 */
export function getWorkflowGuide(): string {
  return `= arc42 架构文档工作流指南

== 概述

本指南帮助您使用 arc42 模板记录软件架构。arc42 模板是一个实用的、经过验证的软件和系统架构文档模板。

== 支持的语言

此 arc42 MCP 服务器支持多种语言的文档：

[options="header",cols="1,2,2"]
|===
|代码 |语言 |原名
|EN |英语 |English
|DE |德语 |Deutsch
|CZ |捷克语 |Čeština
|ES |西班牙语 |Español
|FR |法语 |Français
|IT |意大利语 |Italiano
|NL |荷兰语 |Nederlands
|PT |葡萄牙语 |Português
|RU |俄语 |Русский
|UKR |乌克兰语 |Українська
|ZH |中文 |中文
|===

== 入门指南

=== 步骤 1：初始化工作空间

使用 \`arc42-init\` 工具创建文档工作空间：

[source]
----
arc42-init(projectName: "我的项目", language: "ZH")
----

您可以使用 ISO 语言代码指定不同的语言。

=== 步骤 2：检查状态

使用 \`arc42-status\` 查看文档的当前状态：

[source]
----
arc42-status()
----

=== 步骤 3：生成章节模板

使用 \`generate-template\` 获取每个章节的详细模板：

[source]
----
generate-template(section: "01_introduction_and_goals", language: "ZH")
----

== arc42 的 12 个章节

. *引言与目标* - 从这里开始！定义您正在构建什么以及为什么。
. *架构约束* - 您不能做什么？
. *上下文和边界* - 什么在范围内，什么在范围外？
. *解决方案策略* - 解决问题的高层方法。
. *构建块视图* - 系统的静态结构。
. *运行时视图* - 动态行为和场景。
. *部署视图* - 如何部署和运维？
. *跨领域概念* - 系统中使用的模式。
. *架构决策* - 重要决策及其理由。
. *质量需求* - 具体的质量场景。
. *风险和技术债务* - 可能出什么问题？
. *术语表* - 定义您的术语。

== 最佳实践

. *从第 1 章开始* - 理解目标是基础
. *保持简洁* - arc42 是务实的，不是官僚的
. *使用图表* - 一图胜千言
. *记录决策* - 未来的您会感谢现在的您
. *迭代* - 架构文档永远不会"完成"

== 可用工具

* \`arc42-init\` - 初始化文档工作空间
* \`arc42-status\` - 检查文档状态
* \`generate-template\` - 生成章节模板
* \`update-section\` - 更新章节内容
* \`get-section\` - 读取章节内容
* \`arc42-workflow-guide\` - 显示本指南

== 资源

* link:https://arc42.org/[arc42 网站]
* link:https://docs.arc42.org/[arc42 文档]
* link:https://arc42.org/examples[arc42 示例]
`;
}

/**
 * Get the Chinese README content in AsciiDoc format
 */
export function getReadmeContent(projectName?: string): string {
  const name = projectName || '项目';
  return `= ${name} - 架构文档

本目录包含 ${name} 的架构文档，遵循 arc42 模板。

== 结构

* \`sections/\` - 单独的章节 AsciiDoc 文件（12 个章节）
* \`images/\` - 图表和图片
* \`arc42-documentation.adoc\` - 主合并文档
* \`config.yaml\` - 配置

== arc42 的 12 个章节

. *引言与目标* - 需求、质量目标、干系人
. *架构约束* - 技术和组织约束
. *上下文和边界* - 业务和技术上下文
. *解决方案策略* - 基本决策和策略
. *构建块视图* - 静态分解
. *运行时视图* - 动态行为
. *部署视图* - 基础设施和部署
. *跨领域概念* - 整体规则和方法
. *架构决策* - 重要决策（ADR）
. *质量需求* - 质量树和场景
. *风险和技术债务* - 已知问题和风险
. *术语表* - 重要术语

== 入门指南

. 从第 1 章开始：引言与目标
. 迭代地完成各章节
. 使用图表来说明概念
. 关注决策，而非实现细节

== 生成文档

使用 MCP 工具：

* 检查状态：\`arc42-status\`
* 生成模板：\`generate-template\`
* 更新章节：\`update-section\`

== 资源

* link:https://arc42.org/[arc42 网站]
* link:https://docs.arc42.org/[arc42 文档]
* link:https://arc42.org/examples[arc42 示例]
`;
}
