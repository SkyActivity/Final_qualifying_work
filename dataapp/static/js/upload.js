$(document).ready(function () {
    function isXlsxFile(file) {
        if (!file || !file.name) {
            return false;
        }
        return file.name.toLowerCase().endsWith('.xlsx');
    }

    function handleInvalidFile(messageElement, submitButton) {
        messageElement.html('<div class="alert alert-danger">Неверный формат файла. Пожалуйста, выберите .xlsx файл.</div>');
        submitButton.prop('disabled', false);
    }

    $('#uploadDataForm').on('submit', function (e) {
        e.preventDefault();

        var submitButton = $(this).find('button[type=submit]');
        var messageElement = $('#messageData');
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
        $.ajax({
            url: '/dataapp/upload/data/',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response && response.status === 'success') {
                    var message = response && response.message
                        ? response.message
                        : 'Файл загружен, ожидайте перезагрузки страницы!';
                    messageElement.html('<div class="alert alert-success">' + message + '</div>');
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
        $.ajax({
            url: '/dataapp/upload/map/',
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

    $("select").select2();

    $('.toggle-sidebar-btn').click(function(e) {
        $('body').toggleClass('toggle-sidebar')
    })

    $('#downloadCsv').click(function (e) {
        e.preventDefault();
        $('#messageDownload').show();
        $('#messageDownload').html('<div class="alert alert-info">Начата загрузка CSV...</div>');

        $.ajax({
            url: '/dataapp/export/csv/',
            type: 'GET',
            xhrFields: {
                responseType: 'blob'
            },
            success: function (blob) {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'map_data.csv';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                $('#messageDownload').html('<div class="alert alert-success">CSV файл успешно скачан!</div>');
                $('#messageDownload').hide();
            },
            error: function () {
                $('#messageDownload').html('<div class="alert alert-danger">Ошибка при скачивании CSV файла</div>');
                $('#messageDownload').hide();
            }
        });
    });
});
