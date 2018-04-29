<?php

/**
 * Plugin Name: Zephyr
 * Plugin URI: https://angusdowling.net
 * Description: A react-based post type reloader.
 * Version: 1.0.0
 * Author: Angus Dowling
 * Author URI: https://angusdowling.net
 *
 * @package Zephyr
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Define ZPR_PLUGIN_FILE.
if ( ! defined( 'ZPR_PLUGIN_FILE' ) ) {
	define( 'ZPR_PLUGIN_FILE', __FILE__ );
}

// Include the main Zephyr class.
if ( ! class_exists( 'Zephyr' ) ) {
	include_once dirname( __FILE__ ) . '/includes/class-zephyr.php';
}

/**
 * Returns the main instance of ZPR to prevent the need to use globals.
 *
 * @return Zephyr
 */
function ZPR()
{
	return Zephyr::instance();
}

// Global for backwards compatibility.
$GLOBALS['Zephyr'] = ZPR();