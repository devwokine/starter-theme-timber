<?php

add_filter( 'timber_context', 'add_to_context'  );

function add_to_context( $context ) {
    $context['wkn_version'] = "1.0";

    $context['post'] = new TimberPost();

    return $context;
}
