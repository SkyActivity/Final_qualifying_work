$(document).ready(function () {
    // Функция проверки формата файла - должен быть .xlsx
    function isXlsxFile(file) {
        if (!file || !file.name) {
            return false;
        }
        return file.name.toLowerCase().endsWith('.xlsx');
    }

    // Функция обработки невалидного файла - показывает сообщение об ошибке
    function handleInvalidFile(messageElement, submitButton) {
        messageElement.html('<div class="alert alert-danger">Неверный формат файла. Пожалуйста, выберите .xlsx файл.</div>');
        submitButton.prop('disabled', false); // Разблокируем кнопку отправки
    }

    // Обработка отправки формы для загрузки данных
    $('#uploadDataForm').on('submit', function (e) {
        e.preventDefault(); // Предотвращаем стандартную отправку формы

        var submitButton = $(this).find('button[type=submit]');
        var messageElement = $('#messageData');
        submitButton.prop('disabled', true); // Блокируем кнопку отправки

        var fileInput = $(this).find('input[type=file]')[0];
        var file = fileInput && fileInput.files ? fileInput.files[0] : null;

        // Проверяем формат файла
        if (!isXlsxFile(file)) {
            if (fileInput) {
                fileInput.value = ''; // Очищаем поле выбора файла
            }
            handleInvalidFile(messageElement, submitButton);
            return;
        }

        // Создаем FormData для отправки файла
        var formData = new FormData(this);

        // AJAX запрос для загрузки файла с данными
        $.ajax({
            url: '/dataapp/upload/data/', // URL для загрузки данных
            type: 'POST',
            data: formData,
            contentType: false, // Не устанавливаем Content-Type (нужно для FormData)
            processData: false, // Не обрабатываем данные (нужно для FormData)
            success: function (response) {
                if (response && response.status === 'success') {
                    // Успешная загрузка
                    var message = response && response.message
                        ? response.message
                        : 'Файл загружен, ожидайте перезагрузки страницы!';
                    messageElement.html('<div class="alert alert-success">' + message + '</div>');

                    // Перезагружаем страницу через 1 секунду
                    setTimeout(() => {
                        location.reload();
                    }, 1000)
                } else {
                    // Ошибка на стороне сервера
                    submitButton.prop('disabled', false)
                    var message = response && response.message ? response.message : 'Ошибка загрузки файла';
                    messageElement.html('<div class="alert alert-danger">' + message + '</div>');
                }
            },
            error: function (xhr) {
                // Ошибка сети или сервера
                submitButton.prop('disabled', false)
                var message = xhr && xhr.responseJSON && xhr.responseJSON.message
                    ? xhr.responseJSON.message
                    : 'Ошибка загрузки файла';
                messageElement.html('<div class="alert alert-danger">' + message + '</div>');
            }
        });
    });

    // Обработка отправки формы для загрузки карты (аналогично предыдущей форме)
    $('#uploadMapForm').on('submit', function (e) {
        e.preventDefault();

        var submitButton = $(this).find('button[type=submit]');
        var messageElement = $('#message');
        submitButton.prop('disabled', true);

        var fileInput = $(this).find('input[type=file]')[0];
        var file = fileInput && fileInput.files ? fileInput.files[0] : null;

        if (!isXlsxFile(file)) {
            if (fileInput) {
                fileInput.value = '';
            }
            handleInvalidFile(messageElement, submitButton);
            return;
        }

        var formData = new FormData(this);

        // AJAX запрос для загрузки карты
        $.ajax({
            url: '/dataapp/upload/map/', // URL для загрузки карты
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response && response.status === 'success') {
                    messageElement.html('<div class="alert alert-success">Файл загружен, ожидайте перезагрузки страницы!</div>');
                    setTimeout(() => {
                        location.reload();
                    }, 1000)
                } else {
                    submitButton.prop('disabled', false)
                    var message = response && response.message ? response.message : 'Ошибка загрузки файла';
                    messageElement.html('<div class="alert alert-danger">' + message + '</div>');
                }
            },
            error: function (xhr) {
                submitButton.prop('disabled', false)
                var message = xhr && xhr.responseJSON && xhr.responseJSON.message
                    ? xhr.responseJSON.message
                    : 'Ошибка загрузки файла';
                messageElement.html('<div class="alert alert-danger">' + message + '</div>');
            }
        });
    });

    // Инициализация Select2 для всех select элементов (улучшенные выпадающие списки)
    $("select").select2();

    // Обработчик для переключения боковой панели (sidebar)
    $('.toggle-sidebar-btn').click(function(e) {
        $('body').toggleClass('toggle-sidebar') // Добавляем/удаляем класс для скрытия/показа sidebar
    })

    // Обработчик для скачивания CSV файла
    $('#downloadCsv').click(function (e) {
        e.preventDefault();

        // Показываем сообщение о начале загрузки
        $('#messageDownload').show();
        $('#messageDownload').html('<div class="alert alert-info">Начата загрузка CSV...</div>');

        // AJAX запрос для скачивания CSV
        $.ajax({
            url: '/dataapp/export/csv/', // URL для экспорта CSV
            type: 'GET',
            xhrFields: {
                responseType: 'blob' // Указываем, что ожидаем бинарные данные (файл)
            },
            success: function (blob) {
                // Создаем ссылку для скачивания файла
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'map_data.csv'; // Имя скачиваемого файла
                document.body.appendChild(a);
                a.click(); // Программный клик по ссылке
                a.remove(); // Удаляем ссылку из DOM
                window.URL.revokeObjectURL(url); // Освобождаем память

                $('#messageDownload').html('<div class="alert alert-success">CSV файл успешно скачан!</div>');
                $('#messageDownload').hide(); // Скрываем сообщение через 2 секунды
            },
            error: function () {
                $('#messageDownload').html('<div class="alert alert-danger">Ошибка при скачивании CSV файла</div>');
                $('#messageDownload').hide(); // Скрываем сообщение через 2 секунды
            }
        });
    });
});