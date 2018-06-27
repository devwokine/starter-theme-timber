<?php

add_filter( 'timber_context', 'add_to_context'  );

function add_to_context( $context ) {
    $context['post'] = new TimberPost();

    return $context;
}
