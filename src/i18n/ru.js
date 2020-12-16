let ru = {
    language: "Русский",
    app: {
        base: {
            create: 'Создать',
            update: 'Обновить',
            delete: 'Удалить',
            find_me: 'Найти меня на карте',
            logout: "Выход",
            editProfile: "Редактировать профиль",
            errors: {
                big_file: 'Файл слишком большой',
                phone_too_large: 'Слишком длинный номер',
                description_too_large: 'Слишком длинное описание',
                name_too_large: 'Слишком длинное имя',

            }
        },
        dashboard: {
            title: "Панель управления",
            blocks: {
                orders: {
                    title: "Записи"
                },
                masters: {
                    title: "Мастера"
                },
                lesson: {
                    title: "Видео урок",
                    /*
                    * Блок ниже - пример того, как оформляются переносы.
                    * Они не будут видны в итоговом тексте,
                    * нужны только для удобства чтения кода
                    */
                    description: "Lorem ipsum dolor sit amet, " +
                        "consectetuer adipiscing elit. Li Europan lingues es " +
                        "membres del sam familie. Lor separat existentie es un myth."
                },
                promotions: {
                    title: "Акции",
                    edit: "Редактировать"
                },
            },
            drawer: {
                menu: {
                    main: "Панель управления",
                    calendar: "Календарь",
                    masters: "Мастера",
                    orders: "Записи",
                    services: "Услуги",
                    salons: "Салоны",
                    promotions: "Акции",
                    settings: "Настройки",
                    clients: "Клиенты",
                },
                salonSelect: "Выбор салона",
                addOrder: "добавить запись"
            }
        },
        pages: {
            login: {
                title: "Панель управления",
                localePlaceholder: "Язык",
                loginPlaceholder: "Логин",
                passwordPlaceholder: "Пароль",
                buttonText: "Войти",
                intro: "CRM cистема для грумеров, которая поможет вам вывести бизнес на новый уровень.",
                restore: "Восстановить пароль"
            },
            orders: {
                title: "Записи",
                noOrders: "Нет записей 😔",
                addItem: "Добавить запись",
                editService: "Редактировать запись",
                table: {
                    header: {
                        petType: {
                            cat: "Кот",
                            dog: "Собака",
                            other: "Другое",
                        }
                    }
                }
            },
            new_order: {
                title: "Новая запись",
                create: "Сохранить запись",
                step_1: "Шаг 1. Данные о владельце",
                step_2: "Шаг 2. Мастер, дата и время",
                step_3: "Шаг 3. Услуги",
                services_type: 'Тип услуги',
                services_type_cat: 'Кошки',
                services_type_dog: 'Собаки',
                services_type_other: 'Другое',
                fields: {
                    owner_name: "Имя владельца",
                    phone: "Телефон клиента",
                    email: "Email клиента",
                    pet_name: "Кличка питомца",
                    comment: "Комментарий",
                },
                rules: {
                    too_long: "Слишком длинное",
                    required: 'Обязательно'
                }
            },
            clients: {
                title: "Клиенты",
                noOrders: "Нет записей 😔",
                table: {
                    header: {
                        petType: {
                            cat: "Кот",
                            dog: "Собака",
                            other: "Другое",
                        }
                    }
                },
            },
            services: {
                title: "Услуги",
                addItem: "Добавить услугу",
                editService: "Редактировать услугу",
                fields: {
                    name: "Название услуги",
                    text: "Описание услуги",
                    image_upload: "Изображение услуги",
                    price: "Цена",
                }
            },
            promotions: {
                title: "Акции",
                addItem: "Добавить акцию",
                editService: "Редактировать акцию",
                fields: {
                    title: "Заголовок акции",
                    image_upload: "Изображение акции",
                    full_description: "Полный текст акции",
                    date_start: "Дата начала акции",
                    date_end: "Дата окончания акции",
                }
            },
            salons: {
                title: "Салоны",
                addItem: "Добавить салон",
                address: "Адрес"
            },
            masters: {
                select: "Выбрать мастера",
                fields: {
                    name: "Имя мастера",
                    position: "Должность мастера",
                    email: "Электронная почта мастера (логин для входа)",
                    password: "Новый пароль для входа",
                    phone: "Телефон мастера",
                    image_upload: "Фото мастера",
                    description: "Короткое описание мастера",
                }
            },
            settings: {
                title: "Настройки",
                updateButton: "Обновить",
                timezone: "Таймзона",
                blocks: {
                    main: {
                        title: "Основные настройки",
                        schedule: "Расписание работы салонов",
                        pushSelectorBefore: {
                            min30: "за 30 минут до начала",
                            min60: "за 1 час до начала",
                            min120: "за 2 часа до начала",
                        },
                        pushSelectorAfter: {
                            days30: "через 30 дней после визита",
                            days45: "через 45 дней после визита",
                            days60: "через 60 дней после визита",
                        },
                    },
                    logo: {
                        title: "Логотип компании"
                    },
                    account: {
                        title: "Настройки аккаунта",
                    },
                    notification: {
                        title: "Настройки уведомлений",
                    },
                    app: {
                        title: "Настройки приложения",
                    },
                },
                fields: {
                    name: "Название компании",
                    settings: {
                        phone: "Телефон",
                        website: "Вебсайт",
                        email: "Email",
                        address: "Адрес компании",
                        pushBefore: "Уведомление о предстоящем сеансе",
                        pushAfter: "Повторное уведомление",
                        first_screen_text: "Текст на главной странице приложения",
                    }
                }

            },
        },



        messages: {
            login: {
                error: "Ошибка авторизации - неверно введен логин или пароль",
                success: "Успешно. Переходим к панели управления",
                cantGetUser: "Невозможно получить данные пользователя"
            },
            notifications: {
                successfullyGetList: "Список загружен",
                successfullyGet: "Запись загружена",
                successfullyPatch: "Запись обновлена",
                successfullyDelete: "Запись удалена",
                successfullyPost: "Запись создана",

                errorGetList: "Во время загрузки списка произошла ошибка",
                errorGet: "Во время получения записи произошла ошибка",
                errorPatch: "Во время обновления записи произошла ошибка",
                errorDelete: "Во время удаления записи произошла ошибка",
                errorPost: "Во время создания записи произошла ошибка",
            },
        },
        fields: {
            schedule: {
                title:"График работы",
                week: [
                    "Вс",
                    "Пн",
                    "Вт",
                    "Ср",
                    "Чт",
                    "Пт",
                    "Сб",
                ],
                createDefault: "Создать расписание"
            },
            select: {
                noData: "Нет данных"
            },
        },
        WDSelect: {
            date: "Дата",
            time: "Время"
        }
    }
}

export default ru
