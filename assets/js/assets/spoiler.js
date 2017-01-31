$( function() {

    var clickHandler = 'click';
    var touchStartScreenY;
    var touchEndScreenY;

    function tSpoiler ( blockName, speed ) {
        var $spoilerBlock = $( '[data-show-spoiler=' + blockName + ']' );

        speed = ( speed != undefined ) ? speed : 300;

        if ( $spoilerBlock.length ) {
            $( '[data-spoiler=' + blockName + ']' ).toggleClass( 'is-active' ).toggleClass( 'is-open' );
            $spoilerBlock.slideToggle( speed ).toggleClass( 'is-hide' );
        }
    }

    function toggleSpoiler ( domElement, e ) {
        var nodeName    = domElement.nodeName,
            blockName   = $( domElement ).data( 'spoiler' ),
            speed       = $( domElement ).data( 'speed' );

        if ( nodeName == 'A' ) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Для Label заменям на change у checkbox'а
        if ( nodeName == 'LABEL' ) {
            var forId = $( domElement ).attr( 'for' );
            var $input = $( '#' + forId );

            if ( $input.attr( 'type' ) == 'checkbox' )
            {
                $input.on( 'change', function( e ) {
                    tSpoiler( blockName, speed );
                } );

                $( domElement ).removeClass( 'js-spoiler' );
                return;
            }
        }

        tSpoiler( blockName, speed );
    }

    /* Fix touch device */
    if ( 'ontouchstart' in document.documentElement && isMobile.iOS() ) {
        clickHandler = 'touchstart';

        $( document ).on( 'click', '.js-spoiler', function( e ) {
            if ( this.nodeName == 'A' ) {
                e.preventDefault();
                e.stopPropagation();
            }
        } );
    }

    $( document ).on( clickHandler, '.js-spoiler', function( e ) {
        if ( e.type == 'touchstart' ) {
            var touch = e.originalEvent.touches[ 0 ] || e.originalEvent.changedTouches[ 0 ];
            touchStartScreenY = touch.clientY;
        } else {
            toggleSpoiler( this, e );
        }
    } );

    $( document ).on( 'touchend', '.js-spoiler', function( e ) {
        var touch = e.originalEvent.touches[ 0 ] || e.originalEvent.changedTouches[ 0 ];

        touchEndScreenY = touch.clientY;
        if ( touchEndScreenY == touchStartScreenY || this.nodeName == 'A' ) {
            toggleSpoiler( this, e );
        }
    } );



} );
