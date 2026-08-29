"""Oh My Binance skill validator.

Two separate contracts:
  A) INTERNAL evidence contract — analysis skills must know MISSING/UNSUPPORTED semantics.
  B) USER-FACING contract — renderer (trader-explainer) must never leak internal states,
     and workflows must route through the renderer with a quality gate.
  C) MISSING-DATA SILENCE RULE — no analysis skill may instruct user-facing
     MISSING/UNSUPPORTED reporting; internal recording + renderer omission is canonical.
"""
from pathlib import Path
import re, sys

try:
    import yaml
except ImportError:
    print("FAIL: PyYAML required (pip install pyyaml)")
    sys.exit(2)

root = Path(__file__).resolve().parents[1]
skills = root / "skills"
RENDERER = "trader-explainer"
BANNED_IN_RENDERER = ["MISSING", "UNSUPPORTED", "NOT_CHECKED", "mcp__binance__", "binance-cli"]

fails, warns = [], []

# User-facing reporting ban: lines that TELL the agent to surface MISSING to the user,
# unless the same line explicitly scopes it to the internal evidence layer.
SILENCE_BAN = re.compile(
    r"report\s+`?MISSING`?\s+or\s+`?UNSUPPORTED`?"
    r"|report\s+unavailable[^\n]*user"
    r"|tell\s+the\s+user[^\n]*MISSING"
    r"|user-facing[^\n]*MISSING[^\n]*(marker|report|list)"
    r"|return\s+`?UNSUPPORTED[^\n]*and\s+stop",
    re.I)
INTERNAL_SCOPE = re.compile(r"internal|evidence layer|never\s+user-facing|never\s+surface", re.I)

def check_renderer_leaks(name, text):
    """Renderer may reference banned words ONLY in forbidden/never context lines."""
    for banned in BANNED_IN_RENDERER:
        for line in text.splitlines():
            if banned not in line:
                continue
            if re.search(r"forbidden|never|do not|don't|must not", line, re.I):
                continue  # allowed — it's telling the renderer NOT to leak it
            fails.append(f"{name}: leaks '{banned}' outside forbidden-context -> '{line.strip()[:80]}'")

def check_silence_rule(name, text):
    """Analysis skills must NOT instruct user-facing MISSING/UNSUPPORTED reporting."""
    for line in text.splitlines():
        if SILENCE_BAN.search(line) and not INTERNAL_SCOPE.search(line):
            fails.append(f"{name}: instructs user-facing MISSING reporting -> '{line.strip()[:80]}'")

def main():
    skill_files = list(skills.glob("*/SKILL.md"))
    wf_files = list((root / "workflows").glob("*.spec.yaml"))

    for p in skill_files:
        name = p.parent.name
        text = p.read_text(errors="replace")

        if not text.startswith("---"):
            fails.append(f"{name}: missing frontmatter")
            continue

        fm = text.split("---", 2)[1]
        for key in ("name:", "description:"):
            if key not in fm:
                fails.append(f"{name}: frontmatter missing '{key.strip(':')}'")

        if name == RENDERER:
            check_renderer_leaks(name, text)
        else:
            check_silence_rule(name, text)

    for p in wf_files:
        text = p.read_text(errors="replace")
        if RENDERER not in text:
            fails.append(f"{p.name}: workflow does not route through {RENDERER}")
        if "quality_gate" not in text and "quality-gate" not in text:
            warns.append(f"{p.name}: no explicit quality gate")

    print(f"Checked {len(skill_files)} skills, {len(wf_files)} workflow specs")
    for w in warns:
        print("WARN:", w)
    if fails:
        for f in fails:
            print("FAIL:", f)
        sys.exit(1)
    print("PASS — internal/user contracts separated; all workflows render via trader-explainer; silence rule enforced")

if __name__ == "__main__":
    main()
