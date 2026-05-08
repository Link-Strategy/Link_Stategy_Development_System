import os
import re
import argparse
from datetime import datetime

class ProgressManager:
    MARKERS = {
        "strategic": "STRATEGIC_CONTEXT",
        "target": "TARGET",
        "tasks": "TASK_LIST",
        "summary": "SESSION_SUMMARY",
        "decisions": "DECISION_LOG",
        "risk": "RISK_BLOCKER",
    }

    def __init__(self, backlog_dir):
        self.backlog_dir = backlog_dir
        self.template_path = os.path.join(".agents", "templates", "session-snapshot-template.md")
        if not os.path.exists(backlog_dir):
            os.makedirs(backlog_dir)

    def snapshot_name(self, date_value, version=0):
        suffix = "" if version == 0 else f"-v{version}"
        return f"session-{date_value}{suffix}.md"

    def parse_snapshot_name(self, filename):
        match = re.fullmatch(r"session-(\d{4}-\d{2}-\d{2})(?:-v(\d+))?\.md", filename)
        if not match:
            return None
        return match.group(1), int(match.group(2) or 0)

    def clean_content(self, text):
        if not text: return ""
        lines = [line for line in text.split("\n") if not re.match(r"^---+$", line.strip())]
        return "\n".join(lines).strip()

    def parse_markdown_sections(self, content):
        # Split by any H2 header, keeping the header text
        parts = re.split(r"\n## ", "\n" + content)
        parsed = {}
        for part in parts:
            if not part.strip(): continue
            lines = part.strip().split("\n")
            # Remove leading number if exists (e.g., "1. Target" -> "Target")
            title = re.sub(r"^\d+\.\s+", "", lines[0].strip())
            body = "\n".join(lines[1:]).strip()
            parsed[title.lower()] = {"original_title": lines[0].strip(), "body": self.clean_content(body)}
        return parsed

    def get_marker_body(self, content, marker_name):
        if not marker_name:
            return ""
        match = re.search(
            rf"<!--\s*{marker_name}_START\s*-->\s*(?P<body>.*?)\s*<!--\s*{marker_name}_END\s*-->",
            content,
            re.DOTALL,
        )
        return match.group("body").strip() if match else ""

    def missing_markers(self, content):
        missing = []
        for marker_name in self.MARKERS.values():
            has_start = re.search(rf"<!--\s*{marker_name}_START\s*-->", content) is not None
            has_end = re.search(rf"<!--\s*{marker_name}_END\s*-->", content) is not None
            if not has_start or not has_end:
                missing.append(marker_name)
        return missing

    def resolve_source_path(self):
        latest_path = self.get_latest_snapshot()
        if latest_path:
            return latest_path
        raise FileNotFoundError(
            "No progress source found. Create at least one .backlog/session-*.md "
            "snapshot before running the transition."
        )

    def is_backlog_snapshot(self, source_path):
        backlog_root = os.path.abspath(self.backlog_dir)
        source_abs = os.path.abspath(source_path)
        return os.path.commonpath([backlog_root, source_abs]) == backlog_root

    def select_task_content(self, sections):
        def has_all_words(key, words):
            return all(word in key for word in words)

        selectors = [
            lambda key: has_all_words(key, ["task", "list"]),
            lambda key: "danh sách nhiệm vụ" in key,
            lambda key: "roadmap" in key,
            lambda key: "task" in key and "chi tiết" not in key,
        ]

        for selector in selectors:
            for key, data in sections.items():
                if selector(key):
                    return data["body"]
        return ""

    def clean_decision_history(self, content):
        if not content:
            return ""
        lines = [line for line in content.split("\n") if "Integrity Check" not in line]
        return "\n".join(lines).strip()

    def get_section_body(self, content, title_pattern):
        marker_by_title = {
            "Task List": self.MARKERS["tasks"],
            "Decision Log": self.MARKERS["decisions"],
        }
        marker_body = self.get_marker_body(content, marker_by_title.get(title_pattern, ""))
        if marker_body:
            return marker_body

        match = re.search(
            rf"^##\s+\d+\.\s+{title_pattern}.*?\n(?P<body>.*?)(?=^##\s+\d+\.|\Z)",
            content,
            re.MULTILINE | re.DOTALL | re.IGNORECASE,
        )
        return match.group("body").strip() if match else ""

    def collect_snapshot_content(self, content):
        sections = self.parse_markdown_sections(content)

        goal_content = self.get_marker_body(content, self.MARKERS["target"])
        tasks_content = self.get_marker_body(content, self.MARKERS["tasks"])
        decision_history = self.get_marker_body(content, self.MARKERS["decisions"])
        strategic_content = self.get_marker_body(content, self.MARKERS["strategic"])
        risk_content = self.get_marker_body(content, self.MARKERS["risk"])

        if not tasks_content:
            tasks_content = self.select_task_content(sections)

        for key, data in sections.items():
            k = key.lower()
            if not goal_content and ("target" in k or "goal" in k):
                goal_content = data["body"]
            elif not decision_history and "decision" in k:
                decision_history = data["body"]
            elif not strategic_content and ("strategic" in k or "context" in k):
                strategic_content = data["body"]
            elif not risk_content and ("risk" in k or "blocker" in k):
                risk_content = data["body"]

        return {
            "goal": self.clean_content(goal_content),
            "tasks": self.clean_content(tasks_content),
            "decisions": self.clean_decision_history(decision_history),
            "strategic": self.clean_content(strategic_content),
            "risk": self.clean_content(risk_content),
        }

    def validate_snapshot(self, content, expected_previous=None, allow_pending=False):
        errors = []
        missing = self.missing_markers(content)
        if missing:
            errors.append("Missing marker blocks: " + ", ".join(missing))

        task_body = self.get_section_body(content, r"Task List")
        decision_body = self.get_section_body(content, r"Decision Log")

        if not task_body or "- [ ] (No tasks inherited" in task_body:
            errors.append("Task List is empty or unresolved.")
        if "[COMPLETED]" in task_body:
            errors.append("Active Task List still contains a completed phase.")
        if decision_body.count("Integrity Check") != 1:
            errors.append("Decision Log must contain exactly one Integrity Check line.")
        if allow_pending:
            if "Integrity Check**: SUCCESS" not in decision_body and "Integrity Check**: PENDING" not in decision_body:
                errors.append("Decision Log is missing the Integrity Check status line.")
        elif "Integrity Check**: SUCCESS" not in decision_body:
            errors.append("Decision Log must contain Integrity Check: SUCCESS.")
        if expected_previous and f"Previous**: [{expected_previous}]" not in content and f"Previous Snapshot**: [{expected_previous}]" not in content:
            errors.append(f"Previous snapshot link does not point to {expected_previous}.")

        return errors

    def write_text(self, path, content):
        temp_path = f"{path}.tmp"
        with open(temp_path, "w", encoding="utf-8") as f:
            f.write(content)
        os.replace(temp_path, path)

    def mark_integrity(self, content, status, details):
        detail_text = "; ".join(details) if details else "structural gate passed"
        replacement = f"- **Integrity Check**: {status} ({detail_text})"
        return re.sub(
            r"^- \*\*Integrity Check\*\*: .*$",
            replacement,
            content,
            count=1,
            flags=re.MULTILINE,
        )

    def filter_checklist(self, content, keep_done=True, keep_undone=True):
        if not content: return ""
        lines = content.split("\n")
        filtered = []
        last_kept = False
        
        for line in lines:
            stripped = line.strip()
            # Detect a task line
            if re.match(r"^(\s*)-\s*\[([ x/])\]", line):
                is_done = "[x]" in line
                if (is_done and keep_done) or (not is_done and keep_undone):
                    filtered.append(line)
                    last_kept = True
                else:
                    last_kept = False
            # Detect sub-items or notes (indented)
            elif (line.startswith("  ") or line.startswith("\t")) and last_kept:
                filtered.append(line)
            # Detect headers within the section
            elif stripped.startswith("#"):
                filtered.append(line)
                last_kept = True # Keep notes under sub-headers
            # Keep empty lines only if the previous line was kept
            elif not stripped:
                if last_kept: filtered.append(line)
            else:
                last_kept = False
                
        return "\n".join(filtered).strip()

    def transition(self, today, summary_text):
        source_path = self.resolve_source_path()
        latest_path = source_path if self.is_backlog_snapshot(source_path) else None
        
        with open(source_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        snapshot_content = self.collect_snapshot_content(content)
        goal_content = snapshot_content["goal"]
        tasks_content = snapshot_content["tasks"]
        decision_history = snapshot_content["decisions"]
        strategic_content = snapshot_content["strategic"]
        risk_content = snapshot_content["risk"]

        # New Node (ACTIVE) - Filter and keep structure
        active_tasks = self.filter_checklist(tasks_content, keep_done=True, keep_undone=True)
        if not active_tasks.strip():
            active_tasks = "- [ ] (No tasks inherited - Please check source file)"

        # Smart Phase filtering
        active_phases = [p.strip() for p in re.split(r"\n### ", "\n" + active_tasks) if p.strip()]
        active_tasks = "\n\n".join([f"### {p}" if not p.startswith("###") else p for p in active_phases if "[COMPLETED]" not in p]).strip()

        # Archive Tasks
        arch_tasks = self.filter_checklist(tasks_content, keep_done=True, keep_undone=False)
        arch_phases = [p.strip() for p in re.split(r"\n### ", "\n" + arch_tasks) if p.strip()]
        arch_tasks = "\n\n".join([f"### {p}" if not p.startswith("###") else p for p in arch_phases if "- [x]" in p or "[COMPLETED]" in p]).strip()

        # Decision log logic
        new_decision_log = f"- **{today}**: Session started.\n- **Integrity Check**: PENDING (structural gate not yet evaluated)\n\n{decision_history}"

        def render(date_val, prev_val, status_val, summary_val, tasks_val, decisions_val):
            with open(self.template_path, "r", encoding="utf-8") as tf:
                tmpl = tf.read()
            strategic_val = strategic_content if strategic_content else "- **Primary Objective**: [Link đến Roadmap/PRD hoặc mô tả mục tiêu lớn]\n- **Current Milestone**: [Tên Milestone đang hướng tới]"
            active_risks = self.filter_checklist(risk_content, keep_done=False, keep_undone=True)
            risk_val = active_risks if active_risks else "- [ ] **Risk 1**: [Mô tả rủi ro tiềm ẩn]\n- [ ] **Blocker**: [Các điểm nghẽn hiện tại nếu có]"

            out = tmpl.replace("{{TODAY}}", date_val)
            out = out.replace("{{PREV_NAME}}", prev_val)
            out = out.replace("{{STATUS}}", status_val)
            out = out.replace("{{GOAL}}", goal_content if goal_content else "- (No goal defined)")
            out = out.replace("{{TASKS}}", tasks_val)
            out = out.replace("{{SUMMARY}}", summary_val)
            out = out.replace("{{DECISION_LOG}}", decisions_val)
            out = out.replace("{{STRATEGIC_CONTEXT}}", strategic_val)
            out = out.replace("{{RISK_BLOCKERS}}", risk_val)
            
            return out

        new_content = render(today, os.path.basename(source_path) if latest_path else "None", "ACTIVE", "- (N/A - In Progress)", active_tasks, new_decision_log)

        new_filename = self.snapshot_name(today)
        new_path = os.path.join(self.backlog_dir, new_filename)
        counter = 1
        while os.path.exists(new_path):
            new_path = os.path.join(self.backlog_dir, self.snapshot_name(today, counter))
            counter += 1
            
        arch_content = None
        # Prepare archive content. Do not write it until the new snapshot has passed validation.
        if latest_path:
            old_date_match = re.search(r"snapshot:\s*(.*?)\r?\n", content, re.IGNORECASE)
            old_date = old_date_match.group(1) if old_date_match else today
            
            old_prev_match = re.search(r"Previous(?: Snapshot)?\*\*:\s*\[(.*?)\]", content)
            old_prev = old_prev_match.group(1) if old_prev_match else "None"

            arch_decisions = f"- **Integrity Check**: SUCCESS (archive generated from active snapshot)\n\n{decision_history}"
            arch_content = render(old_date, old_prev, "ARCHIVED (Report Only)", summary_text if summary_text else "- (No summary provided)", arch_tasks, arch_decisions)

        validation_errors = self.validate_snapshot(new_content, os.path.basename(source_path) if latest_path else "None", allow_pending=True)
        if validation_errors:
            new_content = self.mark_integrity(new_content, "FAILED", validation_errors)
            raise ValueError("Snapshot integrity validation failed: " + "; ".join(validation_errors))

        new_content = self.mark_integrity(new_content, "SUCCESS", [f"inherited from {os.path.basename(source_path)}"])
        self.write_text(new_path, new_content)
        if latest_path and arch_content is not None:
            self.write_text(latest_path, arch_content)

        return new_path

    def bootstrap(self, today, summary_text):
        today_path = self.get_snapshot_for_date(today)
        if today_path:
            with open(today_path, "r", encoding="utf-8") as f:
                content = f.read()
            errors = self.validate_snapshot(content)
            if errors:
                raise ValueError("Current snapshot integrity validation failed: " + "; ".join(errors))
            return today_path
        return self.transition(today, summary_text)

    def validate_current(self, date_value=None):
        source_path = self.get_snapshot_for_date(date_value) if date_value else self.get_latest_snapshot()
        if not source_path:
            raise FileNotFoundError(
                "No progress source found. Create at least one .backlog/session-*.md "
                "snapshot before validation."
            )
        with open(source_path, "r", encoding="utf-8") as f:
            content = f.read()
        errors = self.validate_snapshot(content)
        if errors:
            raise ValueError("Snapshot integrity validation failed: " + "; ".join(errors))
        return source_path

    def get_snapshot_for_date(self, date_value):
        snapshots = []
        for filename in os.listdir(self.backlog_dir):
            parsed = self.parse_snapshot_name(filename)
            if parsed and parsed[0] == date_value:
                snapshots.append((parsed[1], filename))
        if not snapshots:
            return None
        snapshots.sort(reverse=True)
        return os.path.join(self.backlog_dir, snapshots[0][1])

    def get_latest_snapshot(self):
        snapshots = []
        for filename in os.listdir(self.backlog_dir):
            parsed = self.parse_snapshot_name(filename)
            if parsed:
                snapshots.append((parsed[0], parsed[1], filename))
        if not snapshots:
            return None
        snapshots.sort(key=lambda item: (item[0], item[1]), reverse=True)
        return os.path.join(self.backlog_dir, snapshots[0][2])

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Manage session progress snapshots.")
    parser.add_argument("--dir", default=".backlog", help="Backlog directory")
    parser.add_argument("--date", help="Manual date for snapshot (YYYY-MM-DD)")
    parser.add_argument("--summary", help="Summary text for the OLD node")
    parser.add_argument("--bootstrap", action="store_true", help="Return today's snapshot if it exists, otherwise transition to it")
    parser.add_argument("--transition", action="store_true", help="Force a new transition snapshot for the selected date")
    parser.add_argument("--validate", action="store_true", help="Validate the selected snapshot without creating or transitioning")
    
    args = parser.parse_args()
    manager = ProgressManager(args.dir)
    try:
        today = args.date if args.date else datetime.now().strftime("%Y-%m-%d")
        if args.validate:
            new_file = manager.validate_current(today if args.date else None)
        elif args.transition:
            new_file = manager.transition(today, args.summary)
        else:
            new_file = manager.bootstrap(today, args.summary)
    except (FileNotFoundError, ValueError) as exc:
        raise SystemExit(f"ERROR: {exc}")
    label = "Valid" if args.validate else ("Created" if args.transition else "Active")
    print(f"{label}: {new_file}")
