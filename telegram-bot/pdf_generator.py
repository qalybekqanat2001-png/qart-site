import os
import tempfile
from itertools import zip_longest

from fpdf import FPDF

from contract_content import BOLD_SPLIT, build_contract, build_requisites

FONT_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
    "/usr/share/fonts/dejavu/DejaVuSerif.ttf",
    os.path.join(os.path.dirname(__file__), "fonts", "DejaVuSerif.ttf"),
    "C:\\Windows\\Fonts\\times.ttf",  # локальная разработка на Windows
]

FONT_BOLD_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
    "/usr/share/fonts/dejavu/DejaVuSerif-Bold.ttf",
    os.path.join(os.path.dirname(__file__), "fonts", "DejaVuSerif-Bold.ttf"),
    "C:\\Windows\\Fonts\\timesbd.ttf",  # локальная разработка на Windows
]


def find_font(paths: list) -> str:
    for path in paths:
        if os.path.exists(path):
            return path
    raise FileNotFoundError(
        "Шрифт DejaVu Serif не найден. Установите: sudo apt-get install fonts-dejavu-core"
    )


class ContractPDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_font("DejaVu", "", find_font(FONT_PATHS))
        self.add_font("DejaVu", "B", find_font(FONT_BOLD_PATHS))

    def footer(self):
        self.set_y(-15)
        self.set_font("DejaVu", "", 8)
        self.cell(0, 10, f"Стр. {self.page_no()}", align="C")


def write_line(pdf: FPDF, x: float, y: float, text: str, size: int = 10):
    """Одна строка с поддержкой **жирных** фрагментов в фиксированной позиции."""
    pdf.set_xy(x, y)
    for part in BOLD_SPLIT.split(text):
        if not part:
            continue
        is_bold = part.startswith("**") and part.endswith("**")
        pdf.set_font("DejaVu", "B" if is_bold else "", size)
        pdf.write(6, part[2:-2] if is_bold else part)


def render_requisites(pdf: FPDF, req: dict):
    # Двухколоночную раскладку переносим на новую страницу вручную —
    # автоматический перенос fpdf2 внутри write() не знает о второй
    # колонке и рвёт строки между колонками, если попадает на границу страницы.
    pdf.set_auto_page_break(False)
    row_height = 6

    def ensure_space(height: float):
        if pdf.get_y() + height > pdf.page_break_trigger:
            pdf.add_page()

    pdf.ln(2)
    ensure_space(7)
    pdf.set_font("DejaVu", "B", 11)
    pdf.multi_cell(0, 7, req["heading"], new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)

    left_x = pdf.l_margin
    usable_width = pdf.w - pdf.l_margin - pdf.r_margin
    right_x = left_x + usable_width / 2 + 5

    rows = list(zip_longest(req["executor_rows"], req["client_rows"], fillvalue=""))
    for left, right in rows:
        ensure_space(row_height)
        y = pdf.get_y()
        write_line(pdf, left_x, y, left)
        write_line(pdf, right_x, y, right)
        pdf.set_xy(left_x, y + row_height)

    pdf.ln(6)
    ensure_space(row_height)
    left_sig, right_sig = req["signature_row"]
    y = pdf.get_y()
    write_line(pdf, left_x, y, left_sig)
    write_line(pdf, right_x, y, right_sig)
    pdf.set_xy(left_x, y + row_height)


def generate_contract_pdf(data: dict) -> str:
    pdf = ContractPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_margins(20, 15, 20)

    for kind, text in build_contract(data):
        if kind == "title":
            pdf.set_font("DejaVu", "B", 14)
            pdf.multi_cell(0, 8, text, align="C", markdown=True, new_x="LMARGIN", new_y="NEXT")
            pdf.ln(2)
        elif kind == "center":
            pdf.set_font("DejaVu", "", 10)
            pdf.multi_cell(0, 6, text, align="C", markdown=True, new_x="LMARGIN", new_y="NEXT")
        elif kind == "heading":
            pdf.ln(2)
            pdf.set_font("DejaVu", "B", 11)
            pdf.multi_cell(0, 7, text, new_x="LMARGIN", new_y="NEXT")
            pdf.ln(1)
        elif kind == "bullet":
            pdf.set_font("DejaVu", "", 10)
            pdf.multi_cell(0, 6, text, markdown=True, new_x="LMARGIN", new_y="NEXT")
        elif kind == "empty":
            pdf.ln(3)
        else:
            pdf.set_font("DejaVu", "", 10)
            pdf.multi_cell(0, 6, text, align="J", markdown=True, new_x="LMARGIN", new_y="NEXT")

    render_requisites(pdf, build_requisites(data))

    tmp = tempfile.NamedTemporaryFile(suffix=".pdf", delete=False)
    pdf.output(tmp.name)
    return tmp.name
