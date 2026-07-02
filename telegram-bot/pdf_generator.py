import os
import tempfile
from fpdf import FPDF
from datetime import datetime

FONT_PATHS = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    '/usr/share/fonts/dejavu/DejaVuSans.ttf',
    'fonts/DejaVuSans.ttf',
]

FONT_BOLD_PATHS = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf',
    'fonts/DejaVuSans-Bold.ttf',
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
        self.add_font('DejaVu', '', find_font(FONT_PATHS))
        self.add_font('DejaVu', 'B', find_font(FONT_BOLD_PATHS))

    def header(self):
        self.set_font('DejaVu', 'B', 14)
        self.cell(0, 10, 'QiAll Design', align='C')
        self.ln(5)
        self.set_font('DejaVu', '', 9)
        self.cell(0, 7, 'г. Астана  |  WhatsApp: +7 747 801-61-62  |  @qiall_design', align='C')
        self.ln(3)
        self.set_draw_color(200, 200, 200)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(8)

    def footer(self):
        self.set_y(-15)
        self.set_font('DejaVu', '', 8)
        self.cell(0, 10, f'Стр. {self.page_no()}', align='C')


def generate_contract_pdf(fields: dict) -> str:
    pdf = ContractPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    date = fields.get('Дата договора', datetime.now().strftime('%d.%m.%Y'))
    client = fields.get('ФИО клиента', '___________________')
    iin = fields.get('ИИН клиента', '___________________')
    address = fields.get('Адрес объекта', '___________________')
    area = fields.get('Площадь (м²)', '___')
    package = fields.get('Пакет услуг', '___________________')
    amount = fields.get('Сумма (тг)', '___________________')
    phone = fields.get('Телефон клиента', '___________________')

    # Заголовок
    pdf.set_font('DejaVu', 'B', 16)
    pdf.cell(0, 12, 'ДОГОВОР', align='C')
    pdf.ln(3)
    pdf.set_font('DejaVu', 'B', 12)
    pdf.cell(0, 10, 'на оказание услуг по дизайну интерьера', align='C')
    pdf.ln(10)

    # Дата и город
    pdf.set_font('DejaVu', '', 10)
    pdf.cell(95, 8, 'г. Астана', align='L')
    pdf.cell(0, 8, date, align='R')
    pdf.ln(10)

    # Стороны
    pdf.set_font('DejaVu', 'B', 11)
    pdf.cell(0, 8, '1. СТОРОНЫ ДОГОВОРА', align='L')
    pdf.ln(6)

    pdf.set_font('DejaVu', '', 10)
    pdf.multi_cell(0, 6,
        f'ИП «QiAll Design», именуемое далее «Исполнитель», с одной стороны, и\n'
        f'{client}, ИИН: {iin}, именуемый(ая) далее «Заказчик», с другой стороны,\n'
        f'заключили настоящий договор о нижеследующем:'
    )
    pdf.ln(6)

    # Предмет
    pdf.set_font('DejaVu', 'B', 11)
    pdf.cell(0, 8, '2. ПРЕДМЕТ ДОГОВОРА', align='L')
    pdf.ln(6)

    pdf.set_font('DejaVu', '', 10)
    pdf.multi_cell(0, 6,
        f'2.1. Исполнитель обязуется разработать дизайн-проект интерьера по пакету '
        f'«{package}» для объекта площадью {area} м², расположенного по адресу:\n{address}.\n\n'
        f'2.2. Состав и объём работ определяются выбранным пакетом услуг.'
    )
    pdf.ln(6)

    # Стоимость
    pdf.set_font('DejaVu', 'B', 11)
    pdf.cell(0, 8, '3. СТОИМОСТЬ И ПОРЯДОК ОПЛАТЫ', align='L')
    pdf.ln(6)

    pdf.set_font('DejaVu', '', 10)
    pdf.multi_cell(0, 6,
        f'3.1. Общая стоимость услуг составляет: {amount} тенге.\n'
        f'3.2. Оплата производится в следующем порядке:\n'
        f'     • 50% предоплата при подписании договора;\n'
        f'     • 50% при передаче готового проекта.'
    )
    pdf.ln(6)

    # Сроки
    pdf.set_font('DejaVu', 'B', 11)
    pdf.cell(0, 8, '4. СРОКИ ВЫПОЛНЕНИЯ', align='L')
    pdf.ln(6)

    pdf.set_font('DejaVu', '', 10)
    pdf.multi_cell(0, 6,
        '4.1. Сроки выполнения работ согласовываются сторонами отдельно\n'
        'и фиксируются в дополнительном соглашении к настоящему договору.'
    )
    pdf.ln(6)

    # Права и обязанности
    pdf.set_font('DejaVu', 'B', 11)
    pdf.cell(0, 8, '5. ПРАВА И ОБЯЗАННОСТИ СТОРОН', align='L')
    pdf.ln(6)

    pdf.set_font('DejaVu', '', 10)
    pdf.multi_cell(0, 6,
        '5.1. Исполнитель обязуется:\n'
        '     • выполнить работы в согласованные сроки;\n'
        '     • предоставить проект в электронном виде.\n\n'
        '5.2. Заказчик обязуется:\n'
        '     • предоставить необходимые документы и обмерный план;\n'
        '     • произвести оплату в установленные сроки;\n'
        '     • своевременно согласовывать промежуточные результаты.'
    )
    pdf.ln(10)

    # Подписи
    pdf.set_draw_color(200, 200, 200)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    pdf.set_font('DejaVu', 'B', 11)
    pdf.cell(0, 8, 'ПОДПИСИ СТОРОН', align='C')
    pdf.ln(10)

    pdf.set_font('DejaVu', 'B', 10)
    pdf.cell(95, 6, 'ИСПОЛНИТЕЛЬ:', align='L')
    pdf.cell(0, 6, 'ЗАКАЗЧИК:', align='L')
    pdf.ln(6)

    pdf.set_font('DejaVu', '', 10)
    pdf.cell(95, 6, 'ИП «QiAll Design»', align='L')
    pdf.cell(0, 6, client, align='L')
    pdf.ln(14)

    pdf.cell(95, 6, '__________________________', align='L')
    pdf.cell(0, 6, '__________________________', align='L')
    pdf.ln(5)

    pdf.set_font('DejaVu', '', 8)
    pdf.cell(95, 5, '     (подпись / ФИО)', align='L')
    pdf.cell(0, 5, '     (подпись / ФИО)', align='L')
    pdf.ln(10)

    pdf.set_font('DejaVu', '', 10)
    pdf.cell(0, 6, f'Телефон Заказчика: {phone}', align='L')

    tmp = tempfile.NamedTemporaryFile(suffix='.pdf', delete=False)
    pdf.output(tmp.name)
    return tmp.name
