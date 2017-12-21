<?php

	require 'vendor/autoload.php';

	$loader = new Twig_Loader_Filesystem(__DIR__ . '/views');
	$twig = new Twig_Environment($loader, array(
	    'cache' => false,
	));

	$siteData = json_decode(file_get_contents('./data/site.json'), true);
	$themeData = json_decode(file_get_contents('./data/theme.json'), true);

	echo $twig->render('pages/page-legals.twig', ['site' => $siteData, 'theme' => $themeData]);


/**
 * Template Name: Mentions legales
 */
/*
$context = Timber::get_context();

Timber::render('pages/page-legals.twig', $context);

?>
 */