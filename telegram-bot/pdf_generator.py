import os
import tempfile
from itertools import zip_longest

from fpdf import FPDF

from contract_content import build_contract, build_requisites

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


def cell_line_count(pdf: FPDF, width: float, line_height: float, text: str) -> int:
    lines = pdf.multi_cell(width, line_height, text, markdown=True, dry_run=True, output="LINES")
    return max(len(lines), 1)


def render_requisites(pdf: FPDF, req: dict):
    # Двухколоночную раскладку переносим на новую страницу вручную и
    # переносим текст внутри ширины своей колонки — иначе длинный адрес
    # или ФИО переносится на всю ширину страницы и наезжает на вторую колонку.
    pdf.set_auto_page_break(False)
    line_height = 6
    footer_buffer = 6  # запас, чтобы контент не липнул к номеру страницы внизу

    def ensure_space(height: float):
        if pdf.get_y() + height > pdf.page_break_trigger - footer_buffer:
            pdf.add_page()

    pdf.ln(2)
    ensure_space(7 + line_height)  # место под заголовок и хотя бы одну строку следом
    pdf.set_font("DejaVu", "B", 11)
    pdf.multi_cell(0, 7, req["heading"], align="L", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)

    left_x = pdf.l_margin
    usable_width = pdf.w - pdf.l_margin - pdf.r_margin
    col_width = usable_width / 2 - 5
    right_x = left_x + col_width + 10

    def render_row(left: str, right: str):
        pdf.set_font("DejaVu", "", 10)
        left_lines = cell_line_count(pdf, col_width, line_height, left)
        right_lines = cell_line_count(pdf, col_width, line_height, right)
        row_height = max(left_lines, right_lines) * line_height
        ensure_space(row_height)
        y = pdf.get_y()
        pdf.set_xy(left_x, y)
        pdf.multi_cell(col_width, line_height, left, markdown=True, new_x="LMARGIN", new_y="TOP")
        pdf.set_xy(right_x, y)
        pdf.multi_cell(col_width, line_height, right, markdown=True, new_x="LMARGIN", new_y="TOP")
        pdf.set_xy(left_x, y + row_height)

    rows = list(zip_longest(req["executor_rows"], req["client_rows"], fillvalue=""))
    for left, right in rows:
        render_row(left, right)

    pdf.ln(6)
    left_sig, right_sig = req["signature_row"]
    render_row(left_sig, right_sig)


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
            pdf.multi_cell(0, 7, text, align="L", new_x="LMARGIN", new_y="NEXT")
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
