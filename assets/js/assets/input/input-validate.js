var validateSetting = {
    phone: {
        regExp: /^[0-9-+() ]{6,20}$/,
        error: [ 'Неверный номер телефона' ]
    },
    email: {
        regExp: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
        error: [
            'Неверный e-mail',
            'Пользователь с таким e-mail уже зарегистрирован',
            'Введенный e-mail не существует'
        ]
    },
    login: {
        regExp: [ /^[A-Za-z0-9]+$/, /^(?!sc)/ ],
        error: [
            'Логин должен состоять только из символов латинского алфавита и цифр',
            'Логин не может содержать текст формата sc*****',
            'Данный логин уже занят'
        ],
        minLength: 3,
        errorLength: 'Логин должен состоять как минимум из 3-х символов'
    },
    pass: {
        regExp: [ /^[A-Za-z0-9]+$/, /[A-Z]/, /[a-z]/, /[0-9]/ ],
        error: [
            'Присутствуют недопустимые символы',
            'Отсутствуют латинские заглавные буквы A - Z',
            'Отсутствуют латинские прописные буквы a - z',
            'Отсутствуют цифры 0 - 9'
            ],
        minLength: 8,
        errorLength: 'Пароль меньше 8 символов'
    },
    name: {
        minLength: 3,
        errorLength: 'Длина имени должна быть больше трех букв'
    }
};

function setErrorInput ( $error, text ) {
    var $span = $( '<span></span>' ).html( text ),
        height;

    $error.html( '' ).append( $span );
    height = $span.outerHeight();
    $error.css( 'height', height );
}

var inputValidate = function( $inputs ) {

    var eachInput = function() {
        currValidate = true;
        $inputs.each( function() {
            var validate    = $( this ).data( 'validate' ),                 // Тип валидации
                $error      = $( this ).parent().find( '.input-error' ),    // Куда писать ошибку
                value       = $( this ).val();                              // Значение

            // Continue
            if ( !$( this ).hasClass( 'js-validate' ) ) return true;

            // Если поля находятся в спойлере то пропускаем
            if ( $(this).parents('.is-hide').length ) return true;

            $( this ).removeClass( 'is-good' );

            if ( isEmpty( value ) ) {
                setErrorInput( $error, '* поле не заполнено' );
                $( this ).addClass( 'is-bad' );
                currValidate = false;
                return true;
            }

            if ( isLength( value, validate ) ) {
                setErrorInput( $error, validateSetting[ validate ].errorLength );
                $( this ).addClass( 'is-bad' );
                currValidate = false;
                return true;
            }

            errorRegExp = regExp( value, validate );
            if ( errorRegExp.length ) {
                setErrorInput( $error, errorRegExp );
                $( this ).addClass( 'is-bad' );
                currValidate = false;
                return true;
            }

            $( this ).removeClass( 'is-bad' ).addClass( 'is-good' );
            $error.html( '' );
        } );

        return currValidate;
    };

    var isEmpty = function( val ) {
        if ( val.length == 0 ) return true;
        return false;
    };

    var isLength = function( val, validateType ) {
        if ( !validateType ) return false;

        if ( validateSetting[ validateType ].hasOwnProperty( 'minLength' ) ) {
            if ( val.length < validateSetting[ validateType ].minLength ) return true;
        }
        return false;
    };

    var regExp = function( val, validateType ) {
        if ( !validateType ) return false;

        // Если необходимо проверить массив регулярок
        if ( Array.isArray( validateSetting[ validateType ].regExp ) ) {
            for ( var i = 0; i < validateSetting[ validateType ].regExp.length; i++ ) {
                if ( val.search( validateSetting[ validateType ].regExp[ i ] ) == -1 )
                    return validateSetting[ validateType ].error[ i ];
            }
        } else if ( val.search( validateSetting[ validateType ].regExp ) == -1 ) {
            return validateSetting[ validateType ].error[ 0 ];
        }

        return false;
    };

    return eachInput();
};
