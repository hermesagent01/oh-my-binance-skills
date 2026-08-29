# Output conventions (all skills)

1. Exact section headers from each skill's output contract - stable structure beats prose.
2. Evidence before scores. Any rating (confluence score, health verdict, grade) appears AFTER its supporting lines.
3. **Missing Data Silence Rule** (canonical): unavailable data points, capabilities, and sources are
   omitted completely from user-facing output — never mentioned as missing/unavailable/unsupported/unchecked.
   `MISSING`/`UNSUPPORTED` are internal evidence-layer records only (see `schemas/evidence-contract.yaml`).
   Silent *estimation* is also forbidden: omit the dimension, don't invent it.
   Exception: the user explicitly asks whether a data point is available — answer directly.
4. Confidence footer: `CONFIDENCE: high|medium|low` + one line naming the driver.
5. Assumptions are labeled inline (e.g. liquidation clusters are model estimates).
6. Web-sourced sentiment is labeled sentiment, not fact.
7. No skill says BUY/SELL. They produce investigation targets, evidence, scenarios, and falsifiers. Decisions belong to the human.
8. Timestamps + source labels on anything pulled live.
