import tempfile

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt

from contract_content import build_contract


def generate_contract_docx(data: dict) -> str:
    doc = Document()

    style = doc.styles["Normal"]
    style.font.name = "Times New Roman"
    style.font.size = Pt(11)

    for kind, text in build_contract(data):
        para = doc.add_paragraph()

        if kind == "title":
            para.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = para.add_run(text)
            run.bold = True
            run.font.size = Pt(14)
        elif kind == "center":
            para.alignment = WD_ALIGN_PARAGRAPH.CENTER
            para.add_run(text)
        elif kind == "heading":
            para.paragraph_format.space_before = Pt(10)
            para.paragraph_format.space_after = Pt(6)
            run = para.add_run(text)
            run.bold = True
            run.font.size = Pt(12)
        elif kind == "bullet":
            para.add_run(text)
        elif kind == "empty":
            pass
        else:
            para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            para.add_run(text)

    tmp = tempfile.NamedTemporaryFile(suffix=".docx", delete=False)
    doc.save(tmp.name)
    return tmp.name
