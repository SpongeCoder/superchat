$( function() {
    var $input = $( ".input-text" );

    var focusOut = function (event) {
        var value         = $( this ).val(),
            $placeholder  = $( this ).next( ".input-placeholder" );

        $placeholder.removeClass( "is-focus" );
        $(this).removeClass('is-good');

        if ( value.length ) {
            $placeholder.addClass( "is-focus" );
            $(this).addClass('is-good');
        }
    }

    var focusIn = function (event) {
        $( this ).removeClass( "input--error" );
        $( this ).parent()
                 .find( ".input-error" )
                 .html( "" )
                 .removeAttr( "style" );
    }

    $input.on( "focusout", focusOut);
    $input.on( "focusin", focusIn);

    $input.focusout();
} );
