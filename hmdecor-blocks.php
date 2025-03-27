<?php
/**
 * Plugin Name: Home Decor Blocks
 * Description: A collection of custom Gutenberg blocks for Home Decor.
 * Version: 1.0
 * Author: Krishan Nanayakkara
 * Text Domain: hmdecor-blocks
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Register Custom Gutenberg Block (Hero Widget)
function hmdecor_register_blocks() {
    register_block_type(__DIR__ . '/blocks/hero-widget');
    register_block_type(__DIR__ . '/blocks/featured-products');
    register_block_type(__DIR__ . '/blocks/cta-widget');
}
add_action('init', 'hmdecor_register_blocks');

// Register Custom Gutenberg Category
function hmdecor_register_block_category($categories) {
    return array_merge(
        $categories,
        [
            [
                'slug'  => 'hmdecor-blocks',
                'title' => __('HMDecor Blocks', 'hmdecor-blocks'),
            ],
        ]
    );
}
add_filter('block_categories_all', 'hmdecor_register_block_category');

// Enqueue JS & Tailwind CSS (Load from Theme)
function hmdecor_blocks_enqueue() {
    $script_path = plugin_dir_path(__FILE__) . 'build/index.js';
    $theme_frontend_css = get_template_directory() . '/assets/css/frontend.css';
    $theme_editor_css = get_template_directory() . '/assets/css/editor.css';

    // Load JavaScript for Gutenberg Block
    if (file_exists($script_path)) {
        wp_enqueue_script(
            'hmdecor-blocks-js',
            plugins_url('build/index.js', __FILE__),
            ['wp-blocks', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-data', 'wp-api-fetch'],
            filemtime($script_path),
            true
        );
    }

    // Load Tailwind CSS for Frontend
    if (file_exists($theme_frontend_css)) {
        wp_enqueue_style(
            'hmdecor-theme-frontend-css',
            get_template_directory_uri() . '/assets/css/frontend.css',
            [],
            filemtime($theme_frontend_css)
        );
    }

    // Load Tailwind CSS for Gutenberg Editor
    if (file_exists($theme_editor_css)) {
        wp_enqueue_style(
            'hmdecor-theme-editor-css',
            get_template_directory_uri() . '/assets/css/editor.css',
            [],
            filemtime($theme_editor_css)
        );
    }
}
add_action('enqueue_block_editor_assets', 'hmdecor_blocks_enqueue'); // Load in Gutenberg
add_action('wp_enqueue_scripts', 'hmdecor_blocks_enqueue'); // Load on Frontend
