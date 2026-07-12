import os
import tempfile

from fpdf import FPDF

from contract_content import build_contract

FONT_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans.ttf",
    os.path.join(os.path.dirname(__file__), "fonts", "DejaVuSans.ttf"),
    "C:\\Windows\\Fonts\\arial.ttf",  # локальная разработка на Windows
]

FONT_BOLD_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf",
    os.path.join(os.path.dirname(__file__), "fonts", "DejaVuSans-Bold.ttf"),
    "C:\\Windows\\Fonts\\arialbd.ttf",  # локальная разработка на Windows
]


def find_font(paths: list) -> str:
    for path in paths:
        if os.path.exists(path):
            return path
    raise FileNotFoundError(
        "Шрифт DejaVu не найден. Установите: sudo apt-get install fonts-dejavu"
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


def generate_contract_pdf(data: dict) -> str:
    pdf = ContractPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_margins(20, 15, 20)

    for kind, text in build_contract(data):
        if kind == "title":
            pdf.set_font("DejaVu", "B", 14)
            pdf.multi_cell(0, 8, text, align="C", new_x="LMARGIN", new_y="NEXT")
            pdf.ln(2)
        elif kind == "center":
            pdf.set_font("DejaVu", "", 10)
            pdf.multi_cell(0, 6, text, align="C", new_x="LMARGIN", new_y="NEXT")
        elif kind == "heading":
            pdf.ln(2)
            pdf.set_font("DejaVu", "B", 11)
            pdf.multi_cell(0, 7, text, new_x="LMARGIN", new_y="NEXT")
            pdf.ln(1)
        elif kind == "bullet":
            pdf.set_font("DejaVu", "", 10)
            pdf.multi_cell(0, 6, text, new_x="LMARGIN", new_y="NEXT")
        elif kind == "empty":
            pdf.ln(3)
        else:
            pdf.set_font("DejaVu", "", 10)
            pdf.multi_cell(0, 6, text, align="J", new_x="LMARGIN", new_y="NEXT")

    tmp = tempfile.NamedTemporaryFile(suffix=".pdf", delete=False)
    pdf.output(tmp.name)
    return tmp.name
