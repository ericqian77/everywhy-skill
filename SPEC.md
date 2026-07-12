# 拆解课程格式 · Disassemble Course Format (DCF)

`format_version: 1` · 2026-07-06

本规范与仓库解耦：不引用任何本仓库内部路径，任何 agent harness（Claude Code / Codex / Cursor / 人类）只读本文件即可判断一份课程是否合格。中英双语，两版本内容等价，遇到分歧以**英文版**为准（2026-07-11 语言策略修订，此前为中文版为准）。

This spec is decoupled from any single repository — it references no internal paths, and any agent harness (Claude Code, Codex, Cursor, or a human) can judge whether a course is valid by reading only this file. Bilingual, contents equivalent; **English governs** in case of conflict (revised 2026-07-11 per the language policy — previously Chinese governed).

---

## 一、什么是一篇好的「拆解」/ What makes a good "Disassemble" course

一篇 = 一个道理。三段式检验标准：
A course = one idea. Three-part test:

1. **一个道理 / One idea** —— 能用一句话说出来（"圆的面积是 πr²"、"为什么铁船不沉"）。一篇塞两个道理就该拆成两篇。
   Statable in one sentence. Two ideas in one course means it should be split into two.
2. **能看见的零件 / Visible pieces** —— 把道理拆成视觉零件，零件必须真的"动给你看"，不是静态配图。
   Break the idea into visual components that actually animate — not static illustration.
3. **拼回去的时刻 / The reassembly moment** —— 结尾有一个"啊哈"：零件重新组合，道理自己浮现。这是全篇的目的地，设计时应先定这个时刻，再倒推前面怎么拆。
   An "aha" at the end: the pieces recombine and the idea emerges on its own. Design this moment first, then work backward.

驱动方式：滚动驱动（scroll-driven sticky stage，适合有步骤感的证明，读者控制节奏）或时间驱动（适合连续变化的量，如扫过/生长/波动）。不确定时选滚动驱动。

Driving mode: scroll-driven (reader-paced, good for step-like proofs) or time-driven (good for continuously varying quantities). Default to scroll-driven when unsure.

---

## 二、硬性技术约定 / Hard technical requirements

每篇课程必须满足以下全部条款：
Every course MUST satisfy all of the following:

1. **完全自包含 / Fully self-contained** —— 一个 HTML 文件，内联全部 CSS/JS，除 Google Fonts CDN 外零外部依赖。
2. **`file://` 可打开 / Openable via `file://`** —— 不用 `fetch`/模块加载；双击文件即可查看。
3. **响应式 / Responsive** —— 360px 宽度下完整可用，canvas 用 `min(固定值, vw值)` 约束尺寸。
4. **`prefers-reduced-motion`** —— 滚动驱动降级为按步/静态展示；时间驱动的连续动画默认暂停或隐藏播放控件。用 `window.matchMedia('(prefers-reduced-motion: reduce)')` 检测。
5. **可访问性 / Accessibility** —— 装饰性 canvas 加 `aria-hidden="true"`；正文文字放在 DOM 里，不画进 canvas。
6. **教学内容必须正确 / Pedagogical correctness is non-negotiable** —— 涉及数学/物理/其他可验证事实的部分，必须能被独立复算验证（坐标可用鞋带公式/几何关系重新推导，物理量可用公式重新代入）。仅靠生成者自查不构成合格证明。
   Any math/physics/verifiable-fact content must be independently re-derivable (coordinates via shoelace/geometric relations, physical quantities via formula substitution). Self-check by the author alone does not constitute proof of correctness.
7. **自动播放路径 / Autoplay path** —— 滚动驱动课程必须提供一个可见的自动播放/再看一次控件，并满足以下**结果要求**（停靠点数量、时长、缓动机制均由课程自行决定）：每一个预定教学状态都能到达；节奏留足阅读与观察时间；播放结束时最终状态已完整呈现；可以重放；手动滚动始终可用；`prefers-reduced-motion` 下隐藏或禁用该控件。
   Scroll-driven courses must provide a visible autoplay/replay control meeting these **outcome requirements** (stop count, timing, and mechanism are the course's own choice): every intended teaching state is reachable; the pace leaves enough time to read and observe; the final state is fully rendered before playback ends; it can be replayed; manual scrolling always keeps working; the control is hidden or disabled under `prefers-reduced-motion`.

---

## 三、输出契约：一个课程 = 一个 HTML + 一份元数据 / Output contract

一份提交必须包含且仅包含两个产物：
A submission consists of exactly two artifacts:

- **一个自包含 HTML 文件**（内容本体，满足第二节全部约定）
- **一份 `course.json`**（元数据，schema 如下）

### `course.json` schema

```json
{
  "format_version": 1,
  "slug": "buoyancy",
  "topic": "buoyancy",
  "title": "铁做的船，为什么不沉？",
  "summary": "一句话摘要，用内容自己的语言写。",
  "tag": "physics",
  "level": "general",
  "lang": "zh",
  "accent": "#0E8388",
  "author": "ericqian77",
  "license": "CC BY-SA 4.0",
  "prerequisites": null,
  "age_range": null
}
```

字段说明 / Field notes：

| 字段 | 必填 | 说明 |
|---|---|---|
| `format_version` | 是 | 本规范版本号，当前为 `1`。 |
| `slug` | 是 | 全局唯一标识，`[a-z0-9-]+`。UGC 语境下建议用 `<author>-<slug>` 复合命名空间避免冲突。 |
| `topic` | 是 | 主题分组键。同一道理的多语言/多难度变体共享同一个值。无变体时可等于 `slug`。 |
| `title` / `summary` | 是 | 用内容自己的语言写，不要机翻腔。 |
| `tag` | 是 | 学科分类，如 `geometry`/`physics`。展示文案由平台的标签字典维护，本文件只存内部值。 |
| `level` | 是 | 受众难度，如 `general`/`kids`。 |
| `lang` | 是 | 内容语言，`zh`/`en` 等 ISO 639-1 代码。 |
| `accent` | 是 | 主题色，`#RRGGBB`，与页面视觉保持一致。 |
| `author` | 是 | 贡献者署名。UGC 场景下的必填项。 |
| `license` | 是 | 内容许可。平台默认 **CC BY-SA 4.0**（署名+相同方式共享）——提交即视为按此许可授权展示，除非另有书面约定。 |
| `prerequisites` | 否 | 前置知识，字符串或字符串数组，无则填 `null`。 |
| `age_range` | 否 | 建议适用年龄区间，如 `"10-14"`，无则填 `null`。 |

---

## 四、发布前检查清单 / Pre-publish checklist

- [ ] **每个视觉组件都在真实渲染中亲眼确认过**：canvas 各状态、DOM 图表/比例条/标签都真的画出来了，数据可视化的渲染几何与数据可见地对应（数值对但渲染成 0×0 的静默失效只有看渲染结果才能发现）；环境无法渲染浏览器时必须在交付说明里显式声明"未经视觉验证"
- [ ] 滚动驱动课程有可见的自动播放/再看一次控件，能以可读节奏完整播放主舞台序列；手动滚动仍可用，`prefers-reduced-motion` 下控件隐藏或禁用
- [ ] 手机宽度（360px）下试过：无横向滚动、文字可读、动画完整
- [ ] 系统开启"减弱动态效果"后试过：内容仍然能看懂
- [ ] 单课程校验器全绿（见「五、校验」）
- [ ] `<title>`、meta description、OG 三件套已填，`og:image` 用绝对 URL
- [ ] 有同 `topic` 的姊妹变体时：新内容链到了旧变体，旧变体也链回了新内容
- [ ] 有明确的返回入口
- [ ] `file://` 直接打开正常（无控制台报错）
- [ ] 涉及数学/物理等可验证内容的部分，已被独立复算确认（不能只有生成者自查）

Checklist (EN): every visual component visually confirmed in a real render (correct data ≠ correct rendering; declare explicitly if your environment cannot render) · scroll-driven course has a visible autoplay/replay control while manual scroll still works · mobile 360px OK · reduced-motion OK · single-course validator green · title/description/OG present with absolute image URL · sister variants cross-linked · has a return link · opens cleanly via `file://` · verifiable content independently re-derived, not self-checked only.

---

## 五、校验 / Validation

一份提交跑单课程校验器（`validate-course.js`），输入一个 HTML + 一份 `course.json`，输出：

- **错误（阻塞）**：schema 缺字段/格式错误、HTML 缺失硬约定（如无 `aria-hidden`、无 reduced-motion 处理）、检测到的明显安全风险（`fetch`/`XHR`/`<form>`/`top.location` 等外联或跳转劫持模式）。
- **警告（不阻塞，但需人工留意）**：`og:image` 缺失、姊妹变体互链缺失、`topic` 组内无 `general` 难度成员。

校验器通过只证明「格式合格」，不证明「教学内容正确」——后者由人工/agent 审查环节把关（见发布协议）。

Passing the validator proves *format* compliance only, not *pedagogical* correctness — the latter is gated by human/agent review in the submission protocol.

---

## 六、许可 / License

本平台展示的课程内容默认采用 **CC BY-SA 4.0**（署名-相同方式共享）授权。贡献者提交内容即视为同意按此许可授权平台展示、允许他人在署名并保持相同许可的前提下改编与再分发。如需其他许可安排，需与平台方书面约定。

Content displayed on this platform defaults to **CC BY-SA 4.0**. Submitting content constitutes agreement to license it for display under these terms — attribution required, adaptations must share alike. Other licensing arrangements require a written agreement with the platform.

---

## 变更记录 / Changelog

- **v1**（2026-07-06）：首个版本，从单一仓库的 `authoring.md` + `validate-content.js` 抽取、解耦、版本化。
- **v1 清单补充**（2026-07-07）：检查清单新增「每个视觉组件在真实渲染中亲眼确认」条目——来自首轮外部实测：一处数据正确但因 CSS `display` 缺失渲染为 0×0 的比例条，任何自动校验都无法发现，只有看渲染结果才能发现。schema 无变化，版本号不变。
- **v1 清单补充**（2026-07-07）：滚动驱动课程新增自动播放/再看一次控件要求，避免课程只能靠手动滚动才能看完整序列。schema 无变化，版本号不变。
- **v1 措辞修订**（2026-07-11）：自动播放条款改写为结果要求（状态可达/节奏可读/可重放/手动保留/reduced-motion），不再暗示任何停靠点数量或实现机制。契约无变化，版本号不变。
