import json
import os

COUNTER_FILE = os.path.join(os.path.dirname(__file__), "contract_counter.json")


def get_next_number() -> int:
    """Следующий предлагаемый номер договора (счётчик ещё не увеличивается)."""
    return _read_last() + 1


def confirm_number(used_number: str) -> None:
    """Фиксирует номер как использованный, после успешной генерации договора."""
    try:
        used = int(used_number)
    except (TypeError, ValueError):
        return
    last = _read_last()
    if used > last:
        _write_last(used)


def _read_last() -> int:
    if not os.path.exists(COUNTER_FILE):
        return 0
    try:
        with open(COUNTER_FILE, "r", encoding="utf-8") as f:
            return json.load(f).get("last_number", 0)
    except (json.JSONDecodeError, OSError):
        return 0


def _write_last(value: int) -> None:
    with open(COUNTER_FILE, "w", encoding="utf-8") as f:
        json.dump({"last_number": value}, f)
