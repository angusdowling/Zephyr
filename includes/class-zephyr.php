<?php
/**
 * Zephyr setup
 *
 * @package  Zephyr
 * @since    1.0.0
 */

defined( 'ABSPATH' ) || exit;

final class Zephyr {
	/**
	 * Zephyr version.
	 *
	 * @var string
	 */
	public $version = '1.0.0';

	/**
	 * The single instance of the class.
	 *
	 * @var Zephyr
	 * @since 1.0
	 */
	protected static $_instance = null;

	/**
	 * Main Zephyr Instance.
	 *
	 * Ensures only one instance of Zephyr is loaded or can be loaded.
	 *
	 * @since 1.0
	 * @static
	 * @see ZPR()
	 * @return Zephyr - Main instance.
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		
		return self::$_instance;
	}

	/**
	 * Zephyr Constructor.
	 */
	public function __construct() {
		$this->define_constants();
		$this->init_hooks();

		do_action( 'zephyr_loaded' );
	}
    
	/**
	 * Get the plugin url.
	 *
	 * @return string
	 */
	public function plugin_url() {
		return untrailingslashit( plugins_url( '/', ZPR_PLUGIN_FILE ) );
	}

	/**
	 * Get the plugin path.
	 *
	 * @return string
	 */
	public function plugin_path() {
		return untrailingslashit( plugin_dir_path( ZPR_PLUGIN_FILE ) );
	}

    	/**
	 * Hook into actions and filters.
	 *
	 * @since 1.0
	 */
	private function init_hooks() {
		add_shortcode( 'zephyr', array( $this, 'zephyr') );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
    	}
    
    	/**
	 * Define ZPR Constants.
	 */
	private function define_constants() {
		$this->define( 'ZPR_ABSPATH', dirname( ZPR_PLUGIN_FILE ) . '/' );
	}

	/**
	 * Define constant if not already set.
	 *
	 * @param string      $name  Constant name.
	 * @param string|bool $value Constant value.
	 */
	private function define( $name, $value ) {
		if ( ! defined( $name ) ) {
			define( $name, $value );
		}
	}

	/**
	 * Initialize Zephyr (shortcode).
	 * @param  array $atts
	 * @return string
	 */
	public function zephyr($atts) {
		$atts = shortcode_atts( array(
			'placeholder' => '',
		), $atts, 'zephyr' );

		return $this->render();
	}

	/**
	 * Enqueue scripts and styles.
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'zephyr/js', ZPR()->plugin_url() . '/build/widget.js' , array(), '1.0.0', true );
        	wp_enqueue_style( 'zephyr/css', ZPR()->plugin_url() . '/build/widget.css', array(), '1.0.0');
        	wp_enqueue_script( 'zephyr-admin/js', ZPR()->plugin_url() . '/build/admin.js', array(), '1.0.0', true );
		wp_enqueue_style( 'zephyr-admin/css', ZPR()->plugin_url() . '/build/admin.css', array(), '1.0.0');
	}

	static function render() {
		echo '<div class="zephyr-wrapper" class="wrap"></div>';
	}

}
