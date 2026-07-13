/* QiAll Design · Language Module — RU / ҚАЗ / EN */
(function(){
  const s=document.createElement('style');
  s.textContent=`.lang-switch{display:flex;gap:3px;align-items:center;margin-right:6px}
.lang-btn{font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;
  color:var(--muted,#888);background:none;border:1px solid transparent;
  padding:4px 7px;cursor:pointer;transition:all .2s;font-family:'Montserrat',sans-serif;line-height:1}
.lang-btn:hover{color:var(--text,#f2f2f2)}
.lang-btn.active{color:var(--gold,#d4a017);border-color:rgba(212,160,23,.3);background:rgba(212,160,23,.06)}
@media(max-width:768px){.lang-switch{gap:1px;margin-right:0}.lang-btn{font-size:8px;padding:3px 5px}}`;
  document.head.appendChild(s);
})();

const LANGS={
ru:{
  navPortfolio:'Портфолио',navServices:'Услуги',navPrices:'Цены',navContact:'Контакт',
  navCta:'Написать нам',navBack:'← Назад к услугам',navServicesAll:'Услуги и цены',
  heroEyebrow:'Студия дизайна интерьера · Астана',
  heroTitle:'Пространства,<br><em>созданные для жизни</em>',
  heroDesc:'Создаём интерьеры, которые отражают вашу индивидуальность — от концепции до реализации.',
  heroBtn:'Обсудить проект',heroScroll:'Листать',
  about1Title:'Мебельная экспертиза',
  about1Desc:'Большой опыт в мебельной сфере — самостоятельно рассчитываю стоимость и подбираю оптимальные решения без посредников.',
  about2Title:'Эргономика и комфорт',
  about2Desc:'Глубокое понимание пространства: каждый сантиметр продуман под реальную жизнь — удобство на первом месте.',
  about3Title:'Только то, что можно построить',
  about3Desc:'Мы не делаем красивые картинки ради картинок. Каждое решение — реализуемое: с учётом бюджета, материалов и строителей. Ценность проекта не в эффектном рендере, а в том, что он воплощается именно так, как задумано.',
  pfEyebrow:'Наши работы',pfTitle:'Портфолио',piLabel:'3D Визуализация',
  piName1:'Интерьер · вид 1',piName2:'Интерьер · вид 2',piName3:'Интерьер · вид 3',
  piName4:'Интерьер · вид 4',piName5:'Интерьер · вид 5',piName6:'Интерьер · вид 6',
  svcEyebrow:'Чем мы занимаемся',svcTitle:'Услуги и цены',
  svc1Title:'ДИЗАЙН-ПРОЕКТ',svc2Title:'ДИЗАЙН МЕБЕЛИ',
  svc1Price:'от 1 900 тг',svc1Inc:'Включает:',
  svc1li1:'Замерный план',svc1li2:'Демонтаж/монтаж стен',svc1li3:'Расстановка мебели',svc1more:'ПОДРОБНЕЕ →',
  svc2Inc:'Включает:',svc2li1:'Выезд на объект',svc2li2:'Консультация',svc2li3:'Замеры',svc2more:'ПОДРОБНЕЕ →',
  processTitle:'Этапы работы над дизайн-проектом',
  processSteps:['Знакомство и обсуждение проекта','Заполнение брифа (анкеты)','Фиксация договорённостей — сроки и этапы работы, стоимость услуг, количество бесплатных правок','Внесение предоплаты 50%','Обсуждение концепции','Разработка дизайна','Презентация проекта','Внесение правок','Доплата','Передача файлов клиенту'],
  quizEyebrow:'Начнём знакомство',quizTitle:'Расскажите о вашем проекте',
  q0t:'Давайте познакомимся 👋',q0name:'Ваше имя',q0phone:'Номер телефона (WhatsApp)',
  q0note:'Мы свяжемся с вами после прохождения анкеты',qStart:'Начать →',
  qNum:'Вопрос',qOf:'из',qNext:'Далее →',qBack:'← Назад',
  q1:'Какой у вас тип объекта?',
  q1a:'🏢<br><strong>Квартира</strong>',q1b:'🏠<br><strong>Дом</strong>',q1c:'🏪<br><strong>Коммерция</strong>',
  q1addr:'Адрес объекта / название ЖК или дома',q1note:'Необязательно, но поможет нам лучше понять проект',
  q2:'Какова площадь вашего объекта?',q2ph:'Введите площадь',q2note:'Укажите приблизительную площадь в квадратных метрах',
  q3:'Когда планируете начать ремонт?',
  q3a:'🔑 Ключи уже на руках',q3b:'📅 В течение 3 месяцев',q3c:'🗓 В течение 6 месяцев',q3d:'⏳ Через 6 и более месяцев',
  q4:'Где находится ваш объект?',
  q4a:'🏙<br><strong>Астана</strong>',q4b:'🌆<br><strong>Алматы</strong>',q4c:'📍<br><strong>Другой город</strong>',
  q5:'Был ли у вас ранее опыт работы с дизайнером?',
  q5a:'✅ Да, я уже работал(а) с дизайнером и знаком(а) с процессом',
  q5b:'🔨 Опыт ремонта есть, но с дизайнером работаю впервые',
  q5c:'🆕 Нет, делаю ремонт впервые',
  q6l:'Почти готово ✦',q6:'Расскажите подробнее о вашем проекте',
  q6ph:'Например: хочу минималистичный стиль, у меня уже есть референсы...',
  q6file:'📎 Прикрепить фото или документ',q6skip:'Этот шаг необязателен — можно пропустить',
  calcTitle:'Расчёт стоимости',calcPkg:'Выберите подходящий пакет',
  calcArea:'Ваша площадь',calcEdit:'Изменить',
  p0badge:'Премиум',p0name:'Полный проект',p0desc:'Максимальный комплект + авторская концепция',
  p1badge:'Рекомендуем',p1name:'Рабочий проект',p1desc:'Полная документация для строителей',
  p2badge:'Популярный',p2name:'Экспресс проект',p2desc:'Концепция + основные решения',
  p3badge:'Базовый',p3name:'Планировочное решение',p3desc:'Варианты планировки с расстановкой мебели',
  visualTitle:'Визуальная подача',visualNote:'(выберите один вариант)',
  visualIncl:'3D Визуализация уже включена в <strong style="color:var(--text)">Полный проект</strong>',
  extrasTitle:'Дополнительные услуги (опционально)',
  ext1:'Авторское сопровождение',ext2:'Пакет визитов (6 выездов)',ext3:'Разовый выезд',
  calcLabel:'Итоговая стоимость',calcDefault:'Выберите пакет',calcContinue:'Продолжить →',
  finalTitle:'Спасибо! Запрос заполнен',
  finalDesc:'Отправьте ваши ответы в WhatsApp — мы свяжемся с вами в течение дня и предложим лучший вариант.',
  finalWa:'Отправить в WhatsApp',
  contactEyebrow:'Готовы начать?',contactTitle:'Свяжитесь с нами',
  contactDesc:'Расскажите о вашем проекте — мы ответим в течение дня и предложим оптимальное решение под ваш бюджет.',
  contactPhone:'Телефон',contactCity:'Город',contactCityVal:'Астана, Казахстан',
  footerCopy:'© 2026 QiAll Design · Дизайн интерьера в Астане',
  dpLabel:'Услуга № 01',dpTitle:'Дизайн-<br><em>проект</em>',
  dpDesc:'Полный комплект документации, который даёт строителям чёткие ответы на все вопросы — от планировки до последнего выключателя.',
  dpCta:'Выбрать пакет ↓',dpSecLabel:'Дизайн-проект',dpSecTitle:'Выберите пакет',dpSecSub:'Фиксированная цена — никаких скрытых доплат',
  dp0tier:'Полный проект',dp0sub:'Максимальный пакет',
  dp1tier:'Рабочий проект',dp1sub:'Рекомендуем',
  dp2tier:'Экспресс проект',dp2sub:'Популярный выбор',
  dp3tier:'Планировочное решение',dp3sub:'Базовый пакет',
  dpBtn:'Выбрать',dpSelected:'Выбрано',dpChoose:'Выбрать',dpChosen:'✓ Выбрано',
  dpNadzS:'Разовый выезд',dpNadzV:'Пакет визитов',dpNadzM:'Авторское сопровождение',
  dpViz3d:'3D Визуализация',dpVizMood:'Moodboard / Коллаж',
  vizDesc3d:'Фотореалистичные рендеры интерьера — увидите финальный результат до начала ремонта. Никаких сюрпризов, полное совпадение ожидания и реальности.',
  vizDescMood:'Концептуальный коллаж из материалов, мебели и атмосферы. Быстро согласуем стиль и направление до старта проекта — без лишних слов.',
  vizEyebrow:'Дополнительно',
  vizTitleViz:'Визуальная<br>подача',vizTitleNadz:'Авторский надзор',
  vizTabCta:'Выбрать →',
  nadzBadge:'⭐ Рекомендуем',
  nc1Billing:'за один визит на объект',nc2Billing:'в месяц · полное сопровождение',nc3Billing:'6 плановых выездов',
  nc1Footer:'Для разовых и срочных ситуаций',nc2Footer:'Полный контроль ремонта от старта до финала',nc3Footer:'Контроль без постоянного сопровождения',
  nc1Features:['Выезд на объект','Проверка хода ремонта','Консультация на месте','Решение срочного вопроса','Фотоотчёт после визита'],
  nc2Features:['Неограниченные выезды','Контроль качества работ','Согласование с подрядчиками','Решение всех вопросов','Контроль соответствия проекту','Сопровождение до сдачи объекта'],
  nc3Features:['6 выездов на объект','Контроль ключевых этапов','Гибкое расписание визитов','Согласование на месте','Фиксированная стоимость'],
  bottomGo:'Пройти анкету →',
  pkgFeatures:[
    ['Замерный план','Демонтаж/монтаж стен','Расстановка мебели','Сантехника','Двери','Тёплый пол','Плинтус','Потолок','Освещение','Выключатели','Розетки','Развёртки стен','Ведомость материалов','3D-визуализация'],
    ['Замерный план','Демонтаж/монтаж стен','Расстановка мебели','Сантехника','Потолок','Освещение','Ведомость материалов','Тёплый пол','Развёртки стен','3D-визуализация'],
    ['Замерный план','Расстановка мебели','Сантехника','Потолок','Освещение','Развёртки стен','Ведомость материалов','3D-визуализация'],
    ['Замерный план','Демонтаж/монтаж стен','Расстановка мебели','Сантехника','Потолок','Развёртки стен','3D-визуализация']
  ],
  fcNum:'02',fcTitle:'Дизайн<br>мебели',
  fcPageDesc:'Работаем в Астане. Выезжаем на объект, замеряем, разрабатываем эскизы мебели под ваш проект.',
  fcPricePer:'тг / выезд',fcli1:'Выезд на объект',fcli2:'Замер мебели',fcli3:'Консультация на месте',
  fcSketch:'Пример эскиза',
  fcNote:'* Стоимость разработки эскизов рассчитывается индивидуально, после замера. Цена зависит от типа мебели, размеров и выбранного формата эскиза.',
  fcR1:'Дизайн мебели — это точные эскизы под ваш объект с учётом размеров, материалов и эргономики. Опыт в мебельной сфере позволяет нам самостоятельно рассчитать стоимость и подобрать оптимальные решения.',
  fcR2:'Разрабатываем два формата эскизов: <strong style="color:#fff">обычный</strong> — с точными размерами и расстановкой, и <strong style="color:#fff">премиальный</strong> — с названием материалов, артикулом, моделью фурнитуры и схемой расположения розеток и кабелей.',
  fcR3:'Работаем с кухнями, шкафами, тумбами, санузлами и любой корпусной мебелью. Никакого разрыва между ожиданием и реальностью — визуализация точно отражает итоговый результат.',
  fcCtaTitle:'Готовы начать?',fcCtaDesc:'Запишитесь на выезд — замерим и рассчитаем стоимость эскиза',
  fcCtaWa:'Записаться в WhatsApp',fcCtaQuiz:'Пройти анкету',
},

kz:{
  navPortfolio:'Портфолио',navServices:'Қызметтер',navPrices:'Бағалар',navContact:'Байланыс',
  navCta:'Бізге жазыңыз',navBack:'← Қызметтерге оралу',navServicesAll:'Қызметтер мен бағалар',
  heroEyebrow:'Интерьер дизайн студиясы · Астана',
  heroTitle:'Өмір үшін<br><em>жасалған кеңістіктер</em>',
  heroDesc:'Сіздің жеке ерекшелігіңізді бейнелейтін интерьерлер жасаймыз — тұжырымдамадан іске асыруға дейін.',
  heroBtn:'Жобаны талқылау',heroScroll:'Жылжыту',
  about1Title:'Жиһаз сараптамасы',
  about1Desc:'Жиһаз саласындағы үлкен тәжірибе — делдалсыз өз бетімізше құнын есептеп, оңтайлы шешімдерді таңдаймыз.',
  about2Title:'Эргономика және ыңғайлылық',
  about2Desc:'Кеңістікті терең түсіну: әр сантиметр нақты өмірге бейімделген — ыңғайлылық бірінші орында.',
  about3Title:'Тек іске асырылатын шешімдер',
  about3Desc:'Біз сурет үшін сурет жасамаймыз. Әр шешім — бюджетті, материалдарды және құрылысшыларды ескере отырып іске асырылатын. Жобаның құны — жасалған рендерде емес, ойластырылғандай дәл жүзеге асатындығында.',
  pfEyebrow:'Біздің жұмыстар',pfTitle:'Портфолио',piLabel:'3D Визуализация',
  piName1:'Интерьер · 1-ші көрініс',piName2:'Интерьер · 2-ші көрініс',piName3:'Интерьер · 3-ші көрініс',
  piName4:'Интерьер · 4-ші көрініс',piName5:'Интерьер · 5-ші көрініс',piName6:'Интерьер · 6-шы көрініс',
  svcEyebrow:'Біз не істейміз',svcTitle:'Қызметтер мен бағалар',
  svc1Title:'ДИЗАЙН-ЖОБА',svc2Title:'ЖИҺАЗ ДИЗАЙНЫ',
  svc1Price:'1 900 тг-дан',svc1Inc:'Кіреді:',
  svc1li1:'Өлшем жоспары',svc1li2:'Қабырғаларды бұзу/салу',svc1li3:'Жиһазды орналастыру',svc1more:'ТОЛЫҒЫРАҚ →',
  svc2Inc:'Кіреді:',svc2li1:'Объектіге шығу',svc2li2:'Кеңес беру',svc2li3:'Өлшеу',svc2more:'ТОЛЫҒЫРАҚ →',
  processTitle:'Дизайн-жобамен жұмыс кезеңдері',
  processSteps:['Танысу және жобаны талқылау','Бриф (анкета) толтыру','Уағдаластықтарды бекіту — мерзімдер, қызмет құны, тегін түзетулер саны','Алдын ала төлем 50%','Тұжырымдаманы талқылау','Дизайнды әзірлеу','Жобаны презентациялау','Түзетулер енгізу','Қосымша төлем','Файлдарды клиентке тапсыру'],
  quizEyebrow:'Танысудан бастайық',quizTitle:'Жобаңыз туралы айтыңыз',
  q0t:'Танысайық 👋',q0name:'Атыңыз',q0phone:'Телефон нөмірі (WhatsApp)',
  q0note:'Анкетаны толтырғаннан кейін сізбен байланысамыз',qStart:'Бастау →',
  qNum:'Сұрақ',qOf:'/',qNext:'Әрі қарай →',qBack:'← Артқа',
  q1:'Объектіңіздің түрі қандай?',
  q1a:'🏢<br><strong>Пәтер</strong>',q1b:'🏠<br><strong>Үй</strong>',q1c:'🏪<br><strong>Коммерция</strong>',
  q1addr:'Объект мекенжайы / тұрғын үй кешенінің атауы',q1note:'Міндетті емес, бірақ жобаны жақсы түсінуге көмектеседі',
  q2:'Объектіңіздің ауданы қандай?',q2ph:'Ауданды енгізіңіз',q2note:'Шамамен ауданды шаршы метрмен көрсетіңіз',
  q3:'Жөндеуді қашан бастауды жоспарлап отырсыз?',
  q3a:'🔑 Кілттер қолда',q3b:'📅 3 ай ішінде',q3c:'🗓 6 ай ішінде',q3d:'⏳ 6 айдан кейін',
  q4:'Объектіңіз қай жерде орналасқан?',
  q4a:'🏙<br><strong>Астана</strong>',q4b:'🌆<br><strong>Алматы</strong>',q4c:'📍<br><strong>Басқа қала</strong>',
  q5:'Бұрын дизайнермен жұмыс тәжірибеңіз болды ма?',
  q5a:'✅ Иә, дизайнермен жұмыс істедім және процесті білемін',
  q5b:'🔨 Жөндеу тәжірибем бар, бірақ дизайнермен алғаш рет жұмыс істеймін',
  q5c:'🆕 Жоқ, жөндеуді алғаш рет жасаймын',
  q6l:'Аяқталуға жақын ✦',q6:'Жобаңыз туралы толығырақ айтыңыз',
  q6ph:'Мысалы: минималистік стиль қалаймын, референстарым бар...',
  q6file:'📎 Фото немесе құжат тіркеу',q6skip:'Бұл қадам міндетті емес — өткізуге болады',
  calcTitle:'Құнды есептеу',calcPkg:'Қолайлы пакетті таңдаңыз',
  calcArea:'Сіздің ауданыңыз',calcEdit:'Өзгерту',
  p0badge:'Премиум',p0name:'Толық жоба',p0desc:'Максималды жинақтама + авторлық тұжырымдама',
  p1badge:'Ұсынамыз',p1name:'Жұмыс жобасы',p1desc:'Құрылысшыларға арналған толық құжаттама',
  p2badge:'Танымал',p2name:'Экспресс жоба',p2desc:'Тұжырымдама + негізгі шешімдер',
  p3badge:'Базалық',p3name:'Жоспарлау шешімі',p3desc:'Жиһазды орналастырумен жоспарлау нұсқалары',
  visualTitle:'Визуалды ұсыныс',visualNote:'(бір нұсқаны таңдаңыз)',
  visualIncl:'3D Визуализация <strong style="color:var(--text)">Толық жобаға</strong> кіреді',
  extrasTitle:'Қосымша қызметтер (опциялы)',
  ext1:'Авторлық қадағалау',ext2:'Визиттер пакеті (6 шығу)',ext3:'Бір рет шығу',
  calcLabel:'Жалпы құны',calcDefault:'Пакетті таңдаңыз',calcContinue:'Жалғастыру →',
  finalTitle:'Рахмет! Сұрау жіберілді',
  finalDesc:'Жауаптарыңызды WhatsApp-қа жіберіңіз — күн ішінде сізбен байланысып, ең жақсы нұсқаны ұсынамыз.',
  finalWa:'WhatsApp-қа жіберу',
  contactEyebrow:'Бастауға дайынсыз ба?',contactTitle:'Бізбен байланысыңыз',
  contactDesc:'Жобаңыз туралы айтыңыз — күн ішінде жауап береміз және бюджетіңізге сай оңтайлы шешімді ұсынамыз.',
  contactPhone:'Телефон',contactCity:'Қала',contactCityVal:'Астана, Қазақстан',
  footerCopy:'© 2026 QiAll Design · Астанадағы интерьер дизайны',
  dpLabel:'Қызмет № 01',dpTitle:'Дизайн-<br><em>жоба</em>',
  dpDesc:'Жоспарлаудан соңғы ашыққа дейін — барлық сұрақтарға нақты жауап беретін толық құжаттама жинағы.',
  dpCta:'Пакетті таңдау ↓',dpSecLabel:'Дизайн-жоба',dpSecTitle:'Пакетті таңдаңыз',dpSecSub:'Тіркелген баға — жасырын қосымша төлемдер жоқ',
  dp0tier:'Толық жоба',dp0sub:'Максималды жинақтама',
  dp1tier:'Жұмыс жобасы',dp1sub:'Ұсынамыз',
  dp2tier:'Экспресс жоба',dp2sub:'Танымал таңдау',
  dp3tier:'Жоспарлау шешімі',dp3sub:'Базалық жинақтама',
  dpBtn:'Таңдау',dpSelected:'Таңдалды',dpChoose:'Таңдау',dpChosen:'✓ Таңдалды',
  dpNadzS:'Бір рет шығу',dpNadzV:'Визиттер пакеті',dpNadzM:'Авторлық қадағалау',
  dpViz3d:'3D Визуализация',dpVizMood:'Moodboard / Коллаж',
  vizDesc3d:'Интерьердің фотореалистік рендерлері — жөндеу басталмай тұрып соңғы нәтижені көресіз. Ешқандай тосын жағдай — күту мен шындық толық сәйкес келеді.',
  vizDescMood:'Материалдардан, жиһаздан және атмосферадан жасалған концептуалды коллаж. Жобаны бастамастан бұрын стиль мен бағытты жылдам келісеміз.',
  vizEyebrow:'Қосымша',
  vizTitleViz:'Визуалды<br>ұсыныс',vizTitleNadz:'Авторлық бақылау',
  vizTabCta:'Таңдау →',
  nadzBadge:'⭐ Ұсынамыз',
  nc1Billing:'бір шығу үшін',nc2Billing:'айына · толық қадағалау',nc3Billing:'6 жоспарлы шығу',
  nc1Footer:'Бір реттік және шұғыл жағдайлар үшін',nc2Footer:'Бастаудан аяқтауға дейін толық бақылау',nc3Footer:'Үздіксіз қадағалаусыз бақылау',
  nc1Features:['Объектіге шығу','Жөндеу барысын тексеру','Орнында кеңес беру','Шұғыл мәселені шешу','Шығудан кейін фотоесеп'],
  nc2Features:['Шексіз шығулар','Жұмыс сапасын бақылау','Мердігерлермен келісу','Барлық мәселелерді шешу','Жобаға сәйкестікті бақылау','Объектіні тапсырғанша қадағалау'],
  nc3Features:['6 шығу объектіге','Негізгі кезеңдерді бақылау','Визиттердің икемді кестесі','Орнында келісу','Тіркелген құн'],
  bottomGo:'Анкетаны толтыру →',
  pkgFeatures:[
    ['Өлшем жоспары','Қабырғаларды бұзу/салу','Жиһазды орналастыру','Сантехника','Есіктер','Жылы еден','Плинтус','Төбе','Жарықтандыру','Қосқыштар','Розеткалар','Қабырға жайылмалары','Материалдар тізімі','3D-визуализация'],
    ['Өлшем жоспары','Қабырғаларды бұзу/салу','Жиһазды орналастыру','Сантехника','Төбе','Жарықтандыру','Материалдар тізімі','Жылы еден','Қабырға жайылмалары','3D-визуализация'],
    ['Өлшем жоспары','Жиһазды орналастыру','Сантехника','Төбе','Жарықтандыру','Қабырға жайылмалары','Материалдар тізімі','3D-визуализация'],
    ['Өлшем жоспары','Қабырғаларды бұзу/салу','Жиһазды орналастыру','Сантехника','Төбе','Қабырға жайылмалары','3D-визуализация']
  ],
  fcNum:'02',fcTitle:'Жиһаз<br>дизайны',
  fcPageDesc:'Астанада жұмыс істейміз. Объектіге шығамыз, өлшейміз, жобаңызға арналған жиһаз эскиздерін жасаймыз.',
  fcPricePer:'тг / шығу',fcli1:'Объектіге шығу',fcli2:'Жиһазды өлшеу',fcli3:'Орнында кеңес беру',
  fcSketch:'Эскиз үлгісі',
  fcNote:'* Эскиздер жасау құны өлшемнен кейін жеке есептеледі. Баға жиһаз түріне, өлшемдеріне және таңдалған форматқа байланысты.',
  fcR1:'Жиһаз дизайны — бұл өлшемдерді, материалдарды және эргономиканы ескере отырып жасалған нақты эскиздер. Жиһаз саласындағы тәжірибеміз өз бетімізше құнды есептеп, оңтайлы шешімдерді таңдауға мүмкіндік береді.',
  fcR2:'Эскиздердің екі форматын жасаймыз: <strong style="color:#fff">қарапайым</strong> — нақты өлшемдер мен орналасыппен, және <strong style="color:#fff">премиалды</strong> — материалдар атауы, артикул, фурнитура моделі және розетка мен кабельдер орналасу сызбасымен.',
  fcR3:'Асүйлермен, шкафтармен, тумбалармен, санузелдермен және кез келген корпусты жиһазбен жұмыс істейміз. Ешқандай алшақтық жоқ — визуализация нақты нәтижені дәл бейнелейді.',
  fcCtaTitle:'Бастауға дайынсыз ба?',fcCtaDesc:'Шығуға жазылыңыз — өлшеп, эскиз құнын есептейміз',
  fcCtaWa:'WhatsApp арқылы жазылу',fcCtaQuiz:'Анкетаны толтыру',
},

en:{
  navPortfolio:'Portfolio',navServices:'Services',navPrices:'Pricing',navContact:'Contact',
  navCta:'Contact Us',navBack:'← Back to Services',navServicesAll:'Services & Pricing',
  heroEyebrow:'Interior Design Studio · Astana',
  heroTitle:'Spaces,<br><em>created for living</em>',
  heroDesc:'We create interiors that reflect your individuality — from concept to realization.',
  heroBtn:'Discuss Project',heroScroll:'Scroll',
  about1Title:'Furniture Expertise',
  about1Desc:'Extensive experience in furniture — independently calculating costs and selecting optimal solutions without intermediaries.',
  about2Title:'Ergonomics & Comfort',
  about2Desc:'Deep understanding of space: every centimeter is designed for real life — comfort comes first.',
  about3Title:'Only What Can Be Built',
  about3Desc:"We don't create pretty pictures for their own sake. Every solution is buildable: accounting for budget, materials, and contractors. The value lies in being realized exactly as intended.",
  pfEyebrow:'Our Works',pfTitle:'Portfolio',piLabel:'3D Visualization',
  piName1:'Interior · view 1',piName2:'Interior · view 2',piName3:'Interior · view 3',
  piName4:'Interior · view 4',piName5:'Interior · view 5',piName6:'Interior · view 6',
  svcEyebrow:'What We Do',svcTitle:'Services & Pricing',
  svc1Title:'DESIGN PROJECT',svc2Title:'FURNITURE DESIGN',
  svc1Price:'from 1 900 KZT',svc1Inc:'Includes:',
  svc1li1:'Measurement plan',svc1li2:'Wall demolition / construction',svc1li3:'Furniture layout',svc1more:'LEARN MORE →',
  svc2Inc:'Includes:',svc2li1:'Site visit',svc2li2:'Consultation',svc2li3:'Measurements',svc2more:'LEARN MORE →',
  processTitle:'Design Project Workflow',
  processSteps:['Introduction and project discussion','Filling out the brief (questionnaire)','Fixing agreements — deadlines, service costs, number of free revisions','Prepayment 50%','Concept discussion','Design development','Project presentation','Revisions','Final payment','File delivery to client'],
  quizEyebrow:"Let's get started",quizTitle:'Tell us about your project',
  q0t:"Let's get acquainted 👋",q0name:'Your name',q0phone:'Phone number (WhatsApp)',
  q0note:'We will contact you after completing the form',qStart:'Start →',
  qNum:'Question',qOf:'of',qNext:'Next →',qBack:'← Back',
  q1:'What type of property is it?',
  q1a:'🏢<br><strong>Apartment</strong>',q1b:'🏠<br><strong>House</strong>',q1c:'🏪<br><strong>Commercial</strong>',
  q1addr:'Property address / building / complex name',q1note:'Optional, but helps us better understand the project',
  q2:'What is the area of your property?',q2ph:'Enter area',q2note:'Please enter the approximate area in square meters',
  q3:'When do you plan to start renovation?',
  q3a:'🔑 Keys already in hand',q3b:'📅 Within 3 months',q3c:'🗓 Within 6 months',q3d:'⏳ More than 6 months away',
  q4:'Where is your property located?',
  q4a:'🏙<br><strong>Astana</strong>',q4b:'🌆<br><strong>Almaty</strong>',q4c:'📍<br><strong>Other city</strong>',
  q5:'Have you worked with a designer before?',
  q5a:"✅ Yes, I've worked with a designer and know the process",
  q5b:"🔨 I have renovation experience but this is my first time with a designer",
  q5c:"🆕 No, this is my first renovation",
  q6l:'Almost done ✦',q6:'Tell us more about your project',
  q6ph:'E.g.: I want a minimalist style, I already have references...',
  q6file:'📎 Attach photo or document',q6skip:'This step is optional — you can skip it',
  calcTitle:'Cost Calculation',calcPkg:'Choose a suitable package',
  calcArea:'Your area',calcEdit:'Change',
  p0badge:'Premium',p0name:'Full Project',p0desc:"Complete package + author's concept",
  p1badge:'Recommended',p1name:'Working Project',p1desc:'Full documentation for builders',
  p2badge:'Popular',p2name:'Express Project',p2desc:'Concept + core solutions',
  p3badge:'Basic',p3name:'Planning Solution',p3desc:'Layout options with furniture placement',
  visualTitle:'Visual Presentation',visualNote:'(choose one option)',
  visualIncl:'3D Visualization is already included in <strong style="color:var(--text)">Full Project</strong>',
  extrasTitle:'Additional services (optional)',
  ext1:"Author's Supervision",ext2:'Visit Package (6 visits)',ext3:'Single Site Visit',
  calcLabel:'Total Cost',calcDefault:'Choose a package',calcContinue:'Continue →',
  finalTitle:'Thank you! Form submitted',
  finalDesc:'Send your answers via WhatsApp — we will contact you within the day with the best offer.',
  finalWa:'Send via WhatsApp',
  contactEyebrow:'Ready to start?',contactTitle:'Contact Us',
  contactDesc:"Tell us about your project — we'll reply within the day and offer the best solution for your budget.",
  contactPhone:'Phone',contactCity:'City',contactCityVal:'Astana, Kazakhstan',
  footerCopy:'© 2026 QiAll Design · Interior Design in Astana',
  dpLabel:'Service № 01',dpTitle:'Design<br><em>Project</em>',
  dpDesc:'A complete set of documentation giving builders clear answers to all questions — from layout to the last switch.',
  dpCta:'Choose package ↓',dpSecLabel:'Design Project',dpSecTitle:'Choose a Package',dpSecSub:'Fixed price — no hidden fees',
  dp0tier:'Full Project',dp0sub:'Maximum package',
  dp1tier:'Working Project',dp1sub:'Recommended',
  dp2tier:'Express Project',dp2sub:'Popular choice',
  dp3tier:'Planning Solution',dp3sub:'Basic package',
  dpBtn:'Select',dpSelected:'Selected',dpChoose:'Select',dpChosen:'✓ Selected',
  dpNadzS:'Single Site Visit',dpNadzV:'Visit Package',dpNadzM:"Author's Supervision",
  dpViz3d:'3D Visualization',dpVizMood:'Moodboard / Collage',
  vizDesc3d:'Photorealistic interior renders — see the final result before renovation begins. No surprises, perfect match between expectation and reality.',
  vizDescMood:'A conceptual mood board of materials, furniture, and atmosphere. Quickly align on style and direction before the project starts.',
  vizEyebrow:'Additional',
  vizTitleViz:'Visual<br>Presentation',vizTitleNadz:"Author's Supervision",
  vizTabCta:'Select →',
  nadzBadge:'⭐ Recommended',
  nc1Billing:'per site visit',nc2Billing:'per month · full supervision',nc3Billing:'6 planned site visits',
  nc1Footer:'For one-time and urgent situations',nc2Footer:'Full renovation control from start to finish',nc3Footer:'Control without constant supervision',
  nc1Features:['Site visit','Renovation progress check','On-site consultation','Urgent issue resolution','Photo report after visit'],
  nc2Features:['Unlimited visits','Work quality control','Coordination with contractors','Resolution of all issues','Project compliance monitoring','Supervision until project delivery'],
  nc3Features:['6 site visits','Key stage monitoring','Flexible visit schedule','On-site coordination','Fixed cost'],
  bottomGo:'Fill out the form →',
  pkgFeatures:[
    ['Measurement plan','Wall demolition / construction','Furniture layout','Plumbing','Doors','Underfloor heating','Skirting boards','Ceiling','Lighting','Switches','Outlets','Wall elevations','Materials list','3D visualization'],
    ['Measurement plan','Wall demolition / construction','Furniture layout','Plumbing','Ceiling','Lighting','Materials list','Underfloor heating','Wall elevations','3D visualization'],
    ['Measurement plan','Furniture layout','Plumbing','Ceiling','Lighting','Wall elevations','Materials list','3D visualization'],
    ['Measurement plan','Wall demolition / construction','Furniture layout','Plumbing','Ceiling','Wall elevations','3D visualization']
  ],
  fcNum:'02',fcTitle:'Furniture<br>Design',
  fcPageDesc:'We work in Astana. We visit your site, take measurements, and develop furniture sketches for your project.',
  fcPricePer:'KZT / visit',fcli1:'Site visit',fcli2:'Furniture measurements',fcli3:'On-site consultation',
  fcSketch:'Sketch example',
  fcNote:'* Sketch development cost is calculated individually after measurements. Price depends on furniture type, dimensions and chosen format.',
  fcR1:'Furniture design means precise sketches for your space, accounting for dimensions, materials, and ergonomics. Our furniture expertise lets us independently calculate costs and select optimal solutions.',
  fcR2:'We develop two sketch formats: <strong style="color:#fff">standard</strong> — with precise dimensions and layout, and <strong style="color:#fff">premium</strong> — with material names, article numbers, hardware models, and outlet/cable layout plans.',
  fcR3:'We work with kitchens, wardrobes, cabinets, bathrooms, and all case furniture. No gap between expectation and reality — the visualization accurately reflects the final result.',
  fcCtaTitle:'Ready to start?',fcCtaDesc:"Book a visit — we'll measure and calculate the sketch cost",
  fcCtaWa:'Book via WhatsApp',fcCtaQuiz:'Fill out the form',
}
};

window.currentLang=localStorage.getItem('qiall_lang')||'ru';

function t(k){const d=LANGS[window.currentLang];return d&&d[k]!==undefined?d[k]:(LANGS.ru[k]||'');}
window.t=t;

function $q(s){return document.querySelector(s);}
function $$q(s){return document.querySelectorAll(s);}
function st(s,k){const e=$q(s);if(e)e.textContent=t(k);}
function sh(s,k){const e=$q(s);if(e)e.innerHTML=t(k);}
function se(e,k){if(e)e.textContent=t(k);}
function ph(s,k){const e=$q(s);if(e)e.placeholder=t(k);}

/* Re-wrap svc-title letters for animation after language switch */
function rewrapSvc(el,text){
  if(!el)return;
  const words=text.split(' ');
  let i=0;
  el.innerHTML=words.map((word,wi)=>{
    const letters=word.split('').map(char=>{
      const d=(i++*0.018).toFixed(3);
      return`<span class="lw"><span class="lo" style="transition-delay:${d}s">${char}</span><span class="li" style="transition-delay:${d}s">${char}</span></span>`;
    }).join('');
    const sp=wi<words.length-1?`<span style="display:inline-block;width:.3em"> </span>`:'';
    return`<span style="white-space:nowrap;display:inline-block">${letters}</span>${sp}`;
  }).join('');
}

function applyLang(lang){
  window.currentLang=lang;
  document.documentElement.lang=lang==='kz'?'kk':lang;

  /* NAV */
  st('.nav-links a:nth-child(1)','navPortfolio');
  st('.nav-links a:nth-child(2)','navServices');
  st('.nav-links a:nth-child(3)','navPrices');
  st('.nav-links a:nth-child(4)','navContact');
  st('.nav-cta','navCta');
  st('.nav-back','navBack');
  const mls=$$q('.mobile-nav .ml');
  if(mls[0])mls[0].textContent=t('navPortfolio');
  if(mls[1])mls[1].textContent=t('navServicesAll');
  if(mls[2])mls[2].textContent=t('navContact');

  /* HERO */
  st('.hero-eyebrow','heroEyebrow');
  sh('.hero-title','heroTitle');
  st('.hero-desc','heroDesc');
  st('.btn-primary','heroBtn');
  const hs=$q('.hero-scroll span');if(hs)hs.textContent=t('heroScroll');

  /* ABOUT */
  const ab=$$q('.about-item');
  ['1','2','3'].forEach((n,i)=>{
    if(!ab[i])return;
    se(ab[i].querySelector('.about-title'),'about'+n+'Title');
    se(ab[i].querySelector('.about-desc'),'about'+n+'Desc');
  });

  /* PORTFOLIO */
  st('.portfolio .section-eyebrow','pfEyebrow');
  st('.portfolio .section-title','pfTitle');
  $$q('.pi-label').forEach(e=>e.textContent=t('piLabel'));
  $$q('.pi-name').forEach((e,i)=>{const k='piName'+(i+1);if(t(k))e.textContent=t(k);});

  /* SERVICES */
  st('.services .section-eyebrow','svcEyebrow');
  st('.services .section-title','svcTitle');
  /* Service titles with letter animation re-wrap */
  const svct=$$q('.svc-title');
  if(svct[0])rewrapSvc(svct[0],t('svc1Title'));
  if(svct[1])rewrapSvc(svct[1],t('svc2Title'));
  const si=$$q('.svc-item');
  if(si[0]){
    se(si[0].querySelector('.svc-price'),'svc1Price');
    se(si[0].querySelector('.svc-includes-label'),'svc1Inc');
    const l=si[0].querySelectorAll('.svc-includes li');
    if(l[0])l[0].textContent=t('svc1li1');if(l[1])l[1].textContent=t('svc1li2');if(l[2])l[2].textContent=t('svc1li3');
    se(si[0].querySelector('.btn-more'),'svc1more');
  }
  if(si[1]){
    se(si[1].querySelector('.svc-includes-label'),'svc2Inc');
    const l=si[1].querySelectorAll('.svc-includes li');
    if(l[0])l[0].textContent=t('svc2li1');if(l[1])l[1].textContent=t('svc2li2');if(l[2])l[2].textContent=t('svc2li3');
    se(si[1].querySelector('.btn-more'),'svc2more');
  }

  /* PROCESS */
  st('.process .section-title','processTitle');
  if(typeof window.rebuildProcessSteps==='function')window.rebuildProcessSteps();

  /* QUIZ */
  st('.quiz .section-eyebrow','quizEyebrow');
  st('.quiz .section-title','quizTitle');
  st('#stepName .quiz-q','q0t');
  ph('#quizName','q0name');ph('#quizPhone','q0phone');
  const n0=$q('#stepName p[style*="rgba"]');if(n0)n0.textContent=t('q0note');
  const bn=$q('#btnName');if(bn)bn.textContent=t('qStart');
  for(let n=1;n<=5;n++){const e=$q('#step'+n+' .quiz-counter');if(e)e.innerHTML=t('qNum')+' <span>'+n+'</span> '+t('qOf')+' <span>5</span>';}
  $$q('.quiz-btn-back').forEach(e=>e.textContent=t('qBack'));
  ['btn1','btn2','btn3','btn4','btn5'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=t('qNext');});
  const cnb=$q('#stepComment .quiz-btn');if(cnb)cnb.textContent=t('qNext');
  /* step1 */
  st('#step1 .quiz-q','q1');
  const q1o=$$q('#step1 .quiz-opt');
  if(q1o[0])q1o[0].innerHTML=t('q1a');if(q1o[1])q1o[1].innerHTML=t('q1b');if(q1o[2])q1o[2].innerHTML=t('q1c');
  ph('#quizAddress','q1addr');
  const n1=$q('#step1 p[style*="rgba"]');if(n1)n1.textContent=t('q1note');
  /* step2 */
  st('#step2 .quiz-q','q2');ph('#areaInput','q2ph');
  const n2=$q('#step2 p[style*="rgba"]');if(n2)n2.textContent=t('q2note');
  /* step3 */
  st('#step3 .quiz-q','q3');
  const q3o=$$q('#step3 .quiz-opt');
  if(q3o[0])q3o[0].textContent=t('q3a');if(q3o[1])q3o[1].textContent=t('q3b');if(q3o[2])q3o[2].textContent=t('q3c');if(q3o[3])q3o[3].textContent=t('q3d');
  /* step4 */
  st('#step4 .quiz-q','q4');
  const q4o=$$q('#step4 .quiz-opt');
  if(q4o[0])q4o[0].innerHTML=t('q4a');if(q4o[1])q4o[1].innerHTML=t('q4b');if(q4o[2])q4o[2].innerHTML=t('q4c');
  /* step5 */
  st('#step5 .quiz-q','q5');
  const q5o=$$q('#step5 .quiz-opt');
  if(q5o[0])q5o[0].textContent=t('q5a');if(q5o[1])q5o[1].textContent=t('q5b');if(q5o[2])q5o[2].textContent=t('q5c');
  /* step6 */
  st('#stepComment .quiz-counter','q6l');st('#stepComment .quiz-q','q6');ph('#quizComment','q6ph');
  const fl=$q('.quiz-file-label');
  if(fl){const inp=fl.querySelector('input');fl.textContent=t('q6file');if(inp)fl.appendChild(inp);}
  const sk=$q('#stepComment p[style*="dim"]');if(sk)sk.textContent=t('q6skip');
  /* calc */
  st('#stepCalc .quiz-counter','calcTitle');st('#stepCalc .quiz-q','calcPkg');
  const al=$q('.calc-area-row div div');if(al)al.textContent=t('calcArea');
  st('.calc-area-edit','calcEdit');
  const cp=$$q('.calc-pkg');
  ['p0','p1','p2','p3'].forEach((p,i)=>{
    if(!cp[i])return;
    se(cp[i].querySelector('.calc-pkg-badge'),p+'badge');
    se(cp[i].querySelector('.calc-pkg-name'),p+'name');
    se(cp[i].querySelector('.calc-pkg-desc'),p+'desc');
  });
  if(window.PKGS){window.PKGS[0].name=t('p0name');window.PKGS[1].name=t('p1name');window.PKGS[2].name=t('p2name');window.PKGS[3].name=t('p3name');}
  /* visual block in quiz */
  const vbt=$q('#visualBlock .calc-extras-title');
  if(vbt)vbt.innerHTML=t('visualTitle')+' <span style="color:var(--dim);font-weight:400;letter-spacing:0;text-transform:none;font-size:11px">'+t('visualNote')+'</span>';
  /* visual radio option names */
  const vrn=$$q('#visualBlock .calc-extra-name');
  if(vrn[0])vrn[0].textContent=t('dpViz3d');
  if(vrn[1])vrn[1].textContent=t('dpVizMood');
  const vit=$q('#visualIncluded .calc-extras-title');if(vit)vit.textContent=t('visualTitle');
  const vis=$q('#visualIncluded div span:nth-child(2)');if(vis)vis.innerHTML=t('visualIncl');
  const extH=$q('#stepCalc > .calc-extras-title');if(extH)extH.textContent=t('extrasTitle');
  const cbl=$$q('label:has(.calc-extra-cb)');
  if(cbl[0])cbl[0].querySelector('.calc-extra-name').textContent=t('ext1');
  if(cbl[1])cbl[1].querySelector('.calc-extra-name').textContent=t('ext2');
  if(cbl[2])cbl[2].querySelector('.calc-extra-name').textContent=t('ext3');
  st('.calc-result-label','calcLabel');
  const cr=document.getElementById('calcResult');
  if(cr&&[LANGS.ru.calcDefault,LANGS.kz.calcDefault,LANGS.en.calcDefault].includes(cr.textContent))cr.textContent=t('calcDefault');
  const bca=document.getElementById('btnCalc');if(bca)bca.textContent=t('calcContinue');
  /* final */
  st('#stepFinal h2','finalTitle');st('#stepFinal p','finalDesc');
  const wa=document.getElementById('quizWaBtn');
  if(wa){const svg=wa.querySelector('svg');wa.textContent=t('finalWa');if(svg)wa.prepend(svg);}

  /* CONTACT */
  st('.contact .section-eyebrow','contactEyebrow');
  st('.contact .section-title','contactTitle');
  st('.contact-desc','contactDesc');
  const ci=$$q('.ci');
  if(ci[0])se(ci[0].querySelector('.ci-label'),'contactPhone');
  if(ci[2]){se(ci[2].querySelector('.ci-label'),'contactCity');se(ci[2].querySelector('.ci-val'),'contactCityVal');}

  /* FOOTER */
  st('.footer-copy','footerCopy');
  const fl2=$$q('.footer-links a');
  if(fl2[0])fl2[0].textContent=t('navPortfolio');if(fl2[1])fl2[1].textContent=t('navServices');
  if(fl2[2])fl2[2].textContent=t('navPrices');if(fl2[3])fl2[3].textContent=t('navContact');

  /* ── DESIGN-PROJECT page ── */
  st('.ph-label','dpLabel');sh('.ph-title','dpTitle');st('.ph-desc','dpDesc');st('.ph-cta','dpCta');
  st('.pricing-header .sec-label','dpSecLabel');st('.pricing-header .sec-title','dpSecTitle');st('.pricing-header .sec-sub','dpSecSub');
  const pc=$$q('.pkg-card');
  ['dp0','dp1','dp2','dp3'].forEach((p,i)=>{
    if(!pc[i])return;
    se(pc[i].querySelector('.pkg-tier'),p+'tier');se(pc[i].querySelector('.pkg-sub'),p+'sub');
  });
  $$q('.pkg-btn').forEach(b=>b.textContent=t('dpBtn'));
  /* Package feature lists */
  const pfData=t('pkgFeatures');
  if(Array.isArray(pfData)){
    $$q('.pkg-card').forEach((card,ci)=>{
      const feats=pfData[ci];if(!Array.isArray(feats))return;
      card.querySelectorAll('.pf-text').forEach((el,fi)=>{if(feats[fi]!==undefined)el.textContent=feats[fi];});
    });
  }
  /* Надзор select buttons (reset to default text when not selected) */
  $$q('.nc-btn').forEach(b=>{if(!b.classList.contains('selected-btn'))b.textContent=t('dpChoose');});
  if(window.PKG_NAMES){window.PKG_NAMES[0]=t('dp0tier');window.PKG_NAMES[1]=t('dp1tier');window.PKG_NAMES[2]=t('dp2tier');window.PKG_NAMES[3]=t('dp3tier');}
  if(window.NADZ_NAMES){window.NADZ_NAMES.single=t('dpNadzS');window.NADZ_NAMES.visits=t('dpNadzV');window.NADZ_NAMES.monthly=t('dpNadzM');}
  if(window.VIZ_NAMES){window.VIZ_NAMES['3d']=t('dpViz3d');window.VIZ_NAMES['mood']=t('dpVizMood');}
  if(window.vizDescs){
    window.vizDescs['3d']=t('vizDesc3d');window.vizDescs['mood']=t('vizDescMood');
    const at=$q('.viz-tab.active');const vd=document.getElementById('vizDesc');
    if(at&&vd)vd.textContent=window.vizDescs[at.dataset.tab];
  }
  window.dpBarLabel=t('dpSelected');
  /* viz section headings */
  $$q('.viz-eyebrow').forEach(e=>e.textContent=t('vizEyebrow'));
  const vtt=$$q('.viz-title');
  if(vtt[0])vtt[0].innerHTML=t('vizTitleViz');
  if(vtt[1])vtt[1].textContent=t('vizTitleNadz');
  /* viz tab names */
  const vtbn=$$q('.viz-tab-name');
  if(vtbn[0])vtbn[0].textContent=t('dpViz3d');
  if(vtbn[1])vtbn[1].textContent=t('dpVizMood');
  /* viz CTA button */
  st('.viz-cta','vizTabCta');
  /* надзор cards */
  const nctier=$$q('.nc-tier');
  if(nctier[0])nctier[0].textContent=t('dpNadzS');
  if(nctier[1])nctier[1].textContent=t('dpNadzM');
  if(nctier[2])nctier[2].textContent=t('dpNadzV');
  const ncbadge=$q('.nc-badge');if(ncbadge)ncbadge.textContent=t('nadzBadge');
  const ncbill=$$q('.nc-billing');
  if(ncbill[0])ncbill[0].textContent=t('nc1Billing');
  if(ncbill[1])ncbill[1].textContent=t('nc2Billing');
  if(ncbill[2])ncbill[2].textContent=t('nc3Billing');
  const ncfoot=$$q('.nc-footer');
  if(ncfoot[0])ncfoot[0].textContent=t('nc1Footer');
  if(ncfoot[1])ncfoot[1].textContent=t('nc2Footer');
  if(ncfoot[2])ncfoot[2].textContent=t('nc3Footer');
  [['nc1Features','.nc.nc-left'],['nc2Features','.nc.nc-popular'],['nc3Features','.nc.nc-right']].forEach(([key,sel])=>{
    const arr=t(key);if(!Array.isArray(arr))return;
    const lis=$$q(sel+' .nc-features li');
    arr.forEach((txt,i)=>{if(lis[i])lis[i].textContent=txt;});
  });
  /* bottom bar CTA */
  st('.bottom-go','bottomGo');

  /* ── FURNITURE page ── */
  st('.svc-num','fcNum');sh('.svc-center h2','fcTitle');st('.svc-price-per','fcPricePer');
  const fcl=$$q('.svc-center .svc-includes li');
  if(fcl[0])fcl[0].textContent=t('fcli1');if(fcl[1])fcl[1].textContent=t('fcli2');if(fcl[2])fcl[2].textContent=t('fcli3');
  const skb=$q('.sketch-trigger');
  if(skb){const ar=skb.querySelector('.arrow');skb.innerHTML='';skb.appendChild(document.createTextNode(t('fcSketch')+' '));if(ar)skb.appendChild(ar);else{const s=document.createElement('span');s.className='arrow';s.textContent='›';skb.appendChild(s);}}
  st('.svc-note','fcNote');
  const fr=$$q('.svc-right p');
  if(fr[0])fr[0].textContent=t('fcR1');if(fr[1])fr[1].innerHTML=t('fcR2');if(fr[2])fr[2].textContent=t('fcR3');
  const phh=$q('.page-head h1');if(phh)phh.textContent=t('svcTitle');
  const phd=$q('.page-head p');if(phd)phd.textContent=t('fcPageDesc');
  st('.page-cta h2','fcCtaTitle');st('.page-cta p','fcCtaDesc');
  const ca=$$q('.page-cta a');
  if(ca[0])ca[0].textContent=t('fcCtaWa');if(ca[1])ca[1].textContent=t('fcCtaQuiz');

  /* LANG BUTTONS */
  $$q('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
}

function setLang(lang){
  window.currentLang=lang;
  localStorage.setItem('qiall_lang',lang);
  applyLang(lang);
}
window.setLang=setLang;
window.applyLang=applyLang;

/* init */
applyLang(window.currentLang);
